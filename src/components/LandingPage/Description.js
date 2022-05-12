import React from "react";
import styled from "styled-components";
import SimpleSlider from "./SimpleSlider";

const Description = () => {
  return (
    <Container className="res-cont">
      <div>
        <SimpleSlider />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default Description;
