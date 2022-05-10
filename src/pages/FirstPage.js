import React, { useState } from "react";
import styled from "styled-components";

import { ModalPortal } from "../shared/modal/portals";
import { FirstFamilyModal } from "../shared/modal/component/ProfileModal";
import { Button } from "../elements";

const FirstPage = () => {
  // 가족 생성하기 모달
  const [firstFamilyModal, setFirstFamilyModal] = useState(false);

  const handleAddFamilyModal = () => {
    setFirstFamilyModal(!firstFamilyModal);
  };

  return (
    <>
      <FirstPageWrap>
        <Button onClick={handleAddFamilyModal}>가족을 생성해주세요</Button>
        <ModalPortal>
          {firstFamilyModal && (
            <FirstFamilyModal onClose={handleAddFamilyModal} />
          )}
        </ModalPortal>
      </FirstPageWrap>
    </>
  );
};

const FirstPageWrap = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export default FirstPage;
