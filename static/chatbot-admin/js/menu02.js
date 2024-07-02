import { dummyCategoryData } from "./dummyData/menu02-data.js";

// 조회 버튼
const searchButton = document.querySelector(
  ".content-modify__sidebar-search-button"
);

// 카테고리 선택 드롭다운
const categorySelects = document.querySelectorAll(
  ".search-bar__category-dropdown-select"
);

const modalFind = document.querySelector(".modal-background.find"); // 조회 오류 모달 창
const modalConfirmButton = document.getElementById("modalConfirmButton"); // 조회 오류 모달 확인 버튼

const saveButton = document.querySelector(".content-modify__save-button"); // 저장 버튼
const modalSave = document.querySelector(".modal-background.save"); // 저장 모달 창

// 양식서류 테이블 body
const formTableBody = document.querySelector(
  ".usage-history__table.form .usage-history__table-data"
);
// 첨부서류 테이블 body
const attachTableBody = document.querySelector(
  ".usage-history__table.attach .usage-history__table-data"
);

const modalCancelButton = document.getElementById("modalCancelButton"); // 저장 모달 취소 버튼
const modalSaveButton = document.getElementById("modalSaveButton"); // 저장 모달 확인 버튼

// 삭제 버튼
const deleteIcon = document.querySelectorAll(
  ".usage-history__table-item--delete img"
);

const modalDelete = document.querySelector(".modal-background.delete"); // 삭제 모달 창
const modalDeleteCancelButton = document.querySelector(".delete-cancel"); // 삭제 모달 취소 버튼
const modalDeleteSaveButton = document.querySelector(".delete-save"); // 삭제 모달 확인 버튼

const addListButtonForm = document.querySelector(
  ".content-modify__add-list-container .content-modify__add-list-button.form"
); // 양식서류 목록 추가 버튼
const addListButtonAttach = document.querySelector(
  ".content-modify__add-list-container .content-modify__add-list-button.attach"
); // 첨부서류 목록 추가 버튼

const inputForm = document.querySelector(
  ".content-modify__add-list-input.form"
); // 양식서류 목록 추가 input
const inputAttach = document.querySelector(
  ".content-modify__add-list-input.attach"
); // 첨부서류 목록 추가 input

let category1, category2, category3, category4, category5; // 1~5차 카테고리 선택 값을 저장하는 변수
let rowToDelete = null; // 삭제할 row를 저장하는 변수
let allSelected = true; // 모든 카테고리가 선택되었는지 확인하는 변수

// 조회 오류 모달 창 열기 함수
function openSearchModal() {
  modalFind.style.display = "flex";
}
// 조회 오류 모달 창 닫기 함수
function closeSearchModal() {
  modalFind.style.display = "none";
}

// 저장 모달 창 열기 함수
function openSaveModal() {
  modalSave.style.display = "flex";
}
// 저장 모달 창 닫기 함수
function closeSaveModal() {
  modalSave.style.display = "none";
}

// 삭제 모달 창 열기 함수
function openDeleteModal() {
  modalDelete.style.display = "flex";
}
// 삭제 모달 창 닫기 함수
function closeDeleteModal() {
  modalDelete.style.display = "none";
}

// 파일 탐색기 열기 함수
function openFileExplorer() {
  // 파일 입력 요소 추가
  const hiddenFileInput = document.createElement("input");
  hiddenFileInput.type = "file";
  hiddenFileInput.style.display = "none";
  document.body.appendChild(hiddenFileInput);

  // 파일 탐색기를 열기 위한 이벤트 리스너 추가
  formTableBody.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("refresh-list-form") ||
      event.target.classList.contains("refresh-list-attach") ||
      event.target.classList.contains("refresh-file") ||
      event.target.classList.contains("refresh-status")
    ) {
      hiddenFileInput.click();
    }
  });
}

// 체크박스 전체 선택/해제 기능 함수
function addCheckboxToggleListener(tableClass) {
  const table = document.querySelector(`.${tableClass}`); // 테이블
  const theadCheckbox = table.querySelector("thead input[type='checkbox']"); // 테이블 head 체크박스
  const tbodyCheckboxes = table.querySelectorAll(
    "tbody input[type='checkbox']" // 테이블 body 체크박스
  );
  const selectContent = table.nextElementSibling;

  if (!selectContent) return; // selectContent가 존재하는지 확인

  const selectContentText = selectContent.querySelector(".select-content-text");

  theadCheckbox.addEventListener("change", function () {
    const isChecked = theadCheckbox.checked;
    tbodyCheckboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
    });
    updateSelectContent();
  });

  tbodyCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const allChecked = Array.from(tbodyCheckboxes).every(
        (checkbox) => checkbox.checked
      );
      theadCheckbox.checked = allChecked;
      updateSelectContent();
    });
  });

  // 선택된 항목 개수 업데이트
  function updateSelectContent() {
    const checkedCount = Array.from(tbodyCheckboxes).filter(
      (checkbox) => checkbox.checked
    ).length;
    if (checkedCount > 0) {
      selectContentText.textContent = `총 ${checkedCount}개의 항목이 선택되었습니다.`;
      selectContent.style.display = "flex";
    } else {
      selectContent.style.display = "none";
    }
  }

  // 해제 버튼 클릭 시
  selectContent
    .querySelector(".deselect-button")
    .addEventListener("click", function () {
      tbodyCheckboxes.forEach((checkbox) => {
        checkbox.checked = false; // body 체크박스 해제
      });
      theadCheckbox.checked = false; // head 체크박스 해제
      updateSelectContent();
    });

  // 삭제 버튼 클릭 시 (삭제 모달 창 열기)
  selectContent
    .querySelector(".delete-button")
    .addEventListener("click", function () {
      modalDelete.style.display = "flex"; // 삭제 모달 창 열기
    });

  // 다운로드 버튼 클릭 시 (기능 추가 해야함)
  selectContent
    .querySelector(".download-button")
    .addEventListener("click", function () {
      console.log("다운로드 버튼 클릭됨");
    });
}

