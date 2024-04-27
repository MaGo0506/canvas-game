'use client'

import { FC, useState } from "react";
import { useDraw } from "../../hooks/useDraw";
import { SketchPicker } from "react-color";

interface pageProps { }

const Page: FC<pageProps> = () => {
  const [color, setColor] = useState<string>('#000');
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  return (
    <div className="w-screen h-screen bg-slate-200 flex gap-3 justify-center items-center">
      <div className="flex flex-col gap-4 justify-center">
        <SketchPicker
          color={color}
          onChange={(e) => setColor(e.hex)}
        />
        <button
          className="p-2 bg-green-300 text-gray-800 font-medium shadow-sm rounded-md hover:bg-green-400 transition-colors duration-200"
          type="button"
          onClick={clear}
        >
          Clear Canvas
        </button>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={850}
        height={850}
        className="border border-black rounded-md bg-white"
      />
    </div>
  );
}

export default Page;
