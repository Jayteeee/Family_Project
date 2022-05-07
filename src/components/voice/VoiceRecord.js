import React, { useEffect } from "react";
import styled from "styled-components";

function VoiceRecord() {
  useEffect(() => {}, []);

  return <VoiceRecordBox></VoiceRecordBox>;
}

const VoiceRecordBox = styled.div`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  margin: 20px 20px 10px 20px;
  padding: 16px 20px;
`;

export default VoiceRecord;
