import { useState, useEffect, useRef } from 'react';

function useAnimatePercent(target, duration = 70) {
  const [value, setValue] = useState(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    let animFrame;

    const step = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);

      // Считаем новое значение
      const current = Math.floor(percentage * target);
      setValue(current);

      if (percentage < 1) {
        animFrame = requestAnimationFrame(step);
      }
    };

    // Каждый раз при изменении `target` начинаем с 0
    setValue(0);
    startTimeRef.current = null;
    animFrame = requestAnimationFrame(step);

    // Чистим, если компонент размонтируется
    return () => {
      if (animFrame) {
        cancelAnimationFrame(animFrame);
      }
    };
  }, [target, duration]);

  return value;
}

export default useAnimatePercent;
