import React from "react";
import styled from "styled-components";
import { Text } from "../../elements/index";

const MissionHeader = () => {
  return (
    <>
      <MissionHeaderBox>
        <div>5월</div>
      </MissionHeaderBox>
    </>
  );
};

const MissionHeaderBox = styled.div`
  cursor: pointer;
  text-align: left;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 0px 3px 0px #d6d6d6;
  background: #fff;
  margin: 20px 20px 10px 20px;
  padding: 16px 20px;
  &:hover {
    background: #f8f8f8;
  }
`;

const TagP = styled.p`
  font-weight: 600;
  text-align: end;
  color: #1264a3;
  font-size: 13px;
  &:hover {
    text-decoration: underline;
    color: #0b4c8c;
  }
`;

export default MissionHeader;
