instructions = {
    "Snowflake": {
        "definition": """Snowflake is a data ware house technology.\n
                Snowflake has the following database object relationships:\n
                1. Database: a grouping of schemas. It is a parent of schema objects.\n
                2. Schema: a grouping of objects in a database. It is a parent of tables.\n
                3. Table: a collection of rows and columns stored as data.\n""",
        "rules": """
                1. Enclose Object Names: Enclose database objects (database, schema, table) in queries within double quotes ("") like "<database>"."<schema>"."<table>".\n
                2. Fully Qualified Names: Queries must have fully qualified names in the format "<database_id>"."<schema_id>"."<table_id>".\n
                Structure Format: Follow the structure format "<database>.<schema>.<table>".\n
                """,
        "valid_examples": """Example of a valid Snowflake SQL query:\n
                    SELECT col1 FROM \"db1\".\"my_schema\".\"users\" LEFT JOIN \"db1\".\"my_schema\".\"orders\" ON \"db1\".\"my_schema\".\"users\".vendor_id = \"db1\".\"my_schema\".\"orders\".vendor_id;\n""",
        "invalid_examples": """Example of invalid query:\n
                SELECT users, orders FROM \"old\".\"users\";
                SELECT col1 FROM db1.my_schema.users LEFT JOIN \"db1\".\"my_schema\" ON \"db1\".\"my_schema\".\"users\".vendor_id = \"db1\".\"my_schema\".\"orders\"."\vendor_id\";""",
    },
    "Databricks": {
        "definition": """"Databricks:\n
                        Catalog: a grouping of schemas. It is a parent of schema objects.\n
                        Schema: a grouping of objects in a catalog. It is a parent of tables.\n
                        Table: a collection of rows and columns stored as data.\n""",
        "rules": """
                2. Fully Qualified Names: Queries must have fully qualified names in the format <catalog_id>.<schema_id>.<table_id>.\n
                Structure Format: Follow the structure format <catalog_id>.<schema>.<table>.\n
                """,
        "valid_examples": """Examples of a valid Databricks SQL query:\n
                    SHOW TABLES in <database_id>.<schema_id>;\n
                    SELECT * FROM <database_id>.<schema_id>.<table_id>;""",
        "invalid_examples": """Example of invalid query:\n
                SELECT * FROM \"<schema_id>\".\"<table_id>\";""",
    },
    "Google_BigQuery": {
        "definition": """"Google BigQuery:\n
                        Project: project also know as catalogs is grouping of schemas. It is a parent of schema objects.\n
                        Schemas: Schemas is a grouping of tables tables. A schema is contained within a specific database. It is a parent object of tables.\n
                        Table: a collection of rows and columns stored as data.\n""",
        "rules": """
                1. Enclose Object Names: Enclose all database objects (database, schema, table) in queries within a single pair of backticks (``) like `<project_id>.<schema_id>.<table_id>;`.\n
                2. Fully Qualified Names: Queries must have fully qualified names in the format `<project_id>.<schema_id>.<table_id>`.\n
                Structure Format: Follow the structure format <project_id>.<schema_id>.<table_id>.\n
                """,
        "valid_examples": """Examples of a valid Google BigQuery SQL query:\n
                    SELECT catalog_name as database FROM `INFORMATION_SCHEMA.SCHEMATA` limit 1;\n
                    SELECT schema_name FROM `<project_id>.INFORMATION_SCHEMA.SCHEMATA`;\n
                    SELECT column_name, data_type FROM `<project_id>.<schema_id>.INFORMATION_SCHEMA.COLUMNS` WHERE table_name = '<table_id>';\n
                    SELECT * FROM `<project_id>.<schema_id>.<table_id>` LEFT JOIN `<project_id>.<schema_id>.<table_id>` ON `<project_id>.<schema_id>.<table_id>`.column_id = <project_id>.<schema_id>.<table_id>`.column_id;\n
                    SELECT * FROM `<project_id>.<schema_id>.<table_id>` LEFT JOIN `<project_id>.<schema_id>.<table_id>` ON '<schema_id>.<table_id>.<column_id>' = '<schema_id>.<table_id>.<column_id>';\n""",
        "invalid_examples": """Example of invalid query:\n
                SELECT * FROM `<project_id>.<schema_id>.<table_id>`;""",
    },
}
