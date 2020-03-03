import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSwatchesContext } from "contexts/SwatchesProvider";

import Icon from "components/Icon"

const HeaderWrapper = styled.header`
  align-items: center;
  background-color: ${props => props.theme.palette.primary.main};
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  padding: 8px 16px;
  position: relative;
`;

const IconWrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: relative;
`;

export default function Header() {
  const { selectedIdList } = useSwatchesContext();
  const count = selectedIdList.length > 0 ? JSON.stringify(selectedIdList.length) : null;
  return (
    <HeaderWrapper>
      <Link to="/">
        <Icon glyph="logo" size="48" />
      </Link>
      <Link to="/cart">
        {/* <img src="./CartIcon.svg" alt="Cart Icon" /> */}
        <IconWrapper>
          <Icon glyph="cart" size="48" count={count} />
        </IconWrapper>
      </Link>
    </HeaderWrapper>
  )
}