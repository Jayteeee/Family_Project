import React, { useEffect } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RiArrowLeftSLine } from "react-icons/ri";

// 모달
import { ModalPortal } from "../../portals";

// 페이지
import { userActions } from "../../../../redux/modules/user";

// 엘리먼트
import { RactangleImage, Text } from "../../../../elements";
import { missionActions } from "../../../../redux/modules/mission";

// 이미지
import BadgeOff_01 from "../../../images/BadgeOff_01.svg";
import BadgeOff_02 from "../../../images/BadgeOff_02.svg";
import BadgeOff_03 from "../../../images/BadgeOff_03.svg";
import BadgeOff_04 from "../../../images/BadgeOff_04.svg";
import BadgeOff_05 from "../../../images/BadgeOff_05.svg";
import BadgeOff_06 from "../../../images/BadgeOff_06.svg";
import BadgeOn_01 from "../../../images/BadgeOn_01.svg";
import BadgeOn_02 from "../../../images/BadgeOn_02.svg";
import BadgeOn_03 from "../../../images/BadgeOn_03.svg";
import BadgeOn_04 from "../../../images/BadgeOn_04.svg";
import BadgeOn_05 from "../../../images/BadgeOn_05.svg";
import BadgeOn_06 from "../../../images/BadgeOn_06.svg";

