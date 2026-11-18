
// Load events from Local Storage
let events = JSON.parse(localStorage.getItem("collegeEvents")) || [
    {
        id: 1,
        name: "Code Hackathon",
        type: "Technical",
        date: "2026-12-10",
        venue: "Computer Lab",
        description: "A coding competition for innovative ideas.",
        registrations: []
    },
    {
        id: 2,
        name: "Annual Cultural Fest",
        type: "Cultural",
        date: "2026-12-15",
        venue: "College Auditorium",
        description: "Music, dance and cultural performances.",
        registrations: []
    },
    {
        id: 3,
        name: "Project Expo",
        type: "Technical",
        date: "2026-12-20",
        venue: "Seminar Hall",
        description: "Showcase your innovative student projects.",
        registrations: []
    }
];

// Save events
function saveEvents() {
    localStorage.setItem("collegeEvents", JSON.stringify(events));
}

// Prevent HTML injection when displaying user input
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// Display events
function displayEvents() {
    const eventList = document.getElementById("eventList");
    eventList.innerHTML = "";

    if (events.length === 0) {
        eventList.innerHTML = "<p>No events available.</p>";
        return;
    }

    events.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <h3>${escapeHTML(event.name)}</h3>
            <p><strong>Category:</strong> ${escapeHTML(event.type)}</p>
            <p><strong>Date:</strong> ${escapeHTML(event.date)}</p>
            <p><strong>Venue:</strong> ${escapeHTML(event.venue)}</p>
            <p>${escapeHTML(event.description)}</p>
            <p><strong>Registrations:</strong> ${event.registrations.length}</p>

            <button onclick="registerEvent(${event.id})">
                Register
            </button>

            <button class="delete-btn"
                onclick="deleteEvent(${event.id})">
                Delete
            </button>
        `;

        eventList.appendChild(card);
    });
}

// Add new event
document.getElementById("eventForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const newEvent = {
        id: Date.now(),
        name: document.getElementById("eventName").value.trim(),
        type: document.getElementById("eventType").value.trim(),
        date: document.getElementById("eventDate").value,
        venue: document.getElementById("eventVenue").value.trim(),
        description: document.getElementById("eventDescription").value.trim(),
        registrations: []
    };

    events.push(newEvent);

    saveEvents();
    displayEvents();

    this.reset();

    alert("Event added successfully!");
});

// Register for an event
function registerEvent(id) {
    const event = events.find(e => e.id === id);

    if (!event) return;

    const studentName = prompt("Enter your name to register:");

    if (!studentName || !studentName.trim()) {
        alert("Please enter a valid name.");
        return;
    }

    const name = studentName.trim();

    const alreadyRegistered = event.registrations.some(
        student => student.toLowerCase() === name.toLowerCase()
    );

    if (alreadyRegistered) {
        alert("You are already registered for this event!");
        return;
    }

    event.registrations.push(name);

    saveEvents();
    displayEvents();

    alert("Registration successful for " + event.name);
}

// Delete an event
function deleteEvent(id) {
    const confirmDelete = confirm("Are you sure you want to delete this event?");

    if (confirmDelete) {
        events = events.filter(event => event.id !== id);

        saveEvents();
        displayEvents();

        alert("Event deleted successfully!");
    }
}

// Initial display
displayEvents();
