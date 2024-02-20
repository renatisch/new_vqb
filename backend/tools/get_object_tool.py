from langchain.prompts import PromptTemplate
from langchain.output_parsers import StructuredOutputParser
from handlers.handlers import ChatModelStartHandler
from langchain.tools import Tool, StructuredTool
from langchain_openai import OpenAI
from tools.technology_context import technologies
from models import SQLQuery, QueryType, Get_Object_Tool_Args


def get_object(technology: str, object: str):
    user_input = ""
    inputs = technologies[technology]["inputs"]
    for each in inputs:
        if each["object"] == object:
            user_input = each["input"].replace("{technology}", technology)
            print(each["object"])
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


get_object_tool = StructuredTool.from_function(
    name="get_object_tool",
    description="Returns technology-specific SQL queries for specified database object.",
    func=get_object,
    args_schema=Get_Object_Tool_Args,
)
