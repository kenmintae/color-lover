import React, { useContext, createContext, useReducer, useEffect } from 'react';
import store from 'store2';

import { ColorType } from 'apollo/queries/colors';
import { saveToStorage, removeFromStorage } from 'utils/storage';

type CartContextProps = {
    children: React.ReactNode;
};

type CartContextType = {
    palettes: Palette[];
    savePalette: (palette: Palette) => void;
    removePalette: (palette: Palette) => void;
};

enum ACTIONS {
    SAVE_PALETTE = 'SAVE_PALLETE',
    REMOVE_PALETTE = 'REMOVE_PALETTE',
    RESTORE_PALETTES_FROM_STORAGE = 'RESTORE_PALETTES_FROM_STORAGE',
}

export type Palette = {
    id: string;
    name: string;
    swatches: ColorType[];
};

type State = {
    palettes: Palette[];
};

type Action =
    | { type: ACTIONS.SAVE_PALETTE; payload: Palette }
    | { type: ACTIONS.REMOVE_PALETTE; payload: Palette }
    | { type: ACTIONS.RESTORE_PALETTES_FROM_STORAGE; payload: Palette[] };

const CartContext = createContext<CartContextType>({} as CartContextType);

export const useCartContext = () => useContext(CartContext);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ACTIONS.SAVE_PALETTE:
            return {
                ...state,
                palettes: [...state.palettes, action.payload],
            };
        case ACTIONS.REMOVE_PALETTE:
            return {
                ...state,
                palettes: state.palettes.filter(
                    palette => palette.id !== action.payload.id
                ),
            };
        case ACTIONS.RESTORE_PALETTES_FROM_STORAGE:
            return {
                ...state,
                palettes: [...action.payload, ...state.palettes],
            };
        default:
            return state;
    }
}

function hydrateStateWithStorage(prefix: string): Palette[] {
    let res: Palette[] = [];
    store.each((key, value) => {
        if (key.includes(prefix)) {
            res.push(value);
        }
    });
    return res;
}

const initialState: State = {
    palettes: [],
};

export default function CartProvider({ children }: CartContextProps) {
    const [{ palettes }, dispatch] = useReducer(reducer, initialState);
    const prefix = 'cart';

    useEffect(() => {
        const prevSavedPalette = hydrateStateWithStorage(prefix);
        dispatch({
            type: ACTIONS.RESTORE_PALETTES_FROM_STORAGE,
            payload: prevSavedPalette as Palette[],
        });
    }, []);

    const savePalette = (palette: Palette): void => {
        dispatch({
            type: ACTIONS.SAVE_PALETTE,
            payload: palette,
        });
        saveToStorage(prefix, palette.id, palette);
    };

    const removePalette = (palette: Palette): void => {
        dispatch({
            type: ACTIONS.REMOVE_PALETTE,
            payload: palette,
        });
        removeFromStorage(prefix, palette.id);
    };

    return (
        <CartContext.Provider
            value={{
                palettes,
                savePalette,
                removePalette,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
