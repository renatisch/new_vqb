// Payloads
export type QueryPayload = {
  technology: string;
  query: string;
}

export type InitialData = {
  technology: string;
  databases: string[];
  initialQuery?: string;
}

export type InitalQueryPayload = {
  technology: string;
}

// Responses
export type ValidateApiResponse = {
  is_query_valid: 'valid';
  description: string;
};

export type QueryObject = {
  query_type: string;
  query: string;
}

export type ExplainApiResponse = {
  query_description: 'string';
};

export type ApiResponse = {
  data_source: string;
  is_query_correct: string;
  initial_query: string;
  validated_query: string;
  query_description: string;
};