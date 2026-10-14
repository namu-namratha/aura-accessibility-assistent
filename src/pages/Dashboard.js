
import '../style.css';

const app = document.querySelector('#dashboard-app');

if (!app) {
    throw new Error('Dashboard container #dashboard-app was not found.');
}

// -------------------------------------
// DASHBOARD UI
// -------------------------------------

app.innerHTML = `
    <div class="dashboard-page">

        <aside class="dashboard-sidebar">
            <div class="dashboard-brand">
                <div class="dashboard-brand-icon">A</div>
                <span>AURA</span>
            </div>

            <nav class="dashboard-nav" aria-label="Main navigation">
                <a href="/pages/dashboard.html" class="active">
                    <span>⌂</span> Dashboard
                </a>
                <a href="#assistant" id="navAssistant">
                    <span>◉</span> Voice Assistant
                </a>
                <a href="/pages/accessibility.html">
                    <span>♿</span> Accessibility
                </a>
                <a href="#activity">
                    <span>◷</span> Activity
                </a>
                <a href="/pages/settings.html">
                    <span>⚙</span> Settings
                </a>
            </nav>

            <div class="dashboard-sidebar-bottom">
                <button id="dashboardLogout" type="button">
                    <span>↪</span> Log out
                </button>
            </div>
        </aside>

        <main class="dashboard-main">
            <header class="dashboard-topbar">
                <div class="dashboard-mobile-brand">
                    <div class="dashboard-brand-icon">A</div>
                    <span>AURA</span>
                </div>

                <div class="dashboard-title">
                    <span>AURA INTELLIGENT ASSISTANT</span>
                    <h1>Dashboard</h1>
                </div>

                <div class="dashboard-status">
                    <span class="dashboard-status-dot"></span>
                    System online
                </div>
            </header>

            <section class="dashboard-content">

                <section class="dashboard-welcome">
                    <div>
                        <span class="dashboard-label" id="welcomeGreeting">
                            WELCOME
                        </span>
                        <h2 id="dashboardWelcome">Welcome back.</h2>
                        <p>Your intelligent assistant is ready to help.</p>
                    </div>

                    <div class="dashboard-date">
                        <span>AURA</span>
                        <strong id="dashboardTime">--:--</strong>
                    </div>
                </section>

                <section class="assistant-card" id="assistant">
                    <div class="assistant-orb" aria-hidden="true">
                        <div class="assistant-orb-inner">A</div>
                    </div>

                    <div class="assistant-content">
                        <span class="dashboard-label">VOICE ASSISTANT</span>
                        <h2>How can I help?</h2>
                        <p>Activate AURA and speak naturally.</p>

                        <div class="assistant-controls">
                            <button
                                id="activateAssistant"
                                class="assistant-primary-button"
                                type="button"
                            >
                                🎙 Activate AURA
                            </button>

                            <button
                                id="readDashboard"
                                class="assistant-secondary-button"
                                type="button"
                            >
                                🔊 Read dashboard
                            </button>

                            <button
                                id="stopSpeech"
                                class="assistant-secondary-button"
                                type="button"
                            >
                                Stop speaking
                            </button>
                        </div>

                        <div
                            class="assistant-status"
                            id="assistantStatus"
                            role="status"
                            aria-live="polite"
                        >
                            Ready for your command.
                        </div>
                    </div>
                </section>

                <section class="dashboard-section">
                    <div class="dashboard-section-heading">
                        <div>
                            <span class="dashboard-label">QUICK ACTIONS</span>
                            <h2>What would you like to do?</h2>
                        </div>
                    </div>

                    <div class="dashboard-action-grid">
                        <button
                            class="dashboard-action-card"
                            id="actionAccessibility"
                            type="button"
                        >
                            <div class="dashboard-action-icon">♿</div>
                            <strong>Accessibility</strong>
                            <span>Customize your AURA experience.</span>
                            <b>→</b>
                        </button>

                        <button
                            class="dashboard-action-card"
                            id="actionSettings"
                            type="button"
                        >
                            <div class="dashboard-action-icon">⚙</div>
                            <strong>Settings</strong>
                            <span>Manage your preferences.</span>
                            <b>→</b>
                        </button>

                        <button
                            class="dashboard-action-card"
                            id="actionVoice"
                            type="button"
                        >
                            <div class="dashboard-action-icon">🎙</div>
                            <strong>Voice command</strong>
                            <span>Try speaking to AURA.</span>
                            <b>→</b>
                        </button>
                    </div>
                </section>

                <section class="dashboard-section" id="activity">
                    <div class="dashboard-section-heading">
                        <div>
                            <span class="dashboard-label">RECENT ACTIVITY</span>
                            <h2>Your AURA activity</h2>
                        </div>
                    </div>

                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="activity-icon">✓</div>
                            <div>
                                <strong>AURA initialized</strong>
                                <span>Assistant system is ready.</span>
                            </div>
                            <time>Now</time>
                        </div>

                        <div class="activity-item">
                            <div class="activity-icon">♿</div>
                            <div>
                                <strong>Accessibility center</strong>
                                <span>Accessibility controls available.</span>
                            </div>
                            <time>Today</time>
                        </div>

                        <div class="activity-item">
                            <div class="activity-icon">⚙</div>
                            <div>
                                <strong>Settings</strong>
                                <span>AURA preferences are available.</span>
                            </div>
                            <time>Today</time>
                        </div>
                    </div>
                </section>

            </section>
        </main>
    </div>
`;

