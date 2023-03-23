import { useState, useEffect, useContext, Dispatch, SetStateAction } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import ColorContext from "../../context/ColorContext";
import { Color } from "chroma-js";

type ColorCardProps = {
  selected: boolean;
  index: number;
  setSelected: Dispatch<SetStateAction<number | null>>
};

function ColorCard({ selected, index, setSelected }: ColorCardProps) {
  const [color, setColor] = useState<Color>();
  const { chroma, setChroma } = useContext(ColorContext);

  useEffect(() => {
    if (chroma && selected) {
      setColor(chroma);
    } else {
      setChroma?.(null);
    }
  }, [chroma, selected, setChroma]);

  const onClickCard = () => setSelected(!selected ? index : null);

  return (
    <Card
      raised={selected}
      sx={{
        color: {
          '&:hover': {
            cursor: "pointer",
          }
        }
      }}
      onClick={onClickCard}
    >
      <CardHeader sx={{ minHeight: 100, backgroundColor: color ? color.css() : 'white' }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {color ? color.name() : "-"}
        </Typography>
        {["rgb", "hsl", "cmyk", "lab"].map((space) => (
          <div key={space}>
            <Typography variant="body2" component="p">
              {space.toUpperCase()}:
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              paragraph
            >
              {color ? color.css(space) : '-'}
            </Typography>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default ColorCard;
