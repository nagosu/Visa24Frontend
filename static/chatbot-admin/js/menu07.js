const toggle = document.querySelector(".agency__toggle-switch"); // 토글 스위치
const toggleInput = document.getElementById("toggle"); // 토글 스위치 input
const saveButton = document.querySelector(".agency__info-save-button"); // 저장 버튼
const modalSave = document.querySelector(".modal-background.save"); // 저장 모달 창
const modalCancelButton = document.getElementById("modalCancelButton"); // 모달 창 취소 버튼
const modalSaveButton = document.getElementById("modalSaveButton"); // 모달 창 저장 버튼

let toggleStatus = "비자24"; // 토글 스위치 상태

// 업체 정보를 저장할 변수
let companyName = ""; // 업체명
let representative = ""; // 대표자
let contactNumber = ""; // 연락처
let email = ""; // 이메일
let bankName = ""; // 은행명
let accountNumber = ""; // 계좌번호
let accountHolder = ""; // 예금주

// 정규식 패턴
const patterns = {
  companyName: /^[가-힣a-zA-Z0-9]{1,13}$/, // 한글, 영문, 숫자 1~13자
  representative: /^[가-힣]{1,13}$/, // 한글 1~13자
  contactNumber: /^[0-9]{1,13}$/, // 숫자 1~13자
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 이메일 형식
  bankName: /^[가-힣a-zA-Z]{1,15}$/, // 한글, 영문 1~15자
  accountNumber: /^[0-9]{1,15}$/, // 숫자 1~15자
  accountHolder: /^[가-힣]{1,13}$/, // 한글 1~13자
};

// 입력값 검증 함수
function validateInput(value, pattern) {
  return pattern.test(value); // 정규식 패턴에 맞는지 검증
}

// 연락처 포맷팅 함수
function formatContactNumber(number) {
  if (number.length === 11) {
    return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"); // 010-1234-5678
  } else if (number.length === 10) {
    return number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"); // 010-123-4567
  }
  return number;
}

// 토글 스위치 ON/OFF 함수
function toggleStatusSwitch() {
  toggle.classList.toggle("active");

  const isActive = toggle.classList.contains("active");
  const statusOff = toggle.parentElement.querySelector(".agency__toggle-visa");
  const statusOn = toggle.parentElement.querySelector(
    ".agency__toggle-company"
  );

  if (isActive) {
    statusOff.style.color = "#a1a1a1";
    statusOn.style.color = "#1b3133";
  } else {
    statusOff.style.color = "#1b3133";
    statusOn.style.color = "#a1a1a1";
  }

  if (toggle.classList.contains("active")) {
    toggleStatus = "입점사";
  } else {
    toggleStatus = "비자24";
  }
  console.log(toggleStatus);
}

// 입력된 정보를 변수로 저장하는 함수
function saveAgencyInfo() {
  const companyNameInput = document
    .querySelector(".agency__info-input.company input")
    .value.trim();
  const representativeInput = document
    .querySelector(".agency__info-input.representative input")
    .value.trim();
  const contactNumberInput = document
    .querySelector(".agency__info-input.phone input")
    .value.trim();
  const emailInput = document
    .querySelector(".agency__info-input.email input")
    .value.trim();
  const bankNameInput = document
    .querySelector('.agency__info-input.account input[placeholder="은행명"]')
    .value.trim();
  const accountNumberInput = document
    .querySelector('.agency__info-input.account input[placeholder="계좌번호"]')
    .value.trim();
  const accountHolderInput = document
    .querySelector(".agency__info-input.holder input")
    .value.trim();

  if (!validateInput(companyNameInput, patterns.companyName)) {
    alert("업체명은 한글/영문/숫자로 구성된 최대 13자까지 입력 가능합니다.");
    return;
  }
  if (!validateInput(representativeInput, patterns.representative)) {
    alert("대표자는 한글로 구성된 최대 13자까지 입력 가능합니다.");
    return;
  }
  if (!validateInput(contactNumberInput, patterns.contactNumber)) {
    alert("연락처는 최대 13자리 이하의 숫자로 입력 가능합니다.");
    return;
  }
  if (!validateInput(emailInput, patterns.email)) {
    alert("올바른 이메일 주소를 입력하세요.");
    return;
  }
  if (!validateInput(bankNameInput, patterns.bankName)) {
    alert("은행명은 한글/영문으로 구성된 최대 15자까지 입력 가능합니다.");
    return;
  }
  if (!validateInput(accountNumberInput, patterns.accountNumber)) {
    alert("계좌번호는 숫자로 구성된 최대 15자까지 입력 가능합니다.");
    return;
  }
  if (!validateInput(accountHolderInput, patterns.accountHolder)) {
    alert("예금주는 한글로 구성된 최대 13자까지 입력 가능합니다.");
    return;
  }

  companyName = companyNameInput;
  representative = representativeInput;
  contactNumber = formatContactNumber(contactNumberInput);
  email = emailInput;
  bankName = bankNameInput;
  accountNumber = accountNumberInput;
  accountHolder = accountHolderInput;

  createAgency(); // 업체 정보 저장 API 호출
}

function initValue() {
  document.querySelector(".agency__info-input.company input").value = "";
  document.querySelector(".agency__info-input.representative input").value = "";
  document.querySelector(".agency__info-input.phone input").value = "";
  document.querySelector(".agency__info-input.email input").value = "";
  document.querySelector(
    '.agency__info-input.account input[placeholder="은행명"]'
  ).value = "";
  document.querySelector(
    '.agency__info-input.account input[placeholder="계좌번호"]'
  ).value = "";
  document.querySelector(".agency__info-input.holder input").value = "";

  // 토글 스위치를 초기 상태로 설정
  if (toggle.classList.contains("active")) {
    toggleInput.checked = false; // 토글 스위치 초기화

    toggle.classList.remove("active"); // 토글 스위치 초기화
    const statusOff = toggle.parentElement.querySelector(
      ".agency__toggle-visa"
    );
    const statusOn = toggle.parentElement.querySelector(
      ".agency__toggle-company"
    );
    statusOff.style.color = "#1b3133";
    statusOn.style.color = "#a1a1a1";
    toggleStatus = "비자24";
  }
}

// 업체 정보 저장 API
async function createAgency() {
  // const url = "https://example.com"; // 실제 API URL로 변경 필요
  const data = {
    toggleStatus,
    companyName,
    representative,
    contactNumber,
    email,
    bankName,
    accountNumber,
    accountHolder,
  };

  // 실제 API 연동 추가해야함
  try {
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const result = await response.json();
    // console.log("저장 성공:", result);
    console.log("저장 성공:", data);
    initValue();
  } catch (e) {
    console.error(e);
  }
}

// 모달 창 열기
function openSaveModal() {
  modalSave.style.display = "flex";
}

// 모달 창 닫기
function closeSaveModal() {
  modalSave.style.display = "none";
}

// DOM 로드 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // 토글 ON/OFF 텍스트 색상 변경
  toggle.addEventListener("click", toggleStatusSwitch);

  // 저장 버튼 클릭 시 모달 창 열기
  saveButton.addEventListener("click", openSaveModal);

  // 모달 창에서 취소 버튼 클릭 시 모달 창 닫기
  modalCancelButton.addEventListener("click", closeSaveModal);

  // 모달 창에서 저장 버튼 클릭 시 모달 창 닫기
  modalSaveButton.addEventListener("click", () => {
    saveAgencyInfo(); // 입력된 정보를 변수로 저장 & 업체 정보 저장 API 호출 & 변수 초기화
    closeSaveModal(); // 모달 창 닫기
  });
});
