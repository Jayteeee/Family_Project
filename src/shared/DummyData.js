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
    profileImg: false,
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
    profileImg: false,
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
        profileImg: false,
        todayMood: "이모지",
      },
    },

    {
      familyMemberNicname: "엄마",
      familyMemberId: "368defse2",
      userInfo: {
        userId: "userId@userId.com",
        nickname: "닉네임",
        profileImg: false,
        todayMood: "이모지",
      },
    },
    {
      familyMemberNicname: "자녀",
      familyMemberId: "68defs231a",
      userInfo: {
        userId: "userId@userId.com",
        nickname: "닉네임",
        profileImg: false,
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
      profileImg: false,
      todayMood: "이모지",
    },
  },
  {
    familyMemberNickname: "엄마",
    familyMemberId: "1542368defse2",
    userInfo: {
      userId: "userId2@userId.com",
      nickname: "닉네임",
      profileImg: false,
      todayMood: "이모지",
    },
  },
  {
    familyMemberNickname: "자녀",
    familyMemberId: "1542368defs231a",
    userInfo: {
      userId: "userId3@userId.com",
      nickname: "닉네임",
      profileImg: false,
      todayMood: "이모지",
    },
  },
];

// 미션 페이지

// 이번주 미션 페이지
const missionPage = {
  missionBox: {
    totalMission: 12,
    completedMission: 9,
    completePercentage: 50,
    totalBadge: 3,
  },
  monthMissionList: [
    {
      familyId: "123456787",
      missionId: "asdfassdsddf",
      missionTitle: "우리가족 피크닉 가기", //name -> title 수
      missionChk: false,
      completedAt: "YYYY-MM-DD",
      missionMemberList: [
        {
          familyMemberId: "1234213",
          familyMemberNicname: "아빠",
          memberMissionChk: false,
          profileImg: false,
        },
        {
          familyMemberId: "2342fag4",
          familyMemberNicname: "엄마",
          memberMissionChk: false,
          profileImg: false,
        },
        {
          familyMemberId: "2342sd4",
          familyMemberNicname: "아들",
          memberMissionChk: false,
          profileImg: false,
        },
      ],
    },
    {
      familyId: "123456787",
      missionId: "4435dfassds3ddf",
      missionTitle: "서로 전화하기", //name -> title 수
      missionChk: false,
      completedAt: "YYYY-MM-DD",
      missionMemberList: [
        {
          familyMemberId: "1234213",
          familyMemberNicname: "아빠",
          memberMissionChk: false,
          profileImg: false,
        },
        {
          familyMemberId: "2342sd434",
          familyMemberNicname: "딸",
          memberMissionChk: false,
          profileImg: false,
        },
      ],
    },
  ],
  pastMissionList: [
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
    profileImg: false,
  },
  {
    familyMemberId: "dfaefadfdfe",
    familyMemberNickname: "엄마",
    profileImg: false,
  },
  {
    familyMemberId: "dfaefawdfedf",
    familyMemberNickname: "자녀",
    profileImg: false,
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
      profileImg: false,
      familyMemberNicname: "아빠",
    },
    {
      familyId: "123456787",
      photoId: "23dfgsdf4d",
      profileImg: false,
      familyMemberNicname: "엄마",
    },
    {
      familyId: "123456787",
      photoId: "23dfgsdf4d",
      profileImg: false,
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
    startDate: "2022-04-15",
    endDate: "2022-04-15",
    color: "red",
  },
];
// 추억보기 페이지 / params로 date 보내야함('YYYY-MM')
const photoCalendarPage = {
  eventCalendarList: [
    {
      eventId: "asdfasdf434",
      event: "부모님께 연락하기",
      startDate: "2022-05-15",
      endDate: "2022-05-15",
      color: "red",
    },
  ],
  photoCalendarList: [
    {
      photoId: "puppy",
      photoFile:
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg",
      createdAt: "2022-05-15",
    },
    {
      photoId: "puppy2",
      photoFile:
        "data:image/jpeg;base64,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",
      createdAt: "2022-05-20",
    },
    {
      photoId: "puppy3",
      photoFile:
        "data:image/jpeg;base64,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",
      createdAt: "2022-05-23",
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
      profileImg: false,
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
