import styles from '@/styles/timer.module.css';

const DOTS_TEXT = 'ABCDEFGHIJ';

const generateDotPositions = () => {
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

const Example = () => {
  const dots = generateDotPositions();

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
      </svg>
    </div>
  );
};

export default Example;
