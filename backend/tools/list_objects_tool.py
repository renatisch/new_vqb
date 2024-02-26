from langchain.prompts import PromptTemplate
from langchain.output_parsers import StructuredOutputParser
from handlers.handlers import ChatModelStartHandler
from langchain.tools import StructuredTool
from langchain_openai import OpenAI
from models import ObjectType, List_Objects_Tool_Args

objects = {
    "Databricks": [
        {
            "query_type": "SELECT",
            "objects": ["database", "schema", "table"],
        },
    ],
    "Snowflake": [
        {
            "query_type": "SELECT",
            "objects": ["database", "schema", "table"],
        },
    ],
    "Google_BigQuery": [
        {
            "query_type": "SELECT",
            "objects": ["database", "schema", "table"],
        },
    ],
}


def list_objects(technology: str, query_type: str):
    ChatStartHandler = ChatModelStartHandler()
    model = OpenAI(
        model_name="gpt-3.5-turbo-instruct",
        temperature=0.0,
        callbacks=[ChatStartHandler],
    )
    output_parser = StructuredOutputParser.from_response_schemas([ObjectType])
    response_format = output_parser.get_format_instructions()
    prompt = PromptTemplate(
        template="""
        Your are a SQL expert and know the following database technologies: Databricks, Snowflake.\n
        Objective:
        Your objective is to help use users identify the {technology} database objects they will need define to construct\n
        a required SQL query. Do not make any assumptions about database objects, use the below dictionary to find the objects.\n
        
        Database queries and objects:
        {database_objects}

        Output example:
        {format_instructions}
        Only answer with the specified JSON format, no other text.\n
        
        user: {input}
        """,
        input_variables=["input"],
        partial_variables={
            "format_instructions": response_format,
            "database_objects": objects,
        },
    )
    prompt_and_model = prompt | model
    output = prompt_and_model.invoke(
        {
            "technology": technology,
            "input": f"What objects do I need to define to construct {technology} {query_type} SQL query?",
        }
    )
    response = output_parser.invoke(output)
    return response


list_objects_tool = StructuredTool.from_function(
    name="list_objects_tool",
    description="Lists database objects required to construct required sql statements.",
    func=list_objects,
    args_schema=List_Objects_Tool_Args,
)
