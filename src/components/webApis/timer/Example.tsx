import type { Dot } from '@/types/timer';
import { useEffect, useRef } from 'react';
import styles from '@/components/webApis/Timer/Timer.module.css';

// 직사각형 형태로 점 정의 (모든 선의 길이가 동일 = 100)
// 캔버스 중앙(300, 150)에 배치
const DOTS: Dot[] = [
  { x: 100, y: 50, letter: 'A' },
  { x: 200, y: 50, letter: 'B' },
  { x: 300, y: 50, letter: 'C' },
  { x: 400, y: 50, letter: 'D' },
  { x: 500, y: 50, letter: 'E' },
  { x: 500, y: 150, letter: 'J' },
  { x: 400, y: 150, letter: 'I' },
  { x: 300, y: 150, letter: 'H' },
  { x: 200, y: 150, letter: 'G' },
  { x: 100, y: 150, letter: 'F' },
];

const Example = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  // TODO: 실제 그려지는 시간 측정하기!
  const timeLogRef = useRef<number[]>([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

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

  return (
    <>
      <canvas ref={canvasRef} width="600" height="200" />
      <ul className={styles.timeLogList}>
        {timeLogRef.current.map((time, index) => (
          <li key={index}>
            {index + 1} : {time}초{' '}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Example;
