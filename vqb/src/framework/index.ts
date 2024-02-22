import React, { FunctionComponent } from "react";
import { useQuery as useReactQuery, UseQueryResult } from "react-query";

export function component<P extends object>(fc: FunctionComponent<P>) {
  return React.memo(fc);
};

export type OptionalArray<T extends any[]> = {
  [K in keyof T]: T[K] | undefined;
};

export function useQuery<A extends any[], R>(fc: (...args: A) => Promise<R>, ...args: OptionalArray<A>): UseQueryResult<R> {
  return useReactQuery({
    queryFn: () => fc(...args as A),
    ...args,
    queryKey: [fc.name, ...args],
    enabled: !args.includes(undefined),
  });
}