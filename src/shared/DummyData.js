// 사이드바 Dropdown용 가족 리스트
const familyList = [
  {
    familyId: "123456787",
    familyTitle: "가족1", // 가족 이름
    familyImg: "url",
    familyHost: "유저 닉네임",
    createdAt: "2022-04-15 00:51",
    userId: "user1@gamil.com",
    userNickname: "유저 닉네임",
    profileImg: "url",
    todayMood: "이모지", // 이모지 사용
    missionStatus: "끈끈해요(75%)",
    randomMsg: "오늘은 부모님께 안부전화 한 통 어떨까요?",
  },
  {
    familyId: "qwerewr",
    familyTitle: "가족2", // 가족 이름
    familyImg: "url",
    familyHost: "유저 닉네임",
    createdAt: "2022-04-15 00:51",
    userId: "user1@gamil.com",
    userNickname: "유저 닉네임",
    profileImg: "url",
    todayMood: "이모지", // 이모지 사용
    missionStatus: "끈끈해요(80%)",
    randomMsg: "오늘은 부모님께 안부전화 한 통 어떨까요?",
  },
];

// 메인페이지
const mainPage = {
  familyId: "123456787",
  familyTitle: "가족1", // 가족 이름
  familyHost: "유저 닉네임",
  missionStatus: "끈끈해요(75%)",
  randomMsg: "오늘은 부모님께 안부전화 한 통 어떨까요?",
  randomPhotoList: [
    {
      familyId: "123456787",
      photoId: "adsfasdf",
      photoFile: "url",
      photoTotalLike: 5,
      commentCnt: 3,
    },
    {
      familyId: "123456787",
      photoId: "adsfasdf",
      photoFile: "url",
      photoTotalLike: 3,
      commentCnt: 1,
    },
  ],
  recentBadgeList: [
    {
      familyId: "123456787",
      badgeId: "asdfkadsjfd",
      badgeTitle: "뱃지 타이틀",
    },
    {
      familyId: "123456787",
      badgeId: "asdfkadsjfd",
      badgeTitle: "뱃지 타이틀",
    },
  ],
  weekMissionList: [
    {
      familyId: "123456787",
      missionName: "구성원 a에게 전화하기",
      missionId: "sdafasdf",
      missionChk: false,
    },
  ],
  recentVoice: {
    voiceAlbumId: "1535484",
    voiceId: "15483d48e4",
    familyMemberNickname: "엄마",
    voiceFile: "dfafaefdfe",
  },
  calendar: [
    {
      eventId: "1234124",
      event: "우리가족 여행",
      startDate: "YYYY-MM-DD",
      endDate: "YYYY-MM-DD",
    },
  ],
  familyMemberList: [
    {
      familyMemberNicname: "아빠",
      familyMemberId: "1542368defsea",
      userInfo: {
        userId: "userId@userId.com",
        nickname: "닉네임",
        profileImg:
          "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png",
        todayMood: "이모지",
      },
    },

    {
      familyMemberNicname: "엄마",
      familyMemberId: "368defse2",
      userInfo: {
        userId: "userId@userId.com",
        nickname: "닉네임",
        profileImg:
          "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png",
        todayMood: "이모지",
      },
    },
    {
      familyMemberNicname: "자녀",
      familyMemberId: "68defs231a",
      userInfo: {
        userId: "userId@userId.com",
        nickname: "닉네임",
        profileImg:
          "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png",
        todayMood: "이모지",
      },
    },
  ],
};

// 가족 구성원 수정페이지
const nowFamilyMemberList = [
  {
    familyMemberNickname: "아빠",
    familyMemberId: "1542368defsea",
    userInfo: {
      userId: "userId1@userId.com",
      nickname: "닉네임",
      profileImg:
        "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png",
      todayMood: "이모지",
    },
  },
  {
    familyMemberNickname: "엄마",
    familyMemberId: "1542368defse2",
    userInfo: {
      userId: "userId2@userId.com",
      nickname: "닉네임",
      profileImg:
        "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png",
      todayMood: "이모지",
    },
  },
  {
    familyMemberNickname: "자녀",
    familyMemberId: "1542368defs231a",
    userInfo: {
      userId: "userId3@userId.com",
      nickname: "닉네임",
      profileImg:
        "https://boyohaeng-image.s3.ap-northeast-2.amazonaws.com/profile_img.png",
      todayMood: "이모지",
    },
  },
];

// 미션 페이지

