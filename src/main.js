import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <main class="aura-voice-assistant" id="auraAssistant">
    <div class="assistant-orb" aria-hidden="true">🎙️</div>

    <h1>How can I help?</h1>
    <p>Click the microphone and speak naturally.</p>

    <button id="startListening" type="button">
      🎙️ Start Listening
    </button>

    <p id="voiceStatus" role="status" aria-live="polite">
      Ready. Click Start Listening.
    </p>

    <section class="voice-result">
      <h2>YOU SAID</h2>
      <p id="recognizedCommand">Nothing yet</p>
    </section>

    <section class="voice-result">
      <h2>AURA</h2>
      <p id="assistantResponse">
        Hello! I'm AURA, your accessibility assistant.
      </p>
      <button id="repeatResponse" type="button">
        🔊 Repeat response
      </button>
      <button id="stopSpeaking" type="button">
        ⏹ Stop speaking
      </button>
    </section>
  </main>
`;

const startButton = document.querySelector('#startListening');
const statusElement = document.querySelector('#voiceStatus');
const recognizedElement = document.querySelector('#recognizedCommand');
const responseElement = document.querySelector('#assistantResponse');

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let lastResponse = "Hello! I'm AURA, your accessibility assistant.";

function speakText(message) {
  if (!('speechSynthesis' in window)) {
    statusElement.textContent = 'Speech output is not supported.';
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = 'en-IN';
  speech.rate = 0.95;
  window.speechSynthesis.speak(speech);
}

function respond(message, shouldSpeak = true) {
  lastResponse = message;
  responseElement.textContent = message;

  if (shouldSpeak) {
    speakText(message);
  }
}

function processCommand(command) {
  const text = command.toLowerCase().trim();

  recognizedElement.textContent = command;

  if (
    /\b(hello|hi|hey)\b/.test(text) ||
    text.includes('how are you') ||
    text.includes('what are you doing')
  ) {
    respond(
      "Hello! I'm AURA, your accessibility assistant. I'm ready to help you navigate the website."
    );
  } else if (
    text.includes('what can you do') ||
    text.includes('help me') ||
    text === 'help'
  ) {
    respond(
      'I can read page content aloud, explain my features, open the login or registration page, and help you navigate this website.'
    );
  } else if (
    text.includes('read page') ||
    text.includes('read this page') ||
    text.includes('read the page')
  ) {
    const pageText = document.querySelector('main')?.innerText
      || document.body.innerText;

    respond('Reading the page content now.');
    speakText(pageText);
  } else if (
    text.includes('open login') ||
    text.includes('login page')
  ) {
    respond('Opening the login page.');
    window.location.href = '/login.html';
  } else if (
    text.includes('open registration') ||
    text.includes('open register') ||
    text.includes('sign up') ||
    text.includes('register')
  ) {
    respond('Opening the registration page.');
    window.location.href = '/register.html';
  } else if (
    text.includes('stop speaking') ||
    text.includes('stop reading')
  ) {
    window.speechSynthesis.cancel();
    respond('Speech stopped.', false);
  } else if (
    text.includes('go home') ||
    text.includes('open home')
  ) {
    respond('Taking you to the home page.');
    window.location.href = '/';
  } else {
    respond(
      `I heard "${command}". Please try saying hello, what can you do, read page, open login, or open registration.`
    );
  }
}

startButton.addEventListener('click', () => {
  if (!SpeechRecognition) {
    statusElement.textContent =
      'Voice recognition is unavailable. Please use an updated version of Google Chrome and check browser permissions.';
    return;
  }

  try {
    if (recognition) {
      recognition.abort();
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    statusElement.textContent =
      'Listening... Please speak now.';
    startButton.disabled = true;

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript;
      processCommand(command);
    };

    recognition.onerror = (event) => {
      const messages = {
        'not-allowed': 'Microphone access denied. Allow microphone access in Chrome settings.',
        'no-speech': 'No speech detected. Please try again.',
        'audio-capture': 'No microphone was detected. Check your microphone connection.',
        'network': 'Voice recognition needs a working network connection.'
      };

      statusElement.textContent =
        messages[event.error] || `Voice recognition error: ${event.error}`;
    };

    recognition.onend = () => {
      startButton.disabled = false;

      if (statusElement.textContent.startsWith('Listening')) {
        statusElement.textContent = 'Finished listening. Click to try again.';
      }
    };

    recognition.start();
  } catch (error) {
    startButton.disabled = false;
    statusElement.textContent =
      'Could not start voice recognition. Please try again.';
  }
});

document.querySelector('#repeatResponse').addEventListener('click', () => {
  speakText(lastResponse);
});

document.querySelector('#stopSpeaking').addEventListener('click', () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    statusElement.textContent = 'Speech stopped.';
  }
});
