const dummyTableData = [
  {
    no: 1,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 2,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 3,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 4,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 5,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 6,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 7,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 8,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 9,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 10,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 11,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 12,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 13,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 14,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 15,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 16,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 17,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 18,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 19,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 20,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 21,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 22,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 23,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 24,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 25,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 26,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 27,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 28,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 29,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 30,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 31,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 32,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 33,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 34,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 35,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 36,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 37,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 38,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 39,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 40,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 41,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 42,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 43,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 44,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 45,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 46,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 47,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 48,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 49,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 50,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 51,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 52,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 53,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 54,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 55,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 56,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 57,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 58,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
  {
    no: 59,
    date: "24.06.09 10:12:51",
    language: "한국어",
    gptVersion: "GPT-3.5-TURBO",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["통합신청서", "위임장", "업무수행확인서"],
  },
  {
    no: 60,
    date: "24.06.10 10:12:51",
    language: "중국어",
    gptVersion: "GPT-4.0",
    category: "국내VISA - H2 취업방문 - 근무처 변경 - 근무처 변경 추가",
    downloads: ["숙소제공확인서", "외국인 직업 신고서", "기타"],
  },
];

export { dummyTableData };
