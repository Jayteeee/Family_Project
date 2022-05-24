import React, { useState, useEffect, useRef } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { RiArrowLeftSLine } from "react-icons/ri";
import { MdCancel, MdPlayArrow, MdOutlinePause } from "react-icons/md";
import { ReactMic } from "react-mic";
import lamejs from "lamejs";

// 모달
import { ModalPortal } from "../../portals";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { voiceActions } from "../../../../redux/modules/voice";
import { history } from "../../../../redux/configureStore";

// 엘리먼트
import { Button, Text, Input } from "../../../../elements";
import { GradientCircleProgressbar } from "../../../../components/voice";

const AddVoiceModal = ({ onClose, familyId, voiceAlbumId }) => {
  const dispatch = useDispatch();

  // border
  const [showBorder, setShowBorder] = useState(false);

  //  음성메시지 제목 관련
  const [voiceTitle, setVoiceTitle] = useState("");

  const handleVoiceTitle = (e) => {
    const { value } = e.target;
    setVoiceTitle(value);
  };
  const resetVoiceTitle = () => {
    setVoiceTitle("");
  };

  //--------------------오디오부분--------------//
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [sound, setSound] = useState();
  const [voiceFile, setVoiceFile] = useState();
  const [disabled, setDisabled] = useState(false);

  // ----------음성 전송 ------------//
  const AddVoice = () => {
    if (voiceTitle) {
      dispatch(
        voiceActions.addVoiceDB(
          familyId,
          voiceAlbumId,
          voiceTitle,
          voiceFile,
          count
          // formData
        )
      );
      console.log(audioUrl);
      onClose();
      setCount(0);
    } else {
      alert("음성메시지 제목을 입력하지 않았습니다.");
    }
  };

  const onRecAudio = () => {
    setCount(0); // 재녹음 시 타이머 초기화
    start(); // 타이머 시작
    setDisabled(true);

    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근한다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
      console.log(mediaRecorder);

      analyser.onaudioprocess = function (e) {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            setAudioUrl(e.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지 했을 때
  const offRecAudio = () => {
    console.log("녹음 중지");
    end();

    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = async function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
      setSound(URL.createObjectURL(e.data)); // File 정보 출력
      setVoiceFile(new File([e.data], "file", { type: e.data.type }));
    };

    // -------------------------------- 테스트
    let channels = 1; //1 for mono or 2 for stereo
    let sampleRate = 44100; //44.1khz (normal mp3 samplerate)
    let kbps = 128; //encode 128kbps mp3
    let mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);
    var mp3Data = [];

    let samples = new Int16Array(44100); //one second of silence (get your data from the source you have)
    let sampleBlockSize = 1152; //can be anything but make it a multiple of 576 to make encoders life easier

    for (var i = 0; i < samples.length; i += sampleBlockSize) {
      let sampleChunk = samples.subarray(i, i + sampleBlockSize);
      var mp3buf = mp3encoder.encodeBuffer(sampleChunk);
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }
    mp3buf = mp3encoder.flush(); //finish writing mp3

    if (mp3buf.length > 0) {
      mp3Data.push(new Int8Array(mp3buf));
    }

    var blob = new Blob(mp3Data, { type: "audio/mp3" });
    var url = window.URL.createObjectURL(blob);
    console.log("MP3 URl: ", url);

    // ----------------------------------------------------

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();

    setDisabled(false);
  };

  const myRef = useRef();

  const play = () => {
    // howler.play();
    myRef.current.play();
    console.log(myRef.current);
    setDisabled(true);
  };

  const pause = async () => {
    // howler.pause();

    await myRef.current.pause();
    setDisabled(false);
  };

  // -------------------타이머 부분-----------------------------

  const [count, setCount] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const intervalRef = React.useRef(null);

  const start = () => {
    intervalRef.current = setInterval(async () => {
      setCount((c) => c + 1);
    }, 1000);
  };

  const end = () => {
    clearInterval(intervalRef.current);
  };

  const timer = () => {
    const checkMinutes = Math.ceil(count / 60);
    const minutes = checkMinutes & 60;
    const seconds = count % 60;

    setCurrentMinutes(minutes);
    setCurrentSeconds(seconds);
  };

  // count의 변화에 따라 timer 함수 렌더링
  useEffect(timer, [count]);

  return (
    <>
      <ModalPortal>
        <Background
          className="flex-row"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
            // history.replace()
          }}
        >
          <Content
            // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
            onClick={(e) => {
              e.stopPropagation();
              setShowBorder(false);
            }}
          >
            <AddMissionWrap>
              <AddMissionHeader>
                <CancelBtn
                  className="flex-row"
                  onClick={() => {
                    onClose();
                  }}
                >
                  <RiArrowLeftSLine size={24} />
                </CancelBtn>
                <Text size="24px" fontWeight="600">
                  메시지 녹음하기
                </Text>
              </AddMissionHeader>
              <ReactMic
                record={!onRec}
                className="sinewave"
                strokeColor="#000"
                backgroundColor="#FFF"
                visualSetting="sinewave"
              ></ReactMic>
              <h1>
                {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes} :{" "}
                {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
              </h1>
              <ButtonBox>
                <Buttons>
                  <MdPlayArrow
                    onClick={() => {
                      play();
                    }}
                    disabled={disabled}
                  />
                </Buttons>
                <div>
                  <GradientCircleProgressbar
                    width={Number(80)}
                    percentage={
                      onRec ? 100 : (`${parseInt(count)}` / 180) * 100
                    }
                    primaryColor={["#F4CC4D", "#6371F7"]}
                    secondaryColor="#F5F5F5"
                    hidePercentageText
                    style={{
                      transition: "all ease 2s 0s",
                    }}
                  ></GradientCircleProgressbar>
                  {onRec ? (
                    <Playbtn
                      onClick={() => {
                        onRecAudio();
                      }}
                    />
                  ) : (
                    <Stopbtn
                      onClick={() => {
                        offRecAudio();
                      }}
                    />
                  )}
                </div>
                <Buttons>
                  <MdOutlinePause
                    onClick={() => {
                      pause();
                    }}
                    disabled={disabled}
                  />
                </Buttons>
              </ButtonBox>
              <audio ref={myRef} src={sound} />
              <InputBox show={showBorder}>
                <InsertBox>
                  <Text B2 color="#757575">
                    제목
                  </Text>
                  <Input
                    id="albumName"
                    size="24px"
                    onChange={handleVoiceTitle}
                    value={voiceTitle}
                    style={{
                      border: "none",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBorder(true);
                    }}
                  />
                </InsertBox>
                <ResetBox
                  show={showBorder}
                  onClick={(e) => {
                    e.stopPropagation();
                    resetVoiceTitle();
                  }}
                >
                  <MdCancel />
                </ResetBox>
              </InputBox>
              <ButtonWrap>
                <Button
                  M
                  onClick={onClose}
                  borderColor="transparent"
                  bg="#DBDBDB"
                  color="#757575"
                  width="96px"
                  height="56px"
                  margin="30px 0 0 0"
                  fontSize="18px"
                  fontWeight="600"
                  borderRadius="8px"
                >
                  취소
                </Button>
                <Button
                  M
                  onClick={AddVoice}
                  borderColor="transparent"
                  bg="#6371F7"
                  color="white"
                  width="96px"
                  height="56px"
                  margin="30px 0 0 10px"
                  fontSize="18px"
                  fontWeight="600"
                  borderRadius="8px"
                >
                  저장
                </Button>
              </ButtonWrap>
            </AddMissionWrap>
          </Content>
        </Background>
      </ModalPortal>
    </>
  );
};