// -------------------------------------
// PERSONALIZED WELCOME AND CLOCK
// -------------------------------------

const dashboardWelcome =
    document.querySelector('#dashboardWelcome');

const welcomeGreeting =
    document.querySelector('#welcomeGreeting');

const savedName = sessionStorage.getItem('auraDemoName');
const savedEmail = sessionStorage.getItem('auraDemoEmail');

const displayName =
    savedName || (savedEmail ? savedEmail.split('@')[0] : '');

if (displayName) {
    dashboardWelcome.textContent = `Welcome back, ${displayName}.`;
}

function updateGreetingAndClock() {
    const now = new Date();
    const hour = now.getHours();

    welcomeGreeting.textContent =
        hour < 12
            ? 'GOOD MORNING'
            : hour < 17
                ? 'GOOD AFTERNOON'
                : 'GOOD EVENING';

    document.querySelector('#dashboardTime').textContent =
        now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
}

updateGreetingAndClock();
setInterval(updateGreetingAndClock, 1000);

// -------------------------------------
// ELEMENTS AND NAVIGATION
// -------------------------------------

const assistantStatus =
    document.querySelector('#assistantStatus');

const activateAssistant =
    document.querySelector('#activateAssistant');

const readDashboard =
    document.querySelector('#readDashboard');

const actionAccessibility =
    document.querySelector('#actionAccessibility');

const actionSettings =
    document.querySelector('#actionSettings');

const actionVoice =
    document.querySelector('#actionVoice');

const navAssistant =
    document.querySelector('#navAssistant');

const dashboardLogout =
    document.querySelector('#dashboardLogout');

const stopSpeechButton =
    document.querySelector('#stopSpeech');

function goToAccessibility() {
    window.location.href = '/pages/accessibility.html';
}

function goToSettings() {
    window.location.href = '/pages/settings.html';
}

actionAccessibility.addEventListener('click', goToAccessibility);
actionSettings.addEventListener('click', goToSettings);
actionVoice.addEventListener('click', startVoiceAssistant);

navAssistant.addEventListener('click', (event) => {
    event.preventDefault();

    document.querySelector('#assistant').scrollIntoView({
        behavior: 'smooth'
    });
});

// -------------------------------------
// TEXT TO SPEECH
// -------------------------------------

function speak(message) {
    if (!('speechSynthesis' in window)) {
        assistantStatus.textContent =
            'Speech output is not supported in this browser.';
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
        String(message)
    );

    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
}

