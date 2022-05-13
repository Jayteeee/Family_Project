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

const HomeVoice = ({ recentVoiceFile, familyId }) => {
  const v = recentVoiceFile;
  const [run, setRun] = useState(false);

  const myRef = useRef();

  const play = () => {
    let isPlaying =
      myRef.current?.currentTime > 0 &&
      !myRef.current?.paused &&
      !myRef.current?.ended;
    if (!isPlaying) {
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
      <Container
        onClick={() => {
          history.push(`/family/${familyId}/voiceMsg/`);
        }}
      >
        <Figure key={v?.voiceFileId}>
          <VoiceBox>
            <audio ref={myRef} src={v?.voiceFile} />
            <LeftBox>
              <ProfileBox>
                <img alt="#" src={v?.profileImg ? v?.profileImg : noImage} />
                <p>{v?.familyMemberNickname}</p>
              </ProfileBox>
            </LeftBox>
            <MiddleBox>
              <Text>{v?.voiceTitle}</Text>
            </MiddleBox>
            <RightBox>
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
            </RightBox>
          </VoiceBox>
        </Figure>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 90%;
  height: 70%;
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
  height: 100%;
  cursor: pointer;
  &:hover {
    border-radius: 13px;
    transition: all 300ms ease-in;
    filter: brightness(70%);
  }
`;
const VoiceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-radius: 20px;
  border: 1px solid #c4c4c4;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  & > p {
    margin: 8px 0;
  }
`;
const MiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProfileBox = styled.div`
  & > img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }
`;

const PlayBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border: 1px solid black;
  border-radius: 50%;
  cursor: pointer;
  & > svg {
    width: 80%;
    height: 80%;
  }
`;

export default HomeVoice;
