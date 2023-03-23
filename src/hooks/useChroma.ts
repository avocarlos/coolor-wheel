import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import chromaJS, { Color } from 'chroma-js';

function useChroma(hsl?: number[]): [Color | null, Dispatch<SetStateAction<number[] | null>>] {
  const [color, setColor] = useState<number[] | null>(hsl || null);
  const [chroma, setChroma] = useState<Color | null>(null);

  useEffect(() => {
    if (color) {
      const [h, s, l] = color;
      setChroma(chromaJS(h, s * 0.01, l * 0.01, 'hsl'));
    } else {
      setChroma(null);
    }
  }, [color]);

  return [chroma, setColor];
};

export default useChroma;