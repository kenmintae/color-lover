import React from 'react';
import styled from 'styled-components';

import Icon from 'components/Icon';
import Swatch from 'components/Swatch';
import SwatchLabel from 'components/SwatchLabel';
import SwatchRow from 'components/SwatchRow';
import { useCartContext } from 'contexts/CartProvider';
import { Palette } from 'contexts/CartProvider/CartProvider';

type SavePaletteProps = {
    palettes: Palette[];
};

const DeleteIcon = styled.div`
    align-items: center;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: ${props => props.theme.shadows[1]};
    cursor: pointer;
    display: flex;
    justify-content: center;
    height: 100%;
    min-width: 124px;
    min-height: 124px;
    position: relative;
    width: 100%;
`;

const Label = styled.p`
    font-weight: bold;
`;

const SavedPalette: React.FC<SavePaletteProps> = ({ palettes }) => {
    const { removePalette } = useCartContext();
    if (!palettes.length) {
        return <p>you have no saved palette</p>;
    }
    return (
        <React.Fragment>
            {palettes.map(palette => {
                return (
                    <div key={palette.id}>
                        <Label>{palette.name}</Label>
                        <SwatchRow>
                            {palette.swatches.map(({ id, hex }) => {
                                return (
                                    <Swatch fill={hex} key={id}>
                                        <SwatchLabel>#{hex}</SwatchLabel>
                                    </Swatch>
                                );
                            })}
                            <DeleteIcon>
                                <Icon
                                    glyph="trash"
                                    size={19}
                                    onClick={() => removePalette(palette)}
                                />
                            </DeleteIcon>
                        </SwatchRow>
                    </div>
                );
            })}
        </React.Fragment>
    );
};

export default SavedPalette;
