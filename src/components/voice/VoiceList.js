import React, { useState, useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdRemoveCircle, MdPlayArrow, MdOutlinePause } from "react-icons/md";
import { useParams } from "react-router-dom";

// 엘리먼트
import { Text } from "../../elements";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { voiceActions } from "../../redux/modules/voice";
import { history } from "../../redux/configureStore";

// 이미지
import noImage from "../../shared/images/noImage.png";
import VoiceHeader from "../../components/voice/VoiceHeader";
import sound from "../../shared/voice/sound.mp3";

const VoiceList = ({ voiceAlbumId, familyId, isEdit, PracticeEdit }) => {
  const dispatch = useDispatch();

  console.log("선택한 앨범Id:", voiceAlbumId);
  const voiceAlbumName = useSelector(
    (state) => state.voice.voiceList.voiceAlbumName
  );

  const voiceList = useSelector((state) => state.voice.voiceList.voiceFileList);
  const audioUrl = voiceList.voiceFile;

  console.log("선택한 앨범 사진리스트:", voiceList);
  console.log(isEdit);

  // 앨범 삭제하기 모달
  const [modalOn, setModalOn] = useState(false);
  const [run, setRun] = useState(false);
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

  // const audio = new Audio(URL.createObjectURL(audioUrl));
  const audio = new Audio(sound);
  console.log(audio.onpause);
  const play = () => {
    audio.loop = false;
    audio.volume = 1;
    audio.play();
    start();
  };

  console.log(audio.duration);
  console.log(audio.currentTime);

  const pause = () => {
    audio.pause();
    end();
  };

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  useEffect(() => {
    dispatch(voiceActions.getVoiceListDB(voiceAlbumId));
    timer();
  }, [count]);

  return (
    <>
      <VoiceHeader
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
                      <Text S2>{v.voiceFileTitle}</Text>
                      <Text B1 style={{ color: "#757575" }}>
                        {v.createdAt}
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
                    <RunTime>
                      <Text S3>
                        {currentMinutes < 10
                          ? `0${currentMinutes}`
                          : currentMinutes}{" "}
                        :{" "}
                        {currentSeconds < 10
                          ? `0${currentSeconds}`
                          : currentSeconds}
                        /{v.voicePlayTime}
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
                          play();
                        }}
                      />
                    ) : (
                      <MdOutlinePause
                        onClick={() => {
                          pause();
                        }}
                      />
                    )}
                  </PlayBtn>
                </VoiceBox>
              </Figure>
            );
          })}
        </Container>
      ) : (
        <Container>
          {voiceList?.map((v) => {
            return (
              <EditFigure>
                <div>
                  <EditImageBox
                    alt="#"
                    src={v.profileImg ? v.profileImg : noImage}
                    onClick={() => {
                      // history.push(`/detail/${p._id}`);
                    }}
                  />
                  <DeleteIcon onClick={handleModal}>
                    <MdRemoveCircle />
                  </DeleteIcon>
                </div>
              </EditFigure>
            );
          })}
        </Container>
      )}
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
`;

const Figure = styled.div`
  break-inside: avoid;
  &:hover {
    border-radius: 13px;
    transition: all 300ms ease-in;
    filter: brightness(70%);
  }
`;

const VoiceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 166px;
  width: 100%;
  background-color: #fff;
  padding: 40px;
`;

const NonePlayer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileBox = styled.div`
  & > img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin: 0px 40px;
  & > p {
    margin: 15px 0;
  }
`;

const PlayBox = styled.div`
  display: flex;
  width: 60%;
`;

const ProgressBar = styled.div`
  background-color: #eee;
  width: 100%;
  height: 6px;
  display: flex;
  align-items: center;
  margin: auto 12px;
  border-radius: 20px;
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
`;

const RunTime = styled.div`
  margin: auto 12px;
  display: flex;
  align-items: center;
  width: 20%;
  /* justify-content: center; */
`;

const PlayBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  width: 68px;
  border: 1px solid black;
  border-radius: 50%;
  cursor: pointer;
  & > svg {
    width: 80%;
    height: 80%;
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

const EditImageBox = styled.img`
  width: 100%;
  margin-top: 2%;
  border-radius: 13px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 0;
  cursor: pointer;
  svg {
    width: 33.3px;
    height: 33.3px;
    margin: 14px 10px;
    color: white;
    position: absolute;
    &:hover {
      color: rgba(29, 28, 29, 1);
    }
  }
`;

export default VoiceList;
