import React, { useEffect } from "react";
import { useRef } from "react";

const getPixelRatio = (context) => {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
};

class Point {
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.1;
    this.cur = index;
    this.max = Math.random() * 10 + 100;
    // console.log(this.x, this.y, this.cur, this.max);
  }

  // update 함수를 실행하면 sin 함수 때문에 아래위로 움직임
  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
    //console.log(this.cur, this.y);
  }
}

class WaveAlone {
  constructor(index) {
    this.index = parseInt(index);
    this.totalPoints = 6;
    this.totalWaves = 3;
    this.stageHeight = 200;
    this.stageWidth = 1500;
    this.color = [
      "rgba(0,199,235,0.4)",
      "rgba(0,146,199,0.4)",
      "rgba(0,87,158,0.4)",
    ];
  }

  WavePoint(points) {
    this.centerX = this.stageWidth / 2;
    this.centerY = this.stageHeight / 1.3;

    this.pointGap = this.stageWidth / this.totalPoints - 1;

    for (let i = 0; i < this.totalPoints; i++) {
      let point = new Point(this.index + i, this.pointGap * i, this.centerY);
      points[i] = point;
    }
  }

  draw(points, j, ctx) {
    if (points[j] !== undefined) {
      ctx.beginPath(); //그리기 시작
      ctx.fillStyle = this.color[0];

      let prevX = parseInt(points[j].x);
      let prevY = parseInt(points[j].y);
      ctx.moveTo(prevX, prevY); //(prevX, prevY) 좌표로 시작점 이동

      console.log("draw-points:", points);
      for (let i = 1; i < this.totalPoints; i++) {
        if (i < this.totalPoints - 1) {
          points[i].update();
        }

        const cx = parseInt((prevX + points[i].x) / 2);
        const cy = parseInt((prevY + points[i].y) / 2);

        ctx.quadraticCurveTo(prevX, prevY, cx, cy);

        prevX = parseInt(points[i].x);
        prevY = parseInt(points[i].y);
      }
      ctx.lineTo(prevX, prevY);
      ctx.lineTo(this.stageWidth, this.stageHeight);
      ctx.lineTo(0, this.stageHeight);
      ctx.lineTo(parseInt(points[j].x), parseInt(points[j].y));

      ctx.fill();
      ctx.closePath();
    }
  }
}

const Wave = () => {
  let ref = useRef();

  useEffect(() => {
    let canvas = ref.current;
    let context = canvas.getContext("2d");

    let requestId;
    let j = 0;

    const render = () => {
      let waves = [];
      let points = [];
      for (let i = 0; i < 6; i++) {
        const wave = new WaveAlone(i);
        waves.push(wave);
        waves[i].WavePoint(points);
        waves[i].draw(points, j, context);
      }
      // console.log("waves[0]:", waves[0]);
      // console.log("waves[1]:", waves[1]);
      // console.log("points:", points);

      j += 0.01;

      requestId = requestAnimationFrame(render);
    };

    //console.log(requestId);

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
