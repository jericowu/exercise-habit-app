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
    bottomNav.style.display = "block";
    navToday.classList.add("active");

});

const completeButton = document.querySelector("#complete-button");
const historyPage = document.querySelector("#history-page");
const historyList = document.querySelector("#history-list");
const statisticsPage = document.querySelector("#statistics-page");
const weeklyRate = document.querySelector("#weekly-rate");
const exerciseTotals = document.querySelector("#exercise-totals");
const settingsPage = document.querySelector("#settings-page");
const settingsNickname = document.querySelector("#settings-nickname");
const saveNicknameButton = document.querySelector("#save-nickname-button");

const settingsPlanList =
    document.querySelector("#settings-plan-list");

const bottomNav = document.querySelector("#bottom-nav");

const navToday = document.querySelector("#nav-today");
const navHistory = document.querySelector("#nav-history");
const navStatistics = document.querySelector("#nav-statistics");
const navSettings = document.querySelector("#nav-settings");

if (savedNickname && planStarted === "true") {

    welcomePage.style.display = "none";
    nicknamePage.style.display = "none";
    planPage.style.display = "none";
    todayPage.style.display = "block";

    bottomNav.style.display = "block";
    navToday.classList.add("active");

}

function getCurrentStreak() {

    let streak = 0;
    let date = new Date();

    const todayString = getLocalDate();

    const todayRecord = localStorage.getItem(
        "exercise-" + todayString
    );

    if (!todayRecord) {

        date.setDate(date.getDate() - 1);

    } else {

        const record = JSON.parse(todayRecord);
        
        if (!record.completed) {
            return 0;
        }

    }

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

        const exerciseRecord = JSON.parse(record);

        if (!exerciseRecord.completed) {
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

    const planDay = difference + 1;

    return planDay;

}

const currentPlanDay = getCurrentPlanDay();

const currentCycleDay =
    ((currentPlanDay - 1) % 7) + 1;

console.log("今天是 Day " + currentPlanDay);
console.log("今天使用第 " + currentCycleDay + " 套運動");

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
    exercisePlan[currentCycleDay]
);

const exerciseList = document.querySelector("#exercise-list");

const todayExercises = exercisePlan[currentCycleDay];

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

    const input = document.querySelector(
        "#exercise-" + index
    );

    const status = document.querySelector(
        "#exercise-status-" + index
    );

    input.addEventListener("input", function () {

        const actual = Number(input.value);

        if (actual >= exercise.target) {

            status.textContent = "✓ 已完成";

        } else {

            status.textContent = "尚未完成";

        }

    });

});

if (savedTodayRecord) {

    const todayRecord = JSON.parse(savedTodayRecord);

    if (
        todayRecord.exercises &&
        todayRecord.planDay === currentPlanDay
    ) {

        todayRecord.exercises.forEach(function (record, index) {

            const input = document.querySelector(
                "#exercise-" + index
            );

            const status = document.querySelector(
                "#exercise-status-" + index
            );

            input.value = record.actual;

            if (record.actual >= record.target) {

                status.textContent = "✓ 已完成";

            } else {

                status.textContent = "尚未完成";

            }
        });
    }
}

completeButton.addEventListener("click", function () {

    const exerciseRecords = [];

    let allCompleted = true;

    todayExercises.forEach(function (exercise, index) {

        const input = document.querySelector(
            "#exercise-" + index
        );

        const actual = Number(input.value);

        const completed =
            input.value !== "" &&
            actual >= exercise.target;

        if (!completed) {
            allCompleted = false;
        }

        exerciseRecords.push({
            name: exercise.name,
            target: exercise.target,
            actual: actual,
            unit: exercise.unit,
            completed: completed
        });

    });

    if (!allCompleted) {

        alert("還有運動尚未完成！");
        return;

    }

    const todayRecord = {

        date: getLocalDate(),

        planDay: currentPlanDay,

        completed: true,

        exercises: exerciseRecords

    };

    localStorage.setItem(
        "exercise-" + getLocalDate(),
        JSON.stringify(todayRecord)
    );

    streakDisplay.textContent =
    "目前連續完成 " + getCurrentStreak() + " 天";

    highestStreakDisplay.textContent =
    "歷史最高連續 " + getHighestStreak() + " 天";

    alert("🎉 今天的運動完成了！");
});


