import { columnsMock } from "../constants/mocks/columnMock";
import { InitialData } from "../types/api";
import { ColumnQuery, DbQueryList, InitialState, Query, Table } from "../types/types";
import { endpoints } from "./endpoints";

export const api = {
  async getInitialData(): Promise<InitialData> {
    let technology: string;
    let initialQuery: string | undefined;
    let initState: InitialState;
    if (window.hostFunctions) {
      initState = await window.hostFunctions.getInitialState();
      technology = initState.technology;
      initialQuery = initState.query.trim().length === 0 ? initState.query : undefined;
    } else {
      technology = "Snowflake";
      initialQuery = undefined;
    }
    const initialQueries = await endpoints.queries.initial({ technology });
    await window.hostFunctions?.setQueries(initialQueries);
    let databases: string[];
    if (window.hostFunctions) {
      databases = await window.hostFunctions.getDbList();
    } else {
      databases = ["DB 1"];
    }
    return { technology, databases, initialQuery };
  },

  async setQueries(dbQueries: DbQueryList) {
    if (window.hostFunctions) {
      return await window.hostFunctions.setQueries(dbQueries);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  },

  async getSchemaList(dbName: string): Promise<string[]> {
    if (window.hostFunctions) {
      return window.hostFunctions.getSchemas(dbName);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    return ["renats_schema"];
  },

  async getTableList(dbName: string, schemaName: string): Promise<string[]> {
    if (window.hostFunctions) {
      return window.hostFunctions.getTables(dbName, schemaName);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    return ["Orders", "Payments"];
  },

  async getColumnList(dbName: string, schemaName: string, tableName: string): Promise<ColumnQuery[]> {
    if (window.hostFunctions) {
      return window.hostFunctions.getColumns(dbName, schemaName, tableName);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    return columnsMock.find(t => t.tableName === tableName)?.columns || [];
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
  },

  /**
   * @param technology Technlogy type
   * @param query SQL Query
   * @returns Query converted to given technology
   */
  async convertQuery(technology: string, query: string): Promise<string> {
    const convertion = await endpoints.queries.convert({ technology, query });
    return convertion.query;
  }
}