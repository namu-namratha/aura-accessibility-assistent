import "./style.css";

const app = document.querySelector("#app");

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
        <span class="eyebrow">
          <span class="status-dot"></span>
          YOUR ACCESSIBILITY COMPANION
        </span>

        <h1>
          Technology that<br>
          <span>listens to you.</span>
        </h1>

        <p class="hero-description">
          Meet AURA, your voice-controlled smart assistant.
          Navigate your digital world, listen to page content,
          and interact more comfortably using your voice.
        </p>

        <div class="hero-actions">
          <button id="startListening" class="primary-button" type="button">
            <span aria-hidden="true">🎙</span>
            Start Speaking
          </button>

          <a class="secondary-button" href="/pages/assistant.html">
            Explore Assistant <span aria-hidden="true">→</span>
          </a>
        </div>

        <p class="trust-note">
          Designed for accessibility · Simple · Voice-powered
        </p>
      </div>

      <div class="assistant-card">
        <div class="card-top">
          <div>
            <span class="small-label">YOUR ASSISTANT</span>
            <h2>AURA is ready</h2>
          </div>

          <span class="online-badge">
            <span class="status-dot"></span> Online
          </span>
        </div>

        <div class="orb-area">
          <div class="orb-glow"></div>

          <button
            id="orbButton"
            class="assistant-orb"
            type="button"
            aria-label="Start voice recognition"
          >
            <span aria-hidden="true">🎙</span>
          </button>

          <p class="orb-caption">YOUR VOICE. YOUR CONTROL.</p>
        </div>

        <p
          id="voiceStatus"
          class="voice-status"
          role="status"
          aria-live="polite"
        >
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
            <p id="assistantResponse">
              Hello! I'm AURA. How can I help you today?
            </p>
          </div>
        </div>

        <div class="speech-actions">
          <button id="repeatResponse" class="text-button" type="button">
            🔊 Repeat response
          </button>

          <button id="stopSpeaking" class="text-button" type="button">
            Stop speaking
          </button>
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
          <p>
            Speak naturally to explore supported commands and get spoken
            responses.
          </p>
          <span class="feature-link">Explore assistant →</span>
        </a>

        <a class="feature-card" href="/pages/accessibility.html">
          <span class="feature-icon" aria-hidden="true">♿</span>
          <h3>Accessibility Tools</h3>
          <p>
            Explore tools designed to make website interaction easier.
          </p>
          <span class="feature-link">Explore tools →</span>
        </a>

        <a class="feature-card" href="/pages/dashboard.html">
          <span class="feature-icon" aria-hidden="true">▦</span>
          <h3>Your Dashboard</h3>
          <p>
            Access the AURA dashboard and its available features.
          </p>
          <span class="feature-link">Open dashboard →</span>
        </a>
      </div>
    </section>

    <section class="commands-section">
      <div>
        <span class="eyebrow">GETTING STARTED</span>
        <h2>Try saying something.</h2>
        <p>
          Select Start Speaking and try one of these supported commands.
        </p>
      </div>

      <div class="command-list">
        <button class="command-chip" type="button" data-command="hello aura">
          “Hello AURA”
        </button>

        <button
          class="command-chip"
          type="button"
          data-command="what can you do"
        >
          “What can you do?”
        </button>

        <button
          class="command-chip"
          type="button"
          data-command="read this page"
        >
          “Read this page”
        </button>

        <button class="command-chip" type="button" data-command="open login">
          “Open login”
        </button>

        <button
          class="command-chip"
          type="button"
          data-command="open registration"
        >
          “Open registration”
        </button>

        <button class="command-chip" type="button" data-command="help">
          “Help”
        </button>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <a class="brand footer-brand" href="/">
      <span class="brand-icon" aria-hidden="true">A</span>
      <span>AURA</span>
    </a>

    <p>
      Making digital experiences more accessible, one voice at a time.
    </p>

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

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let lastResponse = "Hello! I'm AURA. How can I help you today?";

function speakText(message) {
  if (
    !("speechSynthesis" in window) ||
    typeof SpeechSynthesisUtterance === "undefined"
  ) {
    statusElement.textContent =
      "Spoken responses are not supported in this browser.";
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "en-IN";
  utterance.rate = 0.95;

  utterance.onstart = () => {
    statusElement.textContent = "AURA is speaking.";
  };

  utterance.onend = () => {
    statusElement.textContent =
      "Response finished. Ready for your next command.";
  };

  utterance.onerror = () => {
    statusElement.textContent =
      "Speech playback could not be completed.";
  };

  window.speechSynthesis.speak(utterance);
}

function respond(message, shouldSpeak = true) {
  lastResponse = message;
  responseElement.textContent = message;

  if (shouldSpeak) {
    speakText(message);
  }
}

function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  statusElement.textContent = "Speech stopped.";
}

