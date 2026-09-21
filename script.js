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

const lungeInput = document.querySelector("#lunge");
const lungeStatus = document.querySelector("#lunge-status");

const bridgeInput = document.querySelector("#bridge");
const bridgeStatus = document.querySelector("#bridge-status");

const calfInput = document.querySelector("#calf");
const calfStatus = document.querySelector("#calf-status");

const wallSitInput = document.querySelector("#wall-sit");
const wallSitStatus = document.querySelector("#wall-sit-status");


squatInput.addEventListener("input", function () {

    const actual = Number(squatInput.value);

    if (actual >= 20) {
        squatStatus.textContent = "✓ 已完成";
    } else {
        squatStatus.textContent = "尚未完成";
    }

});


lungeInput.addEventListener("input", function () {

    const actual = Number(lungeInput.value);

    if (actual >= 10) {
        lungeStatus.textContent = "✓ 已完成";
    } else {
        lungeStatus.textContent = "尚未完成";
    }

});


bridgeInput.addEventListener("input", function () {

    const actual = Number(bridgeInput.value);

    if (actual >= 20) {
        bridgeStatus.textContent = "✓ 已完成";
    } else {
        bridgeStatus.textContent = "尚未完成";
    }

});


calfInput.addEventListener("input", function () {

    const actual = Number(calfInput.value);

    if (actual >= 25) {
        calfStatus.textContent = "✓ 已完成";
    } else {
        calfStatus.textContent = "尚未完成";
    }

});


wallSitInput.addEventListener("input", function () {

    const actual = Number(wallSitInput.value);

    if (actual >= 30) {
        wallSitStatus.textContent = "✓ 已完成";
    } else {
        wallSitStatus.textContent = "尚未完成";
    }

});
