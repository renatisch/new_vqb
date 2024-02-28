technologies = {
    "Databricks": {
        "instructions": """Databricks:\n
                        Catalog: a grouping of schemas. It is a parent of schema objects.\n
                        Schema: a grouping of objects in a catalog. It is a parent of tables.\n
                        Table: a collection of rows and columns stored as data.\n""",
        "schema": "database_id.schema_id.table_id",
        "examples": """
            SHOW TABLES in <database_id>.<schema_id>\n
            SELECT * FROM <database_id>.<schema_id>.<table_id>""",
        "inputs": [
            {
                "object": "database",
                "input": "Generate a SQL query to list catalogs in my {technology} account.",
            },
            {
                "object": "schema",
                "input": "Generate a SQL statement listing schemas within a {technology} database.",
            },
            {
                "object": "table",
                "input": "Generate a SQL statement listing tables within a {technology} schema.",
            },
            {
                "object": "describe",
                "input": "Generate a SQL statement describing a single table within a {technology} schema.",
            },
        ],
    },
    "Snowflake": {
        "instructions": """Snowflake:\n
                        Database: a grouping of schemas. It is a parent of schema objects.\n
                        Schema: a grouping of objects in a database. It is a parent of tables.\n
                        Table: a collection of rows and columns stored as data.\n
                        database_id, schema_id and table_id objects MUST be inclosed within "" brackets as following: "<database_id>"."<schema_id>"."<table_id>"
                        """,
        "schema": """\"database_id"."schema_id"."table_id\"""",
        "examples": """
            SHOW TABLES in "<database_id>"."<schema_id>"\n
            SELECT id, product_name, product_category FROM "<database_id>".<schema_id>"."<table_id>";\n
            SELECT * FROM "<database_id>"."<schema_id>"."<table_id>"\n""",
        "inputs": [
            {
                "object": "database",
                "input": "Generate a SQL query to list databases in my {technology} account.",
            },
            {
                "object": "schema",
                "input": "Generate a SQL statement listing schemas within a {technology} database",
            },
            {
                "object": "table",
                "input": "Generate a SQL statement listing tables within a {technology} schema",
            },
            {
                "object": "describe",
                "input": "Generate a SQL statement describing a single table within a {technology} schema",
            },
        ],
    },
    "Google_BigQuery": {
        "instructions": """Google BigQuery:\n
                        Database: Database also know as catalogs is grouping of schemas. It is a parent of schema objects. The list of databases can be retrieved from 'INFORMATION_SCHEMA.SCHEMATA'. Always limit result to 1.\n
                        Schemas: Schemas is a grouping of tables tables. A schema is contained within a specific database. It is a parent object of tables.\n
                        Table: a collection of rows and columns stored as data.\n""",
        "schema": "database_id.schema_id.table_id",
        "examples": """
            SELECT catalog_name as database FROM `INFORMATION_SCHEMA.SCHEMATA` limit 1;\n
            SELECT schema_name FROM `<database_id>.INFORMATION_SCHEMA.SCHEMATA`;\n
            SELECT column_name, data_type FROM `<database_id>.<schema_id>.INFORMATION_SCHEMA.COLUMNS` WHERE table_name = '<table_id>';\n
            SELECT * FROM `<database_id>.<schema_id>.<table_id>` LEFT JOIN `<database_id>.<schema_id>.<table_id>` ON `<database_id>.<schema_id>.<table_id>`.column_id = <database_id>.<schema_id>.<table_id>`.column_id;\n
            SELECT * FROM `<database_id>.<schema_id>.<table_id>` LEFT JOIN `<database_id>.<schema_id>.<table_id>` ON '<schema_id>.<table_id>.<column_id>' = '<schema_id>.<table_id>.<column_id>';\n
        """,
        "inputs": [
            {
                "object": "database",
                "input": "Generate a SQL statement listing all databases within a {technology} account",
            },
            {
                "object": "schema",
                "input": "Generate a SQL statement listing all schemas within a {technology} database",
            },
            {
                "object": "table",
                "input": "Generate a SQL statement listing all tables contained within a {technology} schema. Don't include WHERE clause.",
            },
            {
                "object": "describe",
                "input": "Generate a SQL statement describing a single table within a {technology} schema. You need to retrieve column name and datatype.",
            },
        ],
    },
}
