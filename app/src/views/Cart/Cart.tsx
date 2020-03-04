import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';

import SavedPalette from "containers/SavedPalette";
import Swatch from "components/Swatch";
import SwatchLabel from "components/SwatchLabel";
import SwatchRow from "components/SwatchRow"
import Button from "components/Button";
import Input from "components/Input";
import { GridDefault } from "components/Grid";
import { useSwatchesContext } from "contexts/SwatchesProvider";
import { useCartContext } from "contexts/CartProvider";

const SavePaletteRow = styled(GridDefault)`
  grid-template-columns: 2fr 1fr 3fr;
  grid-template-rows: auto;
  grid-template-areas: 'input' 'button' 'unassign';
  @media (max-width: 1280px) {
    grid-template-columns: 2fr 1fr 1fr;;
  }

  @media (max-width: 768px) {
    grid-template-columns: 2fr 1fr;
    grid-template-areas: 'input' 'button';
  } 
`;

const InputController = styled.div`
  position: relative;
  margin-right: 24px;
`;

export default function Cart() {
  const [value, setValue] = useState("");
  const {
    loading,
    error,
    selectedCards,
    resetSwatchList
  } = useSwatchesContext();
  const { palettes, savePalette } = useCartContext();

  const handleOnClick = () => {
    const id = uuidv4();
    const palette = {
      id,
      name: value,
      swatches: selectedCards
    }
    savePalette(palette);
    setValue("");
    resetSwatchList();
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value) {
      const id = uuidv4();
      const palette = {
        id,
        name: value,
        swatches: selectedCards
      }
      savePalette(palette);
      setValue("");
      resetSwatchList();
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>error</h1>
  }

  return (
    <div>
      <h1>Your current color cart palette</h1>
      <SwatchRow>
        {selectedCards.map(({ id, hex }) => {
          return (
            <Swatch key={id} fill={hex}>
              <SwatchLabel>#{hex}</SwatchLabel>
            </Swatch>
          )
        })}
      </SwatchRow>
      <h3>Name and save your color palette</h3>
      <SavePaletteRow>
        <InputController>
          <Input placeholder="Color palette name" value={value} onKeyDown={handleOnKeyDown} onChange={handleOnChange} />
        </InputController>
        <Button onClick={handleOnClick}>Save Palette</Button>
      </SavePaletteRow>
      <h1>Previously saved color palette</h1>
      <SavedPalette palettes={palettes} />
    </div>
  )
}