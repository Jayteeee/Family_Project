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

const BadgeModal = ({ onClose, familyId }) => {
  const badgeList = useSelector((state) => state.mission?.badgeList);
  console.log("배지 리스트:", badgeList);
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
          <BadgeWrap className="res-badgeWrap">
            <BadgeHeaderBox className="res-badgeHeaderBox">
              <CancelBtn
                className="flex-row"
                onClick={() => {
                  onClose();
                }}
              >
                <RiArrowLeftSLine size={24} />
              </CancelBtn>
              <Text size="28px" fontWeight="600" className="res-badgeTitle">
                우리 가족 배지
              </Text>
              <Text size="20px">
                도란도란을 사용하다 보면 여러 배지를 획득 할 수 있어요!{"\n"}
                배지의 휙득 요건을 확인하고 도전해보세요.
              </Text>
            </BadgeHeaderBox>
            <BadgeListBox className="res-badgeListBox">
              <BadgRowBox className="res-badgeRowBox">
                <BadgeBox>
                  <RactangleImage M size="150px" borderRadius="0" />

                  <BadgeTextBox className="res-badgeTestBox">
                    <Text size="20px" fontWeight="600" padding="0 0 10px 0">
                      단란한 시작
                    </Text>
                    {!badgeList[0]?.badgeChk ? (
                      <BadgeBar>
                        {badgeList[0]?.badgeCnt}/1
                        <BadgeBarPercentage
                          badgeCnt={(badgeList[0]?.badgeCnt / 1) * 100}
                        ></BadgeBarPercentage>
                      </BadgeBar>
                    ) : (
                      <CompletedBadgeBar>
                        <p style={{ margin: "1px 0 0 0" }}>성공</p>
                      </CompletedBadgeBar>
                    )}
                    <BadghCnt> {badgeList[0]?.badgeCnt}/1</BadghCnt>
                    <Text size="16px" padding="20px 0 0 0">
                      새로운 가족을 만들고{"\n"}멤버들을 초대해 보세요!
                    </Text>
                  </BadgeTextBox>
                </BadgeBox>
                <BadgeBox>
                  <RactangleImage M size="150px" borderRadius="0" />
                  <BadgeTextBox className="res-badgeTestBox">
                    <Text size="20px" fontWeight="600" padding="0 0 10px 0">
                      추억의 발자국
                    </Text>
                    {!badgeList[1]?.badgeChk ? (
                      <BadgeBar>
                        <BadgeBarPercentage
                          badgeCnt={(badgeList[1]?.badgeCnt / 15) * 100}
                        ></BadgeBarPercentage>
                      </BadgeBar>
                    ) : (
                      <CompletedBadgeBar>
                        <p style={{ margin: "1px 0 0 0" }}>성공</p>
                      </CompletedBadgeBar>
                    )}
                    <BadghCnt> {badgeList[1]?.badgeCnt}/15</BadghCnt>
                    <Text size="16px">
                      갤러리에 우리 가족{"\n"}추억의 사진을 15개 이상{"\n"}
                      업로드해 보세요!
                    </Text>
                  </BadgeTextBox>
                </BadgeBox>
                <BadgeBox>
                  <RactangleImage M size="150px" borderRadius="0" />
                  <BadgeTextBox className="res-badgeTestBox">
                    <Text size="20px" fontWeight="600" padding="0 0 10px 0">
                      정겨운 목소리
                    </Text>
                    {!badgeList[2]?.badgeChk ? (
                      <BadgeBar>
                        <BadgeBarPercentage
                          badgeCnt={(badgeList[2]?.badgeCnt / 10) * 100}
                        ></BadgeBarPercentage>
                      </BadgeBar>
                    ) : (
                      <CompletedBadgeBar>
                        <p style={{ margin: "1px 0 0 0" }}>성공</p>
                      </CompletedBadgeBar>
                    )}
                    <BadghCnt> {badgeList[2]?.badgeCnt}/10</BadghCnt>
                    <Text size="16px">
                      음성 녹음을 10번 업로드{"\n"}해요. 서로의 목소리를{"\n"}
                      기록해 보세요!
                    </Text>
                  </BadgeTextBox>
                </BadgeBox>
              </BadgRowBox>
              <BadgRowBox className="res-badgeRowBox">
                <BadgeBox>
                  <RactangleImage M size="150px" borderRadius="0" />
                  <BadgeTextBox className="res-badgeTestBox">
                    <Text size="20px" fontWeight="600" padding="0 0 10px 0">
                      협동의 즐거움
                    </Text>
                    {!badgeList[3]?.badgeChk ? (
                      <BadgeBar>
                        <BadgeBarPercentage
                          badgeCnt={(badgeList[3]?.badgeCnt / 20) * 100}
                        ></BadgeBarPercentage>
                      </BadgeBar>
                    ) : (
                      <CompletedBadgeBar>
                        <p style={{ margin: "1px 0 0 0" }}>성공</p>
                      </CompletedBadgeBar>
                    )}
                    <BadghCnt> {badgeList[3]?.badgeCnt}/20</BadghCnt>
                    <Text size="16px">
                      미션을 설정하고,{"\n"}가족들과 함께 20번 이상{"\n"}완료해
                      보세요!
                    </Text>
                  </BadgeTextBox>
                </BadgeBox>
                <BadgeBox>
                  <RactangleImage M size="150px" borderRadius="0" />
                  <BadgeTextBox className="res-badgeTestBox">
                    <Text size="20px" fontWeight="600" padding="0 0 10px 0">
                      소통의 기쁨
                    </Text>
                    {!badgeList[4]?.badgeChk ? (
                      <BadgeBar>
                        <BadgeBarPercentage
                          badgeCnt={(badgeList[4]?.badgeCnt / 50) * 100}
                        ></BadgeBarPercentage>
                      </BadgeBar>
                    ) : (
                      <CompletedBadgeBar>
                        <p style={{ margin: "1px 0 0 0" }}>성공</p>
                      </CompletedBadgeBar>
                    )}
                    <BadghCnt> {badgeList[4]?.badgeCnt}/50</BadghCnt>
                    <Text size="16px" padding="20px 0 0 0">
                      댓글 50번 등록 시 지급!{"\n"}함께 이야기 나누어 봐요!
                    </Text>
                  </BadgeTextBox>
                </BadgeBox>
                <BadgeBox>
                  <RactangleImage M size="150px" borderRadius="0" />
                  <BadgeTextBox className="res-badgeTestBox">
                    <Text size="20px" fontWeight="600" padding="0 0 10px 0">
                      함께하는 나날
                    </Text>
                    {!badgeList[5]?.badgeChk ? (
                      <BadgeBar>
                        <BadgeBarPercentage
                          badgeCnt={(badgeList[5]?.badgeCnt / 5) * 100}
                        ></BadgeBarPercentage>
                      </BadgeBar>
                    ) : (
                      <CompletedBadgeBar>
                        <p style={{ margin: "1px 0 0 0" }}>성공</p>
                      </CompletedBadgeBar>
                    )}
                    <BadghCnt> {badgeList[5]?.badgeCnt}/50</BadghCnt>
                    <Text size="16px" padding="20px 0 0 0">
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
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 205;
  height: 700px;
  /* height: 880px; // 반응형 용 */
  max-width: 1222px;
  /* max-width: 800px; // 반응형용 */
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  position: relative;
  overflow: scroll;
  padding: 30px;
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
`;

const CancelBtn = styled.div`
  display: flex;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  textalign: left;
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
  background-color: #fff;
  /* margin-bottom: 50px; */
`;

const BadgRowBox = styled.div`
  display: flex;
  /* flex-direction: column; // 반응형 용 */
  /* flex-direction: column; // 모바일 반응형 */
  width: 100%;
  /* height: 70%; // 모바일 반응형 */
`;

const BadgeBox = styled.div`
  display: flex;
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
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
  border-radius: 4px;
  font-size: 16px;
  position: relative;
  z-index: 1;
`;

const BadgeBarPercentage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ badgeCnt }) => ` width: ${badgeCnt}%`};
  height: 30px;
  background-color: #8c98f8;
  border: none;
  border-radius: 5px 0 0 5px;
  font-size: 16px;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 2;
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
  border-radius: 5px;
  font-size: 16px;
  /* position: absolute;
  top: 0px; */
  position: relative;
  bottom: 29px;
  z-index: 3;
`;

const CompletedBadgeBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
  background-color: #f4cc4d;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  z-index: 5;
  color: white;
  font-weight: 600;
`;

export default BadgeModal;
