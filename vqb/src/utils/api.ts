import { Query, Table } from "../types/types";
import { endpoints } from "./endpoints";

export const api = {
  async getQuery(queryObject: Query, tables: Table[]): Promise<string> {
    const formatTable = (table: Table) => {
      const columns = table.columns?.filter((column) => {
        return column.selected;
      });
      const selectedColumns = columns?.map((column) => {
        return column.name;
      });
      return {
        technology: "Snowflake",
        database: table.database,
        table_schema: table.schema,
        table: table.tableName,
        columns: selectedColumns,
      };
    };
    const technology = "Snowflake";
    if (queryObject.action.length > 0) {
      const payload = {
        technology: technology,
        join_type: "left",
        databases: [queryObject.primaryDatabase, queryObject.secondaryDatabase],
        schemas: [queryObject.primarySchema, queryObject.secondarySchema],
        tables: [queryObject.primaryTable, queryObject.secondaryTable],
        left_table_column: queryObject.primaryColumn,
        right_table_column: queryObject.secondaryColumn,
      };
      const response = await endpoints.queries.join(payload)
          const recievedQuery = response["queries"]["query"];
          // const formattedQuery = format(response.data["queries"]["query"], {
          //   language: "snowflake",
          //   keywordCase: "upper",
          // });
          return recievedQuery;
    } else {
      const payload = formatTable(tables[0]);
      const response = await endpoints.queries.select(payload)
          const recievedQuery = response["query"];
          // const formattedQuery = format(response.data["query"], {
          //   language: "snowflake",
          //   keywordCase: "upper",
          // });
          return recievedQuery;
    }
  },

  /**
   * Validatge sql query and return error message
   * @param query Query
   * @returns Error message. If the query is valid, return undefined
   */
  async validateQuery(technology: string, query: string): Promise<string | undefined> {
    const response = await endpoints.queries.validate({ technology, query });
    if (response.is_query_valid === 'valid') return undefined;
    return response.description;
  },

  /**
   * @param technology Technlogy type
   * @param query SQL Query
   * @returns String explanation of the query
   */
  async explainQuery(technology: string, query: string): Promise<string> {
    const explanation = await endpoints.queries.explain({ technology, query });
    return explanation.query_description;
  }
}