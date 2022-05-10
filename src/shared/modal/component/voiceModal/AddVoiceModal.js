import React, { useState, useContext, useEffect } from "react";
import { MissionContext } from "../../../../pages/MissionPage";

// 라이브러리, 패키지
import styled from "styled-components";
import { RiArrowLeftSLine } from "react-icons/ri";
import { MdRemoveCircle, MdPlayArrow, MdOutlinePause } from "react-icons/md";
// import ReactMic from "../../../../components/voice/ReactMic";
import { ReactMic } from "react-mic";

// 모달
import { ModalPortal } from "../../portals";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { voiceActions } from "../../../../redux/modules/voice";
import { history } from "../../../../redux/configureStore";

// 엘리먼트
import { Button, Text, Input } from "../../../../elements";
import { GradientCircleProgressbar } from "../../../../components/voice";

const AddVoiceModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [sound, setSound] = useState();

  // 현재 familyId
  const familyId = useContext(MissionContext);

  //  미션 제목 input
  const [voiceTitle, setVoiceTitle] = useState("");

  const handleVoiceTitle = (e) => {
    const { value } = e.target;
    setVoiceTitle(value);
  };

  const AddVoice = () => {
    if (voiceTitle) {
      dispatch(
        voiceActions.addVoiceDB(familyId, voiceTitle, audioUrl, sound, count)
      );
      onClose();
      setCount(0);
    } else {
      alert("미션 제목을 입력하지 않았습니다.");
    }
  };

  const onRecAudio = () => {
    setCount(0); // 재녹음 시 타이머 초기화
    start(); // 타이머 시작

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
    end();

    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();

    if (audioUrl) {
      URL.createObjectURL(audioUrl); // 출력된 링크에서 녹음된 오디오 확인 가능
    }

    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });

    setSound(sound); // File 정보 출력
  };

  // ------------------------------------------------

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
    const checkMinutes = Math.floor(count / 60);
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
                onStop={onRec}
                onData={!onRec}
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
                  <MdPlayArrow />
                </Buttons>
                <div>
                  <GradientCircleProgressbar
                    width="80"
                    percentage={
                      onRec ? 100 : (`${parseInt(count)}` / 180) * 100
                    }
                    primaryColor={["#F4CC4D", "#8C98F8"]}
                    secondaryColor="#F5F5F5"
                    hidePercentageText
                    style={{
                      transition: "all ease 2s 0s",
                    }}
                  ></GradientCircleProgressbar>
                  {onRec ? (
                    <Playbtn onClick={onRecAudio} />
                  ) : (
                    <Stopbtn onClick={offRecAudio} />
                  )}
                </div>
                <Buttons>
                  <MdOutlinePause />
                </Buttons>
              </ButtonBox>
              <MissionTitleBox>
                <Input
                  placeholder="제목을 입력하세요"
                  padding="15px"
                  margin="16px 0 0 0"
                  onChange={handleVoiceTitle}
                  borderColor="#DBDBDB"
                />
              </MissionTitleBox>
              <div>
                <Button
                  M
                  onClick={() => {
                    AddVoice();
                  }}
                  borderColor="transparent"
                  bg="#8C98F8"
                  color="white"
                  width="110px"
                  height="53px"
                  margin="14px 0 0 0"
                  fontSize="16px"
                  borderRadius="4px"
                >
                  저장하기
                </Button>
              </div>
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

const MissionTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  font-size: 18px;
  width: 100%;
`;

const AudioBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
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

const Buttons = styled.div`
  margin: 0 60px;
  height: 14px;
  width: 100%;
  /* & > svg {
    & > 
  } */
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
