import React from "react";
import styled from "styled-components";
import SimpleSlider from "./SimpleSlider";

const Description = () => {
  return (
    <Container className="res-cont">
      <SimpleSlider />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 24px;
`;

export default Description;