function reply(message) {
    assistantStatus.textContent = message;
    speak(message);
}

stopSpeechButton.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    assistantStatus.textContent = 'Speech stopped.';
});

// -------------------------------------
// VOICE RECOGNITION
// -------------------------------------

let recognition = null;
let isListening = false;

function startVoiceAssistant() {
    if (isListening) {
        recognition?.stop();
        return;
    }

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        assistantStatus.textContent =
            'Voice recognition is not supported. Try Chrome on your computer.';
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        isListening = true;
        activateAssistant.textContent = '🔴 Listening...';

        assistantStatus.textContent =
            'Listening. Speak your command.';

        assistantStatus.classList.add('assistant-listening');
    };

    recognition.onresult = (event) => {
        const command =
            event.results[0][0].transcript.trim();

        assistantStatus.textContent = `You said: "${command}"`;

        handleVoiceCommand(command);
    };

    recognition.onerror = (event) => {
        console.error(
            'Speech recognition error:',
            event.error
        );

        assistantStatus.textContent =
            event.error === 'not-allowed'
                ? 'Microphone permission was denied. Allow microphone access and try again.'
                : 'I could not hear that clearly. Please try again.';
    };

    recognition.onend = () => {
        isListening = false;
        activateAssistant.textContent = '🎙 Activate AURA';

        assistantStatus.classList.remove(
            'assistant-listening'
        );
    };

    try {
        recognition.start();
    } catch (error) {
        console.error(
            'Unable to start recognition:',
            error
        );

        assistantStatus.textContent =
            'Unable to start listening. Please try again.';
    }
}

// -------------------------------------
// CONNECT TO AI BACKEND
// -------------------------------------

async function askAI(question) {
    assistantStatus.textContent = 'AURA is thinking...';

    try {
        const response = await fetch(
            'http://localhost:5000/api/chat',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: question
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message ||
                `AI request failed (${response.status}).`
            );
        }

        if (
            !data.answer ||
            typeof data.answer !== 'string'
        ) {
            throw new Error(
                'AURA did not receive a valid answer.'
            );
        }

        reply(data.answer);
    } catch (error) {
        console.error('AURA AI error:', error);

        reply(
            'I could not connect to my AI service right now. Please check that the backend is running, your API key is configured, and then try again.'
        );
    }
}

// -------------------------------------
// BUILT-IN VOICE COMMANDS + AI FALLBACK
// -------------------------------------

