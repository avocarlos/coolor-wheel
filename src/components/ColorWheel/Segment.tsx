import { useContext } from 'react';
import ColorContext from '../../context/ColorContext';

type SegmentProps = {
  hsl: number[];
  radius: number;
  angle: number;
};

function Segment({hsl, radius, angle}: SegmentProps) {
  const [hue, saturation, lightness] = hsl;
  const { setChroma } = useContext(ColorContext);
  const points = getPolygon(radius, hue, angle);

  const onClick = () => setChroma && setChroma(hsl);

  return (
    <div css={{
      height:'100%',
      width:'100%',
      position:'absolute',
      top:0,
      background:`hsl(${hue}, ${saturation}%, ${lightness}%)`,
      clipPath:`polygon(50% 50%, ${points[0]}px ${points[1]}px, ${points[2]}px ${points[3]}px)`
    }} onClick={onClick}>
    </div>
  );
};

function getPolygon(radius: number, degrees: number, angle: number) {
  const point1 = getVertices(radius, degrees);
  const point2 = getVertices(radius, degrees - angle);
  return [...point1, ...point2];
};

function getVertices(radius: number, degrees: number) {
  const radians = (degrees) * (Math.PI/180);
  const opposite = Math.sin(radians) * radius;
  const adjacent = Math.cos(radians) * radius;
  return [opposite + radius, adjacent + radius];
};

export default Segment;