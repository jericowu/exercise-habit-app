const welcomePage = document.querySelector("#welcome-page");
const nicknamePage = document.querySelector("#nickname-page");
const planPage = document.querySelector("#plan-page");

const startButton = document.querySelector(".start-button");
const nicknameButton = document.querySelector("#nickname-button");
const planButton = document.querySelector("#plan-button");

const nicknameInput = document.querySelector("#nickname");


startButton.addEventListener("click", function () {

    welcomePage.style.display = "none";
    nicknamePage.style.display = "block";

});


nicknameButton.addEventListener("click", function () {

    const nickname = nicknameInput.value.trim();

    if (nickname === "") {
        alert("請輸入暱稱");
        return;
    }

    localStorage.setItem("nickname", nickname);

    nicknamePage.style.display = "none";
    planPage.style.display = "block";

});
