from fastapi import FastAPI
from dotenv import load_dotenv
from llm import initial_queries_assistant
from api_models import Payload, Technology, DBs, Query_to_Validate
from tools.select_query_tool import select_query
from tools.explain_query_tool import query_explain
from tools.validate_query_tool import query_validate
from tools.left_join_query_tool import left_join_query
from tools.convert_query_tool import query_convert
from tools.list_objects_tool import list_objects
from fastapi.middleware.cors import CORSMiddleware
import json

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
def get_initial_queries(technology: Technology):
    queries = []
    with open("initial_queries.json", "r") as data:
        db = json.loads(data.read())
        for each in db:
            if each["technology"] == technology:
                return each
            else:
                queries.append(each)
    input = """Perform the following tasks:\n
            1. Get all {technology} database objects required to generate a SELECT query;
            2. Get SQL queries for each database object from step 1;
            3. Get describe query for specified technology\n
            \n{format_instructions}"
    """.replace(
        "{technology}", technology
    )
    response = initial_queries_assistant(technology=technology, input=input)
    queries.append(response.dict())
    with open("initial_queries.json", "w") as file:
        file.write(json.dumps(queries))
    return response


@app.post("/queries/select")
def get_select_query(data: Payload):
    response = select_query(
        technology=data.technology,
        database_name=data.database,
        schema_name=data.table_schema,
        table_name=data.table,
        columns_to_select=data.columns,
    )
    return response


@app.post("/queries/join")
def get_join_query(data: DBs):
    response = left_join_query(objects=data)
    return response


@app.post("/queries/validate")
def validate_query(query: Query_to_Validate):
    response = query_validate(technology=query.technology, query=query.query)
    return response


@app.post("/queries/explain")
def explain_query(query: Query_to_Validate):
    response = query_explain(technology=query.technology, query=query.query)
    return response


@app.post("/queries/convert")
def convert_query(query: Query_to_Validate):
    response = query_convert(technology=query.technology, query=query.query)
    return response


if __name__ == "__main__":
    app()
