import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import COLORS from "apollo/queries/colors";
import styled from "styled-components";

import Button from "components/Button";
import SwatchCard from "containers/SwatchCard"

type COLORS = {
  id: number,
  title: string,
  hex: string,
  imageUrl: string
}

const ListWrapper = styled.div`
  padding: 16px;
  text-align: center;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr [col-start]);
  grid-template-rows: auto;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(4, 1fr [col-start]);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr [col-start]);
  } 
`;


const DEFAULT_NUM_RESULTS = 14;
const MAX_NUMBER_SWATCHES = 100;

export default function Listing() {
  const [numResults, setNumResults] = useState<number>(DEFAULT_NUM_RESULTS)
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const { loading, error, data } = useQuery(COLORS, {
    variables: {
      numResults: numResults
    }
  });

  const handleOnClick = () => {
    const newNumber = Math.min(numResults * 2, MAX_NUMBER_SWATCHES);
    setNumResults(newNumber);
  }

  const handleOnCardClick = (id: number) => {
    if (selectedCards.includes(id)) {
      const newCardList = selectedCards.filter(cardId => cardId !== id);
      setSelectedCards(newCardList);
    } else {
      setSelectedCards([...selectedCards, id]);
    }
  }

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>error</h1>
  }
  return (
    <ListWrapper>
      <Container>
        {data.colors.map(({ id, hex }: COLORS) => {
          return (
            <SwatchCard id={id} hex={hex} selected={selectedCards.includes(id)} onCardClick={handleOnCardClick} />
          )
        })}
      </Container>
      <Button onClick={handleOnClick} disabled={numResults === MAX_NUMBER_SWATCHES}>Load more</Button>
    </ListWrapper>

  )
}