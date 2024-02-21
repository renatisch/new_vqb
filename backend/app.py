from fastapi import FastAPI
from dotenv import load_dotenv
from llm import initial_queries_assistant
from api_models import Payload, Technology, SQLQuery, DBs, Query_to_Validate
from tools.select_query_tool import select_query
from tools.validate_query_tool import validate_query
from fastapi.middleware.cors import CORSMiddleware

load_dotenv(verbose=True, override=True)

app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.post("/queries/select")
def get_initial_queries(data: Payload) -> SQLQuery:
    response = select_query(
        technology=data.technology,
        database_name=data.database,
        schema_name=data.table_schema,
        table_name=data.table,
        columns_to_select=data.columns,
    )
    return response


@app.post("/queries/join")
def get_initial_queries(data: DBs):
    input = f"""Generate a LEFT JOIN query.\n
            The query shall use {data.technology} specific SQL dialect\n
            Left table to join on: {data.databases[0]}.{data.schemas[0]}.{data.tables[0]}. Right table to join on: {data.databases[1]}.{data.schemas[1]}.{data.tables[1]}\n
            Left table column to join on: {data.left_table_column}. Right column to join on: {data.right_table_column}\n
            The query shall return all collumns from both tables.
            \n{{format_instructions}}
    """
    response = initial_queries_assistant(technology=data.technology, input=input)
    return response


@app.post("/queries/validate")
def get_initial_queries(query: Query_to_Validate):
    response = validate_query(technology=query.technology, query=query.query)
    return response


if __name__ == "__main__":
    app()
