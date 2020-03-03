import React, { useContext, createContext, useReducer } from "react";
import { ColorType } from "apollo/queries/colors";

type CartContextProps = {
  children: React.ReactNode
}

type CartContextType = {
  palettes: Palette[];
  savePalette: (palette: Palette) => void;
  removePalette: (palette: Palette) => void;
}

enum ACTIONS {
  SAVE_PALETTE = "SAVE_PALLETE",
  REMOVE_PALETTE = "REMOVE_PALETTE",
}

export type Palette = {
  id: string;
  name: string;
  swatches: ColorType[];
}

type State = {
  palettes: Palette[];
};

type Action =
  | { type: ACTIONS.SAVE_PALETTE; payload: Palette }
  | { type: ACTIONS.REMOVE_PALETTE; payload: Palette }

const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCartContext = () => useContext(CartContext);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.SAVE_PALETTE:
      return {
        ...state,
        palettes: [...state.palettes, action.payload]
      };
    case ACTIONS.REMOVE_PALETTE:
      return {
        ...state,
        palettes: state.palettes.filter(palette => palette.id !== action.payload.id)
      };
    default:
      return state
  }
}

const initialState: State = {
  palettes: []
}

export default function CartProvider({ children }: CartContextProps) {
  const [{ palettes }, dispatch] = useReducer(reducer, initialState);

  const savePalette = (palette: Palette) => {
    dispatch({
      type: ACTIONS.SAVE_PALETTE,
      payload: palette
    })
  }

  const removePalette = (palette: Palette) => {
    dispatch({
      type: ACTIONS.REMOVE_PALETTE,
      payload: palette
    })
  }

  return (
    <CartContext.Provider value={{
      palettes,
      savePalette,
      removePalette
    }}>
      {children}
    </CartContext.Provider>
  )
}