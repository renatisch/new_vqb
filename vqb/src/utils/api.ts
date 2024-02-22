import { QueryPayload } from "../types/api";
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
  async validateQuery(query: QueryPayload): Promise<string | undefined> {
    const response = await endpoints.queries.validate(query);
    if (response.is_query_valid === 'valid') return undefined;
    return response.description;
  },

  async explainQuery(query: QueryPayload): Promise<string> {
    const explanation = await endpoints.queries.explain(query);
    return explanation.query_description;
  }
}