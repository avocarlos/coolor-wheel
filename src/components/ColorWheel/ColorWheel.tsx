import { type EmotionJSX } from '@emotion/react/types/jsx-namespace';
import Segment from './Segment';

type ColorWheelProps = {
  index: number;
  segments: number;
  size: number;
  saturation: number;
  lightness: number;
};

export function ColorWheel({
  index,
  segments,
  size,
  saturation,
  lightness,
}: ColorWheelProps): EmotionJSX.Element {
  const getColors = (): EmotionJSX.Element[] => {
    const colors = [];
    let angle = 0;
    for (let index = 0; index < segments; index++) {
      angle += 360 / segments;
      colors.push(
        <Segment
          key={index}
          hsl={[angle, saturation, lightness]}
          angle={360 / segments}
          radius={size / 2}
        />
      );
    }
    return colors;
  };

  return (
    <div
      css={{
        zIndex: index,
        position: 'absolute',
        height: size,
        width: size,
        clipPath: 'circle(40%)',
      }}
    >
      {getColors()}
    </div>
  );
}
