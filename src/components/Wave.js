import React, { useEffect } from "react";
import { useRef } from "react";

// const getPixelRatio = (context) => {
//   var backingStore =
//     context.backingStorePixelRatio ||
//     context.webkitBackingStorePixelRatio ||
//     context.mozBackingStorePixelRatio ||
//     context.msBackingStorePixelRatio ||
//     context.oBackingStorePixelRatio ||
//     context.backingStorePixelRatio ||
//     1;
//   return (window.devicePixelRatio || 1) / backingStore;
// };

class Point {
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.1;
    this.cur = index;
    this.max = Math.random() * 10 + 100;
    console.log(this.x, this.y, this.cur, this.max);
  }

  // update 함수를 실행하면 sin 함수 때문에 아래위로 움직임
  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
    //console.log(this.cur, this.y);
  }
}

const Wave = () => {
  let ref = useRef();

  useEffect(() => {
    let canvas = ref.current;
    let context = canvas.getContext("2d");

    //let ratio = getPixelRatio(context);
    //let width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    //let height = getComputedStyle(canvas)
    //  .getPropertyValue("height")
    //  .slice(0, -2);

    //canvas.width = width * ratio;
    //canvas.height = height * ratio;
    //canvas.style.width = `${width}px`;
    //canvas.style.height = `${height}px`;

    function resize(stageWidth, stageHeight) {
      /* 중간을 각각 넓이, 높이를 2로 나눈 값 지정 */
      let centerX = stageWidth / 2;
      let centerY = stageHeight / 1.3;

      /* 추가 : 각 점의 간격을 전체넓이 / 점개수 -1  */
      let pointGap = stageWidth / totalPoints - 1;
      return [centerX, centerY, pointGap];
    }

    let requestId;
    let j = 0;
    let colors = [
      "rgba(0,199,235,0.4)",
      "rgba(0,146,199,0.4)",
      "rgba(0,87,158,0.4)",
    ];

    let points = [];
    const totalPoints = 6;
    const totalWaves = 3;
    let stageWidth = 1000;
    let stageHeight = 200;
    let resizeRes = resize(stageWidth, stageHeight);
    let centerX = resizeRes[0];
    let centerY = resizeRes[1];
    let pointGap = resizeRes[2];
    //console.log(this.points);

    for (let i = 0; i < totalPoints; i++) {
      let point = new Point(0 + i, pointGap * i, centerY);
      points[i] = point;
    }
    console.log("points", points);

    //const wave = new Wave(0, 6, colors[0]);
    //wave.resize(1000, 500);

    const render = () => {
      //et waveGroupInstance = new WaveGroupApp(canvas, context, ref);
      // waveGroupInstance.play();

      context.clearRect(0, 0, canvas.width, canvas.height);
      //wave.draw(context);

      //context.beginPath();
      //context.arc(
      //  canvas.width / 4 + 2,
      //  canvas.height / 4,
      //  (canvas.width / 4) * Math.abs(Math.cos(j)),
      //  0,
      //  2 * Math.PI
      //);
      //context.fill();
      //context.closePath();

      // context.beginPath();
      // context.lineTo(0, 0);
      // context.lineTo(stageWidth * Math.abs(Math.cos(j)), 0);
      // context.lineTo(
      //   stageWidth * Math.abs(Math.cos(j)),
      //   stageHeight * Math.abs(Math.cos(j))
      // );
      // context.lineTo(0, stageHeight * Math.abs(Math.cos(j)));
      // context.fill();
      // context.closePath();

      context.beginPath();

      let prevX = points[0].x;
      let prevY = points[0].y;

      // 현재 웨이브의 값으로 색을 칠해준다
      context.fillStyle = colors[0];

      //console.log("start");
      // console.log(prevX, prevY);
      context.moveTo(prevX, prevY);

      for (let i = 1; i < totalPoints; i++) {
        if (i < totalPoints - 1) {
          points[i].update();
          //points[i].y = 100 + Math.sin(j) * 100;
          //console.log("update");
          //console.log(points[i]);
        }

        const cx = parseInt((prevX + points[i].x) / 2);
        const cy = parseInt((prevY + points[i].y) / 2);
        // 직선 웨이브
        //context.lineTo(cx, cy);
        //곡선 웨이브

        context.quadraticCurveTo(prevX, prevY, cx, cy);
        //context.stroke();
        //context.lineTo(points[i].x, points[i].y);

        //console.log("~ing");
        // console.log(cx, cy);

        prevX = parseInt(points[i].x);
        prevY = parseInt(points[i].y);
      }
      /* 붓을 오른쪽 모서리부터 왼쪽 모서리 그리고 첫번째 점 위치까지 옮기면서 색칠 */
      context.lineTo(prevX, prevY);
      context.lineTo(stageWidth, stageHeight);
      context.lineTo(0, stageHeight);
      context.lineTo(parseInt(points[0].x), parseInt(points[0].y));

      // console.log("end");
      // console.log(prevX, prevY);
      // console.log(stageWidth, stageHeight);
      // console.log(0, stageHeight);
      // console.log(parseInt(points[0].x), parseInt(points[0].y));
      // context.translate(10, 10);
      context.save();
      context.fill();

      context.closePath();

      j += 0.01;
      //console.log(points);

      requestId = requestAnimationFrame(render);
      //console.log(requestId);
    };
    // 랜더링
    render();
    // 캔버스 클리어

    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  return (
    <canvas ref={ref} style={{ width: "1000px", height: "700px" }} />
    // style 지우면 실행 안 됨
  );
};

export default Wave;
