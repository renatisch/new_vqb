from langchain.prompts import PromptTemplate
from langchain.output_parsers import StructuredOutputParser
from handlers.handlers import ChatModelStartHandler
from langchain.tools import StructuredTool
from langchain_openai import OpenAI
from tools.technology_context import technologies
from models import SQLQuery, QueryType, Left_Join_Query_Tool_Args
from typing import List


def left_join_query(
    technology: str,
    tables_to_join: List[str],
    columns_to_join_on: List[str],
):
    user_input = f"""Your goal is to generate a LEFT JOIN query on tables {tables_to_join}.\n
                     The left table is {tables_to_join[0]}. The right table is {tables_to_join[1]}.\n
                     The left table column to join on is {columns_to_join_on[0]}.The right table column to join on is {columns_to_join_on[1]}.\n 
                     The query shall select all columns from both tables.\n
                 """
    ChatStartHandler = ChatModelStartHandler()
    model = OpenAI(
        model_name="gpt-3.5-turbo-instruct",
        temperature=0.0,
        callbacks=[ChatStartHandler],
    )
    output_parser = StructuredOutputParser.from_response_schemas([SQLQuery, QueryType])
    response_format = output_parser.get_format_instructions()
    prompt = PromptTemplate(
        template="""
        You are a SQL expert, your goal is to generate SQL queries for users for the following database technologies: Snowflake, Databricks, Google BigQuery.\n
        When generating SQL queries, you MUST keep in mind the following key relationships between data objects in technologies:\n
        Relationships:\n
        {relationship}\n

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


left_join_query_tool = StructuredTool.from_function(
    name="left_join_query_tool",
    description="Returns LEFT JOIN query type for specific database technology.",
    func=left_join_query,
    args_schema=Left_Join_Query_Tool_Args,
)