// // 카테고리에 따른 양식서류, 첨부서류 조회 API 연동 함수
async function fetchCategoryData() {
  categorySelects.forEach((select, index) => {
    if (select.value === "카테고리 명") {
      // 카테고리 선택 안된 경우
      allSelected = false;
    } else {
      // 카테고리 선택된 경우
      switch (index) {
        case 0:
          category1 = select.value;
          break;
        case 1:
          category2 = select.value;
          break;
        case 2:
          category3 = select.value;
          break;
        case 3:
          category4 = select.value;
          break;
        case 4:
          category5 = select.value;
          break;
      }
    }
  });

  if (!allSelected) {
    modalFind.style.display = "flex";
  } else {
    const data = dummyCategoryData; // 더미 데이터

    // 실제 api 연동 로직 추가해야함
    // const response = await fetch("endpoint", {});

    // 양식서류 테이블 업데이트
    formTableBody.innerHTML = ""; // 기존 데이터 초기화
    data.formDocs.forEach((doc) => {
      const row = `
      <tr class="usage-history__table-container">
        <td class="usage-history__table-item usage-history__table-item--checkbox">
          <input type="checkbox" />
        </td>
        <td class="usage-history__table-item usage-history__table-item--list">
          ${doc.list}
          <img class="refresh-list-form" src="../../static/chatbot-admin/images/refresh.svg" />
        </td>
        <td class="usage-history__table-item usage-history__table-item--docs">
          <a href="./dummyFiles/${doc.file}" download>${doc.file}</a>
          <img class="refresh-file" src="../../static/chatbot-admin/images/refresh.svg" />
        </td>
        <td class="usage-history__table-item usage-history__table-item--status">
          ${doc.status}
          ${
            doc.status === "다운 허용"
              ? '<img class="refresh-status" src="../../static/chatbot-admin/images/refresh.svg" />'
              : ""
          }
        </td>
        <td class="usage-history__table-item usage-history__table-item--delete">
          <img class="trash-icon" src="../../static/chatbot-admin/images/Trash.svg" />
        </td>
      </tr>`;
      formTableBody.insertAdjacentHTML("beforeend", row);
    });

    // 첨부서류 테이블 업데이트
    attachTableBody.innerHTML = ""; // 기존 데이터 초기화
    data.attachDocs.forEach((doc) => {
      const row = `
      <tr class="usage-history__table-container">
        <td class="usage-history__table-item usage-history__table-item--checkbox">
          <input type="checkbox" />
        </td>
        <td class="usage-history__table-item usage-history__table-item--list attach-data">
          ${doc.list}
          <img class="refresh-list-attach" src="../../static/chatbot-admin/images/refresh.svg" />
        </td>
        <td class="usage-history__table-item usage-history__table-item--delete attach">
          <img class="trash-icon" src="../../static/chatbot-admin/images/Trash.svg" />
        </td>
      </tr>`;
      attachTableBody.insertAdjacentHTML("beforeend", row);
    });

    openFileExplorer(); // 파일 탐색기 열기

    // 새로 생성된 삭제 버튼에 이벤트 리스너 등록
    const newDeleteIcons = document.querySelectorAll(".trash-icon");
    console.log(newDeleteIcons);
    newDeleteIcons.forEach((button) => {
      button.addEventListener("click", function (event) {
        rowToDelete = event.target.closest("tr"); // 삭제할 row 저장
        openDeleteModal();
      });
    });

    if (data.formDocs.length > 0) {
      addCheckboxToggleListener("usage-history__table.form"); // 양식서류 테이블 체크박스 전체 선택/해제 기능 추가
    }
    if (data.attachDocs.length > 0) {
      addCheckboxToggleListener("usage-history__table.attach"); // 첨부서류 테이블 체크박스 전체 선택/해제 기능 추가
    }

    closeSearchModal(); // 조회 모달 창 닫기
  }
}

