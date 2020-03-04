import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Button from 'components/Button';
import Icon from 'components/Icon';
import Input from 'components/Input';
import Loading from 'components/Loading';
import { GridDefault } from 'components/Grid';
import { breakpoints } from 'constants/theme';
import SavedPalette from 'containers/SavedPalette';
import Swatch from 'components/Swatch';
import SwatchLabel from 'components/SwatchLabel';
import SwatchRow from 'components/SwatchRow';
import { useSwatchesContext } from 'contexts/SwatchesProvider';
import { useCartContext } from 'contexts/CartProvider';

const SavePaletteRow = styled(GridDefault)`
    grid-template-columns: 2fr 1fr 3fr;
    grid-template-rows: auto;
    grid-template-areas: 'input' 'button' 'unassign';

    @media ${breakpoints.lg} {
        grid-template-columns: 2fr 1fr 3fr;
    }

    @media ${breakpoints.md} {
        grid-template-columns: 2fr 1fr 2fr;
    }

    @media ${breakpoints.sm} {
        grid-template-columns: 2fr 1fr;
        grid-template-areas: 'input' 'button';
    }
`;

const SavePaletteSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputController = styled.div`
    position: relative;
    margin-right: 24px;
`;

const StyledSwatch = styled(Swatch)`
    &:hover > .delete {
        opacity: 100%;
    }
`;

const DeleteIcon = styled.div`
    cursor: pointer;
    position: absolute;
    right: 8px;
    top: 8px;
    opacity: 0;
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const Divider = styled.hr`
    height: 1px;
    margin: 32px 0;
    border: none;
    flex-shrink: 0;
    background-color: ${props => props.theme.palette.divider};
`;

export default function Cart() {
    const [value, setValue] = useState('');
    const {
        loading,
        error,
        selectedCards,
        resetSwatchList,
        toggleSwatchSelection,
    } = useSwatchesContext();
    const { palettes, savePalette } = useCartContext();

    const handleOnClick = () => {
        const id = uuidv4();
        const palette = {
            id,
            name: value,
            swatches: selectedCards,
        };
        savePalette(palette);
        setValue('');
        resetSwatchList();
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value) {
            const id = uuidv4();
            const palette = {
                id,
                name: value,
                swatches: selectedCards,
            };
            savePalette(palette);
            setValue('');
            resetSwatchList();
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <h1>
                we are experiencing technical difficulties. please try again
                later.
            </h1>
        );
    }

    return (
        <div>
            <h2>Your current color cart palette</h2>
            <SwatchRow>
                {selectedCards.map(swatch => {
                    const { id, hex } = swatch;
                    return (
                        <StyledSwatch key={id} fill={hex}>
                            <SwatchLabel>#{hex}</SwatchLabel>
                            <DeleteIcon className="delete">
                                <Icon
                                    glyph="trash"
                                    size={19}
                                    onClick={() =>
                                        toggleSwatchSelection(swatch)
                                    }
                                />
                            </DeleteIcon>
                        </StyledSwatch>
                    );
                })}
            </SwatchRow>
            <h5>Name and save your color palette</h5>
            <SavePaletteRow>
                <InputController>
                    <Input
                        placeholder="Color palette name"
                        value={value}
                        onKeyDown={handleOnKeyDown}
                        onChange={handleOnChange}
                    />
                </InputController>
                <Button onClick={handleOnClick}>Save Palette</Button>
            </SavePaletteRow>
            <SavePaletteSection>
                <Divider />
                <h2>Previously saved color palettes</h2>
                <SavedPalette palettes={palettes} />
            </SavePaletteSection>
        </div>
    );
}
