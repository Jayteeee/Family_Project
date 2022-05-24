import React from "react";

// 라이브러리, 패키지
import styled from "styled-components";
import { MdClear, MdNotificationsNone } from "react-icons/md";

// 모달
import { ModalPortal } from "../portals";

// 엘리먼트
import { Text } from "../../../elements";

const NotiModal = (props) => {
  const { onClose, alert, deleteAlert, addFamilyMember } = props;

  return (
    <ModalPortal>
      <Background
        className="flex-row"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <NotiMsgBox
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <span className="triangle"></span>
          {alert?.length !== 0 ? (
            alert.map((x, i) => {
              return (
                <div key={x.alertId}>
                  <NotiHead>
                    <Category>{x?.category}</Category>
                    <MdClear
                      onClick={() => {
                        deleteAlert(x.alertId);
                      }}
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
                  <NotiFooter>
                    <div>{x.createdAt}</div>
                  </NotiFooter>
                  {x?.type === "초대" ? (
                    <ButtonBox>
                      <YesBtn
                        onClick={() => {
                          addFamilyMember(
                            x.familyId,
                            x.familyMemberNickname,
                            x.selectEmail,
                            x.userId
                          );
                          deleteAlert(x.alertId);
                        }}
                      >
                        수락
                      </YesBtn>
                      <NoBtn
                        onClick={() => {
                          deleteAlert(x.alertId);
                        }}
                      >
                        거절
                      </NoBtn>
                    </ButtonBox>
                  ) : null}

                  {alert.length - 1 === i ? null : <Line></Line>}
                </div>
              );
            })
          ) : (
            <div> 알림이 없습니다. </div>
          )}
        </NotiMsgBox>
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
`;

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

const YesBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 20px;
  font-size: 10px;
  color: white;
  border-radius: 4px;
  margin: 0 4px 0 0;
  padding: 1px 16px;
  background-color: rgba(99, 113, 247, 1);
  cursor: pointer;
`;

const NoBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 20px;
  font-size: 10px;
  border-radius: 4px;
  border: 1px solid rgba(194, 194, 194, 1);
  padding: 1px 16px;
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
  border: 1px solid #dbdbdb;
`;

export default NotiModal;
