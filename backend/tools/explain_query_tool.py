from langchain.prompts import PromptTemplate
from langchain.output_parsers import StructuredOutputParser
from handlers.handlers import ChatModelStartHandler
from langchain.tools import StructuredTool
from langchain_openai import OpenAI
from tools.technology_context import technologies
from models import Query_Description
from typing import List


def query_explain(technology: str, query: str):
    user_input = f"""Provide a short two-sentence description of the following {technology} SQL query: {query}.
                 """
    ChatStartHandler = ChatModelStartHandler()
    model = OpenAI(
        model_name="gpt-3.5-turbo-instruct",
        temperature=0.0,
        callbacks=[ChatStartHandler],
    )
    output_parser = StructuredOutputParser.from_response_schemas([Query_Description])
    response_format = output_parser.get_format_instructions()
    prompt = PromptTemplate(
        template="""
        You are a SQL expert, your help users understand what specific SQL queries do.\n
        You know the following database technologies: Snowflake, Databricks, Google BigQuery.\n
        When responding, you MUST keep in mind the following key relationships between data objects in technologies:\n
        Relationships:\n
        {relationship}\n

        In {technology}, a fully qualified name (FQN) refers to the complete and unambiguous identifier for a particular data object,\n
        such as a table within the platform. The FQN includes the names of the catalog, schema, and the object itself.\n
        The structure is generally as follows:\n
        {schema}\n

        End query with parenthesis ';' sign. \n{format_instructions}\n

        Only answer with the specified JSON format, no other text.\n

        user: {input}
        """,
        input_variables=["input"],
        partial_variables={
            "relationship": technologies[technology],
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
