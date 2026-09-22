import '../style.css'

const app = document.querySelector('#dashboard-app')

app.innerHTML = `
    <div class="dashboard-page">

        <!-- SIDEBAR -->
        <aside class="dashboard-sidebar">

            <div class="dashboard-logo">
                <div class="dashboard-logo-icon">A</div>
                <span>AURA</span>
            </div>

            <nav class="dashboard-nav">

                <a href="/pages/dashboard.html" class="active">
                    <span>⌂</span>
                    Dashboard
                </a>

                <a href="#assistant">
                    <span>◉</span>
                    Voice Assistant
                </a>

                <a href="#accessibility">
                    <span>♿</span>
                    Accessibility
                </a>

                <a href="#activity">
                    <span>◷</span>
                    Activity
                </a>

            </nav>

            <div class="sidebar-bottom">

                <a href="#settings">
                    <span>⚙</span>
                    Settings
                </a>

                <button id="logoutButton">
                    <span>↪</span>
                    Log out
                </button>

            </div>

        </aside>


        <!-- MAIN CONTENT -->
        <main class="dashboard-main">

            <!-- TOP BAR -->
            <header class="dashboard-topbar">

                <div class="mobile-brand">
                    <div class="dashboard-logo-icon">A</div>
                    <span>AURA</span>
                </div>

                <div class="dashboard-search">
                    <span>⌕</span>

                    <input
                        type="text"
                        placeholder="Search AURA..."
                        id="dashboardSearch"
                    >

                    <span class="search-key">
                        /
                    </span>
                </div>

                <div class="topbar-actions">

                    <button
                        class="icon-button"
                        id="notificationButton"
                        title="Notifications"
                    >
                        ♢
                    </button>

                    <div class="user-profile">

                        <div class="user-avatar">
                            U
                        </div>

                        <div class="user-info">
                            <strong>User</strong>
                            <span>Active</span>
                        </div>

                    </div>

                </div>

            </header>


            <!-- CONTENT -->
            <section class="dashboard-content">

                <!-- WELCOME -->
                <div class="dashboard-welcome">

                    <div>
                        <span class="dashboard-eyebrow">
                            AURA COMMAND CENTER
                        </span>

                        <h1>
                            Welcome back<span>.</span>
                        </h1>

                        <p>
                            Your voice-first accessibility
                            tools are ready.
                        </p>
                    </div>

                    <button
                        class="dashboard-primary-button"
                        id="startAssistantButton"
                    >
                        <span>🎙</span>
                        Start Assistant
                    </button>

                </div>


                <!-- STATS -->
                <div class="dashboard-stats">

                    <div class="stat-card">

                        <div class="stat-icon">
                            ◉
                        </div>

                        <div>
                            <span>Assistant status</span>
                            <strong class="status-online">
                                Online
                            </strong>
                        </div>

                    </div>

                    <div class="stat-card">

                        <div class="stat-icon">
                            ◷
                        </div>

                        <div>
                            <span>Commands today</span>
                            <strong id="commandCount">
                                0
                            </strong>
                        </div>

                    </div>

                    <div class="stat-card">

                        <div class="stat-icon">
                            ♿
                        </div>

                        <div>
                            <span>Accessibility</span>
                            <strong>
                                Enabled
                            </strong>
                        </div>

                    </div>

                </div>


                <!-- ASSISTANT + QUICK ACTIONS -->
                <div
                    class="dashboard-grid"
                    id="assistant"
                >

                    <!-- VOICE ASSISTANT -->
                    <section class="dashboard-panel assistant-panel">

                        <div class="panel-heading">

                            <div>
                                <span class="panel-label">
                                    VOICE ASSISTANT
                                </span>

                                <h2>
                                    Talk to AURA
                                </h2>
                            </div>

                            <span
                                class="panel-status"
                                id="assistantStatus"
                            >
                                Ready
                            </span>

                        </div>


                        <div
                            class="dashboard-orb"
                            id="dashboardOrb"
                        >

                            <div class="dashboard-orb-ring ring-a"></div>
                            <div class="dashboard-orb-ring ring-b"></div>
                            <div class="dashboard-orb-ring ring-c"></div>

                            <div class="dashboard-orb-core">
                                🎙
                            </div>

                        </div>


                        <h3 id="assistantMessage">
                            How can I help?
                        </h3>

                        <p id="assistantDescription">
                            Press the button and speak naturally.
                        </p>


                        <button
                            class="dashboard-listen-button"
                            id="listenButton"
                        >
                            🎙 Start listening
                        </button>


                        <div class="dashboard-transcript">

                            <div>
                                <span>You said</span>
                                <p id="dashboardTranscript">
                                    Nothing yet...
                                </p>
                            </div>

                            <div>
                                <span>AURA responded</span>
                                <p id="dashboardResponse">
                                    I'm ready to assist you.
                                </p>
                            </div>

                        </div>

                    </section>


                    <!-- QUICK ACTIONS -->
                    <section
                        class="dashboard-panel quick-panel"
                        id="accessibility"
                    >

                        <div class="panel-heading">

                            <div>
                                <span class="panel-label">
                                    QUICK ACTIONS
                                </span>

                                <h2>
                                    Accessibility tools
                                </h2>
                            </div>

                        </div>


                        <div class="quick-actions">

                            <button
                                class="quick-action"
                                data-command="read"
                            >

                                <div class="quick-icon">
                                    🔊
                                </div>

                                <div>
                                    <strong>
                                        Read page
                                    </strong>

                                    <span>
                                        Read visible content aloud
                                    </span>
                                </div>

                                <b>→</b>

                            </button>


                            <button
                                class="quick-action"
                                data-command="search"
                            >

                                <div class="quick-icon">
                                    🔎
                                </div>

                                <div>
                                    <strong>
                                        Voice search
                                    </strong>

                                    <span>
                                        Search using your voice
                                    </span>
                                </div>

                                <b>→</b>

                            </button>


                            <button
                                class="quick-action"
                                data-command="navigate"
                            >

                                <div class="quick-icon">
                                    🧭
                                </div>

                                <div>
                                    <strong>
                                        Navigate
                                    </strong>

                                    <span>
                                        Move through the interface
                                    </span>
                                </div>

                                <b>→</b>

                            </button>


                            <button
                                class="quick-action"
                                data-command="contrast"
                            >

                                <div class="quick-icon">
                                    ◐
                                </div>

                                <div>
                                    <strong>
                                        High contrast
                                    </strong>

                                    <span>
                                        Improve visual readability
                                    </span>
                                </div>

                                <b>→</b>

                            </button>

                        </div>

                    </section>

                </div>


                <!-- ACTIVITY -->
                <section
                    class="dashboard-panel activity-panel"
                    id="activity"
                >

                    <div class="panel-heading">

                        <div>
                            <span class="panel-label">
                                RECENT ACTIVITY
                            </span>

                            <h2>
                                Your interactions
                            </h2>
                        </div>

                        <button
                            class="clear-button"
                            id="clearActivity"
                        >
                            Clear
                        </button>

                    </div>


                    <div
                        class="activity-list"
                        id="activityList"
                    >

                        <div class="empty-activity">
                            <div>◷</div>

                            <p>
                                No recent commands
                            </p>

                            <span>
                                Your voice interactions
                                will appear here.
                            </span>
                        </div>

                    </div>

                </section>


                <!-- SETTINGS PREVIEW -->
                <section
                    class="dashboard-panel settings-preview"
                    id="settings"
                >

                    <div>

                        <span class="panel-label">
                            PERSONALIZE YOUR EXPERIENCE
                        </span>

                        <h2>
                            Make AURA work for you.
                        </h2>

                        <p>
                            Adjust voice, accessibility and
                            interaction preferences.
                        </p>

                    </div>

                    <button
                        class="settings-button"
                        id="settingsButton"
                    >
                        Open settings →
                    </button>

                </section>

            </section>

        </main>

    </div>
`


