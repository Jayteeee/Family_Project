import React from "react";
import styled from "styled-components";
import SimpleSlider from "./SimpleSlider";

const Description = () => {
  return (
    <Container>
      <div>로고</div>
      <br />
      <div>
        <SimpleSlider />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50em;
  height: 100%;
  padding: 2rem;
  margin: 5rem;
  background-color: green;
`;

export default Description;
