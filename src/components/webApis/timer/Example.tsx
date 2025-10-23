import type { Dot } from '@/types/timer';
import { useEffect, useRef } from 'react';

// 선을 그릴 순서대로 점 정의
const DOTS: Dot[] = [
  { x: 50, y: 100, letter: 'A' },
  { x: 170, y: 100, letter: 'B' },
  { x: 290, y: 100, letter: 'C' },
  { x: 410, y: 100, letter: 'D' },
  { x: 530, y: 100, letter: 'E' },
  { x: 530, y: 220, letter: 'J' },
  { x: 410, y: 220, letter: 'I' },
  { x: 290, y: 220, letter: 'H' },
  { x: 170, y: 220, letter: 'G' },
  { x: 50, y: 220, letter: 'F' },
];

const Example = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 점/텍스트 그리기
    DOTS.forEach((dot) => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'black';
      ctx.fill();

      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(dot.letter, dot.x, dot.y + 30);
    });

    // 1초마다 선을 하나씩 그리기
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex >= DOTS.length) {
        clearInterval(intervalId);
        return;
      }

      const currentDot = DOTS[currentIndex];
      const nextDot = DOTS[(currentIndex + 1) % DOTS.length];

      ctx.beginPath();
      ctx.moveTo(currentDot.x, currentDot.y);
      ctx.lineTo(nextDot.x, nextDot.y);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();

      currentIndex++;
    }, 1000);

    intervalIdRef.current = intervalId;

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} width="550" height="400" />;
};

export default Example;
