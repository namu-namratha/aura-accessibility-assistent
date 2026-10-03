import '../style.css'

const app = document.querySelector('#dashboard-app')

if (!app) {
    console.error('Dashboard app container not found.')
} else {

    app.innerHTML = `
        <div class="dashboard-page">

            <!-- SIDEBAR -->
            <aside class="dashboard-sidebar">

                <div class="dashboard-brand">
                    <div class="dashboard-brand-icon">A</div>
                    <span>AURA</span>
                </div>

                <nav class="dashboard-nav">

                    <a
                        href="/pages/dashboard.html"
                        class="active"
                    >
                        <span>⌂</span>
                        Dashboard
                    </a>

                    <a href="#assistant" id="navAssistant">
                        <span>◉</span>
                        Voice Assistant
                    </a>

                    <a href="/pages/accessibility.html">
                        <span>♿</span>
                        Accessibility
                    </a>

                    <a href="#activity">
                        <span>◷</span>
                        Activity
                    </a>

                    <a href="/pages/settings.html">
                        <span>⚙</span>
                        Settings
                    </a>

                </nav>

                <div class="dashboard-sidebar-bottom">

                    <button id="dashboardLogout">
                        <span>↪</span>
                        Log out
                    </button>

                </div>

            </aside>


            <!-- MAIN -->
            <main class="dashboard-main">

                <!-- TOPBAR -->
                <header class="dashboard-topbar">

                    <div class="dashboard-mobile-brand">

                        <div class="dashboard-brand-icon">
                            A
                        </div>

                        <span>AURA</span>

                    </div>

                    <div class="dashboard-title">

                        <span>
                            AURA INTELLIGENT ASSISTANT
                        </span>

                        <h1>
                            Dashboard
                        </h1>

                    </div>

                    <div class="dashboard-status">

                        <span class="dashboard-status-dot"></span>

                        System online

                    </div>

                </header>


                <!-- CONTENT -->
                <section class="dashboard-content">

                    <!-- WELCOME -->
                    <section class="dashboard-welcome">

                        <div>

                            <span class="dashboard-label">
                                GOOD EVENING
                            </span>

                            <h2>
                                Welcome back.
                            </h2>

                            <p>
                                Your intelligent assistant is ready to help.
                            </p>

                        </div>

                        <div class="dashboard-date">

                            <span>
                                AURA
                            </span>

                            <strong id="dashboardTime">
                                --:--
                            </strong>

                        </div>

                    </section>


                    <!-- VOICE ASSISTANT -->
                    <section
                        class="assistant-card"
                        id="assistant"
                    >

                        <div class="assistant-orb">

                            <div class="assistant-orb-inner">
                                A
                            </div>

                        </div>


                        <div class="assistant-content">

                            <span class="dashboard-label">
                                VOICE ASSISTANT
                            </span>

                            <h2>
                                How can I help?
                            </h2>

                            <p>
                                Activate AURA and speak naturally.
                            </p>


                            <div class="assistant-controls">

                                <button
                                    id="activateAssistant"
                                    class="assistant-primary-button"
                                >
                                    🎙 Activate AURA
                                </button>

                                <button
                                    id="readDashboard"
                                    class="assistant-secondary-button"
                                >
                                    🔊 Read dashboard
                                </button>

                            </div>


                            <div
                                class="assistant-status"
                                id="assistantStatus"
                            >
                                Ready for your command
                            </div>

                        </div>

                    </section>


                    <!-- QUICK ACTIONS -->
                    <section class="dashboard-section">

                        <div class="dashboard-section-heading">

                            <div>

                                <span class="dashboard-label">
                                    QUICK ACTIONS
                                </span>

                                <h2>
                                    What would you like to do?
                                </h2>

                            </div>

                        </div>


                        <div class="dashboard-action-grid">

                            <!-- ACCESSIBILITY -->
                            <button
                                class="dashboard-action-card"
                                id="actionAccessibility"
                            >

                                <div class="dashboard-action-icon">
                                    ♿
                                </div>

                                <strong>
                                    Accessibility
                                </strong>

                                <span>
                                    Customize your AURA experience.
                                </span>

                                <b>
                                    →
                                </b>

                            </button>


                            <!-- SETTINGS -->
                            <button
                                class="dashboard-action-card"
                                id="actionSettings"
                            >

                                <div class="dashboard-action-icon">
                                    ⚙
                                </div>

                                <strong>
                                    Settings
                                </strong>

                                <span>
                                    Manage your preferences.
                                </span>

                                <b>
                                    →
                                </b>

                            </button>


                            <!-- VOICE -->
                            <button
                                class="dashboard-action-card"
                                id="actionVoice"
                            >

                                <div class="dashboard-action-icon">
                                    🎙
                                </div>

                                <strong>
                                    Voice command
                                </strong>

                                <span>
                                    Try speaking to AURA.
                                </span>

                                <b>
                                    →
                                </b>

                            </button>

                        </div>

                    </section>


                    <!-- ACTIVITY -->
                    <section
                        class="dashboard-section"
                        id="activity"
                    >

                        <div class="dashboard-section-heading">

                            <div>

                                <span class="dashboard-label">
                                    RECENT ACTIVITY
                                </span>

                                <h2>
                                    Your AURA activity
                                </h2>

                            </div>

                        </div>


                        <div class="activity-list">

                            <div class="activity-item">

                                <div class="activity-icon">
                                    ✓
                                </div>

                                <div>

                                    <strong>
                                        AURA initialized
                                    </strong>

                                    <span>
                                        Assistant system is ready.
                                    </span>

                                </div>

                                <time>
                                    Now
                                </time>

                            </div>


                            <div class="activity-item">

                                <div class="activity-icon">
                                    ♿
                                </div>

                                <div>

                                    <strong>
                                        Accessibility center
                                    </strong>

                                    <span>
                                        Accessibility controls available.
                                    </span>

                                </div>

                                <time>
                                    Today
                                </time>

                            </div>


                            <div class="activity-item">

                                <div class="activity-icon">
                                    ⚙
                                </div>

                                <div>

                                    <strong>
                                        Settings
                                    </strong>

                                    <span>
                                        AURA preferences are available.
                                    </span>

                                </div>

                                <time>
                                    Today
                                </time>

                            </div>

                        </div>

                    </section>

                </section>

            </main>

        </div>
    `


    /* =========================================
       ELEMENTS
       ========================================= */

    const dashboardTime =
        document.querySelector('#dashboardTime')

    const assistantStatus =
        document.querySelector('#assistantStatus')

    const activateAssistant =
        document.querySelector('#activateAssistant')

    const readDashboard =
        document.querySelector('#readDashboard')

    const actionAccessibility =
        document.querySelector('#actionAccessibility')

    const actionSettings =
        document.querySelector('#actionSettings')

    const actionVoice =
        document.querySelector('#actionVoice')

    const navAssistant =
        document.querySelector('#navAssistant')

    const dashboardLogout =
        document.querySelector('#dashboardLogout')


    /* =========================================
       CLOCK
       ========================================= */

    function updateTime() {

        if (!dashboardTime) return

        const now = new Date()

        dashboardTime.textContent =
            now.toLocaleTimeString(
                [],
                {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            )
    }

    updateTime()

    setInterval(
        updateTime,
        1000
    )


    /* =========================================
       NAVIGATION HELPERS
       ========================================= */

    function goToAccessibility() {

        window.location.href =
            '/pages/accessibility.html'
    }


    function goToSettings() {

        window.location.href =
            '/pages/settings.html'
    }


    /* =========================================
       ACCESSIBILITY BUTTON
       ========================================= */

    if (actionAccessibility) {

        actionAccessibility.addEventListener(
            'click',
            goToAccessibility
        )

    }


    /* =========================================
       SETTINGS BUTTON
       ========================================= */

    if (actionSettings) {

        actionSettings.addEventListener(
            'click',
            goToSettings
        )

    }


    /* =========================================
       VOICE ASSISTANT
       ========================================= */

    let recognition = null
    let isListening = false


    function startVoiceAssistant() {

        if (isListening) {

            if (recognition) {
                recognition.stop()
            }

            return
        }


        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition


        if (!SpeechRecognition) {

            assistantStatus.textContent =
                'Voice recognition is not supported in this browser.'

            return
        }


        recognition =
            new SpeechRecognition()


        recognition.lang =
            'en-IN'


        recognition.interimResults =
            false


        recognition.continuous =
            false


        recognition.maxAlternatives =
            1


        recognition.onstart =
            () => {

                isListening = true

                activateAssistant.textContent =
                    '🔴 Listening...'

                assistantStatus.textContent =
                    'Listening... Speak your command.'

                assistantStatus.classList.add(
                    'assistant-listening'
                )
            }


        recognition.onresult =
            (event) => {

                const command =
                    event.results[0][0].transcript.trim()


                assistantStatus.textContent =
                    `Heard: "${command}"`


                assistantStatus.classList.remove(
                    'assistant-listening'
                )


                handleVoiceCommand(
                    command
                )
            }


        recognition.onerror =
            (event) => {

                console.error(
                    'Speech recognition error:',
                    event.error
                )


                assistantStatus.textContent =
                    'I could not understand that. Please try again.'


                assistantStatus.classList.remove(
                    'assistant-listening'
                )
            }


        recognition.onend =
            () => {

                isListening = false

                activateAssistant.textContent =
                    '🎙 Activate AURA'

                assistantStatus.classList.remove(
                    'assistant-listening'
                )
            }


        try {

            recognition.start()

        } catch (error) {

            console.error(
                error
            )

            isListening = false

        }

    }


    /* =========================================
       VOICE COMMAND HANDLER
       ========================================= */

    function handleVoiceCommand(
        command
    ) {

        const text =
            command.toLowerCase()


        if (
            text.includes('accessibility')
            ||
            text.includes('accessible')
        ) {

            assistantStatus.textContent =
                'Opening Accessibility Center...'


            speak(
                'Opening Accessibility Center.'
            )


            setTimeout(
                goToAccessibility,
                700
            )

            return
        }


        if (
            text.includes('settings')
            ||
            text.includes('setting')
        ) {

            assistantStatus.textContent =
                'Opening Settings...'


            speak(
                'Opening Settings.'
            )


            setTimeout(
                goToSettings,
                700
            )

            return
        }


        if (
            text.includes('activity')
            ||
            text.includes('recent activity')
        ) {

            document
                .querySelector('#activity')
                ?.scrollIntoView({
                    behavior: 'smooth'
                })


            assistantStatus.textContent =
                'Showing your recent activity.'


            speak(
                'Showing your recent activity.'
            )

            return
        }


        if (
            text.includes('dashboard')
            ||
            text.includes('home')
        ) {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })


            assistantStatus.textContent =
                'You are already on the dashboard.'


            speak(
                'You are already on the dashboard.'
            )

            return
        }


        if (
            text.includes('hello')
            ||
            text.includes('hi')
            ||
            text.includes('hey')
        ) {

            assistantStatus.textContent =
                'Hello. I am AURA. How can I help you?'


            speak(
                'Hello. I am AURA. How can I help you?'
            )

            return
        }


        assistantStatus.textContent =
            `I heard "${command}". I don't have an action for that command yet.`


        speak(
            `I heard ${command}. I don't have an action for that command yet.`
        )
    }


    /* =========================================
       TEXT TO SPEECH
       ========================================= */

    function speak(
        text
    ) {

        if (
            !('speechSynthesis' in window)
        ) {

            return
        }


        window.speechSynthesis.cancel()


        const speech =
            new SpeechSynthesisUtterance(
                text
            )


        speech.rate =
            0.9


        speech.pitch =
            1


        speech.volume =
            1


        window.speechSynthesis.speak(
            speech
        )
    }


    /* =========================================
       ACTIVATE AURA
       ========================================= */

    if (activateAssistant) {

        activateAssistant.addEventListener(
            'click',
            startVoiceAssistant
        )

    }


    /* =========================================
       READ DASHBOARD
       ========================================= */

    if (readDashboard) {

        readDashboard.addEventListener(
            'click',
            () => {

                if (
                    !('speechSynthesis' in window)
                ) {

                    alert(
                        'Text-to-speech is not supported by this browser.'
                    )

                    return
                }


                window.speechSynthesis.cancel()


                const content =
                    document.querySelector(
                        '.dashboard-content'
                    )


                if (!content) return


                const text =
                    content.innerText


                speak(
                    text
                )

            }
        )

    }


    /* =========================================
       QUICK VOICE ACTION
       ========================================= */

    if (actionVoice) {

        actionVoice.addEventListener(
            'click',
            () => {

                startVoiceAssistant()

            }
        )

    }


    /* =========================================
       SIDEBAR VOICE ASSISTANT
       ========================================= */

    if (navAssistant) {

        navAssistant.addEventListener(
            'click',
            (event) => {

                event.preventDefault()

                document
                    .querySelector('#assistant')
                    ?.scrollIntoView({
                        behavior: 'smooth'
                    })

            }
        )

    }


    /* =========================================
       LOGOUT
       ========================================= */

    if (dashboardLogout) {

        dashboardLogout.addEventListener(
            'click',
            () => {

                if (
                    'speechSynthesis'
                    in window
                ) {

                    window.speechSynthesis.cancel()

                }


                if (recognition) {

                    try {
                        recognition.stop()
                    } catch (error) {
                        console.log(error)
                    }

                }


                window.location.href =
                    '/pages/login.html'

            }
        )

    }

}