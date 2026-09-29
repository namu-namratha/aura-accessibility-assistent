import '../style.css'

const app = document.querySelector('#assistant-app')

app.innerHTML = `
    <div class="assistant-page">

        <!-- SIDEBAR -->
        <aside class="assistant-sidebar">

            <div class="assistant-brand">

                <div class="assistant-brand-icon">
                    A
                </div>

                <span>AURA</span>

            </div>


            <nav class="assistant-nav">

                <a href="/pages/dashboard.html">
                    <span>⌂</span>
                    Dashboard
                </a>

                <a
                    href="/pages/assistant.html"
                    class="active"
                >
                    <span>◉</span>
                    Voice Assistant
                </a>

                <a href="/pages/accessibility.html">
                    <span>♿</span>
                    Accessibility
                </a>

                <a href="/pages/dashboard.html#activity">
                    <span>◷</span>
                    Activity
                </a>

                <a href="/pages/settings.html">
                    <span>⚙</span>
                    Settings
                </a>

            </nav>


            <div class="assistant-sidebar-bottom">

                <button id="assistantLogout">
                    <span>↪</span>
                    Log out
                </button>

            </div>

        </aside>


        <!-- MAIN -->
        <main class="assistant-main">


            <!-- TOPBAR -->
            <header class="assistant-topbar">

                <div class="assistant-mobile-brand">

                    <div class="assistant-brand-icon">
                        A
                    </div>

                    <span>AURA</span>

                </div>


                <div class="assistant-page-title">

                    <span>
                        INTELLIGENT ASSISTANT
                    </span>

                    <h1>
                        AURA
                    </h1>

                </div>


                <div class="assistant-online">

                    <span></span>

                    Online

                </div>

            </header>


            <!-- ASSISTANT CONTENT -->
            <section class="assistant-workspace">


                <!-- ORB -->
                <div class="assistant-orb-large">

                    <div class="assistant-orb-ring ring-one"></div>

                    <div class="assistant-orb-ring ring-two"></div>

                    <div class="assistant-orb-core">
                        A
                    </div>

                </div>


                <span class="assistant-eyebrow">
                    AURA INTELLIGENCE
                </span>


                <h2 class="assistant-heading">
                    How can I help you?
                </h2>


                <p class="assistant-description">
                    Speak naturally or type a command below.
                    AURA is ready.
                </p>


                <!-- RESPONSE -->
                <div
                    class="assistant-response"
                    id="assistantResponse"
                >
                    <span class="response-label">
                        AURA
                    </span>

                    <p id="responseText">
                        Hello. I'm ready for your command.
                    </p>
                </div>


                <!-- INPUT -->
                <div class="assistant-input-wrapper">

                    <input
                        type="text"
                        id="assistantInput"
                        placeholder="Type a command..."
                        autocomplete="off"
                    >


                    <button
                        id="voiceButton"
                        class="assistant-input-button"
                        title="Voice command"
                    >
                        🎙
                    </button>


                    <button
                        id="sendButton"
                        class="assistant-send-button"
                        title="Send command"
                    >
                        →
                    </button>

                </div>


                <div
                    class="assistant-listening-status"
                    id="listeningStatus"
                >
                    Click the microphone to speak
                </div>


                <!-- QUICK COMMANDS -->
                <div class="assistant-quick-section">

                    <span>
                        QUICK COMMANDS
                    </span>


                    <div class="assistant-quick-grid">

                        <button
                            data-command="What time is it?"
                        >
                            🕐
                            <span>Time</span>
                        </button>

                        <button
                            data-command="Open accessibility settings"
                        >
                            ♿
                            <span>Accessibility</span>
                        </button>

                        <button
                            data-command="Open my settings"
                        >
                            ⚙
                            <span>Settings</span>
                        </button>

                        <button
                            data-command="Read this page"
                        >
                            🔊
                            <span>Read page</span>
                        </button>

                    </div>

                </div>


                <!-- CONVERSATION -->
                <div class="assistant-history-section">

                    <div class="assistant-history-heading">

                        <span>
                            RECENT COMMANDS
                        </span>

                        <button id="clearHistory">
                            Clear
                        </button>

                    </div>


                    <div
                        class="assistant-history"
                        id="assistantHistory"
                    >

                        <div class="history-empty">
                            No commands yet.
                        </div>

                    </div>

                </div>

            </section>

        </main>

    </div>
`


/* =========================================
   ELEMENTS
   ========================================= */

const input =
    document.querySelector('#assistantInput')

const sendButton =
    document.querySelector('#sendButton')

const voiceButton =
    document.querySelector('#voiceButton')

const responseText =
    document.querySelector('#responseText')

const listeningStatus =
    document.querySelector('#listeningStatus')

const history =
    document.querySelector('#assistantHistory')

const clearHistory =
    document.querySelector('#clearHistory')


/* =========================================
   RESPONSE
   ========================================= */

