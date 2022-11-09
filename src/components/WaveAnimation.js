import useCanvas from "../lib/useCanvas";

const WaveAnimation = ({ canvasWidth, canvasHeight }) => {
  const canvasRef = useCanvas(canvasWidth, canvasHeight);

  return <canvas ref={canvasRef} />;
};

export default WaveAnimation;
