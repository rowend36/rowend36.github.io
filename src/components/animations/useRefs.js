import { useRef } from "react";

export default function useRefs(size) {
  const refs = useRef([]).current;
  const cbs = useRef([]).current;
  refs.length = size;
  if (cbs.length < size) {
    for (let i = cbs.length; i < size; i++) {
      refs[i] = { current: null };
      cbs[i] = (el) => (refs[i].current = el);
    }
  } else if (cbs.length > size) {
    cbs.length = size;
  }
  return [refs, cbs];
}
