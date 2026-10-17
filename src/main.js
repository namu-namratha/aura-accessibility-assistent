
import "./style.css";
import { processCommand } from "./js/commands.js";

const app = document.querySelector("#app");

if (!app) {
  throw new Error('Homepage container "#app" was not found.');
}

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="/" aria-label="AURA home">
      <span class="brand-icon" aria-hidden="true">A</span>
      <span>AURA</span>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      <a href="/" aria-current="page">Home</a>
      <a href="/pages/assistant.html">Voice Assistant</a>
      <a href="/pages/accessibility.html">Accessibility</a>
      <a href="/pages/login.html">Login</a>
    </nav>
    <a class="header-cta" href="/pages/register.html">Get Started</a>
  </header>

  <main>
    <section class="hero">
      <div class="hero-content">
        <span class="eyebrow"><span class="status-dot"></span> YOUR ACCESSIBILITY COMPANION</span>
        <h1>Technology that<br><span>listens to you.</span></h1>
        <p class="hero-description">
          Meet AURA, your voice-controlled smart assistant.
          Navigate your digital world, listen to page content,
          and interact more comfortably using your voice.
        </p>
        <div class="hero-actions">
          <button id="startListening" class="primary-button" type="button">
            <span aria-hidden="true">🎙</span> Start Speaking
          </button>
          <a class="secondary-button" href="/pages/assistant.html">
            Explore Assistant <span aria-hidden="true">→</span>
          </a>
        </div>
        <p class="trust-note">Designed for accessibility · Simple · Voice-powered</p>
      </div>

      <div class="assistant-card">
        <div class="card-top">
          <div><span class="small-label">YOUR ASSISTANT</span><h2>AURA is ready</h2></div>
          <span class="online-badge"><span class="status-dot"></span> Online</span>
        </div>
        <div class="orb-area">
          <div class="orb-glow"></div>
          <button id="orbButton" class="assistant-orb" type="button" aria-label="Start voice recognition">
            <span aria-hidden="true">🎙</span>
          </button>
          <p class="orb-caption">YOUR VOICE. YOUR CONTROL.</p>
        </div>
        <p id="voiceStatus" class="voice-status" role="status" aria-live="polite">
          Ready when you are. Select Start Speaking.
        </p>
        <div class="conversation">
          <div class="message-icon user-icon" aria-hidden="true">YOU</div>
          <div class="message-content">
            <span class="small-label">YOU SAID</span>
            <p id="recognizedCommand">Nothing yet</p>
          </div>
        </div>
        <div class="conversation assistant-message">
          <div class="message-icon aura-icon" aria-hidden="true">A</div>
          <div class="message-content">
            <span class="small-label">AURA SAYS</span>
            <p id="assistantResponse">Hello! I'm AURA. How can I help you today?</p>
          </div>
        </div>
        <div class="speech-actions">
          <button id="repeatResponse" class="text-button" type="button">🔊 Repeat response</button>
          <button id="stopSpeaking" class="text-button" type="button">Stop speaking</button>
        </div>
      </div>
    </section>

    <section class="features-section" aria-labelledby="featuresTitle">
      <div class="section-heading">
        <span class="eyebrow">MADE FOR EVERYONE</span>
        <h2 id="featuresTitle">A more accessible digital experience.</h2>
        <p>Useful tools to help you interact with confidence.</p>
      </div>
      <div class="feature-grid">
        <a class="feature-card" href="/pages/assistant.html">
          <span class="feature-icon" aria-hidden="true">🎙</span>
          <h3>Voice Assistant</h3>
          <p>Speak naturally to explore supported commands and get spoken responses.</p>
          <span class="feature-link">Explore assistant →</span>
        </a>
        <a class="feature-card" href="/pages/accessibility.html">
          <span class="feature-icon" aria-hidden="true">♿</span>
          <h3>Accessibility Tools</h3>
          <p>Explore tools designed to make website interaction easier.</p>
          <span class="feature-link">Explore tools →</span>
        </a>
        <a class="feature-card" href="/pages/dashboard.html">
          <span class="feature-icon" aria-hidden="true">▦</span>
          <h3>Your Dashboard</h3>
          <p>Access the AURA dashboard and its available features.</p>
          <span class="feature-link">Open dashboard →</span>
        </a>
      </div>
    </section>

    <section class="commands-section">
      <div>
        <span class="eyebrow">GETTING STARTED</span>
        <h2>Try saying something.</h2>
        <p>Select Start Speaking and try one of these supported commands.</p>
      </div>
      <div class="command-list">
        <button class="command-chip" type="button" data-command="hello aura">“Hello AURA”</button>
        <button class="command-chip" type="button" data-command="what can you do">“What can you do?”</button>
        <button class="command-chip" type="button" data-command="read this page">“Read this page”</button>
        <button class="command-chip" type="button" data-command="open login">“Open login”</button>
        <button class="command-chip" type="button" data-command="open registration">“Open registration”</button>
        <button class="command-chip" type="button" data-command="go to settings">“Go to settings”</button>
        <button class="command-chip" type="button" data-command="help">“Help”</button>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <a class="brand footer-brand" href="/">
      <span class="brand-icon" aria-hidden="true">A</span><span>AURA</span>
    </a>
    <p>Making digital experiences more accessible, one voice at a time.</p>
    <span>© ${new Date().getFullYear()} AURA</span>
  </footer>