function respondToCommand(command) {

    const lower =
        command.toLowerCase().trim()


    if (!lower) {
        return
    }


    let response =
        "I'm ready. Tell me what you'd like me to do."


    if (
        lower.includes('time')
    ) {

        const now =
            new Date()

        response =
            `The current time is ${now.toLocaleTimeString(
                [],
                {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            )}.`

    }


    else if (
        lower.includes('accessibility')
    ) {

        response =
            'Opening the accessibility center.'

        setTimeout(() => {

            window.location.href =
                '/pages/accessibility.html'

        }, 700)

    }


    else if (
        lower.includes('settings')
    ) {

        response =
            'Opening your AURA settings.'

        setTimeout(() => {

            window.location.href =
                '/pages/settings.html'

        }, 700)

    }


    else if (
        lower.includes('read')
        &&
        lower.includes('page')
    ) {

        response =
            'I can read the page for you.'

        speak(
            document.body.innerText
        )

    }


    else if (
        lower.includes('hello')
        ||
        lower.includes('hi')
    ) {

        response =
            'Hello. It is good to have you here. How can I help?'

    }


    else if (
        lower.includes('who are you')
        ||
        lower.includes('what are you')
    ) {

        response =
            'I am AURA, your intelligent personal assistant.'

    }


    responseText.textContent =
        response


    addHistory(
        command,
        response
    )


    if (
        document.querySelector(
            '#voiceButton'
        ).dataset.speaking === 'true'
    ) {

        speak(response)

    }

}


/* =========================================
   SEND COMMAND
   ========================================= */

function sendCommand() {

    const command =
        input.value.trim()


    if (!command) {
        return
    }


    respondToCommand(command)

    input.value = ''

}


/* =========================================
   SPEECH
   ========================================= */

function speak(text) {

    if (
        !('speechSynthesis' in window)
    ) {

        return
    }


    window.speechSynthesis.cancel()


    const speech =
        new SpeechSynthesisUtterance(text)


    speech.rate = 0.9

    speech.pitch = 1

    speech.volume = 1


    window.speechSynthesis.speak(
        speech
    )

}


/* =========================================
   VOICE RECOGNITION
   ========================================= */

function startVoiceRecognition() {

    if (
        !('webkitSpeechRecognition' in window)
        &&
        !('SpeechRecognition' in window)
    ) {

        listeningStatus.textContent =
            'Voice recognition is not supported in this browser.'

        return
    }


    const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition


    const recognition =
        new Recognition()


    recognition.lang =
        'en-IN'

    recognition.interimResults =
        false

    recognition.continuous =
        false


    listeningStatus.textContent =
        'Listening... Speak now.'

    voiceButton.classList.add(
        'recording'
    )


    recognition.start()


    recognition.onresult =
        (event) => {

            const command =
                event.results[0][0].transcript


            input.value =
                command


            listeningStatus.textContent =
                `Heard: "${command}"`


            respondToCommand(
                command
            )

        }


    recognition.onerror =
        () => {

            listeningStatus.textContent =
                'I could not hear that. Try again.'

        }


    recognition.onend =
        () => {

            voiceButton.classList.remove(
                'recording'
            )

        }

}


/* =========================================
   HISTORY
   ========================================= */

function addHistory(
    command,
    response
) {

    const empty =
        history.querySelector(
            '.history-empty'
        )


    if (empty) {
        empty.remove()
    }


    const item =
        document.createElement(
            'div'
        )


    item.className =
        'assistant-history-item'


    item.innerHTML = `
        <div class="history-command">
            <span>You</span>
            ${escapeHTML(command)}
        </div>

        <div class="history-response">
            <span>AURA</span>
            ${escapeHTML(response)}
        </div>
    `


    history.prepend(item)

}


/* =========================================
   HTML ESCAPE
   ========================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            'div'
        )

    div.textContent =
        text

    return div.innerHTML

}


/* =========================================
   EVENTS
   ========================================= */

sendButton.addEventListener(
    'click',
    sendCommand
)


input.addEventListener(
    'keydown',
    (event) => {

        if (
            event.key === 'Enter'
        ) {

            sendCommand()

        }

    }
)


voiceButton.addEventListener(
    'click',
    startVoiceRecognition
)


/* =========================================
   QUICK COMMANDS
   ========================================= */

document
    .querySelectorAll(
        '.assistant-quick-grid button'
    )
    .forEach(
        button => {

            button.addEventListener(
                'click',
                () => {

                    const command =
                        button.dataset.command

                    input.value =
                        command

                    respondToCommand(
                        command
                    )

                }
            )

        }
    )


/* =========================================
   CLEAR HISTORY
   ========================================= */

clearHistory.addEventListener(
    'click',
    () => {

        history.innerHTML = `
            <div class="history-empty">
                No commands yet.
            </div>
        `

    }
)


/* =========================================
   LOGOUT
   ========================================= */

document
    .querySelector('#assistantLogout')
    .addEventListener(
        'click',
        () => {

            window.location.href =
                '/pages/login.html'

        }
    )