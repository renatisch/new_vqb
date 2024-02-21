export type ValidateApiResponse = {
  is_query_valid: string;
  valid_query: string;
};

export type ApiResponse = {
  data_source: string;
  is_query_correct: string;
  initial_query: string;
  validated_query: string;
  query_description: string;
};