const dummyTableData = [];

for (let i = 1; i <= 400; i++) {
  dummyTableData.push({
    id: i,
    username: `user${i}`,
    contact: "010-1234-5678",
    category: "근무처 변경",
    requiredTask: "서류 작성",
    payment: 10000,
    agency: "VISAYA",
    paymentDate: "24.04.30 10:12:51",
  });
}

export { dummyTableData };
