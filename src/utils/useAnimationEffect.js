import { useRef, useState, useEffect } from "react";

export default function useAnimationEffect(func, interval) {
  const m = useRef({ func, execute: false, timeout: 0 }).current;
  const [, _triggerUpdate] = useState();

  if (m.execute) {
    m.execute = false;
    func();
  }
  useEffect(function () {
    if (!m.timeout && interval > -1) {
      m.timeout = setTimeout(() => {
        m.execute = true;
        m.timeout = null;
        _triggerUpdate({});
      }, interval);
      return () => {
        clearTimeout(m.timeout);
        m.timeout = null;
      };
    }
  });
}
