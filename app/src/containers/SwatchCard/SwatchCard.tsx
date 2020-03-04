import React from 'react';

import { ColorType } from 'apollo/queries/colors';
import Swatch from 'components/Swatch';
import SwatchLabel from 'components/SwatchLabel';

interface SwatchCardProps extends ColorType {
    selected?: boolean;
    onCardClick: (swatch: ColorType) => void;
}

const SwatchCard: React.FC<SwatchCardProps> = ({
    id,
    hex,
    onCardClick,
    selected = false,
}) => {
    const handleOnClick = () => {
        onCardClick({ id, hex });
    };
    return (
        <Swatch selected={selected} fill={hex} onClick={handleOnClick}>
            <SwatchLabel>#{hex}</SwatchLabel>
        </Swatch>
    );
};

export default SwatchCard;
