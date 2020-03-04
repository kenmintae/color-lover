import React, { useContext, createContext, useReducer } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { colorsQuery, ColorType } from 'apollo/queries/colors';
import {
    DEFAULT_NUM_RESULTS,
    MAX_NUMBER_SWATCHES,
} from 'constants/defaultValues';

type SwatchesContextProps = {
    children: React.ReactNode;
};

type SwatchesContextType = {
    numResults: number;
    selectedCards: ColorType[];
    selectedIdList: number[];
    data: ColorType[];
    loading: boolean;
    error: any;
    toggleSwatchSelection: (swatch: ColorType) => void;
    setNumberResults: (num: number) => void;
    resetSwatchList: () => void;
};

enum ACTIONS {
    ADD_SWATCH = 'ADD_SWATCH',
    REMOVE_SWATCH = 'REMOVE_SWATCH',
    RESET_SWATCH_LIST = 'RESET_SWATCH_LIST',
    SET_NUMBER_RESULTS = 'SET_NUMBER_RESULTS',
}

type State = {
    numResults: number;
    selectedCards: ColorType[];
    selectedIdList: number[];
};

type Action =
    | { type: ACTIONS.ADD_SWATCH; payload: ColorType }
    | { type: ACTIONS.REMOVE_SWATCH; payload: ColorType }
    | { type: ACTIONS.RESET_SWATCH_LIST }
    | { type: ACTIONS.SET_NUMBER_RESULTS; payload: number };

const SwatchesContext = createContext<SwatchesContextType>(
    {} as SwatchesContextType
);

export const useSwatchesContext = () => useContext(SwatchesContext);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case ACTIONS.ADD_SWATCH:
            return {
                ...state,
                selectedCards: [...state.selectedCards, action.payload],
                selectedIdList: [...state.selectedIdList, action.payload.id],
            };
        case ACTIONS.REMOVE_SWATCH:
            return {
                ...state,
                selectedCards: state.selectedCards.filter(
                    swatch => swatch.id !== action.payload.id
                ),
                selectedIdList: state.selectedIdList.filter(
                    id => id !== action.payload.id
                ),
            };
        case ACTIONS.RESET_SWATCH_LIST:
            return {
                ...state,
                selectedCards: [],
                selectedIdList: [],
            };
        case ACTIONS.SET_NUMBER_RESULTS:
            return {
                ...state,
                numResults: Math.min(action.payload * 2, MAX_NUMBER_SWATCHES),
            };
        default:
            return state;
    }
}

const initialState = {
    numResults: DEFAULT_NUM_RESULTS,
    selectedCards: [],
    selectedIdList: [],
};

export default function SwatchesProvider({ children }: SwatchesContextProps) {
    const [
        { numResults, selectedCards, selectedIdList },
        dispatch,
    ] = useReducer(reducer, initialState);
    const { loading, error, data } = useQuery(colorsQuery, {
        variables: {
            numResults: numResults,
        },
    });

    const toggleSwatchSelection = (swatch: ColorType) => {
        if (selectedIdList.includes(swatch.id)) {
            dispatch({
                type: ACTIONS.REMOVE_SWATCH,
                payload: swatch,
            });
        } else {
            dispatch({
                type: ACTIONS.ADD_SWATCH,
                payload: swatch,
            });
        }
    };

    const setNumberResults = (num: number) => {
        dispatch({
            type: ACTIONS.SET_NUMBER_RESULTS,
            payload: num,
        });
    };

    const resetSwatchList = () => {
        dispatch({
            type: ACTIONS.RESET_SWATCH_LIST,
        });
    };

    return (
        <SwatchesContext.Provider
            value={{
                numResults,
                selectedCards,
                selectedIdList,
                toggleSwatchSelection,
                resetSwatchList,
                setNumberResults,
                loading,
                error,
                data: data && data.colors,
            }}
        >
            {children}
        </SwatchesContext.Provider>
    );
}