const BadgeModal = ({ onClose, familyId }) => {
  const badgeList = useSelector((state) => state.mission?.badgeList);
  //   console.log((badgeList[0].badgeCnt / 1) * 100);
  return (
    <ModalPortal>
      <Background
        className="flex-row"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <Content
          // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="res-badgeContent"
        >
          <div className="titleBar" />
          <BadgeWrap className="res-badgeWrap">
            <BadgeHeaderBox className="res-badgeHeaderBox">
              <CancelBtn
                // className="flex-row"
                onClick={() => {
                  onClose();
                }}
              >
                <RiArrowLeftSLine size={30} />
              </CancelBtn>
              <Text size="28px" fontWeight="600" className="badgeTitle1">
                보유 배지
              </Text>

              <Text size="20px" className="badgeTitle2" margin="20px 0 0 0">
                도란도란을 사용하다 보면 여러 배지를 획득 할 수 있어요!{"\n"}
                배지의 획득 요건을 확인하고 도전해보세요.
              </Text>
            </BadgeHeaderBox>
            <BadgeListBox className="res-badgeListBox">
              <BadgRowBox className="res-badgeRowBox">
                <BadgeBox>
                  {!badgeList[0]?.badgeChk ? (
                    <RactangleImage
                      M
                      size="150px"
                      borderRadius="0"
                      className="badgeImg"
                      src={BadgeOff_01}
                    />
                  ) : (
                    <RactangleImage
                      M
                      size="150px"
                      borderRadius="0"
                      className="badgeImg"
                      src={BadgeOn_01}
                    />
                  )}

                  <BadgeTextBox className="res-badgeTestBox">
                    <Text
                      size="20px"
                      fontWeight="600"
                      padding="0 0 10px 0"
                      className="badgeName"
                    >
                      단란한 시작
                    </Text>
                    {!badgeList[0]?.badgeChk ? (
                      <BadgeBar>
                        {badgeList[0]?.badgeCnt}/1
                        <BadgeBarPercentage
                          badgeCnt={(badgeList[0]?.badgeCnt / 1) * 100}
                        ></BadgeBarPercentage>
                        <BadgeBarBox />
                      </BadgeBar>
                    ) : (
                      <CompletedBadgeBar>
                        <p style={{ margin: "1px 0 0 0" }}>성공</p>
                      </CompletedBadgeBar>
                    )}
                    <BadghCnt> {badgeList[0]?.badgeCnt}/1</BadghCnt>
                    <Text
                      size="16px"
                      padding="20px 0 0 0"
                      className="badgeContent"
                    >
                      새로운 가족을 만들고{"\n"}멤버들을 초대해 보세요!
                    </Text>
                  </BadgeTextBox>
                </BadgeBox>
                <BadgeBox>
                  {!badgeList[1]?.badgeChk ? (
                    <RactangleImage
                      M
                      size="150px"
                      borderRadius="0"
                      className="badgeImg"
                      src={BadgeOff_02}
                    />
                  ) : (
                    <RactangleImage
                      M
                      size="150px"
                      borderRadius="0"
                      className="badgeImg"
                      src={BadgeOn_02}
                    />
                  )}
                  <BadgeTextBox className="res-badgeTestBox">
                    <Text
                      size="20px"
                      fontWeight="600"
                      padding="0 0 10px 0"
                      className="badgeName"
                    >
                      추억의 발자국
                    </Text>
                    {!badgeList[1]?.badgeChk ? (
                      <BadgeBar>
                        <BadgeBarPercentage
                          badgeCnt={(badgeList[1]?.badgeCnt / 15) * 100}
                        ></BadgeBarPercentage>
                        <BadgeBarBox />
                      </BadgeBar>
                    ) : (
                      <CompletedBadgeBar>
                        <p style={{ margin: "1px 0 0 0" }}>성공</p>
                      </CompletedBadgeBar>
                    )}
                    <BadghCnt> {badgeList[1]?.badgeCnt}/15</BadghCnt>
                    <Text size="16px" className="badgeContent">
                      갤러리에 우리 가족{"\n"}추억의 사진을 15개 이상{"\n"}
                      업로드해 보세요!
                    </Text>
                  </BadgeTextBox>
                </BadgeBox>
                <BadgeBox>
                  {!badgeList[2]?.badgeChk ? (
                    <RactangleImage
                      M
                      size="150px"
                      borderRadius="0"
                      className="badgeImg"
                      src={BadgeOff_03}
                    />
                  ) : (
                    <RactangleImage
                      M
                      size="150px"
                      borderRadius="0"
                      className="badgeImg"
                      src={BadgeOn_03}
                    />
                  )}
                  <BadgeTextBox className="res-badgeTestBox">
                    <Text
                      size="20px"
                      fontWeight="600"
                      padding="0 0 10px 0"
                      className="badgeName"
                    >
                      정겨운 목소리
                    </Text>
                    {!badgeList[2]?.badgeChk ? (
                      <BadgeBar>
                        <BadgeBarPercentage
                          badgeCnt={(badgeList[2]?.badgeCnt / 10) * 100}
                        ></BadgeBarPercentage>
                        <BadgeBarBox />
                      </BadgeBar>
                    ) : (
                      <CompletedBadgeBar>
                        <p style={{ margin: "1px 0 0 0" }}>성공</p>
                      </CompletedBadgeBar>
                    )}
                    <BadghCnt> {badgeList[2]?.badgeCnt}/10</BadghCnt>
                    <Text size="16px" className="badgeContent">
                      음성 녹음을 10번 업로드{"\n"}해요. 서로의 목소리를{"\n"}
                      기록해 보세요!
                    </Text>
                  </BadgeTextBox>
                </BadgeBox>
              </BadgRowBox>
              <BadgRowBox className="res-badgeRowBox">
                <BadgeBox>
                  {!badgeList[3]?.badgeChk ? (
                    <RactangleImage
                      M
                      size="150px"
                      borderRadius="0"
                      className="badgeImg"
                      src={BadgeOff_04}
                    />
                  ) : (
                    <RactangleImage
                      M
                      size="150px"
                      borderRadius="0"
                      className="badgeImg"
                      src={BadgeOn_04}
                    />
                  )}
                  <BadgeTextBox className="res-badgeTestBox">
                    <Text
                      size="20px"
                      fontWeight="600"
                      padding="0 0 10px 0"
                      className="badgeName"
                    >
                      협동의 즐거움
                    </Text>
                    {!badgeList[3]?.badgeChk ? (
                      <BadgeBar>
                        <BadgeBarPercentage
                          badgeCnt={(badgeList[3]?.badgeCnt / 20) * 100}
                        ></BadgeBarPercentage>
                        <BadgeBarBox />
                      </BadgeBar>
                    ) : (
                      <CompletedBadgeBar>
                        <p style={{ margin: "1px 0 0 0" }}>성공</p>
                      </CompletedBadgeBar>
                    )}
                    <BadghCnt> {badgeList[3]?.badgeCnt}/20</BadghCnt>
                    <Text size="16px" className="badgeContent">
                      미션을 설정하고,{"\n"}가족들과 함께 20번 이상{"\n"}완료해
                      보세요!
                    </Text>
                  </BadgeTextBox>
                </BadgeBox>
                <BadgeBox>
                  {!badgeList[4]?.badgeChk ? (
                    <RactangleImage
                      M
                      size="150px"
                      borderRadius="0"
                      className="badgeImg"
                      src={BadgeOff_05}
                    />
                  ) : (
                    <RactangleImage
                      M
                      size="150px"
                      borderRadius="0"
                      className="badgeImg"
                      src={BadgeOn_05}
                    />
                  )}
                  <BadgeTextBox className="res-badgeTestBox">
                    <Text
                      size="20px"
                      fontWeight="600"
                      padding="0 0 10px 0"
                      className="badgeName"
                    >
                      소통의 기쁨
                    </Text>
                    {!badgeList[4]?.badgeChk ? (
                      <BadgeBar>
                        <BadgeBarPercentage
                          badgeCnt={(badgeList[4]?.badgeCnt / 50) * 100}
                        ></BadgeBarPercentage>
                        <BadgeBarBox />
                      </BadgeBar>
                    ) : (
                      <CompletedBadgeBar>
                        <p style={{ margin: "1px 0 0 0" }}>성공</p>
                      </CompletedBadgeBar>
                    )}
                    <BadghCnt> {badgeList[4]?.badgeCnt}/50</BadghCnt>
                    <Text
                      size="16px"
                      padding="20px 0 0 0"
                      className="badgeContent"
                    >
                      댓글 50번 등록 시 지급!{"\n"}함께 이야기 나누어 봐요!
                    </Text>
                  </BadgeTextBox>
                </BadgeBox>
                <BadgeBox>
                  {!badgeList[5]?.badgeChk ? (
                    <RactangleImage
                      M
                      size="150px"
                      borderRadius="0"
                      className="badgeImg"
                      src={BadgeOff_06}
                    />
                  ) : (
                    <RactangleImage
                      M
                      size="150px"
                      borderRadius="0"
                      className="badgeImg"
                      src={BadgeOn_06}
                    />
                  )}
                  <BadgeTextBox className="res-badgeTestBox">
                    <Text
                      size="20px"
                      fontWeight="600"
                      padding="0 0 10px 0"
                      className="badgeName"
                    >
                      함께하는 나날
                    </Text>
                    {!badgeList[5]?.badgeChk ? (
                      <BadgeBar>
                        <BadgeBarPercentage
                          badgeCnt={(badgeList[5]?.badgeCnt / 5) * 100}
                        ></BadgeBarPercentage>
                        <BadgeBarBox />
                      </BadgeBar>
                    ) : (
                      <CompletedBadgeBar>
                        <p style={{ margin: "1px 0 0 0" }}>성공</p>
                      </CompletedBadgeBar>
                    )}
                    <BadghCnt> {badgeList[5]?.badgeCnt}/5</BadghCnt>
                    <Text
                      size="16px"
                      padding="20px 0 0 0"
                      className="badgeContent"
                    >
                      우리 가족 일정을 5번 {"\n"}이상 등록해 보세요!
                    </Text>
                  </BadgeTextBox>
                </BadgeBox>
              </BadgRowBox>
            </BadgeListBox>
          </BadgeWrap>
        </Content>
      </Background>
    </ModalPortal>
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

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    background-color: transparent;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 205;
  height: 70%;
  /* height: 880px; // 반응형 용 */
  max-width: 1222px;
  /* max-width: 800px; // 반응형용 */
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  position: relative;
  padding: 30px;

  .titleBar {
    display: none;
  }

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    height: 880px !important;
    max-width: 800px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    max-width: 800px;
    height: 880px;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 205;
    max-width: 420px;
    width: 100%;
    border-radius: 0;
    background-color: #fff;
    /* margin: 0;
    right: 0; */
    height: 91.9% !important;
    padding: 20px;
    position: absolute;
    top: 0;
    .titleBar {
      width: 500px;
      position: absolute;
      top: 75px;
      border-bottom: 1px solid #dbdbdb;
      display: flex;
    }
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    padding: 15px;

    .titleBar {
      width: 500px;
      position: absolute;
      top: 60px;
      border: 1px solid #dbdbdb;
    }
  }
`;

const BadgeWrap = styled.div`
  display: flex;
  /* display: ""  // 모바일 반응형 */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  justify-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;

  /* margin-top: 30px; // 모바일 반응형 */

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
    height: 100% !important;
    /* margin-top: 30px; */
    /* display: ""; */
    .badgeTitle1 {
      margin-bottom: 30px !important;
      padding-bottom: 10px;
      font-size: 20px;
      font-weight: 400;
    }
    .badgeTitle2 {
      font-size: 15px;
    }
    /* margin-top: 40px; */
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    .badgeTitle1 {
      margin-top: 2px;
      margin-bottom: 30px !important;
      font-size: 20px;
      font-weight: 400;
    }
    .badgeTitle2 {
      font-size: 12px;
      margin: 0;
    }
  }
