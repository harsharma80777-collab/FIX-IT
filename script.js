const playbooks = {
  startup: {
    title: "Slow Startup",
    understand:
      "Slow boot times are usually caused by high-impact startup apps, pending Windows updates, or a nearly full system drive.",
    checks: [
      "Open Task Manager (Ctrl+Shift+Esc) → Startup apps → disable 'High' impact non-essential apps.",
      "Check C: drive free space (keep at least 15–20% free for SSD performance).",
      "Run 'sfc /scannow' in an elevated Command Prompt to rule out corrupted system files."
    ],
    verify: "Restart your PC and check 'Last BIOS time' in Task Manager → Startup apps."
  },
  cpu: {
    title: "High CPU / Fan Noise",
    understand:
      "Sustained fan noise and high CPU load at idle often point to runaway background services, Windows Search indexing, or thermal throttling.",
    checks: [
      "Sort Task Manager → Processes by CPU% to isolate the top process.",
      "Check Windows Update status to ensure updates aren't installing in the background.",
      "Verify Power Mode (Settings → System → Power) isn't locked to Best Performance while idle."
    ],
    verify: "Confirm idle CPU usage drops below 10% and fan speed settles after 2 minutes."
  },
  wifi: {
    title: "Wi-Fi Drops",
    understand:
      "Intermittent Wi-Fi drops on Windows typically stem from power-saving adapter settings, stale DNS cache, or outdated wireless drivers.",
    checks: [
      "Run 'ipconfig /flushdns' and 'netsh winsock reset' in Command Prompt.",
      "Open Device Manager → Network Adapters → Wi-Fi Properties → uncheck 'Allow the computer to turn off this device to save power'.",
      "Check Event Viewer (System logs) for Netwtw or WLAN-AutoConfig warnings."
    ],
    verify: "Run 'ping 8.8.8.8 -n 20' in Command Prompt and confirm 0% packet loss."
  },
  bsod: {
    title: "BSOD / System Crash",
    understand:
      "Blue Screens usually point to a faulty kernel-mode driver, unstable RAM/overclock, or a recent Windows update conflict.",
    checks: [
      "Note the Stop Code (e.g., VIDEO_TDR_FAILURE or MEMORY_MANAGEMENT) and check C:\\Windows\\Minidump.",
      "Open Event Viewer → Windows Logs → System and filter for Critical 'Kernel-Power' or 'BugCheck' events.",
      "Roll back or clean-install any GPU/chipset driver updated right before the crashes began."
    ],
    verify: "Run the system under normal workload for 24–48 hours with zero BugCheck entries in Event Viewer."
  },
  disk: {
    title: "100% Disk Usage",
    understand:
      "Constant 100% disk activity slows the entire OS and is often caused by SysMain, Windows Search indexing, or a failing drive.",
    checks: [
      "Open Resource Monitor → Disk tab to see which process is reading/writing the most.",
      "Check drive health using 'wmic diskdrive get status' or CrystalDiskInfo.",
      "Pause Windows Update or antivirus full scans temporarily to confirm if they are the bottleneck."
    ],
    verify: "Confirm Disk active time in Task Manager stays below 15% at idle."
  }
};

// DOM references
const searchInput = document.getElementById("searchInput");
const symptomTabs = document.getElementById("symptomTabs");
const understandText = document.getElementById("understandText");
const checkList = document.getElementById("checkList");
const progressText = document.getElementById("progressText");
const verifyText = document.getElementById("verifyText");
const noteInput = document.getElementById("noteInput");
const verifyBtn = document.getElementById("verifyBtn");
const verifyResult = document.getElementById("verifyResult");
const historyList = document.getElementById("historyList");
const exportBtn = document.getElementById("exportBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const STORAGE_KEY = "fixit_diagnostic_logs";
let currentIssue = "startup";

// Render tabs dynamically based on search filter
function renderTabs(filter = "") {
  symptomTabs.innerHTML = "";
  const query = filter.trim().toLowerCase();

  const keys = Object.keys(playbooks).filter((key) => {
    const item = playbooks[key];
    return (
      key.includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.understand.toLowerCase().includes(query)
    );
  });

  if (keys.length === 0) {
    symptomTabs.innerHTML = `<span class="muted">No matching playbooks found.</span>`;
    return;
  }

  keys.forEach((key) => {
    const btn = document.createElement("button");
    btn.className = `tab ${key === currentIssue ? "active" : ""}`;
    btn.textContent = playbooks[key].title;
    btn.addEventListener("click", () => loadPlaybook(key));
    symptomTabs.appendChild(btn);
  });
}

function loadPlaybook(issueKey) {
  currentIssue = issueKey;
  const data = playbooks[issueKey];

  renderTabs(searchInput.value);
  understandText.textContent = data.understand;
  verifyText.textContent = data.verify;
  noteInput.value = "";
  verifyResult.classList.add("hidden");
  verifyBtn.disabled = true;

  checkList.innerHTML = "";
  data.checks.forEach((step, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `check-${index}`;
    checkbox.addEventListener("change", updateProgress);

    const label = document.createElement("label");
    label.htmlFor = `check-${index}`;
    label.textContent = step;

    li.append(checkbox, label);
    checkList.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const boxes = checkList.querySelectorAll('input[type="checkbox"]');
  const checked = Array.from(boxes).filter((box) => box.checked).length;

  progressText.textContent = `(${checked}/${boxes.length} done)`;
  verifyBtn.disabled = checked !== boxes.length;

  if (checked !== boxes.length) {
    verifyResult.classList.add("hidden");
  }
}

// LocalStorage History Functions
function getLogs() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveLog(entry) {
  const logs = getLogs();
  logs.unshift(entry); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  renderHistory();
}

function renderHistory() {
  const logs = getLogs();
  historyList.innerHTML = "";

  if (logs.length === 0) {
    historyList.innerHTML = `<li class="muted">No verified diagnostics yet. Complete a playbook above to log it.</li>`;
    return;
  }

  logs.forEach((log) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML = `
      <div class="history-meta">
        <span>${log.title}</span>
        <span>${log.timestamp}</span>
      </div>
      <div class="history-note">${log.note || "All diagnostic checks completed and verified."}</div>
    `;
    historyList.appendChild(li);
  });
}

// Event Listeners
searchInput.addEventListener("input", (e) => renderTabs(e.target.value));

verifyBtn.addEventListener("click", () => {
  const timestamp = new Date().toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short"
  });
  const title = playbooks[currentIssue].title;
  const note = noteInput.value.trim();

  saveLog({ title, timestamp, note });

  verifyResult.textContent = `Verified & saved to log at ${timestamp}.`;
  verifyResult.classList.remove("hidden");
  noteInput.value = "";
});

exportBtn.addEventListener("click", () => {
  const logs = getLogs();
  if (logs.length === 0) return alert("No logs to export yet.");

  const content = logs
    .map((l) => `[${l.timestamp}] ${l.title}\nNote: ${l.note || "Verified"}\n`)
    .join("\n---\n");

  const blob = new Blob([`FixIt Diagnostic Report\n=======================\n\n${content}`], {
    type: "text/plain"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fixit-diagnostic-report.txt";
  a.click();
  URL.revokeObjectURL(url);
});

clearHistoryBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
});

// Initialize
loadPlaybook(currentIssue);
renderHistory();