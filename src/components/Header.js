import React from "react";
import { IoMdNotifications } from "react-icons/io";

import styled from "styled-components";
import { Input, CircleImage } from "../elements";

// 내비게이션 바
const Header = () => {
  return (
    <>
      <div>
        <HeaderWarp>
          <RogoBox>로고</RogoBox>
          <HeaderRightBox>
            <IoMdNotifications
              style={{
                marginRight: "20px",
                fontSize: "25px",
                color: "#d6d6d6",
              }}
            />
            <CircleImage S />
          </HeaderRightBox>
        </HeaderWarp>
      </div>
    </>
  );
};

const HeaderWarp = styled.header`
  height: 44px;
  background: #fff;
  color: #282828;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 203;
  text-align: center;
  border-bottom: 1px solid #d6d6d6;
`;

const RogoBox = styled.div`
  padding-left: 10px;
`;

const HeaderRightBox = styled.div`
  display: flex;
  align-items: center;
  padding-right: 30px;
`;

export default Header;
