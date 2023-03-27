import { Fragment, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ColorCard from './ColorCard';

export function ColorCards() {
  const [selected, setSelected] = useState<number | null>(null);

  const getCards = () => {
    return [1, 2, 3, 4, 5].map((number) => (
      <Grid xs key={number}>
        <ColorCard
          selected={selected === number}
          setSelected={setSelected}
          index={number}
        />
      </Grid>
    ));
  };

  return <Fragment>{getCards()}</Fragment>;
}
