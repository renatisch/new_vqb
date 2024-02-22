import { instance } from "../logic";

export const api = {
  queries: {
    join(payload: any) {
      return instance.post<any>("/queries/join", payload)
    },

    select(payload: any) {
      return instance.post("/queries/select", payload);
    },

    validate(payload: any) {
      return instance.post("/queries/validate", payload);
    }
  }
}