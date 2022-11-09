import { useEffect, useState, RefObject } from "react";

function useClientWidthHeight(ref) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const setClientWidthHeight = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
      }
    };
    setClientWidthHeight();

    window.addEventListener("resize", setClientWidthHeight);

    return () => {
      window.removeEventListener("resize", setClientWidthHeight);
    };
  }, []);

  const clientRects = { width, height };
  return clientRects;
}

export default useClientWidthHeight;
