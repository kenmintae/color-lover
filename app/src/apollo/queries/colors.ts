import gql from "graphql-tag";

const COLORS = gql`
    query Colors($numResults: Int) {
      colors(numResults: $numResults) {
        id,
        title,
        hex,
        imageUrl
      }
    }
`;

export default COLORS;