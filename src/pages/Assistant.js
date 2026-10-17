import "../style.css";
/* =========================================
   AURA VOICE ASSISTANT
========================================= */

const app = document.querySelector('#assistant-app');

if (!app) {
    throw new Error('Assistant app container was not found.');
}

app.innerHTML = `
    <div class="assistant-page">

        <!-- HEADER -->
        <header class="assistant-header">

            <div class="assistant-brand">
                <div class="assistant-brand-icon">A</div>
                <span>AURA</span>
            </div>

            <nav class="assistant-navigation">
                <a href="/pages/dashboard.html">Dashboard</a>

                <a href="/pages/assistant.html" class="active">
                    Voice Assistant
                </a>

                <a href="/pages/accessibility.html">
                    Accessibility
                </a>

                <a href="/pages/settings.html">Settings</a>
            </nav>

            <div class="assistant-online">
                <span class="assistant-online-dot"></span>
                Online
            </div>

        </header>

        <!-- MAIN -->
        <main class="assistant-main">

            <!-- TITLE -->
            <section class="assistant-intro">
                <span class="dashboard-label">
                    AURA INTELLIGENT ASSISTANT
                </span>

                <h1>How can I help?</h1>

                <p>
                    Speak naturally and let AURA
                    control your experience.
                </p>
            </section>

            <!-- ASSISTANT CARD -->
            <section class="assistant-main-card">

                <!-- ORB -->
                <div
                    class="assistant-large-orb"
                    id="assistantOrb"
                    aria-label="AURA assistant status"
                >
                    <div class="assistant-large-orb-inner">
                        A
                    </div>
                </div>

                <!-- STATUS -->
                <div
                    class="assistant-listening-status"
                    id="assistantStatus"
                    role="status"
                    aria-live="polite"
                >
                    Ready for your command
                </div>

                <!-- LISTEN BUTTON -->
                <button
                    type="button"
                    id="startListening"
                    class="assistant-listen-button"
                >
                    <span aria-hidden="true">🎙</span>
                    <span id="listenButtonText">
                        Start Listening
                    </span>
                </button>

                <!-- RECOGNIZED COMMAND -->
                <div class="assistant-result-card">
                    <span class="assistant-result-label">
                        YOU SAID
                    </span>

                    <p id="recognizedCommand" aria-live="polite">
                        Nothing yet
                    </p>
                </div>

                <!-- RESPONSE -->
                <div class="assistant-response-card">
                    <span class="assistant-result-label">
                        AURA
                    </span>

                    <p id="assistantResponse" aria-live="polite">
                        I'm ready. Tell me what you need.
                    </p>
                </div>

                <!-- SPEECH CONTROLS -->
                <div class="assistant-speech-controls">

                    <button
                        type="button"
                        id="repeatResponse"
                    >
                        Repeat Response
                    </button>

                    <button
                        type="button"
                        id="stopSpeaking"
                    >
                        Stop Speaking
                    </button>

                </div>

            </section>

            <!-- AVAILABLE COMMANDS -->
            <section class="assistant-commands">

                <span class="dashboard-label">
                    AVAILABLE COMMANDS
                </span>

                <h2>Try saying</h2>

                <div class="assistant-command-grid">

                    <button
                        type="button"
                        class="assistant-command"
                        data-command="open dashboard"
                    >
                        <strong>Open dashboard</strong>
                        <span>Go to your AURA dashboard</span>
                    </button>

                    <button
                        type="button"
                        class="assistant-command"
                        data-command="open accessibility"
                    >
                        <strong>Open accessibility</strong>
                        <span>Open accessibility controls</span>
                    </button>

                    <button
                        type="button"
                        class="assistant-command"
                        data-command="open settings"
                    >
                        <strong>Open settings</strong>
                        <span>Manage AURA settings</span>
                    </button>

                    <button
                        type="button"
                        class="assistant-command"
                        data-command="go back"
                    >
                        <strong>Go back</strong>
                        <span>Return to the previous page</span>
                    </button>

                    <button
                        type="button"
                        class="assistant-command"
                        data-command="read page"
                    >
                        <strong>Read page</strong>
                        <span>AURA will read this page aloud</span>
                    </button>

                    <button
                        type="button"
                        class="assistant-command"
                        data-command="stop speaking"
                    >
                        <strong>Stop speaking</strong>
                        <span>Stop AURA's speech</span>
                    </button>

                </div>
            </section>

        </main>
    </div>
`;


