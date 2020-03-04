import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    disabled?: boolean;
    color?: 'primary' | 'secondary';
    size?: 'small' | 'large';
    variant?: 'text' | 'contained';
}

const BaseButton = styled.button<ButtonProps>`
    align-items: center;
    ${props =>
        props.disabled
            ? `background-color: ${props.theme.palette.background.disabled} !important; color: ${props.theme.palette.text.primary} !important; pointer-events: none;`
            : null}
    background-color: ${props =>
        props.color === 'primary'
            ? props.theme.palette.primary.main
            : props.theme.palette.secondary.main};
    border: 0;
    border-radius: 30px;
    box-sizing: border-box;
    color: ${props =>
        props.color === 'primary'
            ? props.theme.palette.primary.contrastText
            : 'inherit'};
    cursor: pointer;
    display: inline-flex;
    font-weight: 600;
    justify-content: center;
    margin: 0;
    min-width: 64px;
    outline: 0;
    padding: 8px 16px;
    position: relative;
    text-align: center;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    word-break: keep-all;
`;

const Label = styled.span`
    width: 100%;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
`;

const Button: React.FC<ButtonProps> = ({
    children,
    disabled = false,
    color = 'primary',
    size = 'small',
    variant = 'text',
    ...rest
}) => {
    return (
        <BaseButton
            color={color}
            size={size}
            variant={variant}
            disabled={disabled}
            {...rest}
        >
            <Label>{children}</Label>
        </BaseButton>
    );
};

export default Button;
