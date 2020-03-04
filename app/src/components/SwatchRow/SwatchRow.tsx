import styled from 'styled-components';
import { GridDefault } from 'components/Grid';

export default styled(GridDefault)`
    grid-template-columns: repeat(7, 1fr [col-start]);
    grid-template-rows: auto;
    margin-bottom: 32px;

    @media (max-width: 1280px) {
        grid-template-columns: repeat(4, 1fr [col-start]);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr [col-start]);
    }
`;
