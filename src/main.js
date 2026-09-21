import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <header class="navbar">
    <div class="brand">
      <div class="brand-icon">A</div>
      <span>AURA</span>
    </div>

    <nav>
      <a href="#home">Home</a>
      <a href="#features">Features</a>
      <a href="#how-it-works">How It Works</a>
      <a href="#accessibility">Accessibility</a>
    </nav>

    <div class="nav-actions">
      <button class="login-btn" id="loginBtn">Login</button>
      <button class="signup-btn" id="signupBtn">Get Started</button>
    </div>
  </header>

  <main>

    <section class="hero" id="home">

      <div class="hero-content">

        <div class="badge">
          <span class="pulse-dot"></span>
          Voice-powered accessibility
        </div>

        <h1>
          Your voice.<br>
          <span>Your way to interact.</span>
        </h1>

        <p class="hero-text">
          AURA makes the web easier to navigate using your voice.
          Speak naturally, search, navigate and interact without
          depending entirely on a mouse or keyboard.
        </p>

        <div class="hero-buttons">
          <button class="primary-btn" id="heroVoiceBtn">
            🎙️ Try AURA
          </button>

          <button class="secondary-btn" id="learnBtn">
            Learn how it works →
          </button>
        </div>

        <div class="trust-row">
          <div>
            <strong>Voice</strong>
            <span>Interaction</span>
          </div>

          <div>
            <strong>Smart</strong>
            <span>Commands</span>
          </div>

          <div>
            <strong>Accessible</strong>
            <span>By Design</span>
          </div>
        </div>

      </div>

      <div class="assistant-card">

        <div class="card-header">
          <div>
            <span class="online-dot"></span>
            AURA Assistant
          </div>

          <span class="status-text" id="status">
            Ready
          </span>
        </div>

        <div class="assistant-orb" id="orb">
          <div class="orb-ring ring-one"></div>
          <div class="orb-ring ring-two"></div>
          <div class="orb-core">
            <span>🎙️</span>
          </div>
        </div>

        <h2 id="assistantTitle">
          How can I help?
        </h2>

        <p id="assistantHint">
          Click the microphone and speak naturally.
        </p>

        <button class="listen-btn" id="voiceBtn">
          🎙️ Start Listening
        </button>

        <div class="transcript-box">
          <span>You said</span>
          <p id="transcript">Nothing yet...</p>
        </div>

        <div class="response-box">
          <span>AURA</span>
          <p id="response">
            Hello! I'm ready to assist you.
          </p>
        </div>

      </div>

    </section>

    <section class="features-section" id="features">

      <div class="section-heading">
        <span>WHAT AURA CAN DO</span>
        <h2>Simple interaction.<br>Powerful accessibility.</h2>
      </div>

      <div class="feature-grid">

        <article class="feature-card">
          <div class="feature-icon">🎙️</div>
          <h3>Voice Navigation</h3>
          <p>
            Navigate webpages and access important sections
            using natural voice commands.
          </p>
        </article>

        <article class="feature-card">
          <div class="feature-icon">🔊</div>
          <h3>Read Aloud</h3>
          <p>
            Let AURA read webpage content aloud using
            text-to-speech technology.
          </p>
        </article>

        <article class="feature-card">
          <div class="feature-icon">📝</div>
          <h3>Voice Forms</h3>
          <p>
            Enter information into forms through voice-based
            interaction.
          </p>
        </article>

        <article class="feature-card">
          <div class="feature-icon">🔎</div>
          <h3>Voice Search</h3>
          <p>
            Search for information without relying completely
            on traditional keyboard interaction.
          </p>
        </article>

      </div>

    </section>

    <section class="how-section" id="how-it-works">

      <div class="section-heading">
        <span>HOW IT WORKS</span>
        <h2>Speak. Understand. Respond.</h2>
      </div>

      <div class="steps">

        <div class="step">
          <div class="step-number">01</div>
          <h3>You Speak</h3>
          <p>
            AURA listens to your voice through the microphone.
          </p>
        </div>

        <div class="step">
          <div class="step-number">02</div>
          <h3>AURA Understands</h3>
          <p>
            Your speech is converted into text and interpreted
            as an intended command.
          </p>
        </div>

        <div class="step">
          <div class="step-number">03</div>
          <h3>AURA Responds</h3>
          <p>
            AURA performs the appropriate action and provides
            audio feedback.
          </p>
        </div>

      </div>

    </section>

    <section class="access-section" id="accessibility">

      <div class="access-content">

        <span>DESIGNED FOR ACCESSIBILITY</span>

        <h2>
          Technology should adapt
          to people.
        </h2>

        <p>
          AURA is designed to make web interaction simpler,
          more intuitive and more accessible for people who
          find traditional interfaces difficult to use.
        </p>

        <div class="access-points">
          <div>✓ Voice-first interaction</div>
          <div>✓ Audio feedback</div>
          <div>✓ Reduced mouse dependency</div>
          <div>✓ Keyboard accessible interface</div>
        </div>

      </div>

    </section>

  </main>

  <footer>
    <div class="brand">
      <div class="brand-icon">A</div>
      <span>AURA</span>
    </div>

    <p>
      Accessibility & Unified Responsive Assistant
    </p>

    <span>© 2026 AURA</span>
  </footer>
