from fastapi import FastAPI
from dotenv import load_dotenv
from llm import initial_queries_assistant
from models import Technology

load_dotenv()
app = FastAPI()


@app.get("/")
def home():
    technology = "Databricks"
    input = """Generate a LEFT JOIN query.\n
            The query shall use {technology} specific SQL dialect\n
            Left table to join on: catalog.test_data.trips4. Right table to join on: catalog.test_data.trips8\n
            Left table column to join on: vendor_id. Right column to join on: id\n
            The query shall return all collumns from both tables.
            \n{format_instructions}"
    """.replace(
        "{technology}", technology
    )
    response = initial_queries_assistant(technology=technology, input=input)
    return response


@app.get("/queries/initial")
def get_initial_queries(technology: Technology) -> list:
    input = """Perform the following tasks:\n
            1. Get all {technology} database objects required to perform a SELECT query;
            2. Get SQL queries for each database object;
            3. Get describe query for specified technology\n
            \n{format_instructions}"
    """.replace(
        "{technology}", technology
    )
    response = initial_queries_assistant(technology=technology, input=input)
    return response


if __name__ == "__main__":
    app()
