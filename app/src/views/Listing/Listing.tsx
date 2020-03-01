import React from "react";
import { useQuery } from "@apollo/react-hooks";
import COLORS from "apollo/queries/colors";

type COLORS = {
  id: number,
  title: string,
  hex: string,
  imageUrl: string
}

export default function Listing() {
  const { loading, error, data } = useQuery(COLORS, {
    variables: {
      numResults: 7
    }
  });
  if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <h1>error</h1>
  }
  return (
    data.colors.map((color: COLORS) => {
      return (
        <li key={color.id}>
          <div>{color.title}</div>
          <img src={color.imageUrl} />
        </li>
      )
    })
  )
}