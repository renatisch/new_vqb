from langchain.prompts import PromptTemplate
from langchain.output_parsers import StructuredOutputParser
from handlers.handlers import ChatModelStartHandler
from models import IsQueryValid, Description
from tools.validate_tool.technology_context import instructions
from langchain_openai import ChatOpenAI


def query_validate(technology: str, query: str):
    technology = technology.value
    user_input = f"""Validate if the following sql query conforms with {technology} SQL dialect.\n
                    SQL query to validate: {query}
                 """
    ChatStartHandler = ChatModelStartHandler()
    model = ChatOpenAI(
        callbacks=[ChatStartHandler], temperature=0, model="gpt-4-turbo-preview"
    )
    output_parser = StructuredOutputParser.from_response_schemas(
        [IsQueryValid, Description]
    )
    response_format = output_parser.get_format_instructions()
    prompt = PromptTemplate(
        template="""
        Your role is to assist users in validating SQL queries to ensure conformity with the SQL dialects used by the following database technologies: Snowflake, Databricks, Google BigQuery.
        Here is basic information about {technology} and different data object dependencies:\n
        
        {definition}

        Emphasize that the path to each table in the database should have a fully qualified name (FQN), consisting of the database, schema, and table names.

        Validation Rules:
        {rules}

        Example of a Valid Query:
        {valid_examples}

        Examples of an Invalid Query:
        {invalid_examples}

        Only answer with the specified JSON format, no other text.\n
        End query with parenthesis ';' sign. \n{format_instructions}\n

        user: {input}\n
        """,
        input_variables=["input"],
        partial_variables={
            "format_instructions": response_format,
            "definition": instructions[technology]["definition"],
            "rules": instructions[technology]["rules"],
            "valid_examples": instructions[technology]["valid_examples"],
            "invalid_examples": instructions[technology]["invalid_examples"],
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
