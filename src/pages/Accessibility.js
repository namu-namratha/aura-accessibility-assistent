
import "../style.css";

const app = document.getElementById("accessibility-app");

if (!app) {
  throw new Error('Accessibility container "#accessibility-app" was not found.');
}

const SETTINGS_KEY = "auraAccessibility";

function readSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
  } catch {
    return {};
  }
}

const saved = readSettings();


app.innerHTML = `
  <div class="dashboard-page accessibility-dashboard">
    <aside class="dashboard-sidebar">
      <a class="dashboard-brand" href="/" aria-label="AURA home">
        <span class="dashboard-brand-icon">A</span>
        <span>AURA</span>
      </a>

      <nav class="dashboard-nav" aria-label="Main navigation">
        <a href="/pages/dashboard.html">
          <span>⌂</span> Dashboard
        </a>
        <a href="/pages/assistant.html">
          <span>◉</span> Voice Assistant
        </a>
        <a href="/pages/accessibility.html" class="active" aria-current="page">
          <span>♿</span> Accessibility
        </a>
        <a href="/pages/dashboard.html#activity">
          <span>◷</span> Activity
        </a>
        <a href="/pages/settings.html">
          <span>⚙</span> Settings
        </a>
      </nav>

      <div class="dashboard-sidebar-bottom">
        <a href="/pages/login.html">↪ Log in</a>
      </div>
    </aside>

    <main class="dashboard-main accessibility-main">
      <header class="dashboard-topbar">
        <div>
          <p class="eyebrow">AURA ACCESSIBILITY CENTER</p>
          <h1>Make AURA work for you</h1>
          <p>Adjust these preferences to make the website easier to use.</p>
        </div>
      </header>

      <div class="accessibility-content">
        <section class="feature-card">
          <h2>Voice and speech</h2>
          <p>Choose how AURA listens and responds.</p>

          <label><input id="accessVoice" type="checkbox" checked> Enable voice commands</label>
          <label><input id="accessSpeech" type="checkbox" checked> Enable spoken responses</label>
          <label><input id="showCommands" type="checkbox" checked> Show suggested commands</label>

          <div class="accessibility-actions">
            <button id="testVoice" class="primary-button" type="button">Test microphone</button>
            <button id="testSpeech" class="secondary-button" type="button">Test speech</button>
            <button id="quickReadPage" class="secondary-button" type="button">Read this page</button>
          </div>
        </section>

        <section class="feature-card">
          <h2>Visual accessibility</h2>
          <p>Make the interface easier to see and navigate.</p>

          <label><input id="accessContrast" type="checkbox"> High contrast</label>
          <label><input id="accessLargeText" type="checkbox"> Large text</label>
          <label><input id="accessReducedMotion" type="checkbox"> Reduce motion</label>
          <label><input id="keyboardNavigation" type="checkbox"> Enhanced keyboard navigation</label>
          <label><input id="focusIndicators" type="checkbox"> Strong focus indicators</label>

          <div class="accessibility-actions">
            <button id="quickContrast" class="secondary-button" type="button">Toggle contrast</button>
            <button id="quickLargeText" class="secondary-button" type="button">Toggle large text</button>
          </div>
        </section>

        <section class="feature-card accessibility-save-card">
          <div>
            <h2>Save your preferences</h2>
            <p>Your choices will be stored in this browser.</p>
          </div>
          <button id="saveAccessibility" class="primary-button" type="button">
            Save settings
          </button>
          <p id="saveMessage" role="status" aria-live="polite"></p>
        </section>
      </div>
    </main>
  </div>
`;


const ids = [
  "accessVoice",
  "accessSpeech",
  "showCommands",
  "accessContrast",
  "accessLargeText",
  "accessReducedMotion",
  "keyboardNavigation",
  "focusIndicators"
];

const controls = Object.fromEntries(
  ids.map(id => [id, document.getElementById(id)])
);

ids.forEach(id => {
  if (typeof saved[id] === "boolean") {
    controls[id].checked = saved[id];
  }
});

function applySettings() {
  document.body.classList.toggle(
    "accessibility-high-contrast",
    controls.accessContrast.checked
  );
  document.body.classList.toggle(
    "accessibility-large-text",
    controls.accessLargeText.checked
  );
  document.body.classList.toggle(
    "accessibility-reduced-motion",
    controls.accessReducedMotion.checked
  );
  document.body.classList.toggle(
    "keyboard-navigation-enabled",
    controls.keyboardNavigation.checked
  );
  document.body.classList.toggle(
    "focus-indicators-enabled",
    controls.focusIndicators.checked
  );
}

function saveSettings(button) {
  const settings = Object.fromEntries(
    ids.map(id => [id, controls[id].checked])
  );

  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    applySettings();

    const message = document.getElementById("saveMessage");
    message.textContent = "✓ Your accessibility settings have been saved.";

    const original = button.textContent;
    button.textContent = "✓ Saved";
    setTimeout(() => {
      button.textContent = original;
    }, 1800);
  } catch (error) {
    console.error("Unable to save accessibility settings:", error);
    document.getElementById("saveMessage").textContent =
      "Unable to save settings in this browser.";
  }
}

document.getElementById("saveAccessibility").addEventListener(
  "click", event => saveSettings(event.currentTarget)
);

[
  "accessContrast",
  "accessLargeText",
  "accessReducedMotion",
  "keyboardNavigation",
  "focusIndicators"
].forEach(id => {
  controls[id].addEventListener("change", applySettings);
});

document.getElementById("quickContrast").addEventListener("click", () => {
  controls.accessContrast.checked = !controls.accessContrast.checked;
  applySettings();
  saveSettings(document.getElementById("quickContrast"));
});

document.getElementById("quickLargeText").addEventListener("click", () => {
  controls.accessLargeText.checked = !controls.accessLargeText.checked;
  applySettings();
  saveSettings(document.getElementById("quickLargeText"));
});

document.getElementById("testSpeech").addEventListener("click", () => {
  if (!controls.accessSpeech.checked) {
    alert("Enable spoken responses first.");
    return;
  }

  if (!("speechSynthesis" in window)) {
    alert("Speech synthesis is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(
    new SpeechSynthesisUtterance(
      "Hello. This is AURA. Your speech accessibility feature is working."
    )
  );
});

document.getElementById("quickReadPage").addEventListener("click", () => {
  if (!controls.accessSpeech.checked) {
    alert("Enable spoken responses first.");
    return;
  }

  const text = document.querySelector("main")?.innerText || "";
  if (text && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  }
});

document.getElementById("testVoice").addEventListener("click", async event => {
  const button = event.currentTarget;

  if (!navigator.mediaDevices?.getUserMedia) {
    alert("Microphone access is not available in this browser.");
    return;
  }

  button.disabled = true;
  button.textContent = "Checking microphone…";

  let stream;

  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    alert("Microphone access is working.");
  } catch (error) {
    console.error("Microphone test failed:", error);
    alert("Microphone access failed. Check your browser permissions.");
  } finally {
    stream?.getTracks().forEach(track => track.stop());
    button.disabled = false;
    button.textContent = "Test microphone";
  }
});

applySettings();