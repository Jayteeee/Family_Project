import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { Howl, Howler } from "howler";

// 엘리먼트
import { Text } from "../elements";

// 모달
import { ModalPortal } from "../shared/modal/portals";
import { AddVoiceModal } from "../shared/modal/component/voiceModal";
import { voiceActions } from "../redux/modules/voice";
import { useDispatch, useSelector } from "react-redux";
import { VoiceHeader } from "../components/voice";

const VoiceFilePage = ({ missionStatus, familyId }) => {
  const dispatch = useDispatch();
  // 배지 목록 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const getVoiceList = () => {
    dispatch(voiceActions.getVoiceListDB(familyId));
  };

  const list = useSelector((state) => state.voice.voiceList);
  console.log(list);

  // useEffect(() => {
  //   dispatch(voiceActions.getVoiceListDB(familyId));
  // }, []);

  return (
    <VoicePageWrap>
      <VoiceHeader></VoiceHeader>
      <VoiceAlbumWrap className="res-missionStatusBox">
        <TwoStatusBox className="res-twoStatusBox">
          <StatusBox
            className="res-statusBox"
            onClick={() => {
              getVoiceList();
            }}
          ></StatusBox>
          <StatusBox
            className="res-statusBox"
            onClick={() => {
              getVoiceList();
            }}
          ></StatusBox>
        </TwoStatusBox>
        <TwoStatusBox className="res-twoStatusBox">
          <StatusBox
            className="res-statusBox"
            onClick={() => {
              getVoiceList();
            }}
          ></StatusBox>
          <StatusBox
            className="res-statusBox"
            onClick={() => {
              getVoiceList();
            }}
          ></StatusBox>
        </TwoStatusBox>
      </VoiceAlbumWrap>
      {/* 배지 목록 모달 */}
      <ModalPortal>
        {modalOn && (
          <AddVoiceModal
            onClose={handleModal}
            familyId={familyId}
          ></AddVoiceModal>
        )}
      </ModalPortal>
    </VoicePageWrap>
  );
};
const VoicePageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const VoiceAlbumWrap = styled.div`
  display: flex;
  text-align: left;
  justify-content: flex-start;
  border-radius: 20px;
  border: none;
  background: transparent;
  margin: 0 40px;
`;

const TwoStatusBox = styled.div`
  display: flex;
  width: 100%;
  @media only screen and (max-width: 1199px) {
    flex-wrap: wrap;
  }
`;

const StatusBox = styled.div`
  display: flex;
  text-align: left;
  background: #fff;
  align-items: center;
  margin: 10px 10px;
  padding: 20px 40px;
  width: 100%;
  height: 368px;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 0px 3px 0px #d6d6d6;
  &:hover {
    background: #f8f8f8;
  }
`;

export default VoiceFilePage;
