import os
from snowflake.connector import connect


def get_snowflake(query: str):
    ACCOUNT = os.getenv("SNOWFLAKE_ACCOUNT")
    PASSWWORD = os.getenv("SNOWFLAKE_PASSWORD")
    conn = connect(
        user="renat.isch@yahoo.com",
        password=PASSWWORD,
        account=ACCOUNT,
        session_parameters={
            "QUERY_TAG": "EndOfMonthFinancials",
        },
    )
    cur = conn.cursor()
    response = cur.execute(query).fetchall()
    databases = []
    for each in response:
        databases.append(each[1])
    return databases
