const mantraText = document.querySelector(".mantra-text");

// tap circle
const counterCircle = document.querySelector(".counter-circle");
const tapCount = document.querySelector(".count");

// progress
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");

// goal popup
const goalContainer = document.querySelector(".goalContainer");
const goalInput = document.querySelector("#goalInput");
const goalOkBtn = document.querySelector("#goalOkBtn");
const goalCancelBtn = document.querySelector("#goalCancelBtn");

// audio
const audio = document.querySelector("audio");

// setting popup
const settingContainer = document.querySelector(".settingContainer");

// nav btn
const bottomNav = document.querySelector(".bottom-nav");
const resetBtn = document.querySelector("#resetBtn");
const saveBtn = document.querySelector("#saveBtn");
const setGoalBtn = document.querySelector("#setGoalBtn");
const toggleSoundBtn = document.querySelector("#toggleSoundBtn");
const settingBtn = document.querySelector("#settingBtn");

// tap area
const tapArea = document.querySelector(".tapArea");

// custom themes
const themes = {
    tomato: {
        "--tomato": "rgb(255, 99, 71)",
        "--tomatoLight": "rgb(255, 108, 82)",
        "--tomatoLighter": "rgb(255, 120, 106)",
        "--tomatoLightest": "rgba(255, 119, 95, 0.267)"
    },
    purple: {
        "--tomato": "#c9b6ff",
        "--tomatoLight": "#c9b6ff",
        "--tomatoLighter": "#c9b6ff",
        "--tomatoLightest": "rgba(201, 182, 255, 0.25)"
    }
};

// apply saved theme in local storage
const savedTheme = localStorage.getItem("activeTheme");

if (savedTheme && themes[savedTheme]) {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(themes[savedTheme])) {
        root.style.setProperty(key, value);
    }
}

// global variable
let count = 0;
let goal = 108; // default goal

// handle tap
tapArea.addEventListener("click", () => {
    if (count > goal) return;

    count++;

    tapCount.textContent = count;
    progressBar.value = count;
    progressText.textContent = `${count} / ${goal}`;

    if (count === goal) {
        audio.play();
        count++;
        return;
    }

    // Create ripple
    const ripple = document.createElement("span");
    ripple.classList.add("ripple-effect");

    // Append to counter circle
    counterCircle.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 1000);

    if (toggleSoundBtn.firstElementChild.classList.contains("fa-bell")) {
        if ("vibrate" in navigator) {
            navigator.vibrate(40); // short vibration for feedback
        }
    }

    // counterCircle.classList.remove(".ripple-effect");
});

// handle navbar
bottomNav.addEventListener("click", (e) => {
    if (e.target.closest("#resetBtn")) {
        reset();
    }
    if (e.target.closest("#saveBtn")) {
        save();
    }
    if (e.target.closest("#setGoalBtn")) {
        goalContainer.hidden = !goalContainer.hidden;
    }
    if (e.target.closest("#toggleSoundBtn")) {
        if (toggleSoundBtn.firstElementChild.classList.contains("fa-bell")) {
            toggleSoundBtn.firstElementChild.classList.replace(
                "fa-bell",
                "fa-bell-slash"
            );
        } else {
            toggleSoundBtn.firstElementChild.classList.replace(
                "fa-bell-slash",
                "fa-bell"
            );
        }

        console.log("sound");
    }
    if (e.target.closest("#settingBtn")) {
        settingContainer.hidden = !settingContainer.hidden;
        console.log("setting");
    }
});

// handle goal container popup
goalContainer.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.classList.contains("goalOkBtn")) {
        const input = parseInt(goalInput.value.trim());
        if (!isNaN(input)) {
            goal = input;
            progressText.textContent = `0 / ${goal}`;
            progressBar.setAttribute("max", `${goal}`);
        }
        reset();
        goalContainer.hidden = true;
    }
    if (e.target.classList.contains("goalCancelBtn")) {
        goalContainer.hidden = !goalContainer.hidden;
    }
    // console.log(e.target.classList.contains());
});

// handle reset
function reset() {
    count = 0;
    tapCount.textContent = "0";
    progressBar.value = 0;
    progressText.textContent = `0 / ${goal}`;
}

// handle save count
function save() {
    const d = new Date();
    const data = {
        id: Date.now(),
        count: count,
        goal: goal,
        day: d.toLocaleDateString("en-US", { weekday: "long" }),
        date: d.toLocaleDateString(),
        time: d.toLocaleTimeString(),
    };

    const existing = JSON.parse(localStorage.getItem("sessions")) || [];

    // Check if the same session already exists
    const alreadyExists = existing.some((session) => {
        return session.count === data.count && session.goal === data.goal;

        /* session.count === data.count &&
        session.goal === data.goal &&
        session.date === data.date &&
        session.time === data.time */
    });

    if (!alreadyExists) {
        existing.push(data);
        localStorage.setItem("sessions", JSON.stringify(existing));
        console.log("Saved:", data);
    } else {
        console.log("Duplicate session — not saved.");
    }
}

// close popup
document.addEventListener("click", (e) => {
    const isOutsideGoal =
        !goalContainer.contains(e.target) && !e.target.closest("#setGoalBtn");
    const isOutsideSetting =
        !settingContainer.contains(e.target) &&
        !e.target.closest("#settingBtn");

    if (isOutsideGoal) goalContainer.hidden = true;
    if (isOutsideSetting) settingContainer.hidden = true;
});

// apply theme on selecting from setting
const themeItems = document.querySelectorAll(".theme"); //selected all theme -> return nodelist
console.log(themeItems);

themeItems.forEach((item) => {
    item.addEventListener("click", () => {
        const selected = item.dataset.theme;
        console.log(selected);
        const selectedTheme = themes[selected];
        console.log(selectedTheme);

        if (selectedTheme) {
            const root = document.documentElement;
            for (const [key, value] of Object.entries(selectedTheme)) {
                root.style.setProperty(key, value);
            }

            // save selected theme
            localStorage.setItem("activeTheme", selected);
        }
    });
});
