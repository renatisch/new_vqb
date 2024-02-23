import { createContext } from "react";

import { QueryDialogContextProps } from "../types/types";

export const QueryBuilderContext = createContext<QueryDialogContextProps>({
  nodes: [],
  setNodes: () => {},
  edges: [],
  setEdges: () => {},
  action: "",
  setAction: () => {},
  tables: [{ database: "", schema: "", tableName: "", columns: [] }],
  setTables: () => {},
  query: {
    primaryDatabase: "",
    primarySchema: "",
    primaryTable: "",
    primaryColumn: "",
    secondaryDatabase: "",
    secondarySchema: "",
    secondaryTable: "",
    secondaryColumn: "",
    action: "",
  },
  setQuery: () => {},
  editorQuery: "",
  setEditorQuery: () => {},
});