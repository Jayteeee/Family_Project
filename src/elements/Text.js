import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, ...styles } = props;

  return <DefaultText {...styles}>{children}</DefaultText>;
};

const DefaultText = styled.p`
  ${({ size }) => (size ? `font-size: ${size};` : `font-size: 18px;`)};
  ${({ color }) => (color ? `color: ${color};` : `color: #282828;`)};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")};
  ${({ padding }) => (padding ? `padding: ${padding};` : "padding: 0;")};
  ${({ fontWeight }) =>
    fontWeight ? `font-weight: ${fontWeight};` : `font-weight: false;`};
`;

export default Text;
