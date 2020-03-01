import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  align-items: center;
  background-color: ${props => props.theme.palette.primary.main};
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  padding: 8px 16px;
  position: relative;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Link to="/">
        <img src="./NewEngen-Logo.svg" alt="New Engen Logo" />
      </Link>
      <Link to="/cart">
        <img src="./CartIcon.svg" alt="Cart Icon" />
      </Link>
    </HeaderWrapper>
  )
}