// 사이드바 Dropdown용 가족 리스트
const familyList = [
  {
    familyId: "123456787",
    familyTitle: "가족1", // 가족 이름
    familyImg: "url",
    familyHost: "유저 닉네임",
    createdAt: "2022-04-15 00:51",
    email: "asdf@gmail.com",
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
    email: "asdf@gmail.com",
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
        userId: "asdf@gmail.com",
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
    familyMemberId: "68defs231a",
    userInfo: {
      userId: "asdf@gmail.com",
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

  thisMonthMissionList: [
    {
      familyId: "123456787",
      missionId: "asdfassdsddf",
      missionTitle: "우리가족 피크닉 가기", //name -> title 수
      familyMissionChk: false,
      completedAt: "YYYY-MM-DD",
      missionMemberList: [
        {
          familyMemberId: "1234213",
          familyMemberNicname: "아빠",
          myMissionChk: false,
          profileImg: false,
        },
        {
          familyMemberId: "2342fag4",
          familyMemberNicname: "엄마",
          myMissionChk: false,
          profileImg: false,
        },
        {
          familyMemberId: "68defs231a",
          familyMemberNicname: "자녀",
          myMissionChk: false,
          profileImg: false,
        },
      ],
    },
    {
      familyId: "123456787",
      missionId: "3sdfeassdsddf",
      missionTitle: "우리가족 여행 가기", //name -> title 수
      familyMissionChk: false,
      completedAt: "YYYY-MM-DD",
      missionMemberList: [
        {
          familyMemberId: "1234213",
          familyMemberNicname: "아빠",
          myMissionChk: false,
          profileImg: false,
        },
        {
          familyMemberId: "2342fag4",
          familyMemberNicname: "엄마",
          myMissionChk: false,
          profileImg: false,
        },
        {
          familyMemberId: "68defs231a",
          familyMemberNicname: "자녀",
          myMissionChk: false,
          profileImg: false,
        },
      ],
    },
    // {
    //   familyId: "123456787",
    //   missionId: "4435dfassds3ddf",
    //   missionTitle: "서로 전화하기", //name -> title 수
    //   familyMissionChk: true,
    //   completedAt: "YYYY-MM-DD",
    //   missionMemberList: [
    //     {
    //       familyMemberId: "1234213",
    //       familyMemberNicname: "아빠",
    //       myMissionChk: true,
    //       profileImg: false,
    //     },
    //     {
    //       familyMemberId: "2342sd434",
    //       familyMemberNicname: "딸",
    //       myMissionChk: true,
    //       profileImg: false,
    //     },
    //   ],
    // },
  ],
};

// pastMissionList: [
//   {
//     familyId: "123456787",
//     missionId: "asdfassdsddf",
//     missionTitle: "호캉스 가기",
//     missionChk: false,
//     completedAt: "YYYY-MM-DD",
//     missionMemberList: [
//       {
//         familyId: "123456787",
//         familyMemberId: "1234213",
//         familyMemberNicname: "아빠",
//         memberMissionChk: false,
//       },
//       {
//         familyId: "123456787",
//         familyMemberId: "2342fag4",
//         familyMemberNicname: "엄마",
//         memberMissionChk: false,
//       },
//       {
//         familyId: "123456787",
//         familyMemberId: "2342sd4",
//         familyMemberNicname: "자녀",
//         memberMissionChk: false,
//       },
//     ],
//   },
// ],
// };

// 배지 페이지
const badgePage = {
  familyId: "123456787",
  badge: [
    {
      badgeChk: true,
      badgeTitle: "뱃지 타이틀",
      badgeCnt: 1,
    },
    {
      badgeChk: false,
      badgeTitle: "뱃지 타이틀2",
      badgeCnt: 4,
    },
    {
      badgeChk: false,
      badgeTitle: "뱃지 타이틀2",
      badgeCnt: 7,
    },
    {
      badgeChk: false,
      badgeTitle: "뱃지 타이틀2",
      badgeCnt: 2,
    },
    {
      badgeChk: false,
      badgeTitle: "뱃지 타이틀2",
      badgeCnt: 5,
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
    missionTitle: "호캉스 가기",
    familyMissionChk: false,
    completedAt: "YYYY-MM-DD",
    missionMemberList: [
      {
        familyId: "123456787",
        familyMemberId: "1234213",
        familyMemberNicname: "아빠",
        myMissionChk: false,
      },
      {
        familyId: "123456787",
        familyMemberId: "2342fag4",
        familyMemberNicname: "엄마",
        myMissionChk: false,
      },
      {
        familyId: "123456787",
        familyMemberId: "68defs231a",
        familyMemberNicname: "자녀",
        myMissionChk: false,
      },
    ],
  },
  {
    familyId: "123456787",
    missionId: "asd3234dsddf",
    missionTitle: "여행 가기",
    familyMissionChk: true,
    completedAt: "YYYY-MM-DD",
    missionMemberList: [
      {
        familyId: "123456787",
        familyMemberId: "2342fag4",
        familyMemberNicname: "엄마",
        myMissionChk: true,
      },
      {
        familyId: "123456787",
        familyMemberId: "68defs231a",
        familyMemberNicname: "자녀",
        myMissionChk: true,
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
    familyMemberId: "68defs231a",
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
    recentImage: null, // 해당하는 앨범에 가장 최근 이미지(앨범 아이디로 체크)
  },
  {
    photoAlbumId: "3dfgddf4",
    photoAlbumName: "앨범2",
    recentImage: null, // 해당하는 앨범에 가장 최근 이미지(앨범 아이디로 체크)
  },
  {
    photoAlbumId: "2123dfgsdf4",
    photoAlbumName: "앨범3",
    recentImage: null, // 해당하는 앨범에 가장 최근 이미지(앨범 아이디로 체크)
  },
  {
    photoAlbumId: "23df4gsdf4",
    photoAlbumName: "앨범4",
    recentImage: null, // 해당하는 앨범에 가장 최근 이미지(앨범 아이디로 체크)
  },
  {
    photoAlbumId: "3dfdsgsdf4",
    photoAlbumName: "앨범5",
    recentImage: null, // 해당하는 앨범에 가장 최근 이미지(앨범 아이디로 체크)
  },
];
// 사진 페이지
const photoList = [
  // {
  //   photoAlbumName: "앨범1",
  //   photoId: "23dfgsdf4d",
  //   photoName: "사진1",
  //   photoFile:
  //     "data:image/jpeg;base64,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",
  //   totalLike: 2,
  //   likeChk: "false",
  // },
  // {
  //   photoAlbumName: "앨범1",
  //   photoId: "23fdb4df488d",
  //   photoName: "사진2",
  //   photoFile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2x09km7b35RzvH8yg_tXzVkSi_jXJnmOWA&usqp=CAU",
  //   totalLike: 5,
  //   likeChk: "false",
  // },
  // {
  //   photoAlbumName: "앨범1",
  //   photoId: "dsafasf",
  //   photoName: "사진3",
  //   photoFile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT5dMv2oDdbxTWa4aRhMqUDrxdbcvUSzMSlQ&usqp=CAU",
  //   totalLike: 2,
  //   likeChk: "false",
  // },
  // {
  //   photoAlbumName: "앨범1",
  //   photoId: "23dfgadsdf4d",
  //   photoName: "사진4",
  //   photoFile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF5muH6piXfKA2yUyMkJwm0mJq6O4lU-1mFA&usqp=CAU",
  //   totalLike: 10,
  //   likeChk: "false",
  // },
  // {
  //   photoAlbumName: "앨범1",
  //   photoId: "2323dfgsdf4d",
  //   photoName: "사진5",
  //   photoFile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc-KaPvPUsxtSefGEyqXwphkMa5zcmhaa7JA&usqp=CAU",
  //   totalLike: 1,
  //   likeChk: "false",
  // },
  // {
  //   photoAlbumName: "앨범1",
  //   photoId: "23dfgsdf4fgd",
  //   photoName: "사진6",
  //   photoFile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhzbC_j6VtgNx1JKAGWftcTJDo8iYLzXZhEQ&usqp=CAU",
  //   totalLike: 3,
  //   likeChk: "false",
  // },
  // {
  //   photoAlbumName: "앨범1",
  //   photoId: "3dfdgsdf4ddfs",
  //   photoName: "사진7",
  //   photoFile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwy5Cg07waBNw-NzDgLklQbzj6Z5nUUBFLyQ&usqp=CAU",
  //   totalLike: 2,
  //   likeChk: "false",
  // },
  // {
  //   photoAlbumName: "앨범1",
  //   photoId: "dsf3dfdgsdf4d",
  //   photoName: "사진8",
  //   photoFile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq01fVVnfGioQstWoKML7yZACHv-wpI-_Fcg&usqp=CAU",
  //   totalLike: 2,
  //   likeChk: "false",
  // },
  // {
  //   photoAlbumName: "앨범1",
  //   photoId: "3dfdgsdsdff4d",
  //   photoName: "사진9",
  //   photoFile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDfM1URFNO5-xV5MABoaQxTPGVeKhrCgsAzg&usqp=CAU",
  //   totalLike: 2,
  //   likeChk: "false",
  // },
  // {
  //   photoAlbumName: "앨범1",
  //   photoId: "3dsafdfdgsdf4d",
  //   photoName: "사진10",
  //   photoFile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPOXRrQLO6hHtyZu-wBY59ccqH6BqF1ck6ZQ&usqp=CAU",
  //   totalLike: 2,
  //   likeChk: "false",
  // },
  // {
  //   photoAlbumName: "앨범1",
  //   photoId: "3dfdgssdfffdf4d",
  //   photoName: "사진11",
  //   photoFile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdCZXLDprtNeEOMF0hwE0ahIUq5bOU9tfvSA&usqp=CAU",
  //   totalLike: 2,
  //   likeChk: "false",
  // },
  // {
  //   photoAlbumName: "앨범1",
  //   photoId: "3dfdgsadsdf4d",
  //   photoName: "사진12",
  //   photoFile:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxvwKRAhA-i1aCkmluIOJYkJHM9D8E9E9jZg&usqp=CAU",
  //   totalLike: 2,
  //   likeChk: "false",
  // },
];
// 사진 상세페이지
const detailPhotoPage = {
  detailPhoto: {
    photoId: "23dfgsdf4d",
    photoName: "사진1",
    createdAt: "2022-04-15 00:51",
    photoFile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2x09km7b35RzvH8yg_tXzVkSi_jXJnmOWA&usqp=CAU",
    totalLike: 2,
    likeChk: "false",
    profileImg: null,
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
      photoId: "68defs231a",
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
    event: "아들 본가 내려가기",
    startDate: "2022-05-05",
    endDate: "2022-05-05",
    color: "#6524F5",
  },
  {
    eventId: "asdfasdf434",
    event: "딸 본가 내려가기",
    startDate: "2022-05-05",
    endDate: "2022-05-05",
    color: "yellow",
  },
  {
    eventId: "asdfasdf434",
    event: "부모님께 연락하기",
    startDate: "2022-05-15",
    endDate: "2022-05-15",
    color: "#5FCE89",
  },
];

// 일정 상세보기 페이지 / params로 date 보내야함('YYYY-MM-DD')
const eventModalList = [
  {
    event: "부모님께 연락하기",
    startDate: "2022-05-15",
    endDate: "2022-05-15",
    color: "#5FCE89",
    familyMemberNickname: "아들 정태",
    profileImg:
      "data:image/jpeg;base64,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",
  },
  {
    event: "본가 내려가기",
    startDate: "2022-05-05",
    endDate: "2022-05-05",
    color: "#6524F5",
    familyMemberNickname: "아빠 정태",
    profileImg:
      "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg",
  },
  {
    event: "실전프로젝트 마무리하기",
    startDate: "2022-05-13",
    endDate: "2022-05-13",
    color: "#C588F6",
    familyMemberNickname: "동생 정태",
    profileImg:
      "data:image/jpeg;base64,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",
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
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQEhUQEBIVFRUVFxUVFRUVFRcVFRcWFRUXFxUVFRYYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGCsdHR0tLSstKysrLS0tKy0tLSstLS0tLS0rLS0tLSstLS0tLS0tKzUtKy0tKzctLTcrKy0tK//AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EADgQAAIBAgMECQQBAwMFAAAAAAABAgMRBCExBRJBUQYTYXGBkaGx8CLB0eHxFDJSFWKCByNCQ3L/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQMCBP/EAB4RAQEAAwEBAQEBAQAAAAAAAAABAgMRIRIxQVEy/9oADAMBAAIRAxEAPwD10UMSAiMRpkSQSRSDQBaRaIi0AWQhYBC0UQAtlEIACPjoIsNQreNSI2UHYGTI3YpNYWDcjqAE7tUmsaI0BKdgt8X2fyrdIkTfKlLgOZFYlyOQtsByzNzYx8NFymIVYXKs3poUuySMTXbWm5DIq1tWXRxalLdQsdktPLVZGqwSRLFlUiMVoZIRNuJWRlWgAEkLkMkxcgBTRCyAGyLDUhCYaYA9MNMQmGmAOTDTEplpgZ1yXF7xdwBnaJlWsapL6Tm4hHLs22Xx0Ya5Y1Uqu8rjLnKwrabOjCVzU3Flq5TYE6wq4tks9nW8cDpVBMWRgykS6pIJR1GJ5C1LK5Fo2OAqrzF53GyXz2EV6yQji4VHdjY3fiYqE7u3LUuGOvK0edhyi4ugoZ9xU4maeKs7cte8nXXXzNs11j5BKyyWrE7QxG4kl8QEKmbk3lw/JydoYrfkYtVmK6uKbVlqbNgybm2+Ry1nkdjZVLdV35cSur/rqe2+cd65BUaqYSkdnXFxVfQxo3VdDHYZFyQuSHSYmUkALsWU5ogBoihiQSiEogApBpBKIaiAAkFYNRL3QMFiWGbpN0A00FvRsYcTTNVCTi7oDGyvmcm7H+ujVl/GCCNdGBVOBqULEYtSJFSQcmJqyM04qchFWoDOTBtfMUaa6bvFBNcBVGe6iutWprrPDajOdVp3ZqlV4mbESby0Cnj4TWVk0nZPjxZIuNGN46215FdTzfzsA6xN6NqPPT9jh1hdd731O3HP5mdGNf6bfO9mHFVFJ6acbfe/4HUa6StFNvm7L3AwYmpZZvzy9ORybZv3ZvxMpPW3g0/Uy7lvlxSDK8NoROrhZnJhL4zoYeqXwQyb+ssF1oiErlSkbYaliGJnVYG+XJmplYzcZS5NsXKLG7xL3KTLqdxsZ9xkNG6Q0w6aQSQKYaYASQSQKYSYASLSKRdwC7EsRF3A0sDOlcZFXDcCG78W1ApUmHNW1NFOAFZZHPzxbvrDVYibG1UImibZVXLIGGniHUWQtPdS+c0HGul1qjfjkDTTft4cSSd5di9wK9W3d7/oOH0VSp5cPAlKDvvSduSvd58X2iN7K+aXN2V+5Fwrp5LPwbXoMj6nP+TDUvz9DXdy14dlkYsRCXBK3Yr/AGGCKzvk/wAPwYmUJQz3m1ytmBVqPk/N+wyNVtaP0+4utcLliU1ldPu3TNvVHon53GV6Kk73Sfk/2FRhb/y8ggv4XTUk/qy70dSgjJLDzvdTbXJ6GqkmiuE9RzrXCRbYtF3LIjUiOQpyLjIDFKQMahczPJ2F3g51qVYsxdaQf0Xy9Eg0LQaLoDQSBRaADRaAuEAFctZgDKWojOpU2aIIKCyLic2y9q+E8VICaGVnkZHiUsiVbhdamZmuBrdVSM1dWMVuMWIf49HmZG3uJ8Vl88l5ja0rqXcDGWUXw/VwjXPC6cbPPRK/e87v5zM1dNu/vwXdz4mmpC9ny975fYk6dlduy1f2NBllTy0b7/wFRedreDV/YJVr56Lz8+RFXtwXhYXh+tfUcZfPAzV6ceErPufuMhUcrq/i1cU1bKUVfudn87wJyK8mnbLvtkKWIs/qS7GszTjKCvdWs+23o0ZJUlo36XMqQ2ruTzaXfl9huHow5+hnwtOzs9OfA6NOEdLfj9mozkrqf8X9w6bejHdQlo7eNvRFJeJXFGoU2XcFlUwtkTKkwUIGSmZqjGyZmqsVpxChfWEMG9ZFjExKYSZ2OQ5MJMUmGmBjCQCZdwAx+GhdmVM14SWZm/hxuashKqK5ploZ4YfefE5Mu9dOPOE4ybaysYFUVNOdSSSXNHoFgI20MlbZEH/de2eV2K67+nNmP48rT6TYWVTdhWSd7Wat75naxDvG/B5prR9x8p21j6scPLCxoQjPrXOVW8d9rebSS4JKy14Hr+g+2nUwipVFeVO6bunlr9zezVJj0YZ9ya61ZK+fj7CqWIWmtr3Xr9jJtRuG9JdtjlUazdv9134o5Ja7bhOPU4SSlC/b62zMONrtvdjd/fvK2bWy3ZZO/wBjmdJ9rKhB7r+p3u+XMthPpDKfKsRXcXZtLsvmZajqvOMl4nj9qbUxNColU3d5xU912k0pab1sk8tDpbL22+s6urDdfOLutL+RrLTlCw3Y3x6jBbVcfpqxs+aOk8Ymrp/nyOFOtCWkk/cfQg+DyI9q1xlb6lW/G5kqQjLs9mSpT46MRPfXJi6JF0JbrsdGnW+Z38jDGF82nfsH4epbiOUso6Majta5SnzLiotEtb+C0QqSkVcXOoSMysSorEcS0WaZ6VIzVmaqhzMXPtM04ROrmQy27SGeNveoJMNUGGqDOtxgTDTCVBhKiwMNy7hdSy1RYEE14SSM/VMfQjYzWo7EVkXh+4HDyujRf5/JHnvVO+cNQuoim+/0+5HPLh7euhq+xmPmfSronUnW3oRvF3s+S/xklbu7jdsfZEMHBxi4uUs5tcXwV1y5Hq8fTi9b9z+ZnDrrkuw59mV5x1a+VwNtyb0+dgjZuA+qF9Ip375XOs8DvP6jdToJNvuWWvac8xrquc5xx9s0VTpyqK91nkr5as+f7cxDqwvFX1fplkfU9oW3Wua0WunYj5xWwt5yiuD0V8uRfXeJZT6nHkqbp1Pq3EpZf23S7zp7JwvW1IqEcou8mvY61Po9CTvNduX2sehwGHhSju0oNdtvuVz3eeI4aeXtVRwMck1nxOlQwCtdL8DMHSOpCFl+USwx/wBb2Z3+ONidm3V1deH4OeqUovdlmuD/AJ0PWQguwz4vA7yyXrc1lhKzjss/XGlSaWn2FKF389zpLCTirSX4/Rj6vdeliVx4rMuijkE6gp1OwW6q7u/7FJ4nfV1qnxAUqoirK71KpJoPovl06cxqZipTNMJFMck8sQ1zg7Uq2R3sQ8sjx216jcs8rGqUaFVIc2NWxB8Pr7aoFqI1RCUCzmKUQlAcoF7oAncJuD90m4AJ3A4RtmM3SOIqcPpTsVWxNuDEMqV3qzntWmJNTGyv/b7t+xrwmKcspL0f3MzTLhWS1du/8sMbTykbJUc9MuH8GarhIxV5ak2ztZYag6+trRiucpPdivNnzXavSHGU53rrdTzvFX5duma8zd19Zxy/j2rjdtrS/wCReKi0rJ2+dh4+l08pxSindu2qslnm8zuUNpdfFTjLxXzUndfFZl614qgpQs3vW8PVHmcRh1GSvlbis/KR28TWdr78nlo2lfzZx6lW7y3nfxJZcWw66GCqU2sl89DVUSei9jmYfDyX7/bNbbX6NT1nLk/BpeAUanau53uc3E4uz1Bo15VHkr+Hba4+scdyM1zs/nINza+3FGGjQqvWL7zRCDWqeXM10uNU6t1+Tn1bPgiYrGxjf6rW1s0/RGOe1YLt/wCLQuw5jV1qaf8ABzMRTtoPqbS3n9GXsBKs3r6GMrG5LGeMBqDUS90ydDEfCRUY2LRqeMU7ePMdIKMm/pjlzPRRkSrBNZotKlfHhNxkOzXw8d56ev4Ia6T7GohqJEGiqCki90tBJAFKJN0MsYBYW3ca0DVVkSyvfG8SmmhTmHUk7WOZWqtNetmSs4rL1uqVMsjk42qk7Ni8Vj0vwcvF4tPPIWVbxx634mccXhauH1klvQSybcHdZ+a8T5fVnNXvUk7Jr6rrJ/5R4O1suZ7FY506m+m08uy/Y39jft3ZVPEQjWtGEpW32leL53S1duJXXn2M5aveR8gw9qjl1ct6y+pNNO3B9p73/p7Rl9W+3bJJfgRLoduy3k4tdmubWvE9X0fwMYZq8Xws/K/B5WzRu+xPnHRx1JKNrJpcHr5HBqYNXyjbuyfqeorqOt0nx/g8/tLadKk7OS3npxj5o58sFsMycRJUktbvhf8AZiqVJS/tTfddmKji+trJTlq7c7H0PY+yo01dcfLvHMejLLji7J6PuVpVG2nw1PSYfZ0IL6YryNqjHQVVqpO3z1Nc4n9WhTSEYmCfAGpUevxlScXm8sudhG8/tPBWd1pyOZWoJ52XK7zOxjq31Wya7jn1pdmXaSuK2OVc3qUm9Q4Uw61RXsxkKbnoZk61aWoCtGaZUnHXL1Ftdhr5Y+lLPsLt2oqwyOZqYs2qUSVFkGsgajVikx4na8/Xpy3nk/Mh0JJXIa4XX1VINIFBoqitIJIpBIYSxaRZaAB4gY3KDduY9xuuRlxlOo4OKaeTtwMWNSpCl/21fl+DzW1MSk76JHSxn9SqShTgpSSs7ySTyt7+55zH7JxtXNwinlf68r3u2ssuBjKdjeH76ybTxkYRSbzt7nBxO1Emdyv0OxVaW9OUVfk+Bpw3QWS/ummTuu2ujHZhI8g6s5yvFSZ7bo/jd6Cp1lutLXLzN+H6Kxjqzo4fYkI8DeGFiee2X8ecx+CqJ3ppS4bybaz/ANpyqOFxSf1Npc2+GbVuTTt5n0Crs2LVk7dxy8ZsGc9KjKcYuz6/XltoXteU3fNPPK/xXPJ7RxWfO3E93iuh85XvO9/sc+XQaXO5iy1qZYx57orNVMRBNtO/Ll4n26lTSj4HgNg9FJYesqjzST9j2+KxNqTa1yXn89ByMZ3tSN91y7zDjJWV9WMxOOhCKjfh5u1/nccXG7Ti8ln84hYUVVxbvbivbgDjcY2s8mjzsNvxjiHSlJbryvyf82E4zHS3nFO/JrNNEr3i2M7W6tiMxOIrZamSnGcuDH/6fUnwZOY2qWyMn9Rd6+BuwtTIOj0eqN3Orhuj0lqzeOus5Z48cyc08n6MT3HpYbAjxux8djwXAr8I/byii+8ZCnL/ABZ62Oz4rgH/AEkeRr4L7eWVGXIGpg5Pger/AKVAvCofyz9PH/6cyHrf6VEH8l120GhcQ0zTI0GhaYSAhospFgY0yMpFgFNCpRGlWEZW6Xuh2JYAXYiDaBABZVi2RDILiDuDWCxAEY5jatGMlZpPvBQ1MOBhrbLpSteCy7+JmjsLDr/1ROswJIOH1x49HcMndUKd/wD5Hx2VRWlKC8DfYpoXB1mjhILSK8g+qjyQ1oFgAbi5E3QmVcAqwDQbBYwWyhjQEkMAYLCYLAgkKsQA6EWGiEACQSIQCEgiEALRZZANCEIKhRCEA1MEhBhTKIQCQpkIIKQaZRAC7lMogBRRZAAWCQgGpoGxCCILI0QgwFgshBgDAkQgAu5CEAP/2Q==",
      createdAt: "2022-05-23",
    },
  ],
};
// 추억 상세보기 모달 / params로 date 보내야함('YYYY-MM-DD')
const photoModalList = [
  {
    photoId: "454fdw",
    photoFile:
      "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg",
  },
  {
    photoId: "454f3",
    photoFile:
      "data:image/jpeg;base64,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",
  },
  {
    photoId: "454f234dw",
    photoFile:
      "data:image/jpeg;base64,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",
  },
];
// 음성 메세지 페이지
// 음성 앨범 페이지
const voiceAlbumList = [
  {
    voiceAlbumId: "asdfdf",
    voiceAlbumName: "일상",
    voiceAlbumCover: "albumCover1",
  },
  {
    voiceAlbumId: "asdfdfsef",
    voiceAlbumName: "샘플",
    voiceAlbumCover: "albumCover2",
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
  eventModalList,
  photoCalendarPage,
  photoModalList,
  // 음성메세지 페이지
  voiceAlbumList,
  voiceFilePage,
};
