import styled from 'styled-components';

type SquareSwatchProps = {
    selected?: boolean;
    fill: string;
};

export default styled.div<SquareSwatchProps>`
    align-self: center;
    background-color: #${props => props.fill};
    border-radius: 4px;
    box-shadow: ${props =>
        props.selected ? `inset 0px 0px 0px 6px rgba(0,0,0,0.3)` : `none`};
    cursor: pointer;
    height: 100%;
    justify-self: center;
    min-width: 124px;
    min-height: 124px;
    position: relative;
    width: 100%;
`;
