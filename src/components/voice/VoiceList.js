import React, { useEffect } from "react";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { voiceActions } from "../../redux/modules/voice";

// 컴포넌트
import VoiceHeader from "../../components/voice/VoiceHeader";
import Audio from "./Audio";

const VoiceList = ({ voiceAlbumId, familyId, isEdit, PracticeEdit }) => {
  const dispatch = useDispatch();

  console.log("선택한 앨범Id:", voiceAlbumId);
  const voiceAlbumName = useSelector(
    (state) => state.voice.voiceList.voiceAlbumName
  );

  const voiceList = useSelector((state) => state.voice.voiceList.voiceFileList);

  console.log("선택한 음성리스트:", voiceList);

  useEffect(() => {
    dispatch(voiceActions.getVoiceListDB(voiceAlbumId));
  }, [voiceList?.length]);

  return (
    <>
      <VoiceHeader
        voiceAlbumId={voiceAlbumId}
        familyId={familyId}
        PracticeEdit={PracticeEdit}
        isEdit={isEdit}
        voiceAlbumName={voiceAlbumName}
      />
      {voiceList?.map((v) => {
        return (
          <Audio
            key={v.voiceFileId}
            voiceAlbumId={voiceAlbumId}
            familyId={familyId}
            isEdit={isEdit}
            PracticeEdit={PracticeEdit}
            voiceList={v}
          ></Audio>
        );
      })}
    </>
  );
};

export default VoiceList;
