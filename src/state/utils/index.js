import {useEffect, useRef} from "react";
export { default as createReducer } from "./createReducer";
export { default as fetch } from "./fetch";

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}