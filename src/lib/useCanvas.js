import { RefObject, useRef, useEffect } from "react";

const useCanvas = (canvasWidth, canvasHeight, animate) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio ?? 1;

      if (canvas && ctx) {
        canvas.style.width = canvasWidth + "px";
        canvas.style.height = canvasHeight + "px";

        canvas.width = canvasWidth * devicePixelRatio;
        canvas.height = canvasHeight * devicePixelRatio;

        ctx.scale(devicePixelRatio, devicePixelRatio);
      }
    };
    setCanvas();

    if (ctx) {
      animate(ctx);
    }
    console.log("canvas", canvas);
  }, [canvasWidth, canvasHeight]);

  return <canvas ref={canvasRef} />;
};

export default useCanvas;
