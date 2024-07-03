const saveButtons = document.querySelectorAll(".sms-management__save-button"); // 저장 버튼
const modalBackground = document.querySelector(".modal-background"); // 모달 배경
const modalFirst = document.querySelector(".modal.first"); // 첫 번째 모달
const modalSecond = document.querySelector(".modal.second"); // 두 번째 모달
const modalSaveButton = document.getElementById("modalSaveButton"); // 저장 버튼
const modalCancelButton = document.getElementById("modalCancelButton"); // 아니오 버튼
const modalConfirmButton = document.getElementById("modalConfirmButton"); // 저장 버튼

let visaya24Message = ""; // VISAYA24 메시지
let storeMessage = ""; // 입점사 메시지

// VISAYA24 메시지 내용을 변수에 저장하는 함수
function saveVisaMessages() {
  visaya24Message = document.getElementById("visa-text").value.trim();
}

// 입점사 메시지 내용을 변수에 저장하는 함수
function saveStoreMessages() {
  storeMessage = document.getElementById("store-text").value.trim();
}

// 메시지 전송 API 호출 함수
async function postMessage(company) {
  // const url = "http://example.com"; // 메시지 전송 API 주소
  let data = {};
  if (company === "VISAYA24") {
    data = { message: visaya24Message };
  }
  if (company === "입점사") {
    data = { message: storeMessage };
  }

  try {
    // 실제 API 호출 코드 작성해야함
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // const result = await response.json();
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

// 첫 번째 모달 열기
function openFirstModal() {
  modalBackground.style.display = "flex";
  modalFirst.style.display = "flex";
}

// 첫 번째 모달 닫기
function closeFirstModal() {
  modalBackground.style.display = "none";
  modalFirst.style.display = "none";
}

// 두 번째 모달 열기
function openSecondModal() {
  modalFirst.style.display = "none"; // 첫 번째 모달 닫기
  modalSecond.style.display = "flex";
}

// 두 번째 모달 닫기
function closeSecondModal() {
  modalBackground.style.display = "none";
  modalSecond.style.display = "none";
}

// 모달 배경 클릭 시 모달 창 닫기
function modalBackgroundClickHandler(event) {
  if (event.target === modalBackground) {
    modalBackground.style.display = "none";
    modalFirst.style.display = "none";
    modalSecond.style.display = "none";
  }
}

// DOM이 모두 로드된 후 실행
document.addEventListener("DOMContentLoaded", function () {
  // VISAYA24 저장 버튼 클릭 시 모달 창 열기
  saveButtons[0].addEventListener("click", () => {
    saveVisaMessages(); // VISAYA24 메시지 변수에 저장
    if (visaya24Message.length === 0) {
      // VISAYA24 메시지가 비어있을 경우
      alert("VISAYA24 메시지를 입력해주세요.");
      return;
    }
    openFirstModal(); // 첫 번째 모달 열기
    modalSaveButton.addEventListener(
      "click",
      () => {
        postMessage("VISAYA24"); // 메시지 전송 API 호출
        openSecondModal(); // 두 번째 모달 열기
      },
      { once: true }
    );
  });

  // 입점사 저장 버튼 클릭 시 모달 창 열기
  saveButtons[1].addEventListener("click", () => {
    saveStoreMessages(); // 입점사 메시지 변수에 저장
    if (storeMessage.length === 0) {
      // 입점사 메시지가 비어있을 경우
      alert("입점사 메시지를 입력해주세요.");
      return;
    }
    openFirstModal();
    modalSaveButton.addEventListener(
      "click",
      () => {
        postMessage("입점사"); // 메시지 전송 API 호출
        openSecondModal(); // 두 번째 모달 열기
      },
      { once: true }
    );
  });

  // 확인 버튼 클릭 시 두 번째 모달 창 닫기
  modalConfirmButton.addEventListener("click", closeSecondModal);

  // 아니오 버튼 클릭 시 첫 번째 모달 창 닫기
  modalCancelButton.addEventListener("click", closeFirstModal);

  // 모달 배경 클릭 시 모달 창 닫기
  modalBackground.addEventListener("click", (e) =>
    modalBackgroundClickHandler(e)
  );
});
