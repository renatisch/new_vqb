import { Query } from "../types/types";
import { endpoints } from "./endpoints";

export const api = {
  async getQuery(query: Query): Promise<string> {
    return "";
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