`;

const startButton = document.querySelector("#startListening");
const orbButton = document.querySelector("#orbButton");
const statusElement = document.querySelector("#voiceStatus");
const recognizedElement = document.querySelector("#recognizedCommand");
const responseElement = document.querySelector("#assistantResponse");
const repeatButton = document.querySelector("#repeatResponse");
const stopButton = document.querySelector("#stopSpeaking");

let recognition = null;
let isListening = false;
let pendingNavigation = null;
let lastResponse = "Hello! I'm AURA. How can I help you today?";

function getPreferences() {
  try {
    return JSON.parse(localStorage.getItem("auraSettings") || "{}");
  } catch {
    return {};
  }
}

function getAccessibilityPreferences() {
  try {
    return JSON.parse(localStorage.getItem("auraAccessibility") || "{}");
  } catch {
    return {};
  }
}

function enabled(value, fallback = true) {
  if (value === undefined || value === null) return fallback;
  return value === true || value === "true";
}

function canUseVoice() {
  return enabled(getPreferences().voiceEnabled, true);
}

function canSpeak() {
  return enabled(getPreferences().speechEnabled, true) &&
    enabled(getAccessibilityPreferences().speechEnabled, true);
}

function cancelNavigation() {
  if (pendingNavigation !== null) {
    clearTimeout(pendingNavigation);
    pendingNavigation = null;
  }
}

function speakText(message) {
  if (!canSpeak()) {
    statusElement.textContent = "Spoken responses are disabled in your preferences.";
    return;
  }

  if (!("speechSynthesis" in window) ||
      typeof SpeechSynthesisUtterance === "undefined") {
    statusElement.textContent = "Spoken responses are not supported in this browser.";
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(message));
  utterance.lang = "en-IN";
  utterance.rate = 0.95;

  utterance.onstart = () => {
    statusElement.textContent = "AURA is speaking.";
  };

  utterance.onend = () => {
    statusElement.textContent = "Response finished. Ready for your next command.";
  };

  utterance.onerror = () => {
    statusElement.textContent = "Speech playback could not be completed.";
  };

  window.speechSynthesis.speak(utterance);
}

function respond(message, shouldSpeak = true) {
  lastResponse = message;
  responseElement.textContent = message;
  if (shouldSpeak) speakText(message);
}

function navigateAfterResponse(url, message) {
  cancelNavigation();
  respond(message);

  if (!canSpeak() ||
      !("speechSynthesis" in window) ||
      typeof SpeechSynthesisUtterance === "undefined") {
    window.location.href = url;
    return;
  }

  pendingNavigation = setTimeout(() => {
    window.location.href = url;
  }, Math.max(1800, Math.min(4000, message.length * 55)));
}

function stopSpeech() {
  cancelNavigation();
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  statusElement.textContent = "Speech stopped.";
}

function handleAction(action) {
  const destinations = {
    login: ["/pages/login.html", "Opening the login page."],
    register: ["/pages/register.html", "Opening the registration page."],
    dashboard: ["/pages/dashboard.html", "Opening your dashboard."],
    accessibility: ["/pages/accessibility.html", "Opening accessibility tools."],
    settings: ["/pages/settings.html", "Opening settings."],
    home: ["/", "Opening the home page."]
  };

  if (action === "stopSpeaking") {
    stopSpeech();
    return;
  }

  if (action === "stopListening") {
    recognition?.stop();
    respond("Voice recognition stopped.");
    return;
  }

  if (action === "readPage") {
    const pageText = document.querySelector("main")?.innerText || document.body.innerText;
    respond(pageText);
    return;
  }

  const destination = destinations[action];

  if (destination) {
    navigateAfterResponse(destination[0], destination[1]);
  } else {
    respond("That action is not supported yet. Say help for available commands.");
  }
}

function processHomepageCommand(command) {
  recognizedElement.textContent = command;
  const response = processCommand(command);

  if (response && typeof response === "object" && response.action) {
    handleAction(response.action);
    return;
  }

  respond(String(response ?? ""));
}

function resetListeningUI() {
  isListening = false;
  startButton.disabled = false;
  orbButton.disabled = false;

  if (statusElement.textContent.startsWith("Listening")) {
    statusElement.textContent = "Finished listening. Try another command.";
  }
}

function startListening() {
  cancelNavigation();

  if (!canUseVoice()) {
    statusElement.textContent = "Voice commands are disabled in your preferences.";
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    statusElement.textContent = "Voice recognition is unavailable. Try a recent version of Chrome.";
    return;
  }

  if (isListening) {
    recognition?.stop();
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  startButton.disabled = true;
  orbButton.disabled = true;
  statusElement.textContent = "Listening... Please speak now.";

  recognition.onstart = () => {
    isListening = true;
    statusElement.textContent = "Listening... Please speak now.";
  };

  recognition.onresult = (event) => {
    const command = event.results?.[event.resultIndex]?.[0]?.transcript?.trim();

    if (command) {
      console.log("AURA homepage heard:", command);
      processHomepageCommand(command);
    } else {
      statusElement.textContent = "I didn't catch that. Please try again.";
    }
  };

  recognition.onerror = (event) => {
    const messages = {
      "not-allowed": "Microphone access denied. Allow microphone access in your browser.",
      "service-not-allowed": "Microphone access is blocked by browser settings.",
      "no-speech": "No speech detected. Please try again.",
      "audio-capture": "No microphone was detected. Check your microphone connection.",
      network: "Voice recognition needs a working network connection."
    };

    statusElement.textContent =
      messages[event.error] || `Voice recognition error: ${event.error}. Please try again.`;
  };

  recognition.onend = resetListeningUI;

  try {
    recognition.start();
  } catch (error) {
    console.error("AURA speech recognition error:", error);
    resetListeningUI();
    statusElement.textContent = "Could not start voice recognition. Please try again.";
  }
}

startButton.addEventListener("click", startListening);
orbButton.addEventListener("click", startListening);

repeatButton.addEventListener("click", () => {
  if (lastResponse) speakText(lastResponse);
});

stopButton.addEventListener("click", stopSpeech);

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    cancelNavigation();
    processHomepageCommand(button.dataset.command);
  });
});