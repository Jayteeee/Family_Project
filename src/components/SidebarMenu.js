import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const SidebarMenu = (props) => {
  const familyId = props.familyId;
  console.log(familyId);

  return (
    <>
      <SidebarMenuWrap>
        <Menu>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.replace(`/family/${familyId}`);
            }}
          >
            홈
          </span>
        </Menu>
        <Menu>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/family/${familyId}/mission`);
            }}
          >
            미션
          </span>
        </Menu>
        <Menu>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/family/${familyId}/calendar`);
            }}
          >
            캘린더
          </span>
        </Menu>
        <Menu>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/family/${familyId}/gallery`);
            }}
          >
            갤러리
          </span>
        </Menu>
        <Menu>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/");
            }}
          >
            음성메세지
          </span>
        </Menu>
      </SidebarMenuWrap>
    </>
  );
};

const SidebarMenuWrap = styled.div`
  height: calc(100vh - 38px);
  overflow-y: auto;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  padding: 5px 15px;
  &:hover {
    background: #d6d6d6;
  }
`;

export default SidebarMenu;
