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

let formCost = 10000; // 서류작성 비용을 저장하는 변수
let agencyCost = 20000; // 업무대행 비용을 저장하는 변수

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

// 목록명 수정/변경 함수
function handleRefreshClick(event) {
  const refreshIcon = event.target;
  const listItemContainer = refreshIcon.closest("td"); // td 요소를 찾습니다.
  const listItem =
    listItemContainer.querySelector("span") ||
    listItemContainer.querySelector("input"); // span 또는 input 요소

  if (refreshIcon.src.includes("refresh.svg")) {
    // 이미지 변경 및 span을 input으로 변경
    refreshIcon.src = "../../static/chatbot-admin/images/Check_fill.svg";
    const input = document.createElement("input");
    input.style.width = "100px";
    input.type = "text";
    input.value = listItem.innerText;
    listItem.replaceWith(input);

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  } else if (refreshIcon.src.includes("Check_fill.svg")) {
    // 변경 완료 버튼 클릭 시 이미지 변경 및 input을 span으로 변경
    const newSpan = document.createElement("span");
    const newName = listItem.value;
    newSpan.innerText = newName;
    listItem.replaceWith(newSpan);
    refreshIcon.src = "../../static/chatbot-admin/images/refresh.svg";

    // 목록명 수정 API 호출
    const documentId = 1; // 수정할 서류 id (실제 id로 변경 필요)
    const documentType = listItemContainer
      .closest("table")
      .classList.contains("form")
      ? "form"
      : "attach";
    updateDocumentName(documentId, documentType, newName);
  }
}

// 업로드 버튼 클릭 시 파일 탐색기 열기 함수
function handleFileUploadClick(event) {
  const uploadButton = event.target;
  const fileContainer = uploadButton.closest("td");
  const tableRow = fileContainer.closest("tr");

  const hiddenFileInput = document.createElement("input");
  hiddenFileInput.type = "file";
  hiddenFileInput.style.display = "none";
  document.body.appendChild(hiddenFileInput);

  hiddenFileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const newFileName = file.name;
      const fileLink = document.createElement("a");
      fileLink.href = URL.createObjectURL(file);
      fileLink.download = newFileName;
      fileLink.textContent = newFileName;

      const refreshIcon = document.createElement("img");
      refreshIcon.src = "../../static/chatbot-admin/images/refresh.svg";
      refreshIcon.classList.add("refresh-file");

      fileContainer.innerHTML = "";
      fileContainer.appendChild(fileLink);
      fileContainer.appendChild(refreshIcon);

      // 상태 업데이트
      const statusContainer = tableRow.querySelector(
        ".usage-history__table-item--status"
      );
      if (statusContainer) {
        statusContainer.innerHTML = `
        <span>다운 허용</span>
        <img class="refresh-status" src="../../static/chatbot-admin/images/refresh.svg" />
        `;
      }

      // 파일을 변수에 저장하여 나중에 API 호출 시 사용
      fileContainer.dataset.newFile = file;

      // API 호출
      const documentId = 1; // 수정할 서류 id (실제 id로 변경 필요)
      const documentType = "form";
      updateDocumentFile(documentId, documentType, file);
    }
  });

  hiddenFileInput.click(); // 파일 탐색기 열기
}

// 양식서류 수정/변경 함수
function handleFileRefreshClick(event) {
  const refreshIcon = event.target;
  const fileContainer = refreshIcon.closest("td");
  const fileLink = fileContainer.querySelector("a");

  if (refreshIcon.src.includes("refresh.svg")) {
    // 이미지 변경 및 파일 탐색기 열기
    refreshIcon.src = "../../static/chatbot-admin/images/Check_fill.svg";

    const hiddenFileInput = document.createElement("input");
    hiddenFileInput.type = "file";
    hiddenFileInput.style.display = "none";
    document.body.appendChild(hiddenFileInput);

    hiddenFileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const newFileName = file.name;
        fileLink.textContent = newFileName;
        fileLink.href = URL.createObjectURL(file);

        // 파일을 변수에 저장하여 나중에 API 호출 시 사용
        fileContainer.dataset.newFile = file;
      }
    });

    hiddenFileInput.click(); // 파일 탐색기 열기
  } else if (refreshIcon.src.includes("Check_fill.svg")) {
    // 변경 완료 버튼 클릭 시 이미지 변경
    refreshIcon.src = "../../static/chatbot-admin/images/refresh.svg";

    // 파일명 수정 API 호출
    const documentId = 1; // 수정할 서류 id (실제 id로 변경 필요)
    const documentType = "form";
    const newFile = fileContainer.dataset.newFile;
    if (newFile) {
      updateDocumentFile(documentId, documentType, newFile);
      delete fileContainer.dataset.newFile;
    }
  }
}

