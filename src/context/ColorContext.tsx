import { Color } from 'chroma-js';
import React, { Dispatch, SetStateAction } from 'react'

const ColorContext = React.createContext<{
    chroma?: Color | null;
    setChroma?: Dispatch<SetStateAction<number[] | null>>
}>({})

export const ColorProvider = ColorContext.Provider;
export const ColorConsumer = ColorContext.Consumer;

export default ColorContext;