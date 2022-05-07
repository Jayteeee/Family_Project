import React, { useEffect } from "react";
import styled from "styled-components";
import {
  VoiceAlbum,
  VoiceHeader,
  GradientCircleProgressbar,
} from "../components/voice";
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
        <GradientCircleProgressbar
          percentage="40"
          primaryColor={["#8C98F8", "#8C98F8"]}
        />
        {/* <VoiceHeader></VoiceHeader>
        <VoiceAlbum familyId={familyId}></VoiceAlbum> */}
      </VoicePageWrap>
    </>
  );
};

const VoicePageWrap = styled.div`
  /* position: relative; */
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  // ------- 테스트 //
  justify-content: center;
  align-items: center;
`;

export default VoiceMsgPage;
