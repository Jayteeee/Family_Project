import React, { useState, useEffect, useRef } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdRemoveCircle, MdPlayArrow, MdOutlinePause } from "react-icons/md";
import { BsFillPauseFill } from "react-icons/bs";
import { RiPlayFill } from "react-icons/ri";
import dayjs from "dayjs";

// 엘리먼트
import { RactangleImage, Text } from "../../elements";

// 이미지
// import noImage from "../../shared/images/noImage.png";
import Profile01 from "../../shared/images/Profile01.svg";
import Profile02 from "../../shared/images/Profile02.svg";
import Profile03 from "../../shared/images/Profile03.svg";
import Profile04 from "../../shared/images/Profile04.svg";
import Profile05 from "../../shared/images/Profile05.svg";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { DeleteVoiceModal } from "../../shared/modal/component/voiceModal";

const Audio = ({ voiceAlbumId, familyId, isEdit, PracticeEdit, voiceList }) => {
  const v = voiceList;

  const [modalOn, setModalOn] = useState(false);
  const [run, setRun] = useState(true);
  const [count, setCount] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const myRef = useRef();

  const timer = () => {
    const minutes = [Math.floor(myRef.current?.currentTime / 60)];
    const seconds = [Math.floor(myRef.current?.currentTime)];
    setTimeout(() => {
      setCount(seconds);
    }, 50);
    setCurrentMinutes(minutes);
    setCurrentSeconds(seconds);
  };

  // let isPlaying =
  //   myRef.current?.currentTime > 0 &&
  //   !myRef.current?.paused &&
  //   !myRef.current?.ended;

  const [playBtnColor, setPlayBtnColor] = useState("");
  const [playBtnBackground, setPlayBtnBackground] = useState("");

  const handlePlay = async () => {
    if (run) {
      timer();
      setRun(false);
      play();
    } else {
      setRun(true);
      pause();
    }

    setDisabled(true);
  };

  const play = async () => {
    await myRef.current.load();
    await myRef.current.play();
    setDisabled(true);
  };

  const pause = async () => {
    setCount(0);
    await myRef.current.pause();
    setDisabled(false);
  };

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    timer();
  }, [count]);

  return (
    <>
      {!isEdit ? (
        <Container>
          <Figure>
            <VoiceWrap>
              <VoiceBox>
                <NonePlayer>
                  <ProfileBox>
                    <RactangleImage
                      S
                      alt="#"
                      src={
                        v.profileImg === "Profile01"
                          ? Profile01
                          : v.profileImg === "Profile02"
                          ? Profile02
                          : v.profileImg === "Profile03"
                          ? Profile03
                          : v.profileImg === "Profile04"
                          ? Profile04
                          : v.profileImg === "Profile05"
                          ? Profile05
                          : v.profileImg
                          ? v.profileImg
                          : Profile01
                      }
                      size="60px"
                      borderRadius="22px"
                      borderColor="none"
                      className="profileImage"
                    />
                    <p className="profileText">{v.familyMemberNickname}</p>
                  </ProfileBox>
                  <TitleBox>
                    <Text S2 className="voiceTitle">
                      {v.voiceTitle}
                    </Text>
                    <Text
                      B1
                      style={{ color: "#757575" }}
                      className="voiceCreatedAt"
                    >
                      {dayjs(v.createdAt).format("YYYY-MM-DD")}
                    </Text>
                  </TitleBox>
                </NonePlayer>
                <PlayBox>
                  <ProgressBar>
                    <PercentBar
                      width={(count / v.voicePlayTime) * 100 + "%"}
                    ></PercentBar>
                    <Dot></Dot>
                  </ProgressBar>
                  <audio ref={myRef} src={v.voiceFile} />
                  <RunTime>
                    <Text S3>
                      {currentMinutes[0] < 10
                        ? `0${currentMinutes[0]}`
                        : currentMinutes[0] >= 10
                        ? currentMinutes[0]
                        : "00"}{" "}
                      :{" "}
                      {currentSeconds[0] < 10
                        ? `0${currentSeconds[0]}`
                        : currentSeconds[0] >= 10
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
                <BtnBox>
                  <PlayBtn
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    color={playBtnColor}
                    background={playBtnBackground}
                  >
                    {!run ? (
                      <BsFillPauseFill
                        onClick={() => {
                          handlePlay();
                          setPlayBtnColor("#757575");
                          setPlayBtnBackground("#fff");
                        }}
                      />
                    ) : (
                      <RiPlayFill
                        onClick={() => {
                          handlePlay();
                          setPlayBtnColor("#fff");
                          setPlayBtnBackground("#757575");
                        }}
                      />
                    )}
                  </PlayBtn>
                </BtnBox>
              </VoiceBox>
              <MobilePlayBox>
                <ProgressBar>
                  <PercentBar
                    width={(count / v.voicePlayTime) * 100 + "%"}
                  ></PercentBar>
                  <Dot></Dot>
                </ProgressBar>
                <audio ref={myRef} src={v.voiceFile} />
                <RunTime>
                  <Text S3>
                    {currentMinutes[0] < 10
                      ? `0${currentMinutes[0]}`
                      : currentMinutes[0] >= 10
                      ? currentMinutes[0]
                      : "00"}{" "}
                    :{" "}
                    {currentSeconds[0] < 10
                      ? `0${currentSeconds[0]}`
                      : currentSeconds[0] >= 10
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
        </Container>
      ) : (
        <Container>
          <EditFigure>
            <EditVoiceWrap>
              <VoiceBox
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <DeleteIcon
                  onClick={() => {
                    handleModal();
                  }}
                >
                  <MdRemoveCircle />
                </DeleteIcon>
                <NonePlayer>
                  <ProfileBox>
                    <RactangleImage
                      S
                      alt="#"
                      src={
                        v.profileImg === "Profile01"
                          ? Profile01
                          : v.profileImg === "Profile02"
                          ? Profile02
                          : v.profileImg === "Profile03"
                          ? Profile03
                          : v.profileImg === "Profile04"
                          ? Profile04
                          : v.profileImg === "Profile05"
                          ? Profile05
                          : v.profileImg
                          ? v.profileImg
                          : Profile01
                      }
                      size="60px"
                      borderRadius="22px"
                      borderColor="none"
                      className="profileImage"
                    />
                    <p className="profileText">{v.familyMemberNickname}</p>
                  </ProfileBox>
                  <TitleBox>
                    <Text S2 className="voiceTitle">
                      {v.voiceTitle}
                    </Text>
                    <Text
                      B1
                      style={{ color: "black" }}
                      className="voiceCreatedAt"
                    >
                      {dayjs(v.createdAt).format("YYYY-MM-DD")}
                    </Text>
                  </TitleBox>
                </NonePlayer>
                <PlayBox>
                  <ProgressBar>
                    <PercentBar
                      width={(count / v.voicePlayTime) * 100 + "%"}
                    ></PercentBar>
                    <Dot></Dot>
                  </ProgressBar>
                  <audio ref={myRef} src={v.voiceFile} />
                  <RunTime>
                    <Text S3>
                      {currentMinutes[0] < 10
                        ? `0${currentMinutes[0]}`
                        : currentMinutes[0] >= 10
                        ? currentMinutes[0]
                        : "00"}{" "}
                      :{" "}
                      {currentSeconds[0] < 10
                        ? `0${currentSeconds[0]}`
                        : currentSeconds[0] >= 10
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
                    // setRun(!run);
                  }}
                >
                  {run ? (
                    <RiPlayFill
                      onClick={() => {
                        // play();
                      }}
                    />
                  ) : (
                    <BsFillPauseFill
                      onClick={() => {
                        // pause();
                      }}
                    />
                  )}
                </PlayBtn>
              </VoiceBox>
              <MobilePlayBox>
                <ProgressBar>
                  <PercentBar
                    width={(count / v.voicePlayTime) * 100 + "%"}
                  ></PercentBar>
                  <Dot></Dot>
                </ProgressBar>
                <audio ref={myRef} src={v.voiceFile} />
                <RunTime>
                  <Text S3>
                    {currentMinutes[0] < 10
                      ? `0${currentMinutes[0]}`
                      : currentMinutes[0] >= 10
                      ? currentMinutes[0]
                      : "00"}{" "}
                    :{" "}
                    {currentSeconds[0] < 10
                      ? `0${currentSeconds[0]}`
                      : currentSeconds[0] >= 10
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
            </EditVoiceWrap>
          </EditFigure>
        </Container>
      )}
      <ModalPortal>
        {modalOn && (
          <DeleteVoiceModal
            onClose={handleModal}
            voiceFileId={v.voiceFileId}
            familyId={familyId}
          ></DeleteVoiceModal>
        )}
      </ModalPortal>
    </>
  );
};

const Container = styled.div`
  padding: 10px 40px;
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
  min-width: 895px;
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    padding: 24px;
    min-width: 100%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    padding: 0 24px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 0 24px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    padding: 0 16px;
  }
`;

const EditVoiceWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 166px;
  width: 100%;
  min-width: 895px;
  background: #757575;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15), 0px 0px 24px rgba(0, 0, 0, 0.05);

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    padding: 24px;
    min-width: 100%;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    padding: 0 24px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding: 0 24px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    padding: 0 16px;
  }