`

const voiceBtn = document.querySelector('#voiceBtn')
const heroVoiceBtn = document.querySelector('#heroVoiceBtn')
const status = document.querySelector('#status')
const transcript = document.querySelector('#transcript')
const response = document.querySelector('#response')
const orb = document.querySelector('#orb')
const assistantTitle = document.querySelector('#assistantTitle')
const assistantHint = document.querySelector('#assistantHint')

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition

let recognition = null

function startVoiceRecognition() {
  if (!SpeechRecognition) {
    status.textContent = 'Not supported'
    response.textContent =
      'Voice recognition is not supported in this browser.'
    return
  }

  recognition = new SpeechRecognition()

  recognition.lang = 'en-IN'
  recognition.continuous = false
  recognition.interimResults = false

  recognition.onstart = () => {
    status.textContent = 'Listening'
    assistantTitle.textContent = 'I’m listening...'
    assistantHint.textContent = 'Speak your command now.'
    voiceBtn.textContent = '🛑 Listening...'
    orb.classList.add('listening')
  }

  recognition.onresult = (event) => {
    const spokenText =
      event.results[0][0].transcript

    transcript.textContent = spokenText

    processCommand(spokenText)
  }

  recognition.onerror = (event) => {
    console.error(event.error)

    status.textContent = 'Error'
    assistantTitle.textContent = 'Something went wrong'
    assistantHint.textContent =
      'Please try speaking again.'

    response.textContent =
      `Voice recognition error: ${event.error}`

    resetAssistant()
  }

  recognition.onend = () => {
    resetAssistant()
  }

  try {
    recognition.start()
  } catch (error) {
    console.log(error)
  }
}

function resetAssistant() {
  status.textContent = 'Ready'
  assistantTitle.textContent = 'How can I help?'
  assistantHint.textContent =
    'Click the microphone and speak naturally.'

  voiceBtn.textContent = '🎙️ Start Listening'
  orb.classList.remove('listening')
}

function processCommand(command) {

  const text = command.toLowerCase().trim()

  let message = ''

  if (
    text.includes('hello') ||
    text.includes('hi') ||
    text.includes('hey')
  ) {
    message =
      'Hello! How can I help you today?'
  }

  else if (
    text.includes('who are you')
  ) {
    message =
      'I am AURA, your accessibility focused voice assistant.'
  }

  else if (
    text.includes('help') ||
    text.includes('what can you do')
  ) {
    message =
      'I can help with navigation, reading content, searching and voice based interaction.'
  }

  else if (
    text.includes('read') &&
    text.includes('page')
  ) {
    message =
      'I can read webpage content aloud for you.'
  }

  else if (
    text.includes('features')
  ) {
    document
      .querySelector('#features')
      .scrollIntoView({
        behavior: 'smooth'
      })

    message =
      'Here are the features of AURA.'
  }

  else if (
    text.includes('how it works')
  ) {
    document
      .querySelector('#how-it-works')
      .scrollIntoView({
        behavior: 'smooth'
      })

    message =
      'Here is how AURA works.'
  }

  else {
    message =
      `I heard "${command}". I don't have an action for that command yet.`
  }

  response.textContent = message

  speak(message)
}

function speak(text) {

  if (!('speechSynthesis' in window)) {
    return
  }

  window.speechSynthesis.cancel()

  const speech =
    new SpeechSynthesisUtterance(text)

  speech.lang = 'en-IN'
  speech.rate = 0.95
  speech.pitch = 1

  window.speechSynthesis.speak(speech)
}

voiceBtn.addEventListener(
  'click',
  startVoiceRecognition
)

heroVoiceBtn.addEventListener(
  'click',
  () => {
    document
      .querySelector('.assistant-card')
      .scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })

    setTimeout(
      startVoiceRecognition,
      500
    )
  }
)

document
  .querySelector('#learnBtn')
  .addEventListener(
    'click',
    () => {
      document
        .querySelector('#how-it-works')
        .scrollIntoView({
          behavior: 'smooth'
        })
    }
  )

document
  .querySelector('#loginBtn')
  .addEventListener(
    'click',
    () => {
      alert('Login page will be connected next.')
    }
  )

document
  .querySelector('#signupBtn')
  .addEventListener(
    'click',
    () => {
      alert('Registration page will be connected next.')
    }
  )
