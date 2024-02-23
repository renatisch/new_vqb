import { areArraysEqual } from "@mui/base";
import React, { FunctionComponent, useCallback, useState, } from "react";
import { useQuery as useReactQuery, UseQueryResult } from "react-query";

export function component<P extends object>(fc: FunctionComponent<P>) {
  return React.memo(fc);
};

export type State<T> = [T, (val: T | undefined) => void];

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

export function useStateDomain<T>(): State<T | undefined>;
export function useStateDomain<T>(initValue: T, deps?: any[], domain?: (v: T) => T): State<T>;
export function useStateDomain<T>(initValue: T | undefined, deps?: any[], domain?: (v: T) => T | undefined): State<T | undefined>;
export function useStateDomain<S>(initValue: S | undefined = undefined, deps: any[] = [], domain: (value: S) => S = a => a): State<S | undefined> {
  const [state, setState] = useState({ value: initValue, deps });
  const setter = useCallback((value: S | undefined) => setState(current => ({ ...current, value })), []);

  if (!areArraysEqual(state.deps, deps)) {
    state.deps = deps;
    state.value = initValue;
  }
  if (state.value) {
    state.value = domain(state.value);
  }

  return [state.value, setter];
}