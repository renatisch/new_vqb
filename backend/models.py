from langchain.output_parsers import (
    ResponseSchema,
)
from pydantic.v1 import BaseModel, Field
from typing import List
from enum import Enum


SQLQuery = ResponseSchema(name="query", description="sql query.")
QueryType = ResponseSchema(name="query_type", description="Query type.")
Queries = ResponseSchema(name="queries", description="List of generated sql queries")


ObjectType = ResponseSchema(
    name="objects",
    description="List of objects that query retrieves.",
)


class List_Objects_Tool_Args(BaseModel):
    technology: str = Field(
        description="Database technology name for which objects need to be retrieved."
    )
    query_type: str = Field(description="Query type")


class Get_Object_Tool_Args(BaseModel):
    technology: str = Field(
        description="Database technology name for which objects need to be retrieved."
    )
    object: str = Field(description="Database object")


class Describe_Query_Tool_Args(BaseModel):
    technology: str = Field(
        description="Database technology name for which objects need to be retrieved."
    )


class Left_Join_Query_Tool_Args(BaseModel):
    technology: str = Field(
        description="Database technology name for which objects need to be retrieved."
    )
    tables_to_join: List[str] = Field(description="Tables to perform join on")
    columns_to_join_on: List[str] = Field(description="Columns to join on")


class Technology(str, Enum):
    snowflake = "Snowflake"
    databricks = "Databricks"
    google_big_query = "Google_BigQuery"
