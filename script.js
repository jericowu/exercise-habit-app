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

const completeButton = document.querySelector("#complete-button");

if (savedNickname && planStarted === "true") {

    welcomePage.style.display = "none";
    nicknamePage.style.display = "none";
    planPage.style.display = "none";
    todayPage.style.display = "block";

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

const exerciseList = document.querySelector("#exercise-list");

const todayExercises = exercisePlan[currentPlanDay];

console.log("exerciseList：", exerciseList);
console.log("currentPlanDay：", currentPlanDay);
console.log("todayExercises：", todayExercises);

todayExercises.forEach(function (exercise, index) {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
        <h2>${exercise.name}</h2>

        <p>目標：${exercise.target} ${exercise.unit}</p>

        <label for="exercise-${index}">
            實際完成
        </label>

        <input
            type="number"
            id="exercise-${index}"
            min="0"
            placeholder="輸入數值"
        >

        <p id="exercise-status-${index}">
            尚未完成
        </p>
    `;

    exerciseList.appendChild(card);

});