/* =========================================
   ELEMENTS
   ========================================= */

const listenButton =
    document.querySelector('#listenButton')

const startAssistantButton =
    document.querySelector('#startAssistantButton')

const logoutButton =
    document.querySelector('#logoutButton')

const notificationButton =
    document.querySelector('#notificationButton')

const settingsButton =
    document.querySelector('#settingsButton')

const clearActivity =
    document.querySelector('#clearActivity')

const assistantStatus =
    document.querySelector('#assistantStatus')

const assistantMessage =
    document.querySelector('#assistantMessage')

const assistantDescription =
    document.querySelector('#assistantDescription')

const dashboardOrb =
    document.querySelector('#dashboardOrb')

const dashboardTranscript =
    document.querySelector('#dashboardTranscript')

const dashboardResponse =
    document.querySelector('#dashboardResponse')

const activityList =
    document.querySelector('#activityList')

const commandCount =
    document.querySelector('#commandCount')


/* =========================================
   VOICE RECOGNITION
   ========================================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition

let recognition = null

let totalCommands = 0


function startListening() {

    if (!SpeechRecognition) {

        dashboardResponse.textContent =
            'Voice recognition is not supported in this browser.'

        assistantStatus.textContent =
            'Unavailable'

        return
    }


    recognition =
        new SpeechRecognition()

    recognition.lang = 'en-IN'

    recognition.continuous = false

    recognition.interimResults = false


    recognition.onstart = () => {

        assistantStatus.textContent =
            'Listening'

        assistantMessage.textContent =
            "I'm listening..."

        assistantDescription.textContent =
            'Speak your command now.'

        listenButton.textContent =
            '🛑 Listening...'

        dashboardOrb.classList.add(
            'dashboard-listening'
        )
    }


    recognition.onresult = (event) => {

        const spokenText =
            event.results[0][0].transcript

        dashboardTranscript.textContent =
            spokenText

        totalCommands++

        commandCount.textContent =
            totalCommands

        addActivity(
            spokenText
        )

        processCommand(
            spokenText
        )
    }


    recognition.onerror = (event) => {

        console.error(event.error)

        dashboardResponse.textContent =
            `Voice error: ${event.error}`

        assistantStatus.textContent =
            'Error'

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


/* =========================================
   COMMAND PROCESSING
   ========================================= */

