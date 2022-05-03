import React from "react";
import { MdOutlineAdd } from "react-icons/md";

// 라이브러리, 패키지
import styled from "styled-components";

// 엘리먼트
import { Text, Button } from "../../elements/index";

const MissionHeader = () => {
  return (
    <>
      <MissionHeaderBox>
        <Text size="40px" fontWeight="700">
          미션
        </Text>
        <AddMissionBtn>
          <Button
            M
            borderRadius="8px"
            borderColor="transparent"
            bg="#8C98F8"
            color="#fff"
            width="159px"
            height="56px"
            hover="#6971b2"
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "25px", margin: "0 5px 2px 0" }}>+</span>{" "}
              미션 추가
            </div>
          </Button>
        </AddMissionBtn>
      </MissionHeaderBox>
      <MissionLowerHeader>
        <Text size="24px" fontWeight="700">
          2022년 5월
        </Text>
      </MissionLowerHeader>
    </>
  );
};

const MissionHeaderBox = styled.div`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  margin: 20px 20px 10px 20px;
  padding: 16px 20px;
`;

const AddMissionBtn = styled.div`
  text-align: right;
  flex-grow: 1;
`;

const MissionLowerHeader = styled.div`
  text-align: left;
  border: none;
  background: transparent;
  margin: 10px 20px 10px 20px;
  padding: 0px 20px;
`;

export default MissionHeader;