// 업무 비용 수정 함수
function addPencilClickListener(className) {
  const pencilIcon = document.querySelector(`.${className}`);
  pencilIcon.addEventListener("click", function () {
    const span = pencilIcon.previousElementSibling.querySelector("span");
    const value = span.innerText;
    const input = document.createElement("input");
    input.type = "text";
    if (className === "pencil-docs") {
      input.className = "money-form";
    } else {
      input.className = "money-agency";
    }
    input.value = value;

    span.replaceWith(input);

    input.focus();
    input.setSelectionRange(value.length, value.length);

    // Enter key 이벤트로 다시 span으로 변경
    input.addEventListener("blur", function () {
      const newSpan = document.createElement("span");
      newSpan.className = "content-modify__charge-text money";
      newSpan.innerText = input.value;
      input.replaceWith(newSpan);
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        input.blur();
      }
    });
  });
}

// 서류 테이블에 목록 추가 함수
function addListToTable(tableBody, list) {}

// DOM 로드 후 실행
document.addEventListener("DOMContentLoaded", function () {
  searchButton.addEventListener("click", fetchCategoryData); // 조회 버튼 클릭 시 카테고리 데이터 조회

  // 조회 오류 모달 확인 버튼 클릭 시 모달 창 닫기
  modalConfirmButton.addEventListener("click", closeSearchModal);

  // 저장 버튼 클릭 시 모달 창 열기
  saveButton.addEventListener("click", openSaveModal);

  // 저장 모달 취소/확인 버튼 클릭 시 모달 창 닫기
  modalCancelButton.addEventListener("click", closeSaveModal);
  modalSaveButton.addEventListener("click", closeSaveModal);

  // 삭제 버튼 클릭 시 모달 창 열기
  deleteIcon.forEach((button) => {
    button.addEventListener("click", function (event) {
      rowToDelete = event.target.closest("tr"); // 삭제할 row 저장
      openDeleteModal();
    });
  });

  // 삭제 모달 취소/확인 버튼 클릭 시 모달 창 닫기
  modalDeleteCancelButton.addEventListener("click", function () {
    if (rowToDelete) rowToDelete = null; // 변수 초기화
    closeDeleteModal(); // 삭제 모달 창 닫기
  });
  modalDeleteSaveButton.addEventListener("click", function () {
    if (rowToDelete) {
      rowToDelete.remove(); // row 삭제
      rowToDelete = null; // 변수 초기화
    }
    closeDeleteModal(); // 삭제 모달 창 닫기
  });

  // 양식서류 목록 추가 버튼 클릭 시
  addListButtonForm.addEventListener("click", function () {
    const value = inputForm.value.trim(); // 입력값

    if (value) {
      const newRow = `
    <tr class="usage-history__table-container">
      <td class="usage-history__table-item usage-history__table-item--checkbox">
        <input type="checkbox" />
      </td>
      <td class="usage-history__table-item usage-history__table-item--list">
        ${value}
        <img class="refresh-list-form" src="../../static/chatbot-admin/images/refresh.svg" />
      </td>
      <td class="usage-history__table-item usage-history__table-item--docs">
        <a href="#" download>${value}.docs</a>
        <img class="refresh-file" src="../../static/chatbot-admin/images/refresh.svg" />
      </td>
      <td class="usage-history__table-item usage-history__table-item--status">
        다운 허용
        <img class="refresh-status" src="../../static/chatbot-admin/images/refresh.svg" />
      </td>
      <td class="usage-history__table-item usage-history__table-item--delete">
        <img src="../../static/chatbot-admin/images/Trash.svg" />
      </td>
    </tr>`;
      formTableBody.insertAdjacentHTML("afterbegin", newRow); // 테이블 상단에 추가
      inputForm.value = ""; // 입력 필드 초기화
    }
  });

  // 첨부서류 목록 추가 버튼 클릭 시
  addListButtonAttach.addEventListener("click", function () {
    const value = inputAttach.value.trim(); // 입력값

    if (value) {
      const newRow = `
      <tr class="usage-history__table-container">
        <td class="usage-history__table-item usage-history__table-item--checkbox">
          <input type="checkbox" />
        </td>
        <td class="usage-history__table-item usage-history__table-item--list attach-data">
          ${value}
          <img class="refresh-list-attach" src="../../static/chatbot-admin/images/refresh.svg" />
        </td>
        <td class="usage-history__table-item usage-history__table-item--delete attach">
          <img src="../../static/chatbot-admin/images/Trash.svg" />
        </td>
      </tr>`;
      attachTableBody.insertAdjacentHTML("afterbegin", newRow); // 테이블 상단에 추가
      inputAttach.value = ""; // 입력 필드 초기화
    }
  });

  // 하드코딩 된 테이블 데이터용 체크박스 전체 선택/해제 기능 추가 (삭제 필요)
  // addCheckboxToggleListener("usage-history__table.form");
  // addCheckboxToggleListener("usage-history__table.attach");

  addPencilClickListener("pencil-docs");
  addPencilClickListener("pencil-agency");
});