function processCommand(command) {
  const text = command.toLowerCase().trim();

  recognizedElement.textContent = command;

  if (/\b(hello|hi|hey)\b/.test(text)) {
    respond(
      "Hello! I'm AURA, your accessibility assistant. I'm ready to help you."
    );
  } else if (
    text.includes("how are you") ||
    text.includes("what are you doing")
  ) {
    respond(
      "I'm doing well and I'm ready to help you navigate this website."
    );
  } else if (
    text.includes("what can you do") ||
    text.includes("help me") ||
    text === "help"
  ) {
    respond(
      'You can say "read this page", "open login", "open registration", "open dashboard", "open accessibility", "open assistant", or "open settings".'
    );
  } else if (
    text.includes("read page") ||
    text.includes("read this page") ||
    text.includes("read the page")
  ) {
    const pageText =
      document.querySelector("main")?.innerText || document.body.innerText;

    lastResponse = "Reading the page content now.";
    responseElement.textContent = lastResponse;
    speakText(pageText);
  } else if (
    text.includes("stop speaking") ||
    text.includes("stop reading") ||
    text === "stop"
  ) {
    stopSpeech();
  } else if (text.includes("open login") || text === "login") {
    respond("Opening the login page.");
    window.location.href = "/pages/login.html";
  } else if (
    text.includes("open registration") ||
    text.includes("open register") ||
    text.includes("sign up") ||
    text === "register"
  ) {
    respond("Opening the registration page.");
    window.location.href = "/pages/register.html";
  } else if (
    text.includes("open accessibility") ||
    text.includes("accessibility tools")
  ) {
    respond("Opening accessibility tools.");
    window.location.href = "/pages/accessibility.html";
  } else if (text.includes("open assistant")) {
    respond("Opening the voice assistant.");
    window.location.href = "/pages/assistant.html";
  } else if (
    text.includes("open dashboard") ||
    text.includes("show dashboard")
  ) {
    respond("Opening your dashboard.");
    window.location.href = "/pages/dashboard.html";
  } else if (text.includes("open settings")) {
    respond("Opening settings.");
    window.location.href = "/pages/settings.html";
  } else if (
    text.includes("go home") ||
    text.includes("open home") ||
    text.includes("home page")
  ) {
    respond("Taking you to the home page.");
    window.location.href = "/";
  } else {
    respond(
      `I heard "${command}". Please say "help" to hear the supported commands.`
    );
  }
}

function startListening() {
  if (!SpeechRecognition) {
    statusElement.textContent =
      "Voice recognition is unavailable. Use an updated version of Chrome and check microphone permissions.";
    return;
  }

  if (recognition) {
    try {
      recognition.abort();
    } catch {
      // Continue by creating a new recognition session.
    }
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  startButton.disabled = true;
  orbButton.disabled = true;
  statusElement.textContent = "Listening... Please speak now.";

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    processCommand(command);
  };

  recognition.onerror = (event) => {
    const messages = {
      "not-allowed":
        "Microphone access denied. Allow microphone access in your browser.",
      "no-speech": "No speech detected. Please try again.",
      "audio-capture":
        "No microphone was detected. Check your microphone connection.",
      network:
        "Voice recognition needs a working network connection."
    };

    statusElement.textContent =
      messages[event.error] ||
      `Voice recognition error: ${event.error}. Please try again.`;
  };

  recognition.onend = () => {
    startButton.disabled = false;
    orbButton.disabled = false;

    if (statusElement.textContent.startsWith("Listening")) {
      statusElement.textContent = "Finished listening. Try another command.";
    }
  };

  try {
    recognition.start();
  } catch (error) {
    startButton.disabled = false;
    orbButton.disabled = false;

    statusElement.textContent =
      "Could not start voice recognition. Please try again.";

    console.error("AURA speech recognition error:", error);
  }
}

startButton.addEventListener("click", startListening);
orbButton.addEventListener("click", startListening);

repeatButton.addEventListener("click", () => {
  if (lastResponse) {
    speakText(lastResponse);
  } else {
    statusElement.textContent = "There is no response to repeat yet.";
  }
});

stopButton.addEventListener("click", stopSpeech);

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    processCommand(button.dataset.command);
  });
});