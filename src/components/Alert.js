import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdClear, MdNotificationsNone } from "react-icons/md";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { familyMemberActions } from "../redux/modules/familymember";

const Alert = (props) => {
  const {
    bg,
    user,
    familyId,
    // myFamilyMemberNickname
  } = props;
  const dispatch = useDispatch();

  console.log(bg);
  console.log("유저정보: ", user);

  const socket = useSelector((state) => state?.socket?.socket);
  const alert = useSelector((state) => state?.socket?.alert);

  // const familyMemberNickname = familyMemberList.

  // const { familyMemberList } = useSelector((state) => state.familymember);

  // const myFamilyMemberNickname = familyMemberList?.find(
  //   (m) => m?.userId === user?.userId
  // )?.familyMemberNickname;

  // console.log("나의 가족구성원호칭", myFamilyMemberNickname);

  // 알림 모달
  const [notiOn, setNotiOn] = useState(false);

  const handleNoti = () => {
    setNotiOn(!notiOn);
  };

  // const deleteAlert= (alertId) => {
  //   socket.emit("", alertId)
  // }

  const addFamilyMember = (
    familyId,
    familyMemberNickname,
    selectEmail,
    userId
  ) => {
    dispatch(
      familyMemberActions.addFamilyMemberDB(
        familyId,
        familyMemberNickname,
        selectEmail
      )
    );
    console.log(userId, familyId, familyMemberNickname);
    socket?.emit("inviteJoin", {
      userId: userId,
      familyId: familyId,
      familyMemberNickname: familyMemberNickname,
    });
    setNotiOn(!notiOn);
  };

  return (
    <>
      {notiOn ? (
        <>
          <NotiMsgBox>
            <span className="triangle"></span>
            {alert.length !== 0 ? (
              alert.map((x, i) => {
                return (
                  <div key={x.alertId}>
                    <NotiHead>
                      <Category>{x?.category}</Category>
                      <MdClear
                      // onClick={() =>
                      //   {deleteAlert(x.alertId)}}
                      />
                    </NotiHead>
                    <NotiMsg>
                      {x?.type === "좋아요"
                        ? `${x?.senderName} 님이 ${x?.type}를 누르셨습니다.`
                        : x?.type === "댓글"
                        ? `${x?.senderName} 님이 ${x?.type}을 등록하셨습니다.`
                        : x?.type === "초대"
                        ? `${x?.nickname} 님이 가족 구성원${x?.type}를 하셨습니다.`
                        : null}
                    </NotiMsg>
                    {x?.type === "초대" ? (
                      <ButtonBox>
                        <SocketBtn
                          onClick={() => {
                            addFamilyMember(
                              x.familyId,
                              x.familyMemberNickname,
                              x.selectEmail,
                              x.userId
                            );
                          }}
                        >
                          승낙
                        </SocketBtn>
                        <SocketBtn
                        // onClick={() => {deleteAlert(x.alertId)}}
                        >
                          거절
                        </SocketBtn>
                      </ButtonBox>
                    ) : null}
                    <NotiFooter>
                      <div>{x.createdAt}</div>
                    </NotiFooter>
                    {alert.length - 1 === i ? null : <Line></Line>}
                  </div>
                );
              })
            ) : (
              <div> 알림이 없습니다. </div>
            )}
          </NotiMsgBox>
        </>
      ) : null}
    </>
  );
};

const NotiMsgBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 300;
  top: 50px;
  right: 50px;
  max-width: 282px;
  max-height: 405px;
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12), 2px 6px 12px rgba(0, 0, 0, 0.12);
  overflow: auto;
  .triangle {
    border-bottom: 10px solid white;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    position: absolute;
    right: 30px;
    top: -10px;
  }
`;

const NotiHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 9px;
  & > svg {
    cursor: pointer;
  }
`;

const Category = styled.div`
  color: rgba(99, 113, 247, 1);
  font-weight: 600;
  font-size: 12px;
`;

const NotiMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
  word-break: keep-all;
  margin-bottom: 8px;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const SocketBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 20px;
  font-size: small;
  color: white;
  border-radius: 20%;
  margin: 0 3px;
  padding: 3px;
  background-color: rgba(99, 113, 247, 1);
  cursor: pointer;
`;

const NotiFooter = styled.div`
  display: flex;
  align-items: center;
  & > div {
    color: rgba(117, 117, 117, 1);
    font-size: 12px;
  }
`;

const Line = styled.hr`
  margin: 16px 0;
  background-color: #dbdbdb;
`;

export default Alert;