/* =========================================
   ELEMENT REFERENCES
========================================= */

const startListening =
    document.querySelector('#startListening');

const listenButtonText =
    document.querySelector('#listenButtonText');

const assistantStatus =
    document.querySelector('#assistantStatus');

const recognizedCommand =
    document.querySelector('#recognizedCommand');

const assistantResponse =
    document.querySelector('#assistantResponse');

const assistantOrb =
    document.querySelector('#assistantOrb');

const repeatResponseButton =
    document.querySelector('#repeatResponse');

const stopSpeakingButton =
    document.querySelector('#stopSpeaking');

let lastResponse =
    "I'm ready. Tell me what you need.";

let isListening = false;


/* =========================================
   SPEECH RECOGNITION SETUP
========================================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();

    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;
}


/* =========================================
   UPDATE LISTENING UI
========================================= */

function setListeningUI(listening) {
    isListening = listening;

    listenButtonText.textContent = listening
        ? 'Listening...'
        : 'Start Listening';

    startListening.disabled = listening;

    assistantOrb.classList.toggle(
        'assistant-orb-listening',
        listening
    );
}


/* =========================================
   START VOICE RECOGNITION
========================================= */

function startVoiceRecognition() {
    if (!recognition) {
        assistantStatus.textContent =
            'Voice recognition is not supported.';

        respond(
            'Please use a browser that supports speech recognition, such as Google Chrome.'
        );

        return;
    }

    if (isListening) {
        return;
    }

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    assistantStatus.textContent =
        'Listening... Speak now.';

    setListeningUI(true);

    try {
        recognition.start();
    } catch (error) {
        console.error(
            'Could not start speech recognition:',
            error
        );

        setListeningUI(false);

        assistantStatus.textContent =
            'Unable to start listening. Please try again.';
    }
}


/* =========================================
   SPEECH RECOGNITION EVENTS
========================================= */

if (recognition) {
    recognition.onstart = () => {
        assistantStatus.textContent =
            'Listening... Speak now.';

        setListeningUI(true);
    };

    recognition.onresult = (event) => {
        const command =
            event.results[0][0].transcript.trim();

        recognizedCommand.textContent = command;

        assistantStatus.textContent =
            'Command received.';

        setListeningUI(false);

        processCommand(command);
    };

    recognition.onerror = (event) => {
        console.error(
            'Speech recognition error:',
            event.error
        );

        setListeningUI(false);

        if (event.error === 'not-allowed') {
            assistantStatus.textContent =
                'Microphone access was denied.';

            respond(
                'Please allow microphone access in your browser settings and try again.'
            );

        } else if (event.error === 'no-speech') {
            assistantStatus.textContent =
                'No speech detected.';

            assistantResponse.textContent =
                'I could not hear you. Please try again.';

        } else {
            assistantStatus.textContent =
                'Unable to hear you.';

            assistantResponse.textContent =
                'Please try again.';
        }
    };

    recognition.onend = () => {
        setListeningUI(false);

        if (
            assistantStatus.textContent.startsWith('Listening')
        ) {
            assistantStatus.textContent =
                'Ready for your command';
        }
    };
}


/* =========================================
   COMMAND PROCESSOR
========================================= */

