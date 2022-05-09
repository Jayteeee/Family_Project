import React, { useState } from "react";
import styled from "styled-components";

import { ModalPortal } from "../shared/modal/portals";
import { FirstFamilyModal } from "../shared/modal/component/ProfileModal";
import { Button } from "../elements";

const FamilyPage = () => {
  // 가족 생성하기 모달
  const [firstFamilyModal, setFirstFamilyModal] = useState(false);

  const handleAddFamilyModal = () => {
    setFirstFamilyModal(!firstFamilyModal);
  };

  return (
    <>
      <Button onClick={handleAddFamilyModal}>가족 생성하기</Button>
      <ModalPortal>
        {firstFamilyModal && (
          <FirstFamilyModal onClose={handleAddFamilyModal} />
        )}
      </ModalPortal>
    </>
  );
};
export default FamilyPage;
