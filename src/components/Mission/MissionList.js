import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdCheckBox } from "react-icons/md";
import { CgMoreVerticalAlt } from "react-icons/cg";
import dayjs from "dayjs";

// 리덕스
import { useDispatch, useSelector } from "react-redux";

// 엘리먼트
import { Button, CircleImage, Text } from "../../elements";

// 이미지
import profileImg from "../../shared/images/profileImg.png";

// 모달
import { ModalPortal } from "../../shared/modal/portals";
import { DeleteMissionModal } from "../../shared/modal/component/MissionModal";

// 컴포넌트
import PastMissionList from "./PastMissionList";
import { missionActions } from "../../redux/modules/mission";
import OneMission from "./OneMission";

const MissionList = ({ monthMissionList, pastMissionList, familyId }) => {
  const dispatch = useDispatch();

  // console.log(myFamilyMemberId);

  // // user가 속해 있는 mission
  // const myMission = monthMissionList.find((m) =>
  //   m.missionMemberList.filter((f) => console.log(f.familyMemberId))
  // );

  // console.log(myMission);

  // 이번달 미션, 지난 미션토클
  const [status, setStatus] = useState(true);

  // 미션 체크관련 함수
  const [isChecked, setIsChecked] = useState(false);
  console.log("미션개인체크유무:", isChecked);
  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedItemHandler(target.value, target.checked);
    console.log(target.checked);
  };

  const checkedItemHandler = (missionId, isCheck) => {
    let completedAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    dispatch(
      missionActions.checkMissionDB(
        missionId,
        isCheck,
        isCheck,
        completedAt,
        familyId
      )
    );
  };

  // 미션 제거하기 모달
  const [deleteModalOn, setDeleteModalOn] = useState(false);

  const handleDeleteModal = () => {
    setDeleteModalOn(!deleteModalOn);
  };

  // 남은 날짜 구하기
  let endMonth = dayjs().daysInMonth();

  let nowDay = endMonth - dayjs(new Date()).format("D");

  return (
    <>
      <MissionListWrap className="res-missionListWrap">
        {status ? (
          <div
            className="res-selectMissionList-1"
            style={{ width: "100%", textAlign: "left", display: "none" }}
          >
            <Text
              id="fsadf"
              className="res-monthMissionTitle"
              margin="0 10px"
              fontWeight="700"
              size="24px"
            >
              이번 달 미션
            </Text>
            <MissionListBox className="res-missinoListBox">
              <MissionSelect className="res-missionSelect">
                <Option
                  value={status}
                  onClick={() => {
                    setStatus(true);
                  }}
                >
                  <Text size="15px">이번 달 미션</Text>
                </Option>
                <Option
                  value={!status}
                  onClick={() => {
                    setStatus(false);
                  }}
                >
                  <Text size="15px">지난 미션</Text>
                </Option>
              </MissionSelect>
              <div
                style={{
                  textAlign: "left",
                  marginBottom: "15px",
                  marginLeft: "15px",
                }}
              >
                <Text size="24px" fontWeight="700">
                  D-{nowDay}
                </Text>
              </div>
              <div>
                {monthMissionList ? (
                  monthMissionList.map((m, i) => {
                    return (
                      <MissionBox key={m.missionId}>
                        <MissionTitle>
                          {/* {missionId === myMission.missionId ? ( */}
                          <MissionChkBox>
                            <label htmlFor="missionChk" className="checks">
                              <input
                                type="checkbox"
                                value={m.missionId}
                                id="missionChk"
                                className="missionChk"
                                name={m.missionId}
                                onChange={(e) => checkHandler(e)}
                              />
                            </label>
                          </MissionChkBox>
                          {/* ) : (
                          <MissionTitle></MissionTitle>
                        )} */}
                          <div
                            style={{
                              width: "67%",
                              borderBottom: "2px solid #F5F5F5",
                              padding: "5px 0",
                              margin: "0 20px",
                            }}
                          >
                            <Text
                              size="16px"
                              padding="0 0 1px 0"
                              margin="0"
                              width="100%"
                              height="60px"
                            >
                              {m.missionTitle}
                            </Text>
                          </div>
                          <div>{m.missionChk}</div>
                          <div
                            style={{
                              display: "flex",
                              width: "120px",
                              justifyContent: "center",
                              marginRight: "4px",
                            }}
                          >
                            {m.familyMissionChk ? (
                              <CompletedMission>달성완료</CompletedMission>
                            ) : (
                              <UncompletedMission>미완료</UncompletedMission>
                            )}
                          </div>
                          <div
                            style={{
                              width: "3vw",
                              display: "flex",
                              float: "right",
                              justifyContent: "right ",
                              alignItems: "center",
                            }}
                            onClick={(e) => {
                              // handleModalPosition();
                              handleDeleteModal();
                            }}
                            // id={m.missionId}
                          >
                            <MissionDeleteBtn>
                              <CgMoreVerticalAlt style={{ fontSize: "30px" }} />
                            </MissionDeleteBtn>
                          </div>
                        </MissionTitle>

                        <MissionMemberBox>
                          <div style={{ display: "flex", margin: "0 30px" }}>
                            {m.missionMemberList ? (
                              m.missionMemberList.map((f, i) => {
                                return (
                                  <div
                                    key={f.familyMemberId}
                                    style={{ position: "relative" }}
                                  >
                                    <CircleImage
                                      XS
                                      src={
                                        f.profileImg ? f.profileImg : profileImg
                                      }
                                      margin="0 10px 0 0"
                                      size="24px"
                                    />
                                    {f.myMissionChk ? (
                                      <CompletedCicle />
                                    ) : (
                                      <UncompletedCicle />
                                    )}
                                  </div>
                                );
                              })
                            ) : (
                              <div>미션 진행자 없습니다</div>
                            )}
                          </div>
                          <div
                            style={{
                              textAlign: "right",
                              flexGrow: "1",
                              fontSize: "16px",
                              color: "#A8A8A8",
                              marginRight: "45px",
                            }}
                          >
                            {m.completedAt} 달성
                          </div>
                        </MissionMemberBox>
                      </MissionBox>
                    );
                  })
                ) : (
                  <Text>리스트 없음.</Text>
                )}
              </div>
            </MissionListBox>
          </div>
        ) : (
          <div
            style={{ width: "100%", textAlign: "left", display: "none" }}
            className="res-pastMissionList"
          >
            <MissionListBox className="res-missinoListBox">
              <MissionSelect className="res-missionSelect">
                <Option
                  value={status}
                  onClick={() => {
                    setStatus(true);
                  }}
                >
                  <Text size="15px">이번 달 미션</Text>
                </Option>
                <Option
                  value={!status}
                  onClick={() => {
                    setStatus(false);
                  }}
                >
                  <Text size="15px">지난 미션</Text>
                </Option>
              </MissionSelect>
              <PastMissionList pastMissionList={pastMissionList} />
            </MissionListBox>
          </div>
        )}
        {/* 웹으로 볼 때 나타나는 이번달 미션 뷰 */}
        <div
          className="res-selectMissionList-2"
          style={{ width: "100%", textAlign: "left" }}
        >
          <Text margin="0 10px" fontWeight="700" size="24px">
            이번 달 미션
          </Text>
          <MissionListBox className="res-missinoListBox">
            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              <Text size="24px" fontWeight="700">
                D-{nowDay}
              </Text>
            </div>
            <div>
              {monthMissionList ? (
                monthMissionList.map((m, i) => {
                  return (
                    <OneMission
                      key={m.missionId}
                      {...m}
                      familyId={familyId}
                      monthMissionList={monthMissionList}
                    />
                  );
                })
              ) : (
                <Text>리스트 없음.</Text>
              )}
            </div>
          </MissionListBox>
        </div>
        <div
          className="res-wepPastMissionList"
          style={{ width: "100%", textAlign: "left" }}
        >
          <Text margin="0 10px" fontWeight="700" size="24px">
            지난 미션
          </Text>
          <MissionListBox>
            <PastMissionList pastMissionList={pastMissionList} />
          </MissionListBox>
        </div>
      </MissionListWrap>
    </>
  );
};

