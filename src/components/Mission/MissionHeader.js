import React from "react";
import styled from "styled-components";
import { Text } from "../../elements/index";

const MissionHeader = () => {
  return (
    <>
      <MissionHeaderBox>
        <div>헤더</div>
      </MissionHeaderBox>
    </>
  );
};

const MissionHeaderBox = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: start;
  border-bottom: 1px solid rgba(29, 28, 29, 0.13);
  background: rgba(255, 255, 255, 1);
  width: 100%;
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
