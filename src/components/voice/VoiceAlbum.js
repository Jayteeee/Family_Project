import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { Howl, Howler } from "howler";

// 라우터, 리덕스
import { history } from "../../redux/configureStore";

// 엘리먼트
import { Text } from "../../elements";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { BadgeModal } from "../../shared/modal/component/MissionModal";
import { voiceActions } from "../../redux/modules/voice";
import { useDispatch, useSelector } from "react-redux";

const VoiceAlbum = ({ missionStatus, familyId }) => {
  const dispatch = useDispatch();
  // const voiceAlbumId = useSelector(
  //   (state) => state.voice?.nowVoiceData[0]?.voiceAlbumId
  // );
  const voiceAlbumId = useSelector((state) => state.voice);
  // 배지 목록 모달
  const [modalOn, setModalOn] = useState(false);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const getVoiceList = () => {
    dispatch(voiceActions.getVoiceListDB(familyId));
  };

  return (
    <>
      <MissionStatusWrap>
        <Content>
          <Flexbox>
            <Items>
              <AlbumBox
                onClick={() => {
                  getVoiceList();
                  history.push(`/family/${familyId}/voiceMsg/${voiceAlbumId}`);
                }}
              >
                Album
              </AlbumBox>
            </Items>
            <Items>
              <AlbumBox>Album</AlbumBox>
            </Items>
            <Items>
              <AlbumBox>Album</AlbumBox>
            </Items>
            <Items>
              <AlbumBox>Album</AlbumBox>
            </Items>
            <Items>
              <AlbumBox>Album</AlbumBox>
            </Items>
            <Items>
              <AlbumBox>Album</AlbumBox>
            </Items>
            <Items>
              <AlbumBox>Album</AlbumBox>
            </Items>
            <Items>
              <AlbumBox>Album</AlbumBox>
            </Items>
          </Flexbox>
        </Content>
      </MissionStatusWrap>
      {/* 배지 목록 모달 */}
      <ModalPortal>
        {modalOn && (
          <BadgeModal onClose={handleModal} familyId={familyId}></BadgeModal>
        )}
      </ModalPortal>
    </>
  );
};

const MissionStatusWrap = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
  border-radius: 20px;
  border: none;
  background: transparent;
  margin: 0px 40px;
`;
const Content = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;
const Flexbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
`;
const Items = styled.div`
  flex-basis: auto;
  flex-shrink: 0;
  flex-grow: 1;
  background-color: #fff;
  margin: 20px 0px 20px 0px;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;
const AlbumBox = styled.div`
  display: block;
  width: 300px;
  padding-bottom: 90%;
`;

export default VoiceAlbum;
