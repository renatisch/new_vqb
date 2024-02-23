import { selectMock } from "../constants/mocks/selectMocks";
import { joinMock } from "../constants/mocks/joinMock";
import { validateMock } from "../constants/mocks/validateMock";
import { explainMock } from "../constants/mocks/explainMock";
import { QueryPayload, ValidateApiResponse } from "../types/api";
import { axiosInstance } from "../logic";

const mockedEndpoints = {
  queries: {
    async join(payload: any) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return joinMock;
    },
    async select(payload: any) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return selectMock;
    },
    async validate(payload: QueryPayload): Promise<ValidateApiResponse> {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return validateMock;
    },
    async explain(payload: QueryPayload) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return explainMock;
    },
  }
}

const lifeEndpoints = {
  queries: {
    join: (payload: any) => axiosInstance.post<any>("/queries/join", payload).then(data => data.data),
    select: (payload: any) => axiosInstance.post("/queries/select", payload).then(data => data.data),
    validate: (payload: QueryPayload) => axiosInstance.post("/queries/validate", payload).then(data => data.data),
    explain: (payload: QueryPayload) => axiosInstance.post("/queries/explain", payload).then(data => data.data)
  }
};

export const endpoints = lifeEndpoints;