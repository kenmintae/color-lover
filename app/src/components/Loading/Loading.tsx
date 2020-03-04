import React from 'react';
import styled, { keyframes } from 'styled-components';

const HEADER_SIZE = 70;

const LoadingContainer = styled.div`
    align-self: stretch;
    align-items: center;
    display: flex;
    flex: auto;
    justify-content: center;
    position: fixed;
    width: 100vw;
    height: calc(100vh - ${HEADER_SIZE}px);
    top: ${HEADER_SIZE}px;
    left: 0;
    right: 0;
`;

const spin = keyframes`
  to {transform: rotate(360deg);}
`;

const Spinner = styled.span`
    height: 64px;
    width: 64px;

    &:before {
        animation: ${spin} 2s linear infinite;
        border: 4px solid ${props => props.theme.palette.primary.main};
        border-radius: 50%;
        border-bottom-color: transparent;
        border-top-color: transparent;
        box-sizing: border-box;
        content: '';
        height: 32px;
        display: inline-block;
        left: 50%;
        margin-left: -16px;
        margin-top: -16px;
        position: absolute;
        top: 50%;
        width: 32px;
    }
`;

export default function Loading() {
    return (
        <LoadingContainer>
            <Spinner />
        </LoadingContainer>
    );
}
