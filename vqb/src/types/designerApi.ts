export interface QueryCommands {
    database: string;
    schema: string;
    table: string;
    describe: string;
}

export type QueryTuple = ["queries", QueryCommands];

// If you need to represent the entire structure as an array of such tuples, you can define it like this:
export type DbStructQueries = QueryTuple[];

// Base interface for common properties
export interface NodeBase {
    id: string;
    name: string;
    objectType: 'database' | 'schema' | 'table' | 'column';
    expanded: boolean;
    dataType: string;
    selected: false;
  }
  
  // Interface for a Column, which does not have children
  export interface ColumnNode extends NodeBase {
    objectType: 'column';
    // Columns do not have children, so no children property here
  }
  
  // Interface for nodes that can have children (Database, Schema, Table)
  export interface ParentNode extends NodeBase {
    children: TreeNode[]; // This will be an array of any node that fits the TreeNode type
  }
  
  // Union type for any node in the tree
  export type TreeNode = ParentNode | ColumnNode;
  
  // Type for the root array containing the database nodes
  export type DbStructureResult = ParentNode[];


/*

 // Original simpletons
export interface DbStructQueries {
    dummy: string;
}

export interface DbStructureResult {
    dummy: string;
}
*/

export const MockDbStructureRequest: DbStructQueries = [
    [
      "queries",
      {
        "database": "SHOW DATABASES;",
        "schema": "SHOW SCHEMAS in <database_name>;",
        "table": "SHOW TABLES in <database_name>.<schema_name>;",
        "describe": "DESCRIBE TABLE <database_name>.<schema_name>.<table_name>;"
      }
    ]
  ]

