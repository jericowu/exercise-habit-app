const welcomePage = document.querySelector("#welcome-page");
const nicknamePage = document.querySelector("#nickname-page");
const planPage = document.querySelector("#plan-page");
const todayPage = document.querySelector("#today-page");

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


planButton.addEventListener("click", function () {

    localStorage.setItem("planStarted", "true");

    planPage.style.display = "none";
    todayPage.style.display = "block";

});

const squatInput = document.querySelector("#squat");
const squatStatus = document.querySelector("#squat-status");

squatInput.addEventListener("input", function () {

    const actual = Number(squatInput.value);

    if (actual >= 20) {
        squatStatus.textContent = "✓ 已完成";
    } else {
        squatStatus.textContent = "尚未完成";
    }

});
