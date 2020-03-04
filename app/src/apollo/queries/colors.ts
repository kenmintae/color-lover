import gql from 'graphql-tag';

export type ColorType = Readonly<{
    id: number;
    hex: string;
}>;

export const colorsQuery = gql`
    query Colors($numResults: Int) {
        colors(numResults: $numResults) {
            id
            hex
        }
    }
`;
