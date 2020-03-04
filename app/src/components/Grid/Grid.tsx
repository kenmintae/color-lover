import styled from 'styled-components';

export const GridReset = styled.div`
    display: grid;
    margin: 0;
    padding: 0;
    max-height: 100%;
    max-width: 100%;
`;

export const GridDefault = styled(GridReset)`
    grid-column-gap: 24px;
    grid-row-gap: 24px;
`;