export const MockDbStructureResponse: DbStructureResult = [
	{
	   "id":"DYNAMODB01",
	   "name":"DYNAMODB01",
	   "objectType":"database",
	   "expanded":false,
	   "dataType":"",
	   "selected":false,
	   "children":[
		  {
			 "id":"INFORMATION_SCHEMA",
			 "name":"INFORMATION_SCHEMA",
			 "objectType":"schema",
			 "expanded":false,
			 "dataType":"",
			 "selected":false,
			 "children":[
				
			 ]
		  },
		  {
			 "id":"dynamo_canceling",
			 "name":"dynamo_canceling",
			 "objectType":"schema",
			 "expanded":false,
			 "dataType":"",
			 "selected":false,
			 "children":[
				{
				   "id":"PHA_TEST_TABLE",
				   "name":"PHA_TEST_TABLE",
				   "objectType":"table",
				   "expanded":false,
				   "dataType":"",
				   "selected":false,
				   "children":[
					  {
						 "id":"C1",
						 "name":"C1",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(16777216)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C2",
						 "name":"C2",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(16777216)",
						 "selected":false,
						 "children":[
							
						 ]
					  }
				   ]
				},
				{
				   "id":"jcu_test_table",
				   "name":"jcu_test_table",
				   "objectType":"table",
				   "expanded":false,
				   "dataType":"",
				   "selected":false,
				   "children":[
					  {
						 "id":"Field1",
						 "name":"Field1",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(10,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"Field2",
						 "name":"Field2",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(6)",
						 "selected":false,
						 "children":[
							
						 ]
					  }
				   ]
				},
				{
				   "id":"ts_test_bulk",
				   "name":"ts_test_bulk",
				   "objectType":"table",
				   "expanded":false,
				   "dataType":"",
				   "selected":false,
				   "children":[
					  {
						 "id":"ID",
						 "name":"ID",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(10,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"text",
						 "name":"text",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(200)",
						 "selected":false,
						 "children":[
							
						 ]
					  }
				   ]
				},
				{
				   "id":"ts_test_indb",
				   "name":"ts_test_indb",
				   "objectType":"table",
				   "expanded":false,
				   "dataType":"",
				   "selected":false,
				   "children":[
					  {
						 "id":"C_CUSTOMER_SK",
						 "name":"C_CUSTOMER_SK",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(38,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_CUSTOMER_ID",
						 "name":"C_CUSTOMER_ID",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(16)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_CURRENT_CDEMO_SK",
						 "name":"C_CURRENT_CDEMO_SK",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(38,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_CURRENT_HDEMO_SK",
						 "name":"C_CURRENT_HDEMO_SK",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(38,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_CURRENT_ADDR_SK",
						 "name":"C_CURRENT_ADDR_SK",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(38,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_FIRST_SHIPTO_DATE_SK",
						 "name":"C_FIRST_SHIPTO_DATE_SK",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(38,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_FIRST_SALES_DATE_SK",
						 "name":"C_FIRST_SALES_DATE_SK",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(38,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_SALUTATION",
						 "name":"C_SALUTATION",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(10)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_FIRST_NAME",
						 "name":"C_FIRST_NAME",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(20)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_LAST_NAME",
						 "name":"C_LAST_NAME",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(30)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_PREFERRED_CUST_FLAG",
						 "name":"C_PREFERRED_CUST_FLAG",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(1)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_BIRTH_DAY",
						 "name":"C_BIRTH_DAY",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(38,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_BIRTH_MONTH",
						 "name":"C_BIRTH_MONTH",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(38,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_BIRTH_YEAR",
						 "name":"C_BIRTH_YEAR",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(38,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_BIRTH_COUNTRY",
						 "name":"C_BIRTH_COUNTRY",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(20)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_LOGIN",
						 "name":"C_LOGIN",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(13)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_EMAIL_ADDRESS",
						 "name":"C_EMAIL_ADDRESS",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(50)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"C_LAST_REVIEW_DATE",
						 "name":"C_LAST_REVIEW_DATE",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(10)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_ADDRESS_SK",
						 "name":"CA_ADDRESS_SK",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(38,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_ADDRESS_ID",
						 "name":"CA_ADDRESS_ID",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(16)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_STREET_NUMBER",
						 "name":"CA_STREET_NUMBER",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(10)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_STREET_NAME",
						 "name":"CA_STREET_NAME",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(60)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_STREET_TYPE",
						 "name":"CA_STREET_TYPE",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(15)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_SUITE_NUMBER",
						 "name":"CA_SUITE_NUMBER",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(10)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_CITY",
						 "name":"CA_CITY",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(60)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_COUNTY",
						 "name":"CA_COUNTY",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(30)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_STATE",
						 "name":"CA_STATE",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(2)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_ZIP",
						 "name":"CA_ZIP",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(10)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_COUNTRY",
						 "name":"CA_COUNTRY",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(20)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_GMT_OFFSET",
						 "name":"CA_GMT_OFFSET",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(5,2)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"CA_LOCATION_TYPE",
						 "name":"CA_LOCATION_TYPE",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(20)",
						 "selected":false,
						 "children":[
							
						 ]
					  }
				   ]
				},
				{
				   "id":"ts_test_spike",
				   "name":"ts_test_spike",
				   "objectType":"table",
				   "expanded":false,
				   "dataType":"",
				   "selected":false,
				   "children":[
					  {
						 "id":"ID",
						 "name":"ID",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(38,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"text",
						 "name":"text",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(200)",
						 "selected":false,
						 "children":[
							
						 ]
					  }
				   ]
				},
				{
				   "id":"ts_test_table",
				   "name":"ts_test_table",
				   "objectType":"table",
				   "expanded":false,
				   "dataType":"",
				   "selected":false,
				   "children":[
					  {
						 "id":"ID",
						 "name":"ID",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"NUMBER(10,0)",
						 "selected":false,
						 "children":[
							
						 ]
					  },
					  {
						 "id":"text",
						 "name":"text",
						 "objectType":"column",
						 "expanded":false,
						 "dataType":"VARCHAR(200)",
						 "selected":false,
						 "children":[
							
						 ]
					  }
				   ]
				}
			 ]
		  }
	   ]
	},
	{
	   "id":"SNOWFLAKE",
	   "name":"SNOWFLAKE",
	   "objectType":"database",
	   "expanded":false,
	   "dataType":"",
	   "selected":false,
	   "children":[
		  {
			 "id":"ALERT",
			 "name":"ALERT",
			 "objectType":"schema",
			 "expanded":false,
			 "dataType":"",
			 "selected":false,
			 "children":[
				
			 ]
		  },
		  {
			 "id":"CORE",
			 "name":"CORE",
			 "objectType":"schema",
			 "expanded":false,
			 "dataType":"",
			 "selected":false,
			 "children":[
				
			 ]
		  },
		  {
			 "id":"CORTEX",
			 "name":"CORTEX",
			 "objectType":"schema",
			 "expanded":false,
			 "dataType":"",
			 "selected":false,
			 "children":[
				
			 ]
		  },
		  {
			 "id":"INFORMATION_SCHEMA",
			 "name":"INFORMATION_SCHEMA",
			 "objectType":"schema",
			 "expanded":false,
			 "dataType":"",
			 "selected":false,
			 "children":[
				
			 ]
		  },
		  {
			 "id":"ML",
			 "name":"ML",
			 "objectType":"schema",
			 "expanded":false,
			 "dataType":"",
			 "selected":false,
			 "children":[
				
			 ]
		  }
	   ]
	}
 ]


// mocked 
export const getDbStructureMock = async (queries: DbStructQueries): Promise<DbStructureResult> => {
    return MockDbStructureResponse;
}
