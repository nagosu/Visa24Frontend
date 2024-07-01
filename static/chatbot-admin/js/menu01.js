import { dummyTableData } from "./dummyData/menu01-data.js";

async function fetchTableData(pageNumber, pageSize = 10) {
  // 페이지네이션 로직
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = dummyTableData.slice(startIndex, endIndex);

  // 실제 api 호출 로직 추가해야함

  return {
    data: paginatedData,
    totalItems: dummyTableData.length,
    currentPage: pageNumber,
    pageSize: pageSize,
    totalPages: Math.ceil(dummyTableData.length / pageSize),
  };
}

// 테이블에 데이터를 렌더링하는 함수
function renderTable(data) {
  const tableBody = document.querySelector(".usage-history__table-data");
  tableBody.innerHTML = ""; // 기존 데이터 초기화

  data.forEach((item) => {
    const row = `
      <tr class="usage-history__table-container">
          <td class="usage-history__table-item usage-history__table-item--no">${
            item.no
          }</td>
          <td class="usage-history__table-item usage-history__table-item--date">${
            item.date
          }</td>
          <td class="usage-history__table-item usage-history__table-item--language">${
            item.language
          }</td>
          <td class="usage-history__table-item usage-history__table-item--gpt">${
            item.gptVersion
          }</td>
          <td class="usage-history__table-item usage-history__table-item--category">${
            item.category
          }</td>
          <td class="usage-history__table-item usage-history__table-item--download">${item.downloads.join(
            ", "
          )}</td>
      </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

// 페이지네이션 버튼 조절 함수
function updatePaginationControls(totalPages, currentPage) {
  const paginationContainer = document.querySelector(".pagination");
  const numberWrapper = document.querySelector(".pagination__number-wrapper");
  numberWrapper.innerHTML = ""; // 기존 페이지네이션 초기화

  const maxPagesToShow = 5;
  let startPage =
    Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
  let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const prevButton = document.querySelector(".pagination__button-prev");
  const nextButton = document.querySelector(".pagination__button-next");

  prevButton.dataset.page = startPage - 1;
  nextButton.dataset.page = endPage + 1;

  prevButton.disabled = startPage === 1;
  nextButton.disabled = endPage >= totalPages;

  for (let i = startPage; i <= endPage; i++) {
    const pageItem = `<button class="pagination__button ${
      i === currentPage ? "pagination__button--active" : ""
    }" data-page="${i}">${i}</button>`;
    numberWrapper.insertAdjacentHTML("beforeend", pageItem);
  }

  document.querySelectorAll(".pagination__button").forEach((item) => {
    item.addEventListener("click", () => {
      const page = parseInt(item.getAttribute("data-page"), 10);
      if (!isNaN(page)) {
        loadTableData(page);
      }
    });
  });
}

// 테이블 데이터를 불러오는 함수
async function loadTableData(pageNumber = 1) {
  const { data, totalItems, currentPage, pageSize, totalPages } =
    await fetchTableData(pageNumber);

  renderTable(data);
  updatePaginationControls(totalPages, currentPage);
}

document.addEventListener("DOMContentLoaded", () => loadTableData());
