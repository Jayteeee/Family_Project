import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VoiceAlbum } from "../components/voice";
import { useDispatch } from "react-redux";

// 리덕스
import { voiceActions } from "../redux/modules/voice";

const VoiceMsgPage = (props) => {
  const dispatch = useDispatch();

  const { familyId } = props.match?.params;
  const [isEdit, setIsEdit] = useState(false);

  const PracticeEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    dispatch(voiceActions.getVoicePage());
  }, []);

  return (
    <>
      <VoicePageWrap>
        <VoiceAlbum
          PracticeEdit={PracticeEdit}
          isEdit={isEdit}
          familyId={familyId}
        ></VoiceAlbum>
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