function handleStatusRefreshClick(event) {
  const refreshIcon = event.target;
  const statusContainer = refreshIcon.closest("td");
  const newStatus = "다운 금지";

  // 상태 변경
  statusContainer.innerHTML = `
  <span>${newStatus}</span>
  `;

  // 상태 업데이트 API 호출
  const documentId = 1; // 수정할 서류 id (실제 id로 변경 필요)
  const documentType = "form";
  updateDocumentStatus(documentId, documentType, newStatus);
}

// 카테고리에 따른 양식서류, 첨부서류 조회 API 연동 함수
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
    console.log("카테고리", {
      category1,
      category2,
      category3,
      category4,
      category5,
    });

    const data = dummyCategoryData; // 더미 데이터

    // 실제 api 연동 로직 추가해야함
    // const url = "endpoint" // 실제 API 주소

    // 양식서류 테이블 업데이트
    formTableBody.innerHTML = ""; // 기존 데이터 초기화
    data.formDocs.forEach((doc) => {
      const row = `
      <tr class="usage-history__table-container">
        <td class="usage-history__table-item usage-history__table-item--checkbox">
          <input type="checkbox" />
        </td>
        <td class="usage-history__table-item usage-history__table-item--list">
          <span>${doc.list}</span>
          <img class="refresh-list-form" src="../../static/chatbot-admin/images/refresh.svg" />
        </td>
        <td class="usage-history__table-item usage-history__table-item--docs">
        ${
          doc.file
            ? `<a href="./dummyFiles/${doc.file}" download>${doc.file}</a>
          <img class="refresh-file" src="../../static/chatbot-admin/images/refresh.svg" />`
            : '<button class="upload-button">업로드</button>'
        }
        </td>
        <td class="usage-history__table-item usage-history__table-item--status">
          <span>${doc.file ? "다운 허용" : "다운 금지"}</span>
      ${
        doc.file
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
          <span>${doc.list}</span>
          <img class="refresh-list-attach" src="../../static/chatbot-admin/images/refresh.svg" />
        </td>
        <td class="usage-history__table-item usage-history__table-item--delete attach">
          <img class="trash-icon" src="../../static/chatbot-admin/images/Trash.svg" />
        </td>
      </tr>`;
      attachTableBody.insertAdjacentHTML("beforeend", row);
    });

    // 새로 생성된 삭제 버튼에 이벤트 리스너 등록
    const newDeleteIcons = document.querySelectorAll(".trash-icon");
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
    const value = span.innerText.replace(/,/g, ""); // 콤마 제거
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

    // 숫자만 입력되도록 제한
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
    });

    // Enter key 이벤트로 다시 span으로 변경
    input.addEventListener("blur", function () {
      const newSpan = document.createElement("span");
      newSpan.className = "content-modify__charge-text money";
      newSpan.innerText = parseInt(
        input.value.replace(/,/g, ""),
        10
      ).toLocaleString(); // 세자리 단위로 콤마 추가
      input.replaceWith(newSpan);

      // 수정된 값을 변수에 저장
      if (className === "pencil-docs") {
        formCost = parseInt(input.value.replace(/,/g, ""), 10); // 콤마 제거 후 저장
        console.log(formCost);
      } else {
        agencyCost = parseInt(input.value.replace(/,/g, ""), 10); // 콤마 제거 후 저장
        console.log(agencyCost);
      }

      updateTaskCost(); // 업무 비용 수정 API 호출
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        input.blur();
        updateTaskCost(); // 업무 비용 수정 API 호출
      }
    });
  });
}

// 서류 추가 API 연동 함수
async function addDocument(documentType, documentName) {
  // const url = "endpoint" // 실제 API 주소
  try {
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     category1,
    //     category2,
    //     category3,
    //     category4,
    //     category5,
    //     documentType,
    //     documentName,
    //   }),
    // });
    // const result = await response.json();
    console.log("서류 추가 완료", {
      category1: category1,
      category2: category2,
      category3: category3,
      category4: category4,
      category5: category5,
      documentType: documentType,
      documentName: documentName,
    });
  } catch (e) {
    console.error(e);
  }
}

// 업무 비용 수정 API 연동 함수
async function updateTaskCost() {
  // const url = "endpoint" // 실제 API 주소
  try {
    // const response = await fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     category1,
    //     category2,
    //     category3,
    //     category4,
    //     category5,
    //     formCost,
    //     agencyCost,
    //   }),
    // });
    // const result = await response.json();
    console.log("업무 비용 수정 완료", {
      category1: category1,
      category2: category2,
      category3: category3,
      category4: category4,
      category5: category5,
      formCost: formCost,
      agencyCost: agencyCost,
    });
  } catch (e) {
    console.error(e);
  }
}

// 목록명 수정 API 연동 함수
async function updateDocumentName(documentId, documentType, newName) {
  // const url = "endpoint" // 실제 API 주소
  try {
    // const response = await fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     category1,
    //     category2,
    //     category3,
    //     category4,
    //     category5,
    //     documentId,
    //     documentType,
    //     newName,
    //   }),
    // });
    // const result = await response.json();
    console.log("서류명 수정 완료", {
      category1: category1,
      category2: category2,
      category3: category3,
      category4: category4,
      category5: category5,
      documentId: documentId,
      documentType: documentType,
      newName: newName,
    });
  } catch (e) {
    console.error(e);
  }
}

