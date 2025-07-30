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

