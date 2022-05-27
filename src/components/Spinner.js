import React from "react";
import styled from "styled-components";
import RollingSpinner from "../shared/images/rollingSpinner.gif";

const Spinner = () => {
  return (
    <>
      <BadgeImg src={RollingSpinner} />
    </>
  );
};

const BadgeImg = styled.div`
  width: 3%;
  padding: 3%;
  ${({ src }) => `background-image: url(${src});`};
  background-position: center;
  background-size: cover;
`;
export default Spinner;