// 양식파일 수정 API 연동 함수
async function updateDocumentFile(documentId, documentType, newFile) {
  // const url = "endpoint" // 실제 API 주소
  // const formData = new FormData();
  // formData.append("category1", category1);
  // formData.append("category2", category2);
  // formData.append("category3", category3);
  // formData.append("category4", category4);
  // formData.append("category5", category5);
  // formData.append("documentId", documentId);
  // formData.append("documentType", documentType);
  // formData.append("file", newFile);

  try {
    // const response = await fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     category1,
    //     category2,
    //     category3,
    //     category4,
    //     category5,
    //     documentId,
    //     documentType,
    //     newFileName,
    //   }),
    // });
    // const result = await response.json();
    console.log("서류 파일명 수정 완료", {
      category1: category1,
      category2: category2,
      category3: category3,
      category4: category4,
      category5: category5,
      documentId: documentId,
      documentType: documentType,
      newFile: newFile,
    });
  } catch (e) {
    console.error(e);
  }
}

async function updateDocumentStatus(documentId, documentType, newStatus) {
  // const url = "endpoint" // 실제 API 주소
  try {
    // const response = await fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     category1,
    //     category2,
    //     category3,
    //     category4,
    //     category5,
    //     documentId,
    //    documentType,
    //     newStatus,
    //   }),
    // });
    // const result = await response.json();
    console.log("서류 상태 수정 완료", {
      category1: category1,
      category2: category2,
      category3: category3,
      category4: category4,
      category5: category5,
      documentId: documentId,
      documentType: documentType,
      newStatus: newStatus,
    });
  } catch (e) {
    console.error(e);
  }
}

// 서류 삭제 API 연동 함수
async function deleteDocument(documentId, documentType) {
  // const url = "endpoint" // 실제 API 주소
  try {
    // const response = await fetch(url, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     category1,
    //     category2,
    //     category3,
    //     category4,
    //     category5,
    //     documentId,
    //     documentType,
    //   }),
    // });
    // const result = await response.json();
    console.log("서류 삭제 완료", {
      category1: category1,
      category2: category2,
      category3: category3,
      category4: category4,
      category5: category5,
      documentId: documentId,
      documentType: documentType,
    });
  } catch (e) {
    console.error(e);
  }
}

// DOM 로드 후 실행
document.addEventListener("DOMContentLoaded", function () {
  searchButton.addEventListener("click", fetchCategoryData); // 조회 버튼 클릭 시 카테고리 데이터 조회

  // 조회 오류 모달 확인 버튼 클릭 시 모달 창 닫기
  modalConfirmButton.addEventListener("click", closeSearchModal);

  // 저장 버튼 클릭 시 모달 창 열기
  saveButton.addEventListener("click", openSaveModal);

  // 저장 모달 취소/확인 버튼 클릭 시 모달 창 닫기
  modalCancelButton.addEventListener("click", closeSaveModal);
  modalSaveButton.addEventListener("click", () => {
    closeSaveModal();
    location.reload(); // 저장 후 새로고침
  });

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
      const documentId = 1; // 삭제할 서류 id (실제 id로 변경 필요)
      const documentType = rowToDelete
        .closest("table")
        .classList.contains("form")
        ? "form"
        : "attach"; // 서류 유형

      deleteDocument(documentId, documentType); // 서류 삭제 API 호출

      rowToDelete.remove(); // row 삭제
      rowToDelete = null; // 변수 초기화
    }
    closeDeleteModal(); // 삭제 모달 창 닫기
  });

  // 양식서류 목록 추가 버튼 클릭 시
  addListButtonForm.addEventListener("click", function () {
    const value = inputForm.value.trim(); // 입력값

    if (value) {
      addDocument("form", value); // 양식서류 추가 API 호출

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
      addDocument("attach", value); // 첨부서류 추가 API 호출

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

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("refresh-list-form")) {
      handleRefreshClick(event);
    }
    if (event.target.classList.contains("refresh-list-attach")) {
      handleRefreshClick(event);
    }
    if (event.target.classList.contains("refresh-file")) {
      handleFileRefreshClick(event);
    }
    if (event.target.classList.contains("upload-button")) {
      handleFileUploadClick(event);
    }
    if (event.target.classList.contains("refresh-status")) {
      handleStatusRefreshClick(event);
    }
  });

  // 하드코딩 된 테이블 데이터용 체크박스 전체 선택/해제 기능 추가 (삭제 필요)
  // addCheckboxToggleListener("usage-history__table.form");
  // addCheckboxToggleListener("usage-history__table.attach");

  addPencilClickListener("pencil-docs");
  addPencilClickListener("pencil-agency");
});
