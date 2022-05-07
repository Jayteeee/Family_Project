import React, { useState, useContext, useEffect } from "react";
import { MissionContext } from "../../../../pages/MissionPage";

// 라이브러리, 패키지
import styled from "styled-components";
import { RiArrowLeftSLine } from "react-icons/ri";

// 모달
import { ModalPortal } from "../../portals";
import { MissionMemberModal } from "./index";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { missionActions } from "../../../../redux/modules/mission";
import { history } from "../../../../redux/configureStore";

// 엘리먼트
import { Button, CircleImage, Text, Input } from "../../../../elements";

// 이미지
import profileImg from "../../../images/profileImg.png";

const AddPhotoModal = ({ onClose }) => {
  const dispatch = useDispatch();

  // 현재 familyId
  const familyId = useContext(MissionContext);
  console.log("현재 familyId:", familyId);

  //  미션 제목 input
  const [albumTitle, setAlbumTitle] = useState("");

  const handleAlbumTitle = (e) => {
    const { value } = e.target;
    setAlbumTitle(value);
  };

  console.log("미션 제목:", albumTitle);

  const addPhotoAlbum = () => {
    if (albumTitle) {
      dispatch(missionActions.addMissionDB(familyId, albumTitle));
      onClose();
    } else {
      alert("미션 제목을 입력하지 않았습니다.");
    }
  };

  return (
    <>
      <ModalPortal>
        <Background
          className="flex-row"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
            // history.replace()
          }}
        >
          <Content
            // 부모 태그에 onClose() 가 걸려있어서 모달 내부를 클릭했을때 창이 닫히지 않기위해 선언합니다
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <AddPhotoAlbumWrap>
              <AddPhothAlbumHeader>
                <CancelBtn
                  className="flex-row"
                  onClick={() => {
                    onClose();
                  }}
                >
                  {/* <RiArrowLeftSLine size={24} /> */}x
                </CancelBtn>
              </AddPhothAlbumHeader>
              <PhotoAlbumTitleBox>
                <Text size="24px" fontWeight="600">
                  새 앨범 만들기
                </Text>
                <Input
                  placeholder="ex) 가족 사진 찍기"
                  padding="15px"
                  margin="16px 0 0 0"
                  onChange={handleAlbumTitle}
                  borderRadius="20px"
                  borderColor="#DBDBDB"
                />
              </PhotoAlbumTitleBox>
              <Text>앨범 생성 후 사진을 넣어주세요</Text>
              <div>
                <Button
                  M
                  onClick={onClose}
                  borderColor="transparent"
                  bg="#DBDBDB"
                  color="#757575"
                  width="110px"
                  height="53px"
                  margin="30px 0 0 0"
                  fontSize="16px"
                  borderRadius="4px"
                >
                  취소
                </Button>
                <Button
                  M
                  onClick={addPhotoAlbum}
                  borderColor="transparent"
                  bg="#8C98F8"
                  color="white"
                  width="110px"
                  height="53px"
                  margin="30px 0 0 0"
                  fontSize="16px"
                  borderRadius="4px"
                >
                  저장
                </Button>
              </div>
            </AddPhotoAlbumWrap>
          </Content>
        </Background>
      </ModalPortal>
    </>
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
  /* text-align: center; */
  align-items: center;
  justify-content: center;
  z-index: 205;
  height: 750px;
  max-width: 470px;
  width: 100%;
  border-radius: 20px;
  background-color: #fff;
  padding: 14px;
  position: relative;
  overflow: scroll;
`;

const AddPhotoAlbumWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 20px;
  width: 100%;
  background-color: #fff;
  height: 100%;
`;

const CancelBtn = styled.div`
  display: flex;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  text-align: right;
  position: absolute;
  right: 0;
  top: 0;
  margin-left: 15px;
  margin-top: 15px;
  color: #5c5c5c;
  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
`;

const AddPhothAlbumHeader = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding-top: 40px;
`;

const PhotoAlbumTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  font-size: 18px;
  width: 100%;
  margin-top: 3px;
`;
const FamilyMemberTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  font-size: 18px;
  margin-top: 20px;
`;
const FamilyMemberBox = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 5px 20px;
  height: 36%;
  border: 2px solid #dbdbdb;
  border-radius: 20px;
`;

const MissionMemberBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-right: 20px;
`;

const AddFamilyMemberBtnBox = styled.div`
  display: flex;
  margin-top: 15px;
`;

const AddCicleBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 46px;
  background-color: #f6f6f6;
  /* margin-left: 10px; */
  cursor: pointer;
  &:hover {
    background-color: #d6d6d6;
  }
`;
export default AddPhotoModal;
