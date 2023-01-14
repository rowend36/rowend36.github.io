import { useMemo } from "react";

export default function useLogger(...args) {
  useMemo(function () {
    console.log(...args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, args);
}

export function useStateLogger(state, states) {
  const map = useMemo(
    () => Object.fromEntries(Object.keys(states).map((e) => [states[e], e])),
    [states]
  );
  useLogger("State: ", map[state]);
}
