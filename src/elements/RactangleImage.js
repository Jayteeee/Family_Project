import React from "react";
import styled from "styled-components";

const RactangleImage = (props) => {
  const { XS, S, M, L, ...styles } = props;

  if (XS) {
    return <XSmallRactangleImage {...styles} />;
  }

  if (S) {
    return <SmallRactangleImage {...styles} />;
  }

  if (M) {
    return <MediumRactangleImage {...styles} />;
  }

  if (L) {
    return <LargeRactangleImage {...styles} />;
  }

  return (
    <>
      <ImageDefault {...styles} />
    </>
  );
};

Image.defaultProps = {
  // shape: false,
  // src: "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png",
  // size: 36,
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const XSmallRactangleImage = styled.div`
  cursor: pointer;
  background-size: cover;

  --size: ${({ size }) => (size ? `${size}` : "15px")};
  width: var(--size);
  height: var(--size);
  ${({ padding }) => (padding ? `padding:  ${padding};` : "padding: 0;")};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 3px 5px;")};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 0px;"};
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid black;"};
  ${({ src }) =>
    src
      ? `background-image: url(${src});`
      : "background-image: url('https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png')"};
`;

const SmallRactangleImage = styled.div`
  cursor: pointer;
  background-size: cover;

  --size: ${({ size }) => (size ? `${size}` : "77px")};
  width: var(--size);
  height: var(--size);
  ${({ padding }) => (padding ? `padding:  ${padding};` : "padding: 0;")};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 20px;"};
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid black;"};
  ${({ src }) =>
    src
      ? `background-image: url(${src});`
      : "background-image: url('https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png')"};
`;

const MediumRactangleImage = styled.div`
  cursor: pointer;
  background-size: cover;

  --size: ${({ size }) => (size ? `${size}` : "153px")};
  width: var(--size);
  height: var(--size);
  ${({ padding }) => (padding ? `padding:  ${padding};` : "padding: 0;")};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")};
  ${({ borderRadius }) =>
    borderRadius
      ? `border-radius: ${borderRadius};`
      : "border-radius: 19.2px;"};
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid black;"};
  ${({ src }) =>
    src
      ? `background-image: url(${src});`
      : "background-image: url('https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png')"};
`;

const LargeRactangleImage = styled.div`
  cursor: pointer;
  background-size: cover;

  --size: ${({ size }) => (size ? `${size}` : "400px")};
  width: var(--size);
  height: var(--size);
  ${({ padding }) => (padding ? `padding:  ${padding};` : "padding: 0;")};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 20px;"};
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid black;"};
  ${({ src }) =>
    src
      ? `background-image: url(${src});`
      : "background-image: url('https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png')"};
`;

export default RactangleImage;