// 이번주 미션 페이지
const missionPage = {
  missionBox: {
    familyId: "123456787",
    totalMission: 12,
    completedMission: 9,
    completePercentage: 50,
    totalBadge: 3,
  },
  weekMissionList: [
    {
      familyId: "123456787",
      missionId: "asdfassdsddf",
      missionName: "우리가족 피크닉 가기",
      missionChk: false,
      missionMemberList: [
        {
          familyId: "123456787",
          familyMemberId: "1234213",
          familyMemberNicname: "아빠",
          memberMissionChk: false,
        },
        {
          familyId: "123456787",
          familyMemberId: "2342fag4",
          familyMemberNicname: "엄마",
          memberMissionChk: false,
        },
        {
          familyId: "123456787",
          familyMemberId: "2342sd4",
          familyMemberNicname: "자녀",
          memberMissionChk: false,
        },
      ],
    },
  ],
};
// 배지 페이지
const badgePage = {
  familyId: "123456787",
  badge: [
    {
      badgeChk: false,
      badgeTitle: "뱃지 타이틀",
      badgeCnt: 3,
    },
    {
      badgeChk: false,
      badgeTitle: "뱃지 타이틀2",
      badgeCnt: 3,
    },
  ],
};
// 지난미션 페이지
const pastMissionList = [
  {
    familyId: "123456787",
    missionId: "asdfassdsddf",
    missionName: "우리가족 피크닉 가기",
    missionChk: false,
    missionMemberList: [
      {
        familyId: "123456787",
        familyMemberId: "1234213",
        familyMemberNicname: "아빠",
        memberMissionChk: false,
      },
      {
        familyId: "123456787",
        familyMemberId: "2342fag4",
        familyMemberNicname: "엄마",
        memberMissionChk: false,
      },
      {
        familyId: "123456787",
        familyMemberId: "2342sd4",
        familyMemberNicname: "자녀",
        memberMissionChk: false,
      },
    ],
  },
];
// 미션 맴버 검색용
const familyMemberList = [
  {
    familyMemberId: "dfaefadf",
    familyMemberNickname: "아빠",
    profileImg: "프로필 사진 URL",
  },
  {
    familyMemberId: "dfaefadfdfe",
    familyMemberNickname: "엄마",
    profileImg: "프로필 사진 URL",
  },
  {
    familyMemberId: "dfaefawdfedf",
    familyMemberNickname: "자녀",
    profileImg: "프로필 사진 URL",
  },
];

// 갤러리 페이지

// 사진앨범 페이지
const photoAlbumList = [
  {
    photoAlbumId: "23dfgsdf4",
    photoAlbumName: "앨범1",
    recentImage: "url", // 해당하는 앨범에 가장 최근 이미지(앨범 아이디로 체크)
  },
];
// 사진 페이지
const photoList = [
  {
    photoAlbumName: "앨범1",
    photoId: "23dfgsdf4d",
    photoName: "사진1",
    photoFile: "url",
    totalLike: 2,
    likeChk: "false",
  },
];
// 사진 상세페이지
const detailPhotoPage = {
  detailPhoto: {
    photoId: "23dfgsdf4d",
    photoName: "사진1",
    createdAt: "2022-04-15 00:51",
    photoFile: "url",
    totalLike: 2,
    likeChk: "false",
    profileImg: "url",
    familyMemberNickname: "아빠", // 특정해서 보내줄 수 있는지
    content: "가족 사진입니다.",
  },
  totalComment: 3,
  commentList: [
    {
      photoId: "23dfgsdf4d",
      commentId: "alskdjfaklsdjfaa",
      createdAt: "2022-04-15 01:30",
      comment: "댓글달아봐요",
      familyMemberNickname: "아빠",
      profileImg: "url",
    },
  ],
  likeMember: [
    {
      familyId: "123456787",
      photoId: "23dfgsdf4d",
      profileImg: "url",
      familyMemberNicname: "아빠",
    },
    {
      familyId: "123456787",
      photoId: "23dfgsdf4d",
      profileImg: "url",
      familyMemberNicname: "엄마",
    },
    {
      familyId: "123456787",
      photoId: "23dfgsdf4d",
      profileImg: "url",
      familyMemberNicname: "자녀",
    },
  ],
};

// 캘린더 페이지

// 일정보기 페이지 / params로 date 보내야함('YYYY-MM')
const eventCalendarList = [
  {
    eventId: "asdfasdf434",
    event: "부모님께 연락하기",
    startDate: "2022-04-15 01:30",
    endDate: "2022-04-15 01:30",
    color: "red",
  },
];
// 추억보기 페이지 / params로 date 보내야함('YYYY-MM')
const photoCalendarPage = {
  eventCalendarList: [
    {
      eventId: "asdfasdf434",
      event: "부모님께 연락하기",
      startDate: "2022-04-15 01:30",
      endDate: "2022-04-15 01:30",
      color: "red",
    },
  ],
  photoCalendarList: [
    {
      photoId: "454fdw",
      photoFile: "url",
      createdAt: "YYYY-MM-DD",
    },
  ],
};
// 추억 상세보기 모달 / params로 date 보내야함('YYYY-MM-DD')
const photoModalList = [
  {
    photoId: "454fdw",
    photoFile: "url",
  },
];

// 음성 메세지 페이지

// 음성 앨범 페이지
const voiceAlbumList = [
  {
    voiceAlbumId: "asdfdf",
    voiceAlbumName: "일상",
  },
];
// 음성 파일 페이지
const voiceFilePage = {
  voiceAlbumName: "일상",
  voiceFileList: [
    {
      voiceFileId: "asdfadsf",
      voiceFileTitle: "잔소리1",
      voiceFile: "url",
      voicePlayTime: "mm:ss",
      createdAt: "2022-04-15 00:51",
      familyMemberNickname: "자녀",
      profileImg: "url",
    },
  ],
};

export const DummyData = {
  // 사이드바
  familyList,
  // 메인 페이지
  mainPage,
  // 가족 구성원 수정페이지
  nowFamilyMemberList,
  // 미션 페이지
  missionPage,
  badgePage,
  pastMissionList,
  familyMemberList,
  // 갤러리 페이지
  photoAlbumList,
  photoList,
  detailPhotoPage,
  // 캘린더 페이지
  eventCalendarList,
  photoCalendarPage,
  photoModalList,
  // 음성메세지 페이지
  voiceAlbumList,
  voiceFilePage,
};
