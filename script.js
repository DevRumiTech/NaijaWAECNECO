// ===== THEME TOGGLE (PERSISTENT) =====
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

function applyTheme(theme) {
  body.classList.remove("light-theme", "dark-theme");
  body.classList.add(theme);
  themeToggle.textContent = theme === "dark-theme" ? "☀️" : "🌙";
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", () => {
  const newTheme = body.classList.contains("dark-theme")
    ? "light-theme"
    : "dark-theme";
  applyTheme(newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light-theme";
applyTheme(savedTheme);


// ===== GRADING SYSTEM =====
const gradePoints = {
  A1: 1,
  B2: 2,
  B3: 3,
  C4: 4,
  C5: 5,
  C6: 6,
  D7: 7,
  E8: 8,
  F9: 9
};

const subjectCountSelect = document.getElementById("subjectCount");
const subjectsBody = document.getElementById("subjectsBody");
const totalPointsEl = document.getElementById("totalPoints");
const averageScoreEl = document.getElementById("averageScore");
const performanceTextEl = document.getElementById("performanceText");
const resetBtn = document.getElementById("resetBtn");

// ===== BUILD SUBJECT ROWS =====
function buildRows(count) {
  subjectsBody.innerHTML = "";
  for (let i = 1; i <= count; i++) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <input 
        type="text" 
        placeholder="Subject ${i}" 
        class="subjectInput"
        />
     </td>

      <td>
        <select class="gradeSelect">
          <option value="">Select</option>
          ${Object.keys(gradePoints).map(
            g => `<option value="${g}">${g}</option>`
          ).join("")}
        </select>
      </td>
    `;

    subjectsBody.appendChild(row);
  }
  calculate();
}

// ===== CALCULATE RESULTS =====
function calculate() {
  const selects = document.querySelectorAll(".gradeSelect");
  let total = 0;
  let count = 0;

  selects.forEach(select => {
    if (select.value) {
      total += gradePoints[select.value];
      count++;
    }
  });

  totalPointsEl.textContent = total;
  averageScoreEl.textContent = count ? (total / count).toFixed(2) + " (lower is better)" : "0";


  if (!count) {
    performanceTextEl.textContent = "";
  } else if (total / count <= 2) {
    performanceTextEl.textContent = "Excellent performance. Very competitive result.";
  } else if (total / count <= 4) {
    performanceTextEl.textContent = "Good performance. Meets most admission requirements.";
  } else if (total / count <= 6) {
    performanceTextEl.textContent = "Average performance. Improvement recommended.";
  } else {
    performanceTextEl.textContent = "Weak performance. Consider re-sitting key subjects.";
  }
}

// ===== EVENTS =====
subjectCountSelect.addEventListener("change", e => {
  buildRows(Number(e.target.value));
});

subjectsBody.addEventListener("change", calculate);

resetBtn.addEventListener("click", () => {
  buildRows(Number(subjectCountSelect.value));
});

// ===== INIT =====
buildRows(Number(subjectCountSelect.value));
