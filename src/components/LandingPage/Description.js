import React from "react";
import styled from "styled-components";
import SimpleSlider from "./SimpleSlider";
import logo from "../../shared/images/homeRogo.svg";

const Description = () => {
  return (
    <Container className="res-cont">
      <Logo>
        <img src={logo}></img>
      </Logo>
      <DesBox>
        <SimpleSlider />
      </DesBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 100%;
  margin: 3%;
  border-radius: 8px;
`;

const Logo = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  width: 100%;
  height: 10%;
  img {
    height: 80px;
    width: 100%;
    @media only screen and (max-width: 839px) {
      margin-top: 20px;
    }
    @media screen and (max-width: 599px) {
      width: 116px;
      height: 40px;
      margin-top: 20px;
    }
  }
`;

const DesBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 90%;
`;

export default Description;
