import React, { useEffect } from "react";
import styled from "styled-components";
import { VoiceAlbum, VoiceHeader } from "../components/voice";
import { useDispatch } from "react-redux";

// 리덕스
import { useParams } from "react-router-dom";
import { voiceActions } from "../redux/modules/voice";

const VoiceMsgPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const familyId = params.familyId;

  useEffect(() => {
    dispatch(voiceActions.getVoicePage());
  }, []);
  return (
    <>
      <VoicePageWrap>
        <VoiceHeader></VoiceHeader>
        <VoiceAlbum familyId={familyId}></VoiceAlbum>
      </VoicePageWrap>
    </>
  );
};

const VoicePageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export default VoiceMsgPage;