function renderHistory() {

    historyList.innerHTML = "";

    const records = [];

    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);

        if (key.startsWith("exercise-")) {

            const record = JSON.parse(
                localStorage.getItem(key)
            );

            if (
                record.date &&
                record.planDay &&
                record.exercises
            ) {
                records.push(record);
            }
        }
    }

    records.sort(function (a, b) {
        return b.date.localeCompare(a.date);
    });

    records.forEach(function (record) {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
         <h2>${record.date}</h2>
         <p>Day ${record.planDay}</p>
         <p>✓ 已完成</p>
         <p>${record.exercises.length} / ${record.exercises.length} 個項目完成</p>

         <p class="history-toggle">查看詳細紀錄 ▼</p>

         <div class="history-details" style="display: none;"></div>
    `;

    const details = card.querySelector(".history-details");
    const toggle = card.querySelector(".history-toggle");

    record.exercises.forEach(function (exercise) {

        const exerciseDetail = document.createElement("div");

        exerciseDetail.innerHTML = `
            <hr>
            <p><strong>${exercise.name}</strong></p>
            <p>目標：${exercise.target} ${exercise.unit}</p>
            <p>實際：${exercise.actual} ${exercise.unit}</p>
        `;

        details.appendChild(exerciseDetail);
    });

    card.addEventListener("click", function () {

    if (details.style.display === "none") {

        details.style.display = "block";
        toggle.textContent = "收起詳細紀錄 ▲";

    } else {

        details.style.display = "none";
        toggle.textContent = "查看詳細紀錄 ▼";

    }

});

    historyList.appendChild(card);
});
}

function calculateWeeklyRate() {

    const planStartDate = localStorage.getItem("planStartDate");

    if (!planStartDate) {
        return {
            completedDays: 0,
            totalDays: 0,
            percentage: 0
        };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(planStartDate + "T00:00:00");

    const monday = new Date(today);

    const dayOfWeek = today.getDay();

    const daysSinceMonday =
        dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    monday.setDate(
        today.getDate() - daysSinceMonday
    );

    let countStartDate = monday;

    if (startDate > monday) {
        countStartDate = startDate;
    }

    let completedDays = 0;
    let totalDays = 0;

    const date = new Date(countStartDate);

    while (date <= today) {

        totalDays++;

        const year = date.getFullYear();
        const month = String(
            date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            date.getDate()
        ).padStart(2, "0");

        const dateString =
            `${year}-${month}-${day}`;

        const record = localStorage.getItem(
            "exercise-" + dateString
        );

        if (record) {

            const exerciseRecord =
                JSON.parse(record);

            if (exerciseRecord.completed) {
                completedDays++;
            }
        }

        date.setDate(date.getDate() + 1);
    }

    const percentage =
        totalDays === 0
            ? 0
            : Math.round(
                (completedDays / totalDays) * 100
            );

    return {
        completedDays: completedDays,
        totalDays: totalDays,
        percentage: percentage
    };
}

function calculateExerciseTotals() {

    const totals = {};

    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);

        if (key.startsWith("exercise-")) {

            const record = JSON.parse(
                localStorage.getItem(key)
            );

            if (!record.exercises) {
                continue;
            }

            record.exercises.forEach(function (exercise) {

                const totalKey =
                    exercise.name + "-" + exercise.unit;

                if (!totals[totalKey]) {

                    totals[totalKey] = {
                        name: exercise.name,
                        unit: exercise.unit,
                        total: 0
                    };

                }

                totals[totalKey].total += exercise.actual;

            });
        }
    }

    return totals;
}

function renderExerciseTotals() {

    const totals = calculateExerciseTotals();

    exerciseTotals.innerHTML = "";

    const exercises = Object.values(totals);

    if (exercises.length === 0) {
        exerciseTotals.textContent = "目前還沒有運動紀錄";
        return;
    }

    exercises.forEach(function (exercise) {

        const item = document.createElement("p");

        item.textContent =
            exercise.name +
            "：" +
            exercise.total +
            " " +
            exercise.unit;

        exerciseTotals.appendChild(item);

    });
}

saveNicknameButton.addEventListener("click", function () {

    const newNickname =
        settingsNickname.value.trim();

    if (newNickname === "") {
        alert("暱稱不能是空白！");
        return;
    }

    localStorage.setItem(
        "nickname",
        newNickname
    );

    alert("暱稱已更新！");

});

function showMainPage(page, activeButton) {

    todayPage.style.display = "none";
    historyPage.style.display = "none";
    statisticsPage.style.display = "none";
    settingsPage.style.display = "none";

    page.style.display = "block";

    navToday.classList.remove("active");
    navHistory.classList.remove("active");
    navStatistics.classList.remove("active");
    navSettings.classList.remove("active");

    activeButton.classList.add("active");
}

navToday.addEventListener("click", function () {

    showMainPage(todayPage, navToday);

});


navHistory.addEventListener("click", function () {

    showMainPage(historyPage, navHistory);

    renderHistory();

});


navStatistics.addEventListener("click", function () {

    showMainPage(statisticsPage, navStatistics);

    const result = calculateWeeklyRate();

    weeklyRate.textContent =
        result.completedDays +
        " / " +
        result.totalDays +
        " 天（" +
        result.percentage +
        "%）";

    renderExerciseTotals();

});


navSettings.addEventListener("click", function () {

    showMainPage(settingsPage, navSettings);

    settingsNickname.value =
        localStorage.getItem("nickname") || "";
    renderSettingsPlan();

});

function renderSettingsPlan() {

    settingsPlanList.innerHTML = "";

    for (let day = 1; day <= 7; day++) {

        const dayTitle = document.createElement("h3");

        dayTitle.textContent = "Day " + day;

        settingsPlanList.appendChild(dayTitle);


        exercisePlan[day].forEach(function (exercise, index) {

            const item = document.createElement("p");

            item.innerHTML = `
                <label for="settings-day-${day}-exercise-${index}">
                    ${exercise.name}
                </label>

                <input
                    type="number"
                    id="settings-day-${day}-exercise-${index}"
                    value="${exercise.target}"
                    min="1"
                >

                ${exercise.unit}
            `;

            settingsPlanList.appendChild(item);

        });

    }

}
