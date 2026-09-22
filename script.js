function getLocalDate() {

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

const welcomePage = document.querySelector("#welcome-page");
const nicknamePage = document.querySelector("#nickname-page");
const planPage = document.querySelector("#plan-page");
const todayPage = document.querySelector("#today-page");
const streakDisplay = document.querySelector("#streak-display");
const highestStreakDisplay = document.querySelector("#highest-streak-display");
const planDayDisplay = document.querySelector("#plan-day-display");

const savedNickname = localStorage.getItem("nickname");
const planStarted = localStorage.getItem("planStarted");

const today = getLocalDate();

const savedTodayRecord = localStorage.getItem(
    "exercise-" + today
);

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

    localStorage.setItem(
        "planStartDate",
        getLocalDate()
    );

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

const completeButton = document.querySelector("#complete-button");

completeButton.addEventListener("click", function () {

    const squat = Number(squatInput.value);
    const lunge = Number(lungeInput.value);
    const bridge = Number(bridgeInput.value);
    const calf = Number(calfInput.value);
    const wallSit = Number(wallSitInput.value);

    if (
        squat >= 20 &&
        lunge >= 10 &&
        bridge >= 20 &&
        calf >= 25 &&
        wallSit >= 30
    ) {

        const today = getLocalDate();

        const todayRecord = {
            date: today,
            completed: true,
            squat: squat,
            lunge: lunge,
            bridge: bridge,
            calf: calf,
            wallSit: wallSit
        };

        localStorage.setItem(
            "exercise-" + today,
            JSON.stringify(todayRecord)
        );

        alert("🎉 今天的運動完成了！");

    } else {

        alert("還有運動尚未完成！");

    }

});

if (savedNickname && planStarted === "true") {

    welcomePage.style.display = "none";
    nicknamePage.style.display = "none";
    planPage.style.display = "none";
    todayPage.style.display = "block";

}

if (savedTodayRecord) {

    const todayRecord = JSON.parse(savedTodayRecord);

    squatInput.value = todayRecord.squat;
    lungeInput.value = todayRecord.lunge;
    bridgeInput.value = todayRecord.bridge;
    calfInput.value = todayRecord.calf;
    wallSitInput.value = todayRecord.wallSit;

    squatStatus.textContent = "✓ 已完成";
    lungeStatus.textContent = "✓ 已完成";
    bridgeStatus.textContent = "✓ 已完成";
    calfStatus.textContent = "✓ 已完成";
    wallSitStatus.textContent = "✓ 已完成";

}

function getCurrentStreak() {

    let streak = 0;
    let date = new Date();

    while (true) {

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        const dateString = `${year}-${month}-${day}`;

        const record = localStorage.getItem(
            "exercise-" + dateString
        );

        if (!record) {
            break;
        }

        const todayRecord = JSON.parse(record);

        if (!todayRecord.completed) {
            break;
        }

        streak++;

        date.setDate(date.getDate() - 1);

    }

    return streak;

}

function getHighestStreak() {

    let highestStreak = 0;
    let currentStreak = 0;

    let date = new Date();

    while (true) {

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        const dateString = `${year}-${month}-${day}`;

        const record = localStorage.getItem(
            "exercise-" + dateString
        );

        if (record) {

            const todayRecord = JSON.parse(record);

            if (todayRecord.completed) {

                currentStreak++;

                if (currentStreak > highestStreak) {
                    highestStreak = currentStreak;
                }

            } else {

                currentStreak = 0;

            }

        } else {

            currentStreak = 0;

        }

        date.setDate(date.getDate() - 1);

        if (date < new Date("2020-01-01")) {
            break;
        }

    }

    return highestStreak;

}

streakDisplay.textContent =
    "目前連續完成 " + getCurrentStreak() + " 天";

highestStreakDisplay.textContent =
    "歷史最高連續 " + getHighestStreak() + " 天";

function getCurrentPlanDay() {

    const planStartDate = localStorage.getItem("planStartDate");

    if (!planStartDate) {
        return null;
    }

    const startDate = new Date(planStartDate);
    const todayDate = new Date(getLocalDate());

    const difference =
        Math.floor(
            (todayDate - startDate) / (1000 * 60 * 60 * 24)
        );

    const planDay = (difference % 7) + 1;

    return planDay;

}

const currentPlanDay = getCurrentPlanDay();

console.log("今天是 Day " + currentPlanDay);

planDayDisplay.textContent =
    "今天是 Day " + currentPlanDay;

const exercisePlan = {

    1: [
        { name: "深蹲", target: 20, unit: "次" },
        { name: "弓箭步", target: 10, unit: "次／側" },
        { name: "抬臀", target: 20, unit: "次" },
        { name: "踮腳", target: 25, unit: "次" },
        { name: "靠牆深蹲", target: 30, unit: "秒" }
    ],

    2: [
        { name: "伏地挺身", target: 10, unit: "次" },
        { name: "仰臥起坐", target: 15, unit: "次" },
        { name: "開合手", target: 20, unit: "次" },
        { name: "棒式", target: 30, unit: "秒" },
        { name: "原地踏步", target: 3, unit: "分鐘" }
    ],

    3: [
        { name: "仰臥起坐", target: 20, unit: "次" },
        { name: "抬膝", target: 20, unit: "次" },
        { name: "棒式", target: 30, unit: "秒" },
        { name: "側抬腿", target: 10, unit: "次／側" },
        { name: "原地踏步", target: 3, unit: "分鐘" }
    ],

    4: [
        { name: "開合跳", target: 30, unit: "次" },
        { name: "高抬腿", target: 30, unit: "次／側" },
        { name: "深蹲", target: 20, unit: "次" },
        { name: "原地踏步", target: 5, unit: "分鐘" },
        { name: "伸展", target: 3, unit: "分鐘" }
    ],

    5: [
        { name: "深蹲", target: 20, unit: "次" },
        { name: "後跨弓箭步", target: 10, unit: "次／側" },
        { name: "仰臥起坐", target: 15, unit: "次" },
        { name: "抬臀", target: 20, unit: "次" },
        { name: "棒式", target: 30, unit: "秒" }
    ],

    6: [
        { name: "深蹲", target: 20, unit: "次" },
        { name: "伏地挺身", target: 10, unit: "次" },
        { name: "開合跳", target: 30, unit: "次" },
        { name: "仰臥起坐", target: 15, unit: "次" },
        { name: "棒式", target: 30, unit: "秒" }
    ],

    7: [
        { name: "深蹲", target: 15, unit: "次" },
        { name: "原地踏步", target: 5, unit: "分鐘" },
        { name: "開合手", target: 20, unit: "次" },
        { name: "仰臥起坐", target: 15, unit: "次" },
        { name: "伸展", target: 5, unit: "分鐘" }
    ]

};

console.log(
    "今天的運動：",
    exercisePlan[currentPlanDay]
);
