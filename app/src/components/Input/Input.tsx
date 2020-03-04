import React from 'react';
import styled, { css } from 'styled-components';

type InputType = {
    disabled?: boolean;
    name?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    value?: any;
};

const PlaceHolder = css`
    color: currentColor;
    opacity: 0.35;
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const InputBase = styled.input`
    align-items: center;
    background: #fff;
    border: 0;
    box-shadow: ${props => props.theme.shadows[1]};
    box-sizing: content-box;
    border-radius: 4px;
    color: ${props => props.theme.palette.text.primary};
    cursor: text;
    display: block;
    height: 1.1875em;
    font: inherit;
    line-height: 1.1875em;
    margin: 0;
    min-width: 0;
    padding: 10px 12px 10px;
    position: relative;
    width: 100%;
    ::placeholder {
        ${PlaceHolder}
    }
    :focus {
        outline: 0;
    }
`;

const Input: React.FC<InputType> = ({
    disabled,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    type = 'text',
    value,
    ...rest
}) => {
    return (
        <InputBase
            onClick={onClick}
            onChange={onChange}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onKeyUp={onKeyUp}
            placeholder={placeholder}
            type={type}
            value={value}
            name={name}
            disabled={disabled}
            {...rest}
        />
    );
};

export default Input;
