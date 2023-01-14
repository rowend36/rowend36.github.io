import { useEffect, useRef } from "react";

export default function Canvas({ script, ...props }) {
  const ref = useRef();
  useEffect(
    function () {
      script.init(ref.current);
      return () => {
        script.dispose();
      };
    },
    [script]
  );
  return <canvas {...props} ref={ref} />;
}
