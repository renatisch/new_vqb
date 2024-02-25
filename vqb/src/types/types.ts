import { Dispatch, SetStateAction } from "react";
import { Node, Edge } from "reactflow";

export type Column = {
  id: string;
  objectType: "column";
  name: string;
  dataType: "integer";
  selected: boolean;
}

export type ColumnQuery = {
  name: string;
  dataType: "integer" | "string" | "unknown";
}

export type TableQuery = {
  dbName: string;
  schemaName: string;
  tableName: string;
  columns: ColumnQuery[];
}

export type TreeProps = {
  id: string;
  name: string;
  objectType: string;
  dataType?: string;
  children?: TreeProps[];
  selected?: boolean;
  expanded?: boolean;
};

export type handleSelectTableProps = {
  tableName: string;
  columns: any;
};

export type Table = {
  database?: string;
  schema?: string;
  tableName: string;
  columns?: TreeProps[];
  expanded?: boolean;
};
export type ChartTable = {
  database: string;
  schema: string;
  tableName: string;
  columns: Column[];
  handleType: string;
  expanded?: boolean;
};

export type SelectQuery = {
  type: string;
  database?: string;
  schema?: string;
  table?: string;
  columns?: TreeProps[];
};

export type Query = {
  primaryDatabase: string;
  primarySchema: string;
  primaryTable: string;
  primaryColumn: string;
  secondaryDatabase: string;
  secondarySchema: string;
  secondaryTable: string;
  secondaryColumn: string;
  action: string;
};

export type QueryDialogContextProps = {
  editorQuery: string;
  setEditorQuery: Dispatch<SetStateAction<string>>;
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  edges: Edge[];
  action: string;
  setAction: Dispatch<SetStateAction<string>>;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  tables: Table[];
  setTables: Dispatch<SetStateAction<Table[]>>;
  query: Query;
  setQuery: Dispatch<SetStateAction<Query>>;
};

export type FullyQualifiedTableName = {
  databaseName?: string;
  schemaName?: string;
  tableName?: string;
  columns?: [];
};

export type FullTableName = {
  database?: string;
  schema?: string;
  tableName: string;
  columns?: TreeProps[];
  expanded?: boolean;
};
