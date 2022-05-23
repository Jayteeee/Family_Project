import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import dayjs from "dayjs";
import { MdAdd } from "react-icons/md";

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
          fontWeight="600"
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
            bg="#6371F7"
            color="#fff"
            width="159px"
            height="56px"
            hover="#6971b2"
            margin="10px 0 0 0"
            onClick={handleModal}
            className="res-missionBtn"
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                fontWeight: "600",
                marginBottom: "1px",
              }}
            >
              <span
                style={{
                  fontSize: "25px",
                  margin: "0px 5px 3px 0",
                }}
              >
                +
              </span>
              미션 추가
            </div>
          </Button>
        </AddMissionBtn>
      </MissionHeaderBox>
      <MissionLowerHeader>
        <Text
          size="24px"
          fontWeight="600"
          margin="5px 0 0 0"
          className="missionMonth"
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
  margin: 15px 20px 10px 20px;
  padding: 16px 20px;
  // Medium (Desktop)
  @media only screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 10px 10px 10px 10px;
  }
  // Small (Tablet)
  @media only screen and (max-width: 839px) {
    margin: 20px 10px 10px 10px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 10px;
    margin: 10px 6px 5px 6px;
    .res-missionHeaderBox {
      font-size: 30px;
    }
    .res-missionBtn {
      width: 130px;
      height: 40px;
    }
  }
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

  // Medium (Desktop)
  @media only screen and (max-width: 1199px) {
    /* margin: 10px; */
    .missionMonth {
    }
    /* margin: 0px 0 15px 0px !important;
    display: flex !important;
    text-align: right !important;
    padding: 0; */
    /* justify-content: center !important; */
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    margin: 10px;
  }
  // Small (Tablet)
  @media only screen and (max-width: 839px) {
    display: flex !important;
    text-align: right !important;
    padding: 0px 10px;
    .missionMonth {
      font-size: 20px;
    }
    /* justify-content: center !important; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    margin: 5px 10px 25px 10px !important;
  }
`;

export default MissionHeader;
