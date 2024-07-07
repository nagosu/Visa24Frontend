const buttons = document.querySelectorAll(".content__select-button");

async function selectLanguage(language) {
  // const url = "endpoint"; // 실제 API 주소 입력
  try {
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ language }),
    // });
    // const result = await response.json();
    console.log("언어 선택 완료", {
      language: language,
    });
  } catch (e) {
    console.error(e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.getAttribute("data-lang");
      selectLanguage(language); // 언어 선택 APi 호출
    });
  });
});
