import React from "react";
import styled from "styled-components";
import yellowface from "../shared/images/yellowface.svg";

const Spinner = () => {
  return (
    <>
      <Rogo src={yellowface} className="spinner" />
    </>
  );
};

const Rogo = styled.div`
  width: 3%;
  padding: 3%;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;

  animation: rotate_image 1.5s linear infinite;
  transform-origin: 50% 50%;

  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }
`;
export default Spinner;
