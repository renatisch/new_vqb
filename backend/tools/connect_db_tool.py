from langchain.tools import StructuredTool
from models import Connect_DB_Tool_Args
from clients.snowflake import get_snowflake


def connect_db(query: str):
    data = get_snowflake(query=query)
    return data


connect_db_tool = StructuredTool.from_function(
    name="connect_db",
    description="Executes a query against datasource and returns database object.",
    func=connect_db,
    args_schema=Connect_DB_Tool_Args,
)
