import { SqlLanguage, format } from "sql-formatter";

const languages: SqlLanguage[] = ["bigquery", "db2i", "db2", "hive", "mariadb", "mysql", "n1ql", "plsql", "postgresql", "redshift", "singlestoredb", "snowflake", "spark", "sqlite", "transactsql", "trino", "tsql", "sql"];

export const utils = {
  formatSqlQuery: (query: string, technology?: string): string => {
    if (!technology) return query;
    const tlc = technology.toLowerCase();
    const language = languages.find(ln => tlc.includes(ln));
    if (!language) return query;
    try {
      return format(query, { language });
    } catch (e) {
      return query;
    }
  }
}