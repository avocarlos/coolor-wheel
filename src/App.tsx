import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Grid from "@mui/material/Unstable_Grid2";
import { ColorProvider } from "./context/ColorContext";
import { ColorWheel } from "./components/ColorWheel";
import { ColorCards } from "./components/ColorCards";
import useChroma from "./hooks/useChroma";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { type EmotionJSX } from "@emotion/react/types/jsx-namespace";

function App(): EmotionJSX.Element {
  const [chroma, setChroma] = useChroma();
  const [segments, setSegments] = useState(6);
  const [saturation, setSaturation] = useState(1);
  const [lightness, setLightness] = useState(50);

  const onSegmentsChange = (_: Event, value: number | number[]): void => setSegments(!Array.isArray(value) ? value : 0);
  const onSaturationChange = (_: Event, value: number | number[]): void => setSaturation(!Array.isArray(value) ? value : 0);
  const onLightnessChange = (_: Event, value: number | number[]): void => setLightness(!Array.isArray(value) ? value : 0);

  const getColorWheels = (): EmotionJSX.Element[] => {
    const colorWheels = [];
    let size = 600;
    let sat = 90;
    for (let index = 0; index < saturation; index++) {
      colorWheels.push(
        <ColorWheel
          key={index}
          index={index}
          segments={segments}
          size={size}
          saturation={sat}
          lightness={lightness}
        />
      );
      size -= 60;
      sat -= 10;
    }
    return colorWheels;
  };

  const onReset = (): void => {
    setSegments(6);
    setSaturation(1);
    setLightness(50);
  };

  return (
    <ColorProvider value={{ chroma, setChroma }}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Coolor Wheel
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingTop: 10 }}>
        <Grid container sx={{ minHeight: 600 }}>
          <Grid xs={4}>
            Segments
            <Slider
              defaultValue={segments}
              value={segments}
              onChange={onSegmentsChange}
              getAriaValueText={(value: number) => value.toString()}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={6}
              max={30}
            />
            Saturation
            <Slider
              defaultValue={saturation}
              value={saturation}
              onChange={onSaturationChange}
              getAriaValueText={(value: number) => value.toString()}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={10}
            />
            Lightness
            <Slider
              defaultValue={lightness}
              value={lightness}
              onChange={onLightnessChange}
              getAriaValueText={(value: number) => value.toString()}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={[]}
              min={1}
              max={100}
            />
            <Button onClick={onReset}>Reset</Button>
          </Grid>
          <Grid xs={8} container justifyContent="center" alignItems="center">
            {getColorWheels()}
          </Grid>
        </Grid>
        <Grid container spacing={2} wrap="nowrap">
          <ColorCards />
        </Grid>
      </Container>
    </ColorProvider>
  );
}

export default App;
