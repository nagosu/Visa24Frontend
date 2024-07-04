const dummyTableData = [];

for (let i = 1; i <= 400; i++) {
  dummyTableData.push({
    id: i,
    companyName: `${i} 대행`,
    representative: `${i} 엔디`,
    contact: "010-1234-5678",
    email: `${i}.aa.io`,
    account: "123-456-789",
    accountHolder: `${i} 엔디`,
    type: "docs",
  });
}

for (let i = 401; i <= 800; i++) {
  dummyTableData.push({
    id: i,
    companyName: `${i} 대행`,
    representative: `${i} 엔디`,
    contact: "010-1234-5678",
    email: `${i}.aa.io`,
    account: "123-456-789",
    accountHolder: `${i} 엔디`,
    type: "agency",
  });
}

export { dummyTableData };
