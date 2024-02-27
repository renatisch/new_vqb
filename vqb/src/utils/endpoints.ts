import { selectMock } from "../constants/mocks/selectMocks";
import { joinMock } from "../constants/mocks/joinMock";
import { validateMock } from "../constants/mocks/validateMock";
import { explainMock } from "../constants/mocks/explainMock";
import { InitalQueryPayload, QueryObject, QueryPayload, ValidateApiResponse } from "../types/api";
import { axiosInstance } from "../logic";

type InitialQueryResponse = {
  technology: string;
  queries: QueryObject[];
}

const lifeEndpoints = {
  queries: {
    join: (payload: any) => axiosInstance.post<any>("/queries/join", payload).then<QueryObject>(data => data.data),
    select: (payload: any) => axiosInstance.post("/queries/select", payload).then(data => data.data),
    validate: (payload: QueryPayload) => axiosInstance.post("/queries/validate", payload).then(data => data.data),
    explain: (payload: QueryPayload) => axiosInstance.post("/queries/explain", payload).then(data => data.data),
    convert: (payload: QueryPayload) => axiosInstance.post("/queries/convert", payload).then(data => data.data),
    initial: (payload: InitalQueryPayload) => axiosInstance.get("/queries/initial", { params: payload }).then<InitialQueryResponse>(data => data.data)
  }
};

const mockedEndpoints: typeof lifeEndpoints = {
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
    async convert(payload: QueryPayload) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { query: "SELECT * FROM alteryx.staff.product_department JOIN alteryx.staff.offices ON location = location WHERE alteryx.staff.product_department.location = 'Prague';" };
    },
    async initial(payload: InitalQueryPayload) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {} as any;
    }
  }
}

export const endpoints = lifeEndpoints;