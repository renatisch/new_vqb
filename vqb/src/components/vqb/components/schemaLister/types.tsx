import { Node, Edge } from "reactflow";
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
  database: string | undefined;
  schema: string | undefined;
  tableName: string;
  columns: [] | TreeProps[] | undefined;
  expanded?: boolean;
};
export type ChartTable = {
  database: string;
  schema: string;
  tableName: string;
  columns: [];
  handleType: string;
  expanded?: boolean;
};

export type SelectQuery = {
  type: string;
  database: string | undefined;
  schema: string | undefined;
  table: string | undefined;
  columns?: [] | TreeProps[];
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
  setEditorQuery: React.Dispatch<React.SetStateAction<string>>;
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  action: string;
  setAction: React.Dispatch<React.SetStateAction<string>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  query: Query;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
  queryLoading: boolean;
  setQueryLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FullyQualifiedTableName = {
  databaseName?: string;
  schemaName?: string;
  tableName?: string;
  columns?: [];
};

export type FullTableName = {
  database: string | undefined;
  schema: string | undefined;
  tableName: string;
  columns: [] | TreeProps[] | undefined;
  expanded?: boolean;
};
