import { ColumnQuery, DbQueryList, InitialState } from "./types";

interface HostFunctions {
  getInitialState: () => Promise<InitialState>;
  getDbList: () => Promise<string[]>;
  getSchemas: (dbName: string) => Promise<string[]>;
  getTables: (dbName: string, schmaName: string) => Promise<string[]>;
  getColumns: (dbName: string, schemaName: string, tableName: string) => Promise<ColumnQuery[]>;
  setQueries: (dbQueries: DbQueryList) => Promise<void>;
  onOk: (query: string) => void;
  onCancel: () => void;
}

// Extend the Window interface
declare global {
  interface Window {
    hostFunctions?: HostFunctions;
  }
}

export { };