import styles from '@/styles/timer.module.css';
import type { Dot } from '@/types/timer';

const DOTS_TEXT = 'ABCDEJIHGF';
const LINE_ORDER = 'ABCDEFGHIJ';

const generateDotPositions = (): Dot[] => {
  const spacing = 120;
  const startX = 50; // 시작 X 좌표
  const topY = 100; // 위쪽 줄의 Y 좌표
  const bottomY = 220; // 아래쪽 줄의 Y 좌표

  return [...DOTS_TEXT].map((letter, index) => {
    if (index < 5) {
      return {
        x: startX + index * spacing,
        y: topY,
        letter,
      };
    } else {
      return {
        x: startX + (index - 5) * spacing,
        y: bottomY,
        letter,
      };
    }
  });
};

const generateLines = (dots: Dot[]) => {
  const lines = [];
  for (let i = 0; i < LINE_ORDER.length; i++) {
    const prevDot = dots.find((dot) => dot.letter === LINE_ORDER[i]);
    const nextDot = i === LINE_ORDER.length - 1 ? dots[0] : dots.find((dot) => dot.letter === LINE_ORDER[i + 1]);
    if (prevDot && nextDot) {
      lines.push({
        startX: prevDot.x,
        startY: prevDot.y,
        endX: nextDot.x,
        endY: nextDot.y,
      });
    }
  }
  return lines;
};

const Example = () => {
  const dots = generateDotPositions();
  const lines = generateLines(dots);

  return (
    <div className={styles.container}>
      <svg viewBox="0 0 550 400" width="550" height="400">
        {dots.map((dot, index) => {
          const { x, y, letter } = dot;
          return (
            <g key={index}>
              <circle cx={x} cy={y} r="2" />
              <text x={x} y={y + 30} textAnchor="middle">
                {letter}
              </text>
            </g>
          );
        })}
        {lines.map((line, index) => {
          const { startX, startY, endX, endY } = line;
          return <line key={index} x1={startX} y1={startY} x2={endX} y2={endY} stroke="black" strokeWidth="1" />;
        })}
      </svg>
    </div>
  );
};

export default Example;
