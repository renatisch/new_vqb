from langchain.prompts import PromptTemplate
from langchain.output_parsers import StructuredOutputParser
from handlers.handlers import ChatModelStartHandler
from langchain.tools import StructuredTool
from langchain_openai import OpenAI
from tools.experimental.technology_context import technologies
from models import IsQueryValid, Description
from typing import List
from api_models import DBs


def experiemental_query_validate(technology: str, query: str):
    user_input = f"""Validate if the following sql query conforms with {technology} SQL dialect.\n
                    SQL query to validate: {query}
                 """
    ChatStartHandler = ChatModelStartHandler()
    model = OpenAI(
        model_name="gpt-3.5-turbo-instruct",
        temperature=0.0,
        callbacks=[ChatStartHandler],
    )
    output_parser = StructuredOutputParser.from_response_schemas(
        [IsQueryValid, Description]
    )
    response_format = output_parser.get_format_instructions()
    prompt = PromptTemplate(
        template="""
        You are a SQL expert, your help users validate that SQL queries they provide conform with SQL dialects used by the following\n
        database technologies: Snowflake, Databricks, Google BigQuery.\n
        When validating SQL queries, you MUST keep in mind the following key relationships between data objects in technology and rules:\n
        Relationships:\n
        {relationship}\n

        Only queries complying with all of the following rules shall be considered valid.\n
        If the following conditions are not satisfied, the query is invalid.\n
        If provided sql query is invalid, provide the reason.\n
        Rules:
        {rules}

        When responding provide fully qualified table name for data.\n
        In {technology}, a fully qualified name (FQN) refers to the complete and unambiguous identifier for a particular data object,\n
        such as a table within the platform. The FQN includes the names of the catalog, schema, and the object itself.\n
        The structure is generally as follows:\n
        {schema}\n

        For example:\n
        {examples}\n

        End query with parenthesis ';' sign. \n{format_instructions}\n

        Only answer with the specified JSON format, no other text.\n

        user: {input}
        """,
        input_variables=["input"],
        partial_variables={
            "relationship": technologies[technology]["instructions"],
            "rules": technologies[technology]["rules"],
            "technology": technology,
            "schema": technologies[technology]["schema"],
            "examples": technologies[technology]["examples"],
            "format_instructions": response_format,
        },
    )
    prompt_and_model = prompt | model
    output = prompt_and_model.invoke(
        {
            "technology": technology,
            "input": user_input,
        }
    )
    response = output_parser.invoke(output)
    return response
