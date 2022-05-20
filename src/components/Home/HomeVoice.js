import React, { useState, useRef, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdPlayArrow, MdOutlinePause } from "react-icons/md";
import dayjs from "dayjs";

// 리덕스
import { history } from "../../redux/configureStore";

// 엘리먼트
import { Text } from "../../elements";

// 이미지
import noImage from "../../shared/images/noImage.png";
import albumCover1 from "../../shared/images/albumCover1.svg";
import albumCover2 from "../../shared/images/albumCover2.svg";
import albumCover3 from "../../shared/images/albumCover3.svg";
import albumCover4 from "../../shared/images/albumCover4.svg";

const HomeVoice = ({ recentVoiceFile, voiceAlbumInfo }) => {
  const v = recentVoiceFile;
  const voiceAlbumCover = voiceAlbumInfo?.voiceAlbumCover;
  console.log(voiceAlbumCover);
  const [run, setRun] = useState(false);
  const [count, setCount] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [sound, setSound] = useState();

  const myRef = useRef();

  const timer = () => {
    // const checkMinutes = Math.floor(count / 60);
    // const minutes = [checkMinutes & 60];
    // const seconds = [count % 60];
    const minutes = [Math.floor(myRef.current?.currentTime / 60)];
    const seconds = [Math.floor(myRef.current?.currentTime)];

    setCount(seconds);
    setCurrentMinutes(minutes);
    setCurrentSeconds(seconds);
  };

  const play = () => {
    let isPlaying =
      myRef.current?.currentTime > 0 &&
      !myRef.current?.paused &&
      !myRef.current?.ended;
    if (!isPlaying) {
      timer();
      myRef.current.play();
    }
  };

  const pause = () => {
    let isPlaying =
      myRef.current?.currentTime > 0 &&
      !myRef.current?.paused &&
      !myRef.current?.ended;
    if (isPlaying) {
      myRef.current.pause();
    }
  };

  useEffect(() => {
    if (myRef.current?.currentTime > 0 && myRef.current?.ended) {
      setRun(false);
    }
  }, []);

  return (
    <>
      <Container>
        <Figure key={v?.voiceFileId}>
          <VoiceWrap>
            <VoiceBox>
              <Text S2 className="homeVoiceTitle">
                {v?.voiceTitle}
              </Text>
              <Text className="voiceUser">
                {v?.familyMemberNickname}님이 음성메시지를 보냈어요!
              </Text>
              <div
                style={{
                  width: "18%",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "5px",
                  position: "relative",
                }}
              >
                <PlayBtnImg
                  src={
                    voiceAlbumCover === "albumCover1"
                      ? albumCover1
                      : voiceAlbumCover === "albumCover2"
                      ? albumCover2
                      : voiceAlbumCover === "albumCover3"
                      ? albumCover3
                      : voiceAlbumCover === "albumCover4"
                      ? albumCover4
                      : noImage
                  }
                />
                <PlayBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    setRun(!run);
                    // play.bind(this, v?.voiceFile)();
                  }}
                >
                  {!run && sound === v?.voiceFile ? (
                    <MdOutlinePause
                      onClick={() => {
                        pause();
                        // handlePlay();
                      }}
                    />
                  ) : (
                    <MdPlayArrow
                      onClick={() => {
                        setSound(v?.voiceFile);
                        play();
                        // play.bind(this, v?.voiceFile)();
                        // handlePlay();
                      }}
                    />
                  )}
                </PlayBtn>
              </div>
              <audio ref={myRef} src={sound} />
              <Text S3 className="homeVoiceRunTime">
                {sound === v?.voiceFile && currentMinutes[0] < 10
                  ? `0${currentMinutes[0]}`
                  : sound === v?.voiceFile && currentMinutes[0] >= 10
                  ? currentMinutes[0]
                  : "00"}{" "}
                :{" "}
                {sound === v?.voiceFile && currentSeconds[0] < 10
                  ? `0${currentSeconds[0]}`
                  : sound === v?.voiceFile && currentSeconds[0] >= 10
                  ? currentSeconds[0]
                  : "00"}{" "}
                /{" "}
                {`0${Math.floor(v?.voicePlayTime / 60)} :  ${
                  v?.voicePlayTime % 60 < 10
                    ? `0${v?.voicePlayTime % 60}`
                    : v?.voicePlayTime % 60
                }`}
              </Text>
            </VoiceBox>
          </VoiceWrap>
        </Figure>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 90%;
  height: 100%;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    /* column-count: 1; */
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    /* column-count: 1;
    padding: 24px; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    /* column-count: 1;
    padding: 8px; */
  }
`;

const Figure = styled.div`
  break-inside: avoid;
  width: 100%;
`;

const VoiceWrap = styled.div`
  width: 100%;

  /* height: 100%; */
  background-color: transparent;
  margin-top: 7%;
  .homeVoiceTitle {
    font-size: 28px;
    font-weight: 600;
    padding: 1%;
  }
  .voiceUser {
    font-size: 16px;
    color: #757575;
    padding: 3%;
  }
  .homeVoiceRunTime {
    font-size: 10px;
    font-weight: 600;
    color: #757575;
  }

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const VoiceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  /* height: 100%; */
  width: 100%;
  background-color: transparent;
`;

const PlayBtnImg = styled.div`
  width: 100%;
  padding: 100%;
  ${({ src }) => `background-image: url(${src});`};
  margin-top: 30%;
  border-radius: 10px;
  background-position: center;
  background-size: cover;
  filter: brightness(70%);
`;

const PlayBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  height: 40%;
  width: 90%;
  border: 5px solid #fff;
  border-radius: 50%;
  position: absolute;
  top: 36%;
  cursor: pointer;
  & > svg {
    width: 80%;
    height: 80%;
  }
`;

export default HomeVoice;
