from pydantic import BaseModel
from enum import Enum
from typing import List


class Technology(str, Enum):
    snowflake = "Snowflake"
    databricks = "Databricks"
    google_big_query = "Google_BigQuery"


class Join_Type(str, Enum):
    left = "left"
    right = "right"


class Payload(BaseModel):
    technology: Technology
    database: str
    table_schema: str
    table: str
    columns: List[str]


class SQLQuery(BaseModel):
    query: str
    query_type: str


class DBs(BaseModel):
    technology: str
    join_type: Join_Type
    left_table_column: str
    right_table_column: str
    databases: List[str]
    schemas: List[str]
    tables: List[str]


class Query_to_Validate(BaseModel):
    technology: Technology
    query: str
