import React from "react";
import styled from "styled-components";

const CircleImage = (props) => {
  const { XS, S, M, L, ...styles } = props;

  if (XS) {
    return <XSmallCircleImg {...styles} />;
  }

  if (S) {
    return <SmallCircleImg {...styles} />;
  }

  if (M) {
    return <MediumCircleImg {...styles} />;
  }

  if (L) {
    return <LargeCircleImg {...styles} />;
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

const XSmallCircleImg = styled.div`
  cursor: pointer;
  background-size: cover;

  --size: ${({ size }) => (size ? `${size}` : "22px")};
  width: var(--size);
  height: var(--size);
  ${({ padding }) => (padding ? `padding:  ${padding};` : "padding: 0;")};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 100px;"};
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid black;"};
  ${({ src }) =>
    src
      ? `background-image: url(${src});`
      : "background-image: url('https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png')"};
`;

const SmallCircleImg = styled.div`
  cursor: pointer;
  background-size: cover;

  --size: ${({ size }) => (size ? `${size}` : "30px")};
  width: var(--size);
  height: var(--size);
  ${({ padding }) => (padding ? `padding:  ${padding};` : "padding: 0;")};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 100px;"};
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid black;"};
  ${({ src }) =>
    src
      ? `background-image: url(${src});`
      : "background-image: url('https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png')"};
`;

const MediumCircleImg = styled.div`
  cursor: pointer;
  background-size: cover;

  --size: ${({ size }) => (size ? `${size}` : "60px")};
  width: var(--size);
  height: var(--size);
  ${({ padding }) => (padding ? `padding:  ${padding};` : "padding: 0;")};
  ${({ margin }) => (margin ? `margin: ${margin};` : "margin: 0;")};
  ${({ borderRadius }) =>
    borderRadius ? `border-radius: ${borderRadius};` : "border-radius: 100px;"};
  ${({ borderColor }) =>
    borderColor
      ? `border: 1px solid ${borderColor};`
      : "border: 1px solid black;"};
  ${({ src }) =>
    src
      ? `background-image: url(${src});`
      : "background-image: url('https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png')"};
`;

const LargeCircleImg = styled.div`
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

export default CircleImage;
