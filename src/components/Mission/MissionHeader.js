import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";

// 엘리먼트
import { Text, Button } from "../../elements/index";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { AddMissionModal } from "../../shared/modal/component/MissionModal";

const MissionHeader = (props) => {
  console.log(props);
  // 미션 추가하기 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  // 오늘자 년도와 달
  let nowMonth = dayjs(new Date()).format("YYYY년 M월");

  return (
    <>
      <MissionHeaderBox>
        <Text
          size="40px"
          fontWeight="700"
          margin="10px 0 0 0"
          className="res-missionHeaderBox"
        >
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
            onClick={handleModal}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "25px", margin: "2px 5px 0px 0" }}>
                +
              </span>{" "}
              미션 추가
            </div>
          </Button>
        </AddMissionBtn>
      </MissionHeaderBox>
      <MissionLowerHeader>
        <Text
          size="24px"
          fontWeight="700"
          margin="5px 15px 0 15px"
          className="res-missionMonth"
        >
          {nowMonth}
        </Text>
      </MissionLowerHeader>
      {/* 미션 추가 모달 */}
      <ModalPortal>
        {modalOn && <AddMissionModal onClose={handleModal}></AddMissionModal>}
      </ModalPortal>
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
