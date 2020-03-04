import styled from 'styled-components';
import { GridDefault } from 'components/Grid';
import { breakpoints } from 'constants/theme';

export default styled(GridDefault)`
    grid-template-columns: repeat(8, 1fr [col-start]);
    grid-template-rows: auto;
    margin-bottom: 32px;

    @media ${breakpoints.lg} {
        grid-template-columns: repeat(7, 1fr [col-start]);
        margin-bottom: 24px;
    }

    @media ${breakpoints.md} {
        grid-template-columns: repeat(4, 1fr [col-start]);
        margin-bottom: 24px;
    }

    @media ${breakpoints.sm} {
        grid-template-columns: repeat(2, 1fr [col-start]);
        margin-bottom: 16px;
    }
`;