function handleVoiceCommand(command) {
    const text = command
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    const matches = (...phrases) =>
        phrases.some(phrase => text.includes(phrase));

    // Greetings
    if (
        /^(hi|hello|hey|hai)\b/.test(text) ||
        /^(good morning|good afternoon|good evening)\b/.test(text)
    ) {
        const hour = new Date().getHours();

        reply(
            hour < 12
                ? 'Good morning! I am AURA, your voice assistant. How can I help you today?'
                : hour < 17
                    ? 'Good afternoon! I am AURA. What can I do for you?'
                    : 'Good evening! I am AURA. How can I help?'
        );

        return;
    }

    // Identity
    if (
        matches(
            'who are you',
            'what are you',
            'your name',
            'introduce yourself'
        )
    ) {
        reply(
            'I am AURA, the Voice Controlled Smart Assistant for Accessibility. I help people navigate this interface using voice commands and spoken feedback.'
        );

        return;
    }

    // Help
    if (
        matches(
            'what can you do',
            'how can you help',
            'your features',
            'what are your features',
            'what commands',
            'help'
        )
    ) {
        reply(
            'I can answer general questions using my AI service, tell you the date and time, read the dashboard aloud, open Accessibility and Settings, and show recent activity. Ask me a question or give me a navigation command.'
        );

        return;
    }

    // Casual questions
    if (
        matches(
            'how are you',
            'how are things',
            'are you okay'
        )
    ) {
        reply(
            'I am running and ready to help. What would you like to do?'
        );

        return;
    }

    if (matches('thank you', 'thanks a lot', 'thanks')) {
        reply('You are welcome! I am happy to help.');
        return;
    }

    if (matches('goodbye', 'bye bye', 'see you later')) {
        reply(
            'Goodbye! You can return whenever you need assistance.'
        );

        return;
    }

    // Time
    if (
        matches(
            'what time',
            'tell me the time',
            'current time',
            'time now'
        )
    ) {
        reply(
            `The current time is ${new Date().toLocaleTimeString(
                [],
                {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            )}.`
        );

        return;
    }

    // Date
    if (
        matches(
            'what is the date',
            'todays date',
            'date today',
            'what day is it',
            'today date'
        )
    ) {
        reply(
            `Today is ${new Date().toLocaleDateString(
                'en-IN',
                {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }
            )}.`
        );

        return;
    }

    // AURA project information
    if (
        matches(
            'what is aura',
            'about aura',
            'tell me about aura',
            'explain aura'
        )
    ) {
        reply(
            'AURA is a Voice Controlled Smart Assistant for Accessibility. It uses browser speech recognition, command matching, AI-generated answers, and text-to-speech to help users interact with a website more easily.'
        );

        return;
    }

    // Open Accessibility
    if (
        matches(
            'open accessibility',
            'accessibility page',
            'accessibility settings',
            'accessibility options',
            'open accessibility center',
            'accessible features'
        )
    ) {
        reply('Opening the Accessibility Center.');

        setTimeout(goToAccessibility, 700);

        return;
    }

    // Open Settings
    if (
        matches(
            'open settings',
            'show settings',
            'go to settings',
            'change settings',
            'my preferences'
        )
    ) {
        reply('Opening Settings.');

        setTimeout(goToSettings, 700);

        return;
    }

    // Activity
    if (
        matches(
            'show activity',
            'recent activity',
            'my activity',
            'activity history'
        )
    ) {
        document.querySelector('#activity').scrollIntoView({
            behavior: 'smooth'
        });

        reply('Here is your recent AURA activity.');

        return;
    }

    // Read dashboard
    if (
        matches(
            'read this page',
            'read the page',
            'read dashboard',
            'read this dashboard',
            'read everything',
            'read aloud'
        )
    ) {
        const content =
            document.querySelector('.dashboard-content');

        if (content) {
            reply(content.innerText);
        } else {
            reply(
                'I could not find the dashboard content to read.'
            );
        }

        return;
    }

    // Stop speech
    if (
        matches(
            'stop speaking',
            'stop talking',
            'be quiet',
            'silence',
            'stop reading'
        )
    ) {
        window.speechSynthesis.cancel();

        assistantStatus.textContent = 'Speech stopped.';

        return;
    }

    // Repeat
    if (
        matches(
            'repeat that',
            'say that again',
            'repeat yourself'
        )
    ) {
        reply(
            'I am AURA. You can ask me general questions, ask about accessibility, or tell me to open Settings or Accessibility.'
        );

        return;
    }

    // Return to top of dashboard
    if (
        matches(
            'go home',
            'open home',
            'back to dashboard',
            'show dashboard',
            'open dashboard'
        )
    ) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        reply('You are on the AURA dashboard.');

        return;
    }

    // Any other question goes to the AI backend.
    askAI(command);
}

// -------------------------------------
// READ DASHBOARD ALOUD
// -------------------------------------

readDashboard.addEventListener('click', () => {
    const content =
        document.querySelector('.dashboard-content');

    if (content) {
        speak(content.innerText);
    }
});

activateAssistant.addEventListener(
    'click',
    startVoiceAssistant
);

// -------------------------------------
// LOGOUT
// -------------------------------------

dashboardLogout.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    if (recognition) {
        try {
            recognition.stop();
        } catch (error) {
            console.warn(
                'Recognition has already stopped.',
                error
            );
        }
    }

    sessionStorage.removeItem('auraDemoLoggedIn');
    sessionStorage.removeItem('auraDemoEmail');
    sessionStorage.removeItem('auraDemoName');

    window.location.href = '/pages/login.html';
});