`;

const CancelBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  text-align: left;
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

  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    top: 12px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    top: 0px;
  }
`;

const BadgeHeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  height: 30%;
  /* height: 22%; // 반응형 용 */
  padding: 30px 0 40px;
  /* padding: 10px 0 40px; // 반응형 용 */
  margin-top: 40px;
  /* margin-top: 20px; // 반응형 용 */
  /* margin-top: 200px; // 모바일 반응형 */
  /* margin-bottom: 10px; // 모바일 반응형 */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    height: 22% !important;
    padding: 10px 0 40px !important;
    margin-top: 20px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    margin-top: 0px;
    height: 22%;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    height: 100%;
    /* display: flex; */
    margin-top: 10px !important;
    display: block;
    padding: 5px 0 0 !important;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    margin-top: 0px !important;
    padding: 5px 0 0 !important;
  }
`;

const BadgeListBox = styled.div`
  display: flex;
  /* display: "";  // 모바일 반응형  */
  flex-direction: column;
  /* flex-direction: row; // 반응형 용 */
  /* align-items: center; */
  justify-content: center;
  width: 100%;
  height: 70%;

  /* height: 100%; // 모바이 반응형 */
  /* margin-bottom: 50px; */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    flex-direction: row !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    flex-direction: row;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    overflow-y: scroll;
    display: block !important;
    /* flex-direction: column !important; */
    height: 100% !important;
    margin-top: 20px;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const BadgRowBox = styled.div`
  display: flex;
  /* flex-direction: column; // 반응형 용 */
  /* flex-direction: column; // 모바일 반응형 */
  width: 100%;
  /* height: 70%; // 모바일 반응형 */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    flex-direction: column !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
    flex-direction: column;
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    /* display: flex;
    flex-direction: row !important;
    height: 100% !important; */
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
  }
`;

