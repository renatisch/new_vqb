technologies = {
    "Databricks": {
        "instructions": """Databricks:\n
                        Catalog: a grouping of databases. It is a parent of database or schema objects.\n
                        Database or schema: a grouping of objects in a catalog.\n
                        It is a parent of tables.\n
                        Table: a collection of rows and columns stored as data files in object storage.\n""",
        "schema": "catalog_id.schema_id.object_id",
        "examples": """
            SHOW TABLES in <catalog_id>.<schema_id>\n
            SELECT * FROM <catalog_id>.<schema_id>.<table_id>""",
        "inputs": [
            {
                "object": "catalog",
                "input": "Generate a SQL query to list catalogs in my {technology} account.",
            },
            {
                "object": "schema",
                "input": "Generate a SQL statement listing schemas within a {technology} catalog",
            },
            {
                "object": "table",
                "input": "Generate a SQL statement listing tables within a {technology} schema.",
            },
            {
                "object": "describe",
                "input": "Generate a SQL statement describing a single table within a {technology} schema",
            },
        ],
    },
    "Snowflake": {
        "instructions": """Snowflake:\n
                        Database: a grouping of schemas. It is a parent of schema objects.\n
                        Schema: a grouping of objects in a database.\n
                        It is a parent of tables.\n
                        Table: a collection of rows and columns stored as data.\n""",
        "schema": "database_id.schema_id.table_id",
        "examples": """
            SHOW TABLES in <database_id>.<schema_id>\n
            SELECT * FROM <database_id>.<schema_id>.<table_id>""",
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
                        Schemas: Schemas are top-level containers that are used to organize tables. A schema is contained within a specific project. It is a parent of tables.\n
                        Table: a collection of rows and columns stored as data.\n""",
        "schema": "project_id.schema_id.table_name",
        "examples": """
            SELECT schema_name FROM `<project_id>.INFORMATION_SCHEMA.SCHEMATA`;
            SELECT column_name, data_type FROM `<project_id>.<schema_id>.INFORMATION_SCHEMA.COLUMNS` WHERE table_name = '<table_id>';
            SELECT * FROM `<project_id>.<schema_id>.<table_id>` LEFT JOIN `<project_id>.<schema_id>.<table_id>` ON '<schema_id>.<table_id>.<column_id>' = '<schema_id>.<table_id>.<column_id>';
        """,
        "inputs": [
            {
                "object": "schema",
                "input": "Generate a SQL statement listing all schemas within a {technology} project",
            },
            {
                "object": "table",
                "input": "Generate a SQL statement listing all tables contained within a {technology} schema. Don't include WHERE clause.",
            },
            {
                "object": "describe",
                "input": "Generate a SQL statement describing a single table within a {technology} schema",
            },
        ],
    },
}