function processCommand(command) {

    const text =
        command.toLowerCase().trim()

    let response =
        ''


    if (
        text.includes('hello') ||
        text.includes('hi') ||
        text.includes('hey')
    ) {

        response =
            'Hello! How can I help you?'

    }

    else if (
        text.includes('help') ||
        text.includes('what can you do')
    ) {

        response =
            'I can help you navigate, read content, search and use accessibility features.'

    }

    else if (
        text.includes('read')
    ) {

        response =
            'Read page mode is ready. Full page reading will be connected next.'

        speakPage()

    }

    else if (
        text.includes('search')
    ) {

        response =
            'Voice search is ready. Search integration will be connected next.'

    }

    else if (
        text.includes('navigate')
    ) {

        response =
            'Navigation assistance is ready.'

    }

    else if (
        text.includes('contrast')
    ) {

        response =
            'High contrast mode is now enabled.'

        document.body.classList.toggle(
            'high-contrast-mode'
        )

    }

    else {

        response =
            `I heard "${command}". This command will be connected to the full AURA system later.`

    }


    dashboardResponse.textContent =
        response

    speak(response)
}


/* =========================================
   TEXT TO SPEECH
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


    speech.lang =
        'en-IN'

    speech.rate =
        0.95

    speech.pitch =
        1


    window.speechSynthesis.speak(
        speech
    )
}


/* =========================================
   RESET ASSISTANT
   ========================================= */

function resetAssistant() {

    assistantStatus.textContent =
        'Ready'

    assistantMessage.textContent =
        'How can I help?'

    assistantDescription.textContent =
        'Press the button and speak naturally.'

    listenButton.textContent =
        '🎙 Start listening'

    dashboardOrb.classList.remove(
        'dashboard-listening'
    )
}


/* =========================================
   PAGE READING
   ========================================= */

function speakPage() {

    const content =
        document.querySelector(
            '.dashboard-content'
        )

    if (!content) {
        return
    }


    const text =
        content.innerText


    speak(
        text
    )
}


/* =========================================
   ACTIVITY
   ========================================= */

function addActivity(command) {

    const empty =
        activityList.querySelector(
            '.empty-activity'
        )

    if (empty) {
        empty.remove()
    }


    const item =
        document.createElement('div')

    item.className =
        'activity-item'


    item.innerHTML = `
        <div class="activity-icon">
            🎙
        </div>

        <div class="activity-content">
            <strong>
                Voice command
            </strong>

            <span>
                ${escapeHTML(command)}
            </span>
        </div>

        <time>
            Just now
        </time>
    `


    activityList.prepend(
        item
    )
}


/* =========================================
   SECURITY HELPER
   ========================================= */

function escapeHTML(value) {

    const div =
        document.createElement('div')

    div.textContent =
        value

    return div.innerHTML
}


/* =========================================
   EVENT LISTENERS
   ========================================= */

listenButton.addEventListener(
    'click',
    startListening
)


startAssistantButton.addEventListener(
    'click',
    () => {

        document
            .querySelector('#assistant')
            .scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })


        setTimeout(
            startListening,
            500
        )
    }
)


logoutButton.addEventListener(
    'click',
    () => {

        window.location.href =
            '/pages/login.html'
    }
)


notificationButton.addEventListener(
    'click',
    () => {

        alert(
            'You have no new notifications.'
        )
    }
)


settingsButton.addEventListener(
    'click',
    () => {

        alert(
            'AURA settings will be connected next.'
        )
    }
)


clearActivity.addEventListener(
    'click',
    () => {

        activityList.innerHTML = `
            <div class="empty-activity">

                <div>◷</div>

                <p>
                    No recent commands
                </p>

                <span>
                    Your voice interactions
                    will appear here.
                </span>

            </div>
        `

        totalCommands = 0

        commandCount.textContent =
            '0'
    }
)


document
    .querySelectorAll('.quick-action')
    .forEach((button) => {

        button.addEventListener(
            'click',
            () => {

                const command =
                    button.dataset.command

                if (command === 'read') {

                    const response =
                        'Read page mode is ready.'

                    dashboardResponse.textContent =
                        response

                    speakPage()

                }

                else if (command === 'search') {

                    dashboardResponse.textContent =
                        'Voice search is ready.'

                    speak(
                        'Voice search is ready.'
                    )

                }

                else if (command === 'navigate') {

                    dashboardResponse.textContent =
                        'Navigation assistance is ready.'

                    speak(
                        'Navigation assistance is ready.'
                    )

                }

                else if (command === 'contrast') {

                    document.body.classList.toggle(
                        'high-contrast-mode'
                    )

                    dashboardResponse.textContent =
                        'High contrast mode toggled.'

                    speak(
                        'High contrast mode toggled.'
                    )
                }

            }
        )

    })