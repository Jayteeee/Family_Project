import React, { useState } from "react";
import styled from "styled-components";

import { ModalPortal } from "../shared/modal/portals";
import { AddFamilyModal } from "../shared/modal/component";
import { Button } from "../elements";

const FamilyPage = () => {
  // 가족 생성하기 모달
  const [addFamilyModal, setaddFamilyModal] = useState(false);

  const handleAddFamilyModal = () => {
    setaddFamilyModal(!addFamilyModal);
  };

  return (
    <>
      {/* <Button onClick={handleAddFamilyModal}>가족 생성하기</Button>
      <ModalPortal>
        {addFamilyModal && <AddFamilyModal onClose={handleAddFamilyModal} />}
      </ModalPortal> */}
    </>
  );
};

export default FamilyPage;
