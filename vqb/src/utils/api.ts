import { ColumnQuery, Query, Table } from "../types/types";
import { endpoints } from "./endpoints";

export const api = {
  async getDbList() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return ["DB 1", "DB 2"];
  },

  async getSchemaList(dbName: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return ["renats_schema"];
  },

  async getTableList(dbName: string, schemaName: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return ["Orders", "Payments"];
  },

  async getColumnList(dbName: string, schemaName: string, tableName: string): Promise<ColumnQuery[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (tableName === "Orders") {
      return [
        {
          name: "id",
          dataType: "integer",
        },
        {
          name: "product_name",
          dataType: "string",
        },
        {
          name: "product_category",
          dataType: "string",
        },
        {
          name: "product_price",
          dataType: "integer",
        },
        {
          name: "order_type",
          dataType: "string",
        },
      ];
    }

    return [
      {
        name: "order_id",
        dataType: "integer",
      },
      {
        name: "payment_type",
        dataType: "string",
      },
      {
        name: "product",
        dataType: "string",
      },
      {
        name: "delivery_address",
        dataType: "string",
      },
    ];
  },

  async getQuery(queryObject: Query, tables: Table[], technology: string): Promise<string> {
    const formatTable = (table: Table) => {
      const columns = table.columns?.filter((column) => {
        return column.selected;
      });
      const selectedColumns = columns?.map((column) => {
        return column.name;
      });
      return {
        technology,
        database: table.database,
        table_schema: table.schema,
        table: table.tableName,
        columns: selectedColumns,
      };
    };
    if (queryObject.action.length > 0) {
      const payload = {
        technology,
        join_type: "left",
        databases: [queryObject.primaryDatabase, queryObject.secondaryDatabase],
        schemas: [queryObject.primarySchema, queryObject.secondarySchema],
        tables: [queryObject.primaryTable, queryObject.secondaryTable],
        left_table_column: queryObject.primaryColumn,
        right_table_column: queryObject.secondaryColumn,
      };
      const response = await endpoints.queries.join(payload);
      return response.query;
    } else {
      const payload = formatTable(tables[0]);
      const response = await endpoints.queries.select(payload);
      return response.query;
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