import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VoiceList } from "../components/voice";

// 리덕스
import { useSelector } from "react-redux";
import { voiceActions } from "../redux/modules/voice";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";

const VoiceMsgPage = (props) => {
  const dispatch = useDispatch();
  const voiceAlbumId = props.match.params.voiceAlbumId;
  const familyId = props.match.params.familyId;

  useEffect(() => {
    dispatch(voiceActions.getVoicePage(familyId));
  }, []);

  // 토큰 없을 시 랜딩페이지로
  if (!sessionStorage.getItem("token")) {
    history.replace("/");
    localStorage.clear();
  }

  return (
    <>
      <VoicePageWrap>
        <VoiceList voiceAlbumId={voiceAlbumId} familyId={familyId}></VoiceList>
      </VoicePageWrap>
    </>
  );
};

const VoicePageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 40px);
  /* padding-bottom: 40px; */
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  // Medium (Desktop)
  @media only screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    height: 100%;
  }
  // Small (Tablet)
  @media only screen and (max-width: 839px) {
    height: 100%;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

export default VoiceMsgPage;
