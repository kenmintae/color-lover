import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import SwatchRow from 'components/SwatchRow';
import SwatchCard from 'containers/SwatchCard';
import { useSwatchesContext } from 'contexts/SwatchesProvider';
import { MAX_NUMBER_SWATCHES } from 'constants/defaultValues';
import { ColorType } from 'apollo/queries/colors';

const ListWrapper = styled.div`
    padding: 16px;
    text-align: center;
`;

export default function Listing() {
    const {
        loading,
        error,
        data,
        numResults,
        selectedIdList,
        toggleSwatchSelection,
        setNumberResults,
    } = useSwatchesContext();

    const handleOnClick = (): void => {
        setNumberResults(numResults);
    };

    const handleOnCardClick = (swatch: ColorType): void => {
        toggleSwatchSelection(swatch);
    };

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>error</h1>;
    }

    return (
        <ListWrapper>
            <SwatchRow>
                {data.map(({ id, hex }) => {
                    return (
                        <SwatchCard
                            key={id}
                            id={id}
                            hex={hex}
                            selected={selectedIdList.includes(id)}
                            onCardClick={handleOnCardClick}
                        />
                    );
                })}
            </SwatchRow>
            <Button
                onClick={handleOnClick}
                disabled={numResults === MAX_NUMBER_SWATCHES}
            >
                Load more
            </Button>
        </ListWrapper>
    );
}
