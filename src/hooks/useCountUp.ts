import { animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function useCountUp(target: number, duration = 1.2) {
  const [value, setValue] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const controls = animate(prev.current, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        setValue(Math.round(latest));
      },
    });
    prev.current = target;
    return () => controls.stop();
  }, [target, duration]);

  return value;
}
