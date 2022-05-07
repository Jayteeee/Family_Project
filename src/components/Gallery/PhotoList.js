import React, { useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 엘리먼트
import { Text } from "../../elements";

// 리덕스
import { useDispatch } from "react-redux";

// 이미지
import noImage from "../../shared/images/noImage.png";

const PhotoList = () => {
  return (
    <>
      <MissionStatusWrap>
        <Content>
          <Flexbox>
            <AlbumImageWrap>
              <Items noImage={noImage}>
                <AlbumImageBox />
              </Items>
            </AlbumImageWrap>
            <AlbumImageWrap>
              <Items noImage={noImage}>
                <AlbumImageBox />
              </Items>
            </AlbumImageWrap>
            <AlbumImageWrap>
              <Items noImage={noImage}>
                <AlbumImageBox />
              </Items>
            </AlbumImageWrap>
            <AlbumImageWrap>
              <Items noImage={noImage}>
                <AlbumImageBox />
              </Items>
            </AlbumImageWrap>
          </Flexbox>
        </Content>
      </MissionStatusWrap>
    </>
  );
};

const MissionStatusWrap = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  border-radius: 20px;
  border: none;
  background: transparent;
  margin: 0px 40px;
`;

const Content = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

const Flexbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
`;

const AlbumImageWrap = styled.div`
  /* display: flex; */

  @media screen and (max-width: 839px) {
    flex-basis: auto;
    flex-shrink: 0;
    flex-grow: 1;
  }
`;
const Items = styled.div`
  flex-basis: auto;
  flex-shrink: 0;
  flex-grow: 1;
  border-radius: 24px;
  border: none;
  box-shadow: 0px 0px 3px 0px #d6d6d6;
  position: relative;
  background-color: #fff;
  ${({ noImage }) => `  background-image: url(${noImage})`};
  background-size: cover;
  &:hover {
    background: rgba(29, 28, 29, 0.1);
    color: rgba(29, 28, 29, 1);
  }
  // Medium (Desktop)
  @media screen and (max-width: 1199px) {
  }
  // Small (Tablet)
  @media screen and (max-width: 839px) {
  }
  // XSmall (Mobile)
  @media screen and (max-width: 599px) {
  }
`;

const AlbumImageBox = styled.div`
  display: block;
  width: 370px;
  padding-bottom: 100%;
  border-radius: 24px;
`;

export default PhotoList;
