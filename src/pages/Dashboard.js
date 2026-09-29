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


                <a href="/pages/assistant.html">
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
                            Speak naturally with AURA
                            using the full assistant interface.
                        </p>


                        <div class="assistant-controls">

                            <button
                                id="activateAssistant"
                                class="assistant-primary-button"
                            >
                                🎙 Open AURA Assistant
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
                            AURA is ready
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


                        <!-- VOICE ASSISTANT -->

                        <button
                            class="dashboard-action-card"
                            id="actionVoice"
                        >

                            <div class="dashboard-action-icon">
                                🎙
                            </div>

                            <strong>
                                Voice Assistant
                            </strong>

                            <span>
                                Open the complete AURA assistant.
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


                        <!-- ACTIVITY 1 -->

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


                        <!-- ACTIVITY 2 -->

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


                        <!-- ACTIVITY 3 -->

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


                        <!-- ACTIVITY 4 -->

                        <div class="activity-item">

                            <div class="activity-icon">
                                ◉
                            </div>

                            <div>

                                <strong>
                                    Voice Assistant
                                </strong>

                                <span>
                                    AURA assistant interface is ready.
                                </span>

                            </div>

                            <time>
                                Ready
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

const dashboardLogout =
    document.querySelector('#dashboardLogout')


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
   OPEN AURA ASSISTANT
   ========================================= */

function openAssistant() {

    assistantStatus.textContent =
        'Opening AURA Assistant...'


    setTimeout(
        () => {

            window.location.href =
                '/pages/assistant.html'

        },
        250
    )
}


activateAssistant.addEventListener(
    'click',
    openAssistant
)


actionVoice.addEventListener(
    'click',
    openAssistant
)


/* =========================================
   ACCESSIBILITY
   ========================================= */

actionAccessibility.addEventListener(
    'click',
    () => {

        window.location.href =
            '/pages/accessibility.html'

    }
)


/* =========================================
   SETTINGS
   ========================================= */

actionSettings.addEventListener(
    'click',
    () => {

        window.location.href =
            '/pages/settings.html'

    }
)


/* =========================================
   READ DASHBOARD
   ========================================= */

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
   LOGOUT
   ========================================= */

dashboardLogout.addEventListener(
    'click',
    () => {

        window.location.href =
            '/pages/login.html'

    }
)