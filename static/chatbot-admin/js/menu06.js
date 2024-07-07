import { dummyTableData } from "./dummyData/menu06-data.js";

const prevButton = document.querySelector(".pagination__button-prev"); // 페이지네이션 이전 버튼
const nextButton = document.querySelector(".pagination__button-next"); // 페이지네이션 다음 버튼
const categorySelect = document.getElementById("categorySelect"); // 카테고리 선택 드롭다운
const searchInput = document.getElementById("searchInput"); // 검색어 입력창
const searchButton = document.querySelector(".search-bar__input-icon"); // 검색 버튼

let data, totalItems, currentPage, pageSize, totalPages;
let selectedCategory = "카테고리 명"; // 선택한 카테고리를 저장할 변수
let searchKeyword = ""; // 입력한 검색어를 저장할 변수

async function fetchTableData(pageNumber, pageSize) {
  // const url = "http://example.com"; // 실제 api 호출 주소

  // 페이지네이션 로직
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = dummyTableData.slice(startIndex, endIndex);

  // 실제 api 호출 로직 추가해야함
  try {
    // const response = await fetch(
    //   `url?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const result = await response.json();
    console.log("API 호출 성공", {
      data: paginatedData,
      totalItems: dummyTableData.length,
      currentPage: pageNumber,
      pageSize: pageSize,
      totalPages: Math.ceil(dummyTableData.length / pageSize),
      selectedCategory: selectedCategory,
      searchKeyword: searchKeyword,
    });
  } catch (e) {
    console.error(e);
  }

  // return {
  //   data: paginatedData,
  //   totalItems: dummyTableData.length,
  //   currentPage: pageNumber,
  //   pageSize: pageSize,
  //   totalPages: Math.ceil(dummyTableData.length / pageSize),
  // };
  data = paginatedData;
  totalItems = dummyTableData.length;
  currentPage = pageNumber;
  pageSize = pageSize;
  totalPages = Math.ceil(dummyTableData.length / pageSize);
}

// 테이블에 데이터를 렌더링하는 함수
function renderTable(data, currentPage, pageSize) {
  const tableBody = document.querySelector(".usage-history__table-data");
  tableBody.innerHTML = ""; // 기존 데이터 초기화

  data.forEach((item, index) => {
    const row = `
    <tr class="usage-history__table-container">
                <td
                  class="usage-history__table-item usage-history__table-item--no"
                >
                  ${(currentPage - 1) * pageSize + (index + 1)}
                </td>
                <td
                  class="usage-history__table-item usage-history__table-item--name"
                >
                  ${item.username}
                </td>
                <td
                  class="usage-history__table-item usage-history__table-item--phone"
                >
                  ${item.contact}
                </td>
                <td
                  class="usage-history__table-item usage-history__table-item--category"
                >
                  ${item.category}
                </td>
                <td
                  class="usage-history__table-item usage-history__table-item--task"
                >
                  ${item.requiredTask}
                </td>
                <td
                  class="usage-history__table-item usage-history__table-item--charge"
                >
                  ${item.payment}
                </td>
                <td
                  class="usage-history__table-item usage-history__table-item--agency"
                >
                  ${item.agency}
                </td>
                <td
                  class="usage-history__table-item usage-history__table-item--date"
                >
                  ${item.paymentDate}
                </td>
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

  prevButton.dataset.page = startPage - 5; // 이전 버튼 클릭 시 보여줄 페이지
  nextButton.dataset.page = endPage + 1; // 다음 버튼 클릭 시 보여줄 페이지

  prevButton.disabled = startPage === 1; // 시작 페이지가 1일 때 이전 버튼 비활성화
  nextButton.disabled = endPage >= totalPages; // 끝 페이지가 마지막 페이지일 때 다음 버튼 비활성화

  for (let i = startPage; i <= endPage; i++) {
    const pageItem = `<button class="pagination__button number ${
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
async function loadTableData(pageNumber = 1, pageSize = 20) {
  await fetchTableData(pageNumber, pageSize);

  renderTable(data, currentPage, pageSize);
  updatePaginationControls(totalPages, currentPage);
}

document.addEventListener("DOMContentLoaded", () => {
  loadTableData();

  // 카테고리 선택 이벤트 리스너 추가
  categorySelect.addEventListener("change", (event) => {
    selectedCategory = event.target.value;
    console.log("Selected Category:", selectedCategory);
  });

  // 검색어 입력 이벤트 리스너 추가
  searchInput.addEventListener("input", (event) => {
    searchKeyword = event.target.value;
    console.log("Search Keyword:", searchKeyword);
  });

  // 검색 버튼 클릭 이벤트 리스너 추가
  searchButton.addEventListener("click", () => {
    if (selectedCategory === "카테고리 명" || searchKeyword === "") {
      return;
    }
    loadTableData();
  });

  // 검색어 입력창에서 엔터키 이벤트 리스너 추가
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      if (selectedCategory === "카테고리 명" || searchKeyword === "") {
        return;
      }
      loadTableData();
    }
  });

  // 이전 버튼 클릭 이벤트 리스너 추가
  prevButton.addEventListener("click", () => {
    const prevPage = parseInt(prevButton.dataset.page, 10);
    if (!isNaN(prevPage) && prevPage > 0) {
      loadTableData(prevPage);
    }
  });

  // 다음 버튼 클릭 이벤트 리스너 추가
  nextButton.addEventListener("click", () => {
    const nextPage = parseInt(nextButton.dataset.page, 10);
    if (!isNaN(nextPage) && nextPage <= totalPages) {
      loadTableData(nextPage);
    }
  });
});
