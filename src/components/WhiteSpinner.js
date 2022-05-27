import React from "react";
import styled from "styled-components";
import RollingSpinner from "../shared/images/rollingSpinnerWhite.gif";

const WhiteSpinner = () => {
  return (
    <>
      <BadgeImg src={RollingSpinner} />
    </>
  );
};

const BadgeImg = styled.div`
  width: 7%;
  padding: 7%;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;
`;
export default WhiteSpinner;