const MissionListWrap = styled.div`
  display: flex;
  margin: 20px 30px;
`;

const MissionListBox = styled.div`
  background: #fff;
  margin: 20px 10px;
  padding: 45px 20px 45px 45px;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 0px 3px 0px #d6d6d6;
`;

const MissionBox = styled.div`
  text-align: left;
  padding: 0 0 0 25px;
`;

const MissionChkBox = styled.label`
  margin-top: 5px;
`;

const MissionTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 10px 0;
  height: 60px;
`;

const MissionMemberBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px 10px 20px;
`;

const UncompletedCicle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  border: none;
  background-color: #8f8f8f;
  position: absolute;
  top: 13px;
  right: 7px;
`;

const CompletedCicle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  border: none;
  background-color: #f4cc4d;
  position: absolute;
  top: 13px;
  right: 7px;
`;

const CompletedMission = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  min-width: 100px;
  height: 42px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 21px;
  background: #8c98f8;
  color: white;
  /* margin-left: auto; */
`;

const UncompletedMission = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  float: right;
  width: 85px;
  height: 42px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 21px;
  background: #f5f5f5;
  color: #757575;
`;

const MissionDeleteBtn = styled.div`
  cursor: pointer;
  display: flex;
  width: 30px;
  height: 40px;
  align-items: center;
  border: none;
  border-radius: 10px;
  color: #757575;
  &:hover {
    background: #f5f5f5;
    color: black;
  }
`;

// 미션 토글용 CSS
const MissionSelect = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 200px;
  padding: 1px;
  margin: 10px auto 30px auto;
  background-color: gray;
  border-radius: 20px;
  display: none;
`;

const Option = styled.div`
  width: 50%;
  border-radius: 20px;
  padding: 5px;
  margin: 2px;
  cursor: pointer;
  ${({ value }) =>
    value ? "background-color: white;" : "background-color: transparent;"};
`;

export default MissionList;
