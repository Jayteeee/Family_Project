import React from "react";
import styled from "styled-components";
import { Howl, Howler } from "howler";
import music from "../shared/voice/sound.mp3";
import VoiceRecord from "../components/VoiceRecord";

const VoiceMsgPage = () => {
  let sound = new Howl({
    src: [`${music}`],
    html5: true,
  });

  // sound.play();
  return (
    <>
      <div>음성메세지 페이지</div>
      <div>sound</div>
      <VoiceRecord></VoiceRecord>
    </>
  );
};

export default VoiceMsgPage;
