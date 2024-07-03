const toggleEnglish = document.querySelector(
  ".language-setting__toggle-switch.english"
); // 토글 스위치 (영어)
const toggleChinese = document.querySelector(
  ".language-setting__toggle-switch.chinese"
); // 토글 스위치 (중국어)
const toggleInputEnglish = document.getElementById("toggle-english"); // 토글 스위치 (영어) input
const toggleInputChinese = document.getElementById("toggle-chinese"); // 토글 스위치 (중국어) input
const toggleList = document.querySelectorAll(
  ".language-setting__toggle-switch"
); // 전체 토글 스위치 (영어/중국어)

let toggleStatusEnglish = false; // 토글 스위치 (영어) 상태
let toggleStatusChinese = false; // 토글 스위치 (중국어) 상태

// 언어 설정 저장 API 호출
async function saveLanguageSetting(language) {
  // const url = "https://example.com"; // 실제 API URL로 변경 필요
  let data = {};

  if (language === "english") {
    data = { message: `영어 토글 상태: ${toggleStatusEnglish}` };
  }
  if (language === "chinese") {
    data = { message: `중국어 토글 상태: ${toggleStatusChinese}` };
  }

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
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

// DOM이 로드되면 실행
document.addEventListener("DOMContentLoaded", function () {
  // 토글 ON/OFF 텍스트 색상 변경
  toggleList.forEach(($toggle) => {
    $toggle.addEventListener("click", () => {
      $toggle.classList.toggle("active");

      const isActive = $toggle.classList.contains("active");
      const statusOff = $toggle.parentElement.querySelector(
        ".language-setting__toggle-status-off"
      );
      const statusOn = $toggle.parentElement.querySelector(
        ".language-setting__toggle-status-on"
      );

      if (isActive) {
        statusOff.style.color = "#d4d4d4";
        statusOn.style.color = "#1b3133";
      } else {
        statusOff.style.color = "#1b3133";
        statusOn.style.color = "#d4d4d4";
      }

      // 토글 상태 업데이트
      if ($toggle.classList.contains("english")) {
        toggleStatusEnglish = isActive; // 토글 상태 업데이트
        saveLanguageSetting("english"); // 영어 토글 상태 저장 API 호출
      } else if ($toggle.classList.contains("chinese")) {
        toggleStatusChinese = isActive; // 토글 상태 업데이트
        saveLanguageSetting("chinese"); // 중국어 토글 상태 저장 API 호출
      }
    });
  });
});
