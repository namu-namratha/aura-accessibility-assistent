import '../style.css'

const app = document.querySelector('#dashboard-app')

app.innerHTML = `
    <div class="dashboard-page">

        <!-- SIDEBAR -->
        <aside class="dashboard-sidebar">

            <div class="dashboard-brand">

                <div class="dashboard-brand-icon">
                    A
                </div>

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


                <a href="#assistant">
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
                            Your intelligent assistant is
                            ready to help.
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


                <!-- ASSISTANT -->
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

                            <b>→</b>

                        </button>


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

                            <b>→</b>

                        </button>


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

                            <b>→</b>

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


/* =========================================
   CLOCK
   ========================================= */

function updateTime() {

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
   NAVIGATION
   ========================================= */

document
    .querySelector('#actionAccessibility')
    .addEventListener(
        'click',
        () => {
            window.location.href =
                '/pages/accessibility.html'
        }
    )


document
    .querySelector('#actionSettings')
    .addEventListener(
        'click',
        () => {
            window.location.href =
                '/pages/settings.html'
        }
    )


/* =========================================
   VOICE ASSISTANT
   ========================================= */

document
    .querySelector('#activateAssistant')
    .addEventListener(
        'click',
        () => {

            assistantStatus.textContent =
                'Listening... Speak your command.'

            assistantStatus.classList.add(
                'assistant-listening'
            )


            if (
                'webkitSpeechRecognition'
                in window
            ) {

                const Recognition =
                    window.webkitSpeechRecognition

                const recognition =
                    new Recognition()

                recognition.lang =
                    'en-IN'

                recognition.interimResults =
                    false

                recognition.start()


                recognition.onresult =
                    (event) => {

                        const command =
                            event.results[0][0].transcript

                        assistantStatus.textContent =
                            `Heard: "${command}"`

                        assistantStatus.classList.remove(
                            'assistant-listening'
                        )
                    }


                recognition.onerror =
                    () => {

                        assistantStatus.textContent =
                            'Unable to hear the command.'

                        assistantStatus.classList.remove(
                            'assistant-listening'
                        )

                    }

            } else {

                assistantStatus.textContent =
                    'Voice recognition is not supported in this browser.'

                assistantStatus.classList.remove(
                    'assistant-listening'
                )

            }

        }
    )


/* =========================================
   READ DASHBOARD
   ========================================= */

document
    .querySelector('#readDashboard')
    .addEventListener(
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


            const text =
                document.querySelector(
                    '.dashboard-content'
                ).innerText


            const speech =
                new SpeechSynthesisUtterance(
                    text
                )


            speech.rate = 0.9

            speech.pitch = 1

            speech.volume = 1


            window.speechSynthesis.speak(
                speech
            )

        }
    )


/* =========================================
   QUICK VOICE ACTION
   ========================================= */

document
    .querySelector('#actionVoice')
    .addEventListener(
        'click',
        () => {

            document
                .querySelector(
                    '#activateAssistant'
                )
                .click()

        }
    )


/* =========================================
   LOGOUT
   ========================================= */

document
    .querySelector('#dashboardLogout')
    .addEventListener(
        'click',
        () => {

            window.location.href =
                '/pages/login.html'

        }
    )