import React, { useEffect, useState } from "react";

// 라이브러리, 패키지
import styled from "styled-components";

// 엘리먼트
import { Text } from "../../elements";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configureStore";
import { galleryActions } from "../../redux/modules/gallery";

// 이미지
import noImage from "../../shared/images/noImage.png";

const PhotoAlbumList = ({ NowFamilyId }) => {
  const dispatch = useDispatch();
  console.log("현재 가족Id:", NowFamilyId);

  // 갤러리 앨범 리스트
  const { photoAlbumList } = useSelector((state) => state.gallery);
  console.log("갤러리 앨범 리스트:", photoAlbumList);

  useEffect(() => {
    dispatch(galleryActions.getPhotoAlbumDB(NowFamilyId));
  }, []);

  return (
    <>
      <MissionStatusWrap>
        <Content>
          <Flexbox>
            {photoAlbumList ? (
              photoAlbumList.map((l, i) => {
                return (
                  <AlbumImageWrap
                    key={l.photoAlbumId}
                    onClick={() => {
                      history.push(
                        `/family/${NowFamilyId}/gallery/${l.photoAlbumId}`
                      );
                    }}
                  >
                    <Items noImage={noImage}>
                      <AlbumImageBox />
                    </Items>
                    <div>{l.photoAlbumName}</div>
                  </AlbumImageWrap>
                );
              })
            ) : (
              <div>
                <AlbumImageWrap>
                  <Items noImage={noImage}>
                    <AlbumImageBox />
                  </Items>
                  <div>앨범</div>
                </AlbumImageWrap>
              </div>
            )}
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
  margin: 20px 0px 20px 0px;
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

export default PhotoAlbumList;