const BadgeBox = styled.div`
  display: flex;
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;

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
    /* display: block; */

    /* width: 100%; */
    .badgeImg {
      width: 150px;
      height: 150px;
      margin-right: 10px;
    }
    padding: 20px 0;
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    .badgeImg {
      width: 120px;
      height: 120px;
      margin-right: 5px;
    }
  }
`;

const BadgeTextBox = styled.div`
  text-align: left;
  padding-left: 20px;
  /* padding-left: 24px; // 모바일 반응형 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  /* width: 180px; // 모바일 반응형 */

  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Medium (Tablet)
  @media screen and (max-width: 1024px) {
    padding-left: 24px !important;
    width: 180px !important;
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
    padding-left: 10px !important;
    width: 48% !important;
    /* margin-left: 40%; */
  }
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 49% !important;
    .badgeName {
      font-size: 15px;
    }
    .badgeContent {
      font-size: 13px;
    }
  }
`;

const BadgeBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
  background-color: #f5f5f5;
  margin-bottom: auto;
  border: none;
  border-radius: 99px;
  font-size: 16px;
  position: relative;
  z-index: 1;
  // XXSmall (Mobile)
  @media screen and (max-width: 375px) {
    width: 130px;
    height: 20px;
  }
`;

const BadgeBarPercentage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ badgeCnt }) => ` width: ${badgeCnt}%`};
  height: 30px;
  background-color: #6371f7;
  border: none;
  border-radius: 99px 0 0 99px;
  font-size: 16px;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 2;

  @media screen and (max-width: 375px) {
    height: 20px;
  }
`;

const BadghCnt = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
  background-color: transparent;
  margin-bottom: auto;
  border: none;
  border-radius: 99px;
  font-size: 16px;
  /* position: absolute;
  top: 0px; */
  position: relative;
  bottom: 29px;
  z-index: 3;
  @media screen and (max-width: 375px) {
    width: 130px;
    height: 20px;
    bottom: 20px;
  }
`;

const CompletedBadgeBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
  background-color: #ffdc65;
  border: none;
  border-radius: 99px;
  font-size: 16px;
  z-index: 5;
  color: white;
  font-weight: 600;
  @media screen and (max-width: 375px) {
    width: 130px;
    height: 20px;
  }
`;

const BadgeBarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
  background-color: transparent;
  border: none;
  border-radius: 99px;
  font-size: 16px;
  z-index: 5;
  color: white;
  font-weight: 600;
  /* over border: 3px solid #fff; */
  outline: 3px solid #fff;
  outline-width: 10px;
  @media screen and (max-width: 375px) {
    width: 130px;
    height: 20px;
  }
`;

export default BadgeModal;
