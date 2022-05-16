import React, { useState, useEffect, useRef } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdRemoveCircle, MdPlayArrow, MdOutlinePause } from "react-icons/md";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

// 엘리먼트
import { Text } from "../../elements";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { voiceActions } from "../../redux/modules/voice";
import { history } from "../../redux/configureStore";

// 이미지
import noImage from "../../shared/images/noImage.png";
import VoiceHeader from "../../components/voice/VoiceHeader";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { DeleteVoiceModal } from "../../shared/modal/component/voiceModal";

const VoiceList = ({ voiceAlbumId, familyId, isEdit, PracticeEdit }) => {
  const dispatch = useDispatch();

  console.log("선택한 앨범Id:", voiceAlbumId);
  const voiceAlbumName = useSelector(
    (state) => state.voice.voiceList.voiceAlbumName
  );

  const voiceList = useSelector((state) => state.voice.voiceList.voiceFileList);

  console.log("선택한 앨범 사진리스트:", voiceList);

  const [modalOn, setModalOn] = useState(false);
  const [run, setRun] = useState(false);
  const [count, setCount] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [voiceFileId, setVoiceFileId] = useState("");
  const [sound, setSound] = useState();

  // const intervalRef = React.useRef(null);

  const handleFileId = (voiceId) => {
    // const { id } = e.target;
    setVoiceFileId(voiceId);
    setModalOn(!modalOn);
  };

  console.log(voiceFileId);
  // const start = () => {
  //   intervalRef.current = setInterval(async () => {
  //     setCount((c) => c + 1);
  //   }, 3000);
  // };

  // const end = () => {
  //   clearInterval(intervalRef.current);
  //   setCount(0);
  // };
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

  // const handlePlay = () => {
  //   // myRef.current.play();
  //   const audio = new Audio(sound);
  //   console.log(audio.currentTime);
  //   let isPlaying = audio?.currentTime > 0 && !audio?.paused && !audio?.ended;
  //   if (audio.paused) {
  //     // start();e
  //     timer();
  //     audio.play();
  //   } else {
  //     setCount(0);
  //     console.log("중지");
  //     audio.pause();
  //     audio.currentTime = 0;
  //   }
  //   setDisabled(true);
  // };
  const play = () => {
    // myRef.current.play();
    let isPlaying =
      myRef.current?.currentTime > 0 &&
      !myRef.current?.paused &&
      !myRef.current?.ended;
    // let isPlaying = audio?.currentTime > 0 && !audio?.paused && !audio?.ended;
    // console.log(audio.currentTime);
    if (!isPlaying) {
      // start();
      timer();
      // setSound();
      // audio.play();
      myRef.current.play();
    }
    setDisabled(true);
  };

  const pause = () => {
    let isPlaying =
      myRef.current?.currentTime > 0 &&
      !myRef.current?.paused &&
      !myRef.current?.ended;
    // let isPlaying = audio?.currentTime > 0 && !audio?.paused && !audio?.ended;
    // console.log(audio.currentTime);
    if (isPlaying) {
      // end();
      setCount(0);
      myRef.current.pause();
      // audio.pause();
    }
    setDisabled(false);
  };
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    dispatch(voiceActions.getVoiceListDB(voiceAlbumId));
    timer();
  }, [myRef.current?.currentTime]);

  return (
    <>
      <VoiceHeader
        voiceAlbumId={voiceAlbumId}
        familyId={familyId}
        PracticeEdit={PracticeEdit}
        isEdit={isEdit}
        voiceAlbumName={voiceAlbumName}
      />
      {!isEdit ? (
        <Container>
          {voiceList?.map((v) => {
            return (
              <Figure key={v.voiceFileId}>
                <VoiceWrap>
                  <VoiceBox>
                    <NonePlayer>
                      <ProfileBox>
                        <img
                          alt="#"
                          src={v.profileImg ? v.profileImg : noImage}
                        />
                        <p>{v.familyMemberNickname}</p>
                      </ProfileBox>
                      <TitleBox>
                        <Text S2 className="voiceTitle">
                          {v.voiceTitle}
                        </Text>
                        <Text B1 style={{ color: "#757575" }}>
                          {dayjs(v.createdAt).format("YYYY-MM-DD")}
                        </Text>
                      </TitleBox>
                    </NonePlayer>
                    <PlayBox>
                      <ProgressBar>
                        <PercentBar
                          width={
                            sound === v.voiceFile
                              ? (count / v.voicePlayTime) * 100 + "%"
                              : 0
                          }
                        ></PercentBar>
                        <Dot></Dot>
                      </ProgressBar>
                      <audio ref={myRef} src={sound} />
                      <RunTime>
                        <Text S3>
                          {sound === v.voiceFile && currentMinutes[0] < 10
                            ? `0${currentMinutes[0]}`
                            : sound === v.voiceFile && currentMinutes[0] >= 10
                            ? currentMinutes[0]
                            : "00"}{" "}
                          :{" "}
                          {sound === v.voiceFile && currentSeconds[0] < 10
                            ? `0${currentSeconds[0]}`
                            : sound === v.voiceFile && currentSeconds[0] >= 10
                            ? currentSeconds[0]
                            : "00"}{" "}
                          /{" "}
                          {`0${Math.floor(v.voicePlayTime / 60)} :  ${
                            v.voicePlayTime % 60 < 10
                              ? `0${v.voicePlayTime % 60}`
                              : v.voicePlayTime % 60
                          }`}
                        </Text>
                      </RunTime>
                    </PlayBox>
                    <PlayBtn
                      onClick={(e) => {
                        e.stopPropagation();
                        setRun(!run);
                        // play.bind(this, v?.voiceFile)();
                      }}
                    >
                      {!run && sound === v.voiceFile ? (
                        <MdOutlinePause
                          onClick={() => {
                            pause();
                            // handlePlay();
                          }}
                        />
                      ) : (
                        <MdPlayArrow
                          onClick={() => {
                            setSound(v.voiceFile);
                            play();
                            // play.bind(this, v?.voiceFile)();
                            // handlePlay();
                          }}
                        />
                      )}
                    </PlayBtn>
                  </VoiceBox>
                  <MobilePlayBox>
                    <ProgressBar>
                      <PercentBar
                        width={
                          sound === v.voiceFile
                            ? (count / v.voicePlayTime) * 100 + "%"
                            : 0
                        }
                      ></PercentBar>
                      <Dot></Dot>
                    </ProgressBar>
                    <audio ref={myRef} src={sound} />
                    <RunTime>
                      <Text S3>
                        {sound === v.voiceFile && currentMinutes[0] < 10
                          ? `0${currentMinutes[0]}`
                          : sound === v.voiceFile && currentMinutes[0] >= 10
                          ? currentMinutes[0]
                          : "00"}{" "}
                        :{" "}
                        {sound === v.voiceFile && currentSeconds[0] < 10
                          ? `0${currentSeconds[0]}`
                          : sound === v.voiceFile && currentSeconds[0] >= 10
                          ? currentSeconds[0]
                          : "00"}{" "}
                        /{" "}
                        {`0${Math.floor(v.voicePlayTime / 60)} :  ${
                          v.voicePlayTime % 60 < 10
                            ? `0${v.voicePlayTime % 60}`
                            : v.voicePlayTime % 60
                        }`}
                      </Text>
                    </RunTime>
                  </MobilePlayBox>
                </VoiceWrap>
              </Figure>
            );
          })}
        </Container>
      ) : (
        <Container>
          {voiceList?.map((v) => {
            return (
              <EditFigure key={v.voiceFileId}>
                <VoiceBox
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <DeleteIcon onClick={handleFileId.bind(this, v.voiceFileId)}>
                    <MdRemoveCircle />
                  </DeleteIcon>
                  <NonePlayer>
                    <ProfileBox>
                      <img
                        alt="#"
                        src={v.profileImg ? v.profileImg : noImage}
                      />
                      <p>{v.familyMemberNickname}</p>
                    </ProfileBox>
                    <TitleBox>
                      <Text S2>{v.voiceTitle}</Text>
                      <Text B1 style={{ color: "#757575" }}>
                        {dayjs(v.createdAt).format("YYYY-MM-DD")}
                      </Text>
                    </TitleBox>
                  </NonePlayer>
                  <PlayBox>
                    <ProgressBar>
                      <PercentBar
                        width={
                          sound === v.voiceFile
                            ? (count / v.voicePlayTime) * 100 + "%"
                            : 0
                        }
                      ></PercentBar>
                      <Dot></Dot>
                    </ProgressBar>
                    <audio ref={myRef} srcObject={v.voiceFile} />
                    <RunTime>
                      <Text S3>
                        {sound === v.voiceFile && currentMinutes[0] < 10
                          ? `0${currentMinutes[0]}`
                          : sound === v.voiceFile && currentMinutes[0] >= 10
                          ? currentMinutes[0]
                          : "00"}{" "}
                        :{" "}
                        {sound === v.voiceFile && currentSeconds[0] < 10
                          ? `0${currentSeconds[0]}`
                          : sound === v.voiceFile && currentSeconds[0] >= 10
                          ? currentSeconds[0]
                          : "00"}{" "}
                        /{" "}
                        {`0${Math.floor(v.voicePlayTime / 60)} :  ${
                          v.voicePlayTime % 60 < 10
                            ? `0${v.voicePlayTime % 60}`
                            : v.voicePlayTime % 60
                        }`}
                      </Text>
                    </RunTime>
                  </PlayBox>
                  <PlayBtn
                    onClick={(e) => {
                      e.stopPropagation();
                      setRun(!run);
                    }}
                  >
                    {!run ? (
                      <MdPlayArrow
                        onClick={() => {
                          // play();
                        }}
                      />
                    ) : (
                      <MdOutlinePause
                        onClick={() => {
                          // pause();
                        }}
                      />
                    )}
                  </PlayBtn>
                </VoiceBox>
              </EditFigure>
            );
          })}
        </Container>
      )}
      <ModalPortal>
        {modalOn && (
          <DeleteVoiceModal
            onClose={handleModal}
            voiceFileId={voiceFileId}
          ></DeleteVoiceModal>
        )}
      </ModalPortal>
    </>
  );
};