`;

const VoiceBox = styled.div`
  display: flex;
  height: 100%;
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
    margin-top: 24px;
    align-items: flex-start;
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

  // Small (Tablet)
  @media screen and (max-width: 839px) {
    width: 100%;
    align-items: flex-start;
  }
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

  & > p {
    white-space: nowrap;
    font-size: 16px;
    margin-top: 10px;
  }

  .profileText {
    font-weight: 600;
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
    /* max-width: 130px; */
    .profileImage {
      height: 40px;
      width: 40px;
      border-radius: 12px;
    }
    .profileText {
      font-size: 15px;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    .profileText {
      font-size: 14px;
    }
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  height: 89px;

  /* width: 300px; */
  margin: 0px 40px;
  /* & > p {
    margin: 10px 0;
    white-space: nowrap;
  } */
  .voiceTitle {
    font-size: 20px;
    margin-top: 16px;
    white-space: nowrap;
  }
  .voiceCreatedAt {
    margin-top: 24px;
    white-space: nowrap;
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
    justify-content: flex-start;
    .voiceTitle {
      font-size: 20px;
      font-weight: 400;
      margin: 0;
      white-space: nowrap;
    }
    .voiceCreatedAt {
      margin-top: 10px;
      white-space: nowrap;
    }
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 170px;
    overflow-x: scroll;
    .voiceTitle {
      font-size: 16px;
      margin: 0;
    }
    .voiceCreatedAt {
      font-size: 10px;
      margin-top: 0px;
      white-space: nowrap;
    }
  }
  // XSmall (Mobile)
  @media screen and (max-width: 399px) {
    width: 150px;
    overflow-x: scroll;
    .voiceTitle {
      font-size: 16px;
      margin: 0;
    }
    .voiceCreatedAt {
      font-size: 10px;
      margin-top: 0px;
      white-space: nowrap;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 140px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 320px) {
    width: 100px;
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

const BtnBox = styled.div`
  display: flex;
  max-width: 68px;
  max-height: 68px;
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
  background-color: #dbdbdb;
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
    width: 86%;
    margin-left: 13.7%;
    height: 2px;
  }
  // Small (Tablet)
  @media screen and (max-width: 768px) {
    width: 85%;
    margin-left: 15%;
    height: 2px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 71%;
    margin-left: 28%;
    height: 2px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 390px) {
    width: 70%;
    margin-left: 29%;
    height: 2px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 71%;
    margin-left: 28%;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 360px) {
    width: 70%;
    margin-left: 30%;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 320px) {
    width: 66%;
    margin-left: 34%;
  }
`;

const PercentBar = styled.div`
  background-color: #6371f7;
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

  // Small (Tablet)
  @media screen and (max-width: 839px) {
    width: 18px;
    height: 18px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    width: 18px;
    height: 18px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 16px;
    height: 16px;
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

  // Small (Tablet)
  @media screen and (max-width: 839px) {
    width: 100%;
    & > p {
      font-size: 12px;
      margin-right: 16px;
      margin-top: 10px;
      margin-bottom: 16px;
    }
    justify-content: right;
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
  min-height: 60px;
  min-width: 60px;
  border: 4px solid #757575;
  color: #757575;
  border-radius: 50%;
  ${({ color }) => (color ? `color: ${color};` : "color: #757575;")}
  ${({ background }) =>
    background ? `background: ${background};` : "background: white;"};
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
    color: #fff;
    &:hover {
      color: rgba(29, 28, 29, 1);
    }
  }

  // Small (Tablet)
  @media screen and (max-width: 839px) {
    svg {
      width: 24px;
      height: 24px;
      margin: 10px 10px;
      color: #fff;
      &:hover {
        color: rgba(29, 28, 29, 1);
      }
    }
  }
`;

export default Audio;
