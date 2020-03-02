import React from "react";
import styled from "styled-components";

type SwatchCardProps = {
  id: number;
  hex: string;
  selected?: boolean;
  onCardClick: (id: number) => void;
}

type ColorItemProps = {
  selected: boolean;
  backgroundColor: string
}

const ColorItem = styled.div<ColorItemProps>`
  align-self: center;
  background-color: #${props => props.backgroundColor};
  border-radius: 4px;
  box-shadow: ${props => props.selected ? `inset 0px 0px 0px 6px rgba(0,0,0,0.3)` : props.theme.shadows[1]};
  cursor: pointer;
  height: 100%;
  justify-self: center;
  min-width: 160px;
  min-height: 160px;
  position: relative;
  width: 100%;
`;

const Title = styled.div`
  position: absolute;
  color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SwatchCard: React.FC<SwatchCardProps> = ({
  id,
  hex,
  onCardClick,
  selected = false
}) => {
  const handleOnClick = () => {
    onCardClick(id)
  }
  return (
    <ColorItem key={id} selected={selected} backgroundColor={hex} onClick={handleOnClick}>
      <Title>#{hex}</Title>
    </ColorItem>
  )
}

export default SwatchCard