const Container = styled.div`
  padding: 40px;
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    column-count: 1;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    column-count: 1;
    padding: 24px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    column-count: 1;
    padding: 16px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const Figure = styled.div`
  break-inside: avoid;
  &:hover {
    border-radius: 13px;
    transition: all 300ms ease-in;
    filter: brightness(70%);
  }
`;

const VoiceWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 166px;
  width: 100%;
  background-color: #fff;
  padding: 40px;
  margin: 16px 0;
  border-radius: 20px;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    padding: 16px;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 0 24px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const VoiceBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

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

const NonePlayer = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 100%;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  & > img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }
  & > p {
    white-space: nowrap;
  }

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    /* display: none; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    /* max-width: 130px; */
    & > img {
      height: 45px;
      width: 45px;
      border-radius: 50%;
    }
    & > p {
      font-size: 14px;
      margin-top: 10px;
      white-space: nowrap;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow-x: scroll;

  /* width: 300px; */
  margin: 0px 40px;
  & > p {
    margin: 15px 0;
  }
  .voiceTitle {
    font-size: 20px;
    /* width: 35%; */
    /* overflow-x: scroll; */
  }

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    margin: 0px 20px;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    /* display: none; */
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    & > p {
      font-size: 14px;
      font-weight: 600;
    }
    width: 180px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 150px;
  }
`;

