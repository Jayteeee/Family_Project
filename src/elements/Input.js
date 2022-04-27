import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    type = "text",
    children,
    onChange,
    id,
    placeholder,
    S,
    M,
    L,
    ...styles
  } = props;

  if (S) {
    return (
      <SmallInput
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        {...styles}
      />
    );
  }

  if (M) {
    return (
      <MediumInput
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        {...styles}
      />
    );
  }

  if (L) {
    return (
      <LargeInput
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        {...styles}
      />
    );
  }

  return (
    <DefaultInput
      type={type}
      placeholder={placeholder}
      id={id}
      onChange={onChange}
      {...styles}
    />
  );
};

const DefaultInput = styled.input`
  border-radius: 4px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px red, 0 0 0 5px gray;
  }

  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "44px;")};
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
  border: 1px solid rgba(29, 28, 29, 0.3);
  text-align: ${({ text_align }) => (text_align ? `${text_align};` : "")};
  background-color: ${({ bg }) => (bg ? `${bg};` : "")};
  ${({ size }) => (size ? `font-size: ${size};` : "")}
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid gray;"};
`;

const SmallInput = styled.input`
  border-radius: 4px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px red, 0 0 0 5px gray;
  }

  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "20px;")};
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
  text-align: ${({ text_align }) => (text_align ? `${text_align};` : "")};
  background-color: ${({ bg }) => (bg ? `${bg};` : "")};
  ${({ size }) => (size ? `font-size: ${size};` : "")}
`;

const MediumInput = styled.input`
  border-radius: 4px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px red, 0 0 0 5px gray;
  }

  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "30px;")};
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
  text-align: ${({ text_align }) => (text_align ? `${text_align};` : "")};
  background-color: ${({ bg }) => (bg ? `${bg};` : "")};
  ${({ size }) => (size ? `font-size: ${size};` : "")}
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid gray;"};
`;

const LargeInput = styled.input`
  border-radius: 4px;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px red, 0 0 0 5px gray;
  }

  width: ${({ width }) => (width ? `${width};` : "100%;")};
  height: ${({ height }) => (height ? `${height};` : "50px;")};
  padding: ${({ padding }) => (padding ? `${padding};` : "0;")};
  margin: ${({ margin }) => (margin ? `${margin};` : "0;")};
  text-align: ${({ text_align }) => (text_align ? `${text_align};` : "")};
  background-color: ${({ bg }) => (bg ? `${bg};` : "")};
  ${({ size }) => (size ? `font-size: ${size};` : "")}
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid gray;"};
`;

export default Input;