const Background = styled.div`
  z-index: 206;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  audio {
    filter: sepia(20%) saturate(70%) grayscale(1) contrast(99%) invert(12%);
    width: 200px;
    height: 25px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 205;
  max-width: 470px;
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  padding: 14px;
  position: relative;
  overflow: scroll;
`;

const AddMissionWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 20px;
  width: 100%;
  background-color: #fff;
  height: 100%;
`;

const CancelBtn = styled.div`
  display: flex;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 15px;
  margin-top: 15px;
  color: #5c5c5c;
  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
`;

const AddMissionHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding-bottom: 40px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 76px;
  padding: 0 16px;
  border: ${({ show }) => (show ? `2px solid #6371F7` : `2px solid #E5E5E5`)};
  border-radius: 8px;
  margin-top: 24px;
`;

const InsertBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
  & > input:focus {
    box-shadow: none;
  }
  & > input:focus-visible {
    outline: none;
  }
`;

const ResetBox = styled.div`
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    display: ${({ show }) => (show ? null : "none")};
    width: 100%;
    height: 100%;
    color: #757575;
  }
`;

const ButtonBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  /* border-radius: 50%; */
  margin: auto;
  /* border: 6px solid black; */
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
`;

const Buttons = styled.div`
  margin: 0 60px;
  height: 14px;
  width: 100%;
  cursor: pointer;
  & > svg {
  }
`;

const Playbtn = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  top: 23%;
  left: 25%;
  border-radius: 50%;
  background-color: red;
  cursor: pointer;
`;

const Stopbtn = styled.button`
  position: absolute;
  width: 50%;
  height: 50%;
  top: 23%;
  left: 25%;
  border: none;
  border-radius: 10%;
  background-color: #c4c4c4;
  cursor: pointer;
`;

export default AddVoiceModal;
