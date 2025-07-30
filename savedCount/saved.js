const container = document.getElementById("historyContainer");
const sessions = JSON.parse(localStorage.getItem("sessions")) || [];

if (sessions.length === 0) {
    container.innerHTML = '<p class="no-data">No saved sessions found.</p>';
} else {
    sessions.forEach((data) => {
        const id = data.id;
        const count = data.count;
        const goal = data.goal;
        const day = data.day;
        const date = data.date;
        const time = data.time;

        const card = document.createElement("div");
        card.className = "session-card";
        card.setAttribute("id", id);
        card.innerHTML = `
                        <div class="session-count">${count}</div>
                        <div class="goal-container">
                            <div class="session-goal">Goal achieved: &nbsp; ${count} / ${goal}</div>
                            <button class="delete-btn" title="Delete">🗑️</button>
                        </div>
                        <div class="session-meta">
                            <span class="session-day">⌛ ${day}</span>
                            <span class="session-date">📅 ${date}</span>
                            <span class="session-time">🕐 ${time}</span>
                        </div>
                `;
        container.appendChild(card);

        // add listener on delete btn
        const deleteBtn = card.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            const allSessions = JSON.parse(localStorage.getItem("sessions")) || [];

            // Filter out the one with matching id
            const updatedSessions = allSessions.filter((s) => s.id !== id);

            // Save updated array
            localStorage.setItem("sessions", JSON.stringify(updatedSessions));

            // Remove the card from DOM
            card.remove();

            // Optional: show message if no sessions left
            if (updatedSessions.length === 0) {
                container.innerHTML = '<p class="no-data">No saved sessions found.</p>';
            }
        });
    });
}
