import { format } from "sql-formatter";

export const utils = {
  formatSqlQuery: (query: string): string => {
    return format(query, { language: "snowflake" });
  }
}