const PlayBox = styled.div`
  display: flex;
  width: 60%;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    width: 80%;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    display: none;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const MobilePlayBox = styled.div`
  display: none;
  width: 100%;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    display: flex;
    flex-direction: column;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const ProgressBar = styled.div`
  background-color: #eee;
  width: 100%;
  height: 6px;
  display: flex;
  align-items: center;
  margin: auto 12px;
  border-radius: 20px;

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
    width: 70%;
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 74%;
    margin-left: 26%;
    height: 2px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const PercentBar = styled.div`
  background-color: #8f8f8f;
  width: ${(props) => props.width};
  height: 100%;
  transition: width 1s;
  border-radius: 20px;
`;

const Dot = styled.div`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: #292929;
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 20px;
    height: 20px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const RunTime = styled.div`
  margin: auto 12px;
  display: flex;
  align-items: center;
  width: 20%;
  /* justify-content: center; */
  & > p {
    font-size: 15px;
    white-space: nowrap;
  }

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 100%;
    & > p {
      font-size: 12px;
      margin-right: 16px;
      margin-top: 10px;
      margin-bottom: 16px;
    }
    justify-content: right;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const PlayBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 68px;
  min-width: 68px;
  border: 1px solid black;
  border-radius: 50%;
  cursor: pointer;
  & > svg {
    width: 80%;
    height: 80%;
  }

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    min-height: 45px;
    min-width: 45px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const EditFigure = styled.div`
  break-inside: avoid;
  filter: brightness(70%);

  &:hover {
    border-radius: 13px;
    transform: scale(1.02);
    transition: all 300ms ease-in;
    filter: brightness(70%);
  }
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  svg {
    width: 33.3px;
    height: 33.3px;
    margin: 14px 10px;
    color: #f0f0ff;
    &:hover {
      color: rgba(29, 28, 29, 1);
    }
  }
`;

export default VoiceList;
