import { RefObject } from "react";
import useCanvas from "../lib/useCanvas";

const Test = ({ canvasWidth, canvasHeight }) => {
  const fillBackground = (ctx) => {
    ctx.fillStyle = "rgb(31, 31, 36)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, fillBackground);

  return <canvas ref={canvasRef} />;
};

export default Test;
