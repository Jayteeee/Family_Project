// 홈 페이지
const familyList = [
  {
    familyId: "123456787",
    familyTitle: "가족1", // 가족 이름
    familyImg: "url",
    familyHost: "유저 닉네임",
    createdAt: "2022-04-15 00:51",
    email: "user1@gamil.com",
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
    email: "user1@gamil.com",
    userNickname: "유저 닉네임",
    profileImg: "url",
    todayMood: "이모지", // 이모지 사용
    missionStatus: "끈끈해요(80%)",
    randomMsg: "오늘은 부모님께 안부전화 한 통 어떨까요?",
  },
];

const recentPhotoList = [
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
];

const recentBadgeList = [
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
];

const weekMission = [
  {
    familyId: "123456787",
    missionName: "구성원 a에게 전화하기",
    missionId: "sdafasdf",
    missionChk: false,
  },
];

const familyMemberlist = [
  {
    familyId: "123456787",
    familyTitle: "가족1",
    familyMemberNicname: "아빠",
    familyMemberId: "1234213",
    email: "user1@gamil.com",
    userNickname: "닉네임1",
    profileImg: "",
    todayMood: "이모지", // 이모지 사용
    isLogin: false,
  },
  {
    familyId: "123456787",
    familyTitle: "가족1",
    familyMemberNicname: "엄마",
    familyMemberId: "2342fag4",
    email: "user2@gamil.com",
    userNickname: "닉네임2",
    profileImg: "url",
    todayMood: "이모지", // 이모지 사용
    isLogin: false,
  },
  {
    familyId: "123456787",
    familyTitle: "가족1",
    familyMemberNicname: "자녀",
    familyMemberId: "2342sd4",
    email: "user3@gamil.com",
    userNickname: "닉네임3",
    profileImg: "url",
    todayMood: "이모지", // 이모지 사용
    isLogin: false,
  },
];

// 미션 페이지
const missionBox = {
  familyId: "123456787",
  missionId: "asdfadsf",
  totalMission: 12,
  completedMission: 9,
  completePercentage: 50,
  totalBadge: 3,
};

const badgeList = [
  {
    familyId: "123456787",
    badgeId: "asdfdsa",
    badgeChk: false,
    badgeTitle: "뱃지 타이틀",
    badgeCnt: 3,
  },
  {
    familyId: "123456787",
    badgeId: "asdfdsadasdf",
    badgeChk: false,
    badgeTitle: "뱃지 타이틀2",
    badgeCnt: 3,
  },
];

const weekMissionList = [
  {
    familyId: "123456787",
    missionId: "asdfassdsddf",
    missionName: "우리가족 피크닉 가기",
    missionChk: false,
  },
];

const missionMemberList = [
  {
    familyId: "123456787",
    familyMemberId: "1234213",
    familyMemberNicname: "아빠",
    missionId: "asdfassdsddf",
    memberMissionChk: false,
  },
  {
    familyId: "123456787",
    familyMemberId: "2342fag4",
    familyMemberNicname: "엄마",
    missionId: "asdfassdsddf",
    memberMissionChk: false,
  },
  {
    familyId: "123456787",
    familyMemberId: "2342sd4",
    familyMemberNicname: "자녀",
    missionId: "asdfassdsddf",
    memberMissionChk: false,
  },
];

const completedMissionList = [
  {
    familyId: "123456787",
    familyMemberId: "1234213",
    familyMemberNicname: "아빠",
    missionId: "asdfadsf",
  },
  {
    familyId: "123456787",
    familyMemberId: "2342fag4",
    familyMemberNicname: "엄마",
    missionId: "asdfadsfdfsd",
  },
  {
    familyId: "123456787",
    familyMemberId: "2342sd4",
    familyMemberNicname: "자녀",
    missionId: "asdfadsfsdfff",
  },
];

// 갤러리 페이지
const photoAlbumList = [
  {
    familyId: "123456787",
    photoAlbumId: "23dfgsdf4",
    photoAlbumName: "앨범1",
    createdAt: "2022-04-15 00:51",
    recentImage: "url", // 해당하는 앨범에 가장 최근 이미지(앨범 아이디로 체크)
  },
];

const photoList = [
  {
    familyId: "123456787",
    photoAlbumId: "23dfgsdf4",
    photoAlbumName: "앨범1",
    photoId: "23dfgsdf4d",
    photoName: "사진1",
    createdAt: "2022-04-15 00:51",
    photoFile: "url",
    totalLike: 2,
    likeChk: "false",
  },
];

const detailPhoto = {
  familyId: "123456787",
  photoAlbumId: "23dfgsdf4",
  photoId: "23dfgsdf4d",
  photoName: "사진1",
  createdAt: "2022-04-15 00:51",
  photoFile: "url",
  totalLike: 2,
  likeChk: "false",
  familyMemberNicname: "아빠", // 특정해서 보내줄 수 있는지
  content: "가족 사진입니다.",
};

const commentList = [
  {
    familyId: "123456787",
    photoAlbumId: "23dfgsdf4",
    photoId: "23dfgsdf4d",
    commentId: "alskdjfaklsdjfaa",
    createdAt: "2022-04-15 01:30",
    comment: "댓글달아봐요",
    familyMemberNicname: "아빠",
    profileImg: "url",
  },
];

const likeMember = [
  {
    familyId: "123456787",
    photoId: "23dfgsdf4d",
    familyMemberNicname: "아빠",
  },
  {
    familyId: "123456787",
    photoId: "23dfgsdf4d",
    familyMemberNicname: "엄마",
  },
  {
    familyId: "123456787",
    photoId: "23dfgsdf4d",
    familyMemberNicname: "자녀",
  },
];

// 캘린더 페이지
const calendarEventList = [
  {
    familyId: "123456787",
    eventId: "asdfasdf434",
    event: "부모님께 연락하기",
    startDate: "2022-04-15 01:30",
    endDate: "2022-04-15 01:30",
    color: "red",
  },
];

const calendarPhotoList = [
  {
    familyId: "123456787",
    photoId: "asdfadsf",
    photoDate: "2022-04-15",
    photoFile: "url",
  },
];

// 음성 메세지 페이지
const voiceAlbumList = [
  {
    familyId: "123456787",
    voiceAlbumId: "asdfdf",
    voiceAlbumName: "일상",
    createdAt: "2022-04-15 00:51",
  },
];

const voiceFileList = [
  {
    familyId: "123456787",
    voiceAlbumId: "asdfdf",
    voiceAlbumName: "일상",
    voiceFileId: "asdfadsf",
    voiceFileTitle: "잔소리1",
    voiceFile: "",
    createdAt: "2022-04-15 00:51",
    familyMemberNicname: "자녀",
    profileImg: "url",
  },
];

export const DummyData = {
  familyList,
  recentPhotoList,
  recentBadgeList,
  weekMission,
  familyMemberlist,
  missionBox,
  badgeList,
  weekMissionList,
  missionMemberList,
  completedMissionList,
  photoAlbumList,
  photoList,
  detailPhoto,
  commentList,
  likeMember,
  calendarEventList,
  calendarPhotoList,
  voiceAlbumList,
  voiceFileList,
};