function processCommand(command) {
    const text = command.toLowerCase().trim();

    /* STOP SPEAKING */

    if (
        text.includes('stop speaking') ||
        text.includes('stop talking') ||
        text === 'stop'
    ) {
        stopSpeech();
        return;
    }

    /* READ PAGE */

    if (
        text.includes('read page') ||
        text.includes('read this page') ||
        text.includes('read the page')
    ) {
        readPage();
        return;
    }

    /* DASHBOARD */

    if (
        text.includes('open dashboard') ||
        text.includes('go to dashboard') ||
        text === 'dashboard'
    ) {
        navigateTo(
            'Opening your dashboard.',
            '/pages/dashboard.html'
        );
        return;
    }

    /* ACCESSIBILITY */

    if (
        text.includes('open accessibility') ||
        text.includes('accessibility')
    ) {
        navigateTo(
            'Opening accessibility controls.',
            '/pages/accessibility.html'
        );
        return;
    }

    /* SETTINGS */

    if (
        text.includes('open settings') ||
        text.includes('settings')
    ) {
        navigateTo(
            'Opening AURA settings.',
            '/pages/settings.html'
        );
        return;
    }

    /* LOGIN */

    if (
        text.includes('open login') ||
        text.includes('login')
    ) {
        navigateTo(
            'Opening the login page.',
            '/pages/login.html'
        );
        return;
    }

    /* REGISTER */

    if (
        text.includes('open register') ||
        text.includes('register') ||
        text.includes('sign up')
    ) {
        navigateTo(
            'Opening the registration page.',
            '/pages/register.html'
        );
        return;
    }

    /* HOME */

    if (
        text === 'home' ||
        text.includes('open home') ||
        text.includes('go home')
    ) {
        navigateTo(
            'Opening the home page.',
            '/'
        );
        return;
    }

    /* GO BACK */

    if (
        text === 'back' ||
        text.includes('go back') ||
        text.includes('previous page')
    ) {
        respond('Going back.');

        window.setTimeout(() => {
            window.history.back();
        }, 600);

        return;
    }

    /* GREETINGS */

    if (
        text.includes('hello') ||
        text.includes('hi aura') ||
        text === 'hi'
    ) {
        respond(
            'Hello! I am AURA. How can I help you?'
        );
        return;
    }

    /* HELP */

    if (
        text.includes('help') ||
        text.includes('what can you do')
    ) {
        respond(
            'I can open your dashboard, accessibility controls, settings, login and registration pages. I can also read this page aloud and stop my speech.'
        );
        return;
    }

    /* THANK YOU */

    if (
        text.includes('thank you') ||
        text.includes('thanks')
    ) {
        respond(
            "You're welcome! I'm here whenever you need help."
        );
        return;
    }

    /* UNKNOWN COMMAND */

    respond(
        `I heard "${command}". I do not have an action for that command yet. Try one of the available commands.`
    );
}


/* =========================================
   NAVIGATION
========================================= */

function navigateTo(message, destination) {
    respond(message);

    window.setTimeout(() => {
        window.location.href = destination;
    }, 800);
}


/* =========================================
   AURA RESPONSE
========================================= */

function respond(message, shouldSpeak = true) {
    lastResponse = message;

    assistantResponse.textContent = message;

    if (shouldSpeak) {
        speak(message);
    }
}


/* =========================================
   TEXT-TO-SPEECH
========================================= */

function speak(message) {
    if (!('speechSynthesis' in window)) {
        assistantStatus.textContent =
            'Text-to-speech is not supported in this browser.';

        return;
    }

    window.speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(message);

    speech.lang = 'en-IN';
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = () => {
        assistantStatus.textContent =
            'AURA is speaking...';
    };

    speech.onend = () => {
        if (!isListening) {
            assistantStatus.textContent =
                'Ready for your command';
        }
    };

    speech.onerror = (event) => {
        console.error(
            'Speech synthesis error:',
            event.error
        );

        assistantStatus.textContent =
            'Speech could not be played.';
    };

    window.speechSynthesis.speak(speech);
}


/* =========================================
   STOP SPEAKING
========================================= */

function stopSpeech() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    lastResponse = 'Speech stopped.';

    assistantResponse.textContent =
        'Speech stopped.';

    assistantStatus.textContent =
        'Ready for your command';
}


/* =========================================
   READ PAGE ALOUD
========================================= */

function readPage() {
    const mainContent =
        document.querySelector('.assistant-main');

    if (!mainContent) {
        respond('I could not find the page content to read.');
        return;
    }

    const pageText = mainContent.innerText
        .replace(/\s+/g, ' ')
        .trim();

    lastResponse = pageText;

    assistantResponse.textContent =
        'Reading the current page aloud.';

    speak(pageText);
}


/* =========================================
   BUTTON EVENTS
========================================= */

// Start listening
startListening.addEventListener(
    'click',
    startVoiceRecognition
);

// Repeat the previous response
repeatResponseButton.addEventListener(
    'click',
    () => {
        speak(lastResponse);
    }
);

// Stop speech
stopSpeakingButton.addEventListener(
    'click',
    stopSpeech
);

// Run commands using the command cards
document
    .querySelectorAll('.assistant-command')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const command = button.dataset.command;

            recognizedCommand.textContent = command;

            processCommand(command);
        });
    });