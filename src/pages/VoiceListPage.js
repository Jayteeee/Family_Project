import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VoiceList } from "../components/voice";
import { useDispatch } from "react-redux";

// 리덕스
import { voiceActions } from "../redux/modules/voice";

const VoiceMsgPage = (props) => {
  const dispatch = useDispatch();
  const voiceAlbumId = props.match.params.voiceAlbumId;
  const familyId = props.match.params.familyId;
  const [isEdit, setIsEdit] = useState(false);

  const PracticeEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    dispatch(voiceActions.getVoicePage(familyId));
  }, []);

  return (
    <>
      <VoicePageWrap>
        <VoiceList
          voiceAlbumId={voiceAlbumId}
          PracticeEdit={PracticeEdit}
          isEdit={isEdit}
          familyId={familyId}
        ></VoiceList>
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
