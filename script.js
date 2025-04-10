const teams = [
  "India", "Australia", "England", "Pakistan", "New Zealand",
  "South Africa", "Sri Lanka", "Bangladesh", "Afghanistan", "Netherlands"
];

let selectedTeam = "";
let customizedPlayers = [];

function goToTeamSelection() {
  toggleScreen("team-selection");
  const teamSelect = document.getElementById("team-select");
  teamSelect.innerHTML = "";
  teams.forEach(team => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    teamSelect.appendChild(option);
  });
}

function customizeTeam() {
  selectedTeam = document.getElementById("team-select").value;
  toggleScreen("customize-team");
  const form = document.getElementById("team-form");
  form.innerHTML = "";
  for (let i = 1; i <= 11; i++) {
    form.innerHTML += `
      <label>Player ${i}:</label>
      <input type="text" placeholder="Name" id="name${i}" required />
      <select id="hand${i}">
        <option value="RHB">RHB</option>
        <option value="LHB">LHB</option>
      </select>
      <input type="number" placeholder="Number" id="num${i}" required />
    `;
  }
}

function startSimulation() {
  customizedPlayers = [];
  for (let i = 1; i <= 11; i++) {
    const name = document.getElementById(`name${i}`).value || `Player ${i}`;
    const hand = document.getElementById(`hand${i}`).value;
    const number = document.getElementById(`num${i}`).value || i;
    customizedPlayers.push({ name, hand, number });
  }
  toggleScreen("match-screen");
  document.getElementById("match-title").textContent = `Simulating match for ${selectedTeam}`;
}

function simulateMatch(type) {
  const overs = type === "ODI" ? 50 : type === "T20" ? 20 : 90;
  let totalRuns = 0;
  let balls = overs * 6;
  for (let i = 0; i < balls; i++) {
    let runChance = Math.random();
    if (type === "TEST") {
      totalRuns += runChance < 0.3 ? 0 : runChance < 0.7 ? 1 : runChance < 0.9 ? 2 : 4;
    } else {
      totalRuns += runChance < 0.25 ? 0 : runChance < 0.6 ? 1 : runChance < 0.8 ? 2 : runChance < 0.95 ? 4 : 6;
    }
  }
  document.getElementById("match-result").textContent = `${type} Score: ${selectedTeam} scored ${totalRuns} runs in ${overs} overs.`;
}

function resetApp() {
  selectedTeam = "";
  customizedPlayers = [];
  document.getElementById("team-form").innerHTML = "";
  document.getElementById("match-result").textContent = "";
  toggleScreen("home");
}

function goHome() {
  toggleScreen("home");
}

function toggleScreen(screenId) {
  document.querySelectorAll(".screen").forEach(div => div.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// Initialize home screen
toggleScreen("home");
