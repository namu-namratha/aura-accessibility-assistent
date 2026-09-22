import '../style.css'

const app = document.querySelector('#accessibility-app')

app.innerHTML = `
    <div class="accessibility-page">

        <!-- SIDEBAR -->
        <aside class="accessibility-sidebar">

            <div class="accessibility-brand">
                <div class="accessibility-brand-icon">A</div>
                <span>AURA</span>
            </div>

            <nav class="accessibility-nav">

                <a href="/pages/dashboard.html">
                    <span>⌂</span>
                    Dashboard
                </a>

                <a href="/pages/dashboard.html#assistant">
                    <span>◉</span>
                    Voice Assistant
                </a>

                <a
                    href="/pages/accessibility.html"
                    class="active"
                >
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

            <div class="accessibility-sidebar-bottom">

                <button id="accessibilityLogout">
                    <span>↪</span>
                    Log out
                </button>

            </div>

        </aside>


        <!-- MAIN -->
        <main class="accessibility-main">

            <!-- TOP BAR -->
            <header class="accessibility-topbar">

                <div class="accessibility-mobile-brand">

                    <div class="accessibility-brand-icon">
                        A
                    </div>

                    <span>AURA</span>

                </div>


                <div class="accessibility-page-title">

                    <span>
                        ACCESSIBILITY CENTER
                    </span>

                    <h1>
                        Accessibility
                    </h1>

                </div>


                <button
                    class="accessibility-save-top"
                    id="saveAccessibilityTop"
                >
                    Save changes
                </button>

            </header>


            <!-- CONTENT -->
            <section class="accessibility-content">


                <!-- HERO -->
                <section class="accessibility-hero">

                    <div class="accessibility-hero-icon">
                        ♿
                    </div>

                    <div>

                        <span class="accessibility-label">
                            AURA ACCESSIBILITY
                        </span>

                        <h2>
                            Make AURA work for you.
                        </h2>

                        <p>
                            Personalize voice, visual,
                            motion and navigation features
                            to create a more comfortable
                            experience.
                        </p>

                    </div>

                    <div class="accessibility-status">

                        <span class="status-dot"></span>

                        Accessibility ready

                    </div>

                </section>


                <!-- QUICK ACCESS -->
                <section class="accessibility-quick-grid">

                    <button
                        class="accessibility-quick-card"
                        id="quickReadPage"
                    >

                        <div class="quick-access-icon">
                            🔊
                        </div>

                        <div>

                            <strong>
                                Read this page
                            </strong>

                            <span>
                                Hear the current page
                                using speech.
                            </span>

                        </div>

                        <b>
                            →
                        </b>

                    </button>


                    <button
                        class="accessibility-quick-card"
                        id="quickContrast"
                    >

                        <div class="quick-access-icon">
                            ◐
                        </div>

                        <div>

                            <strong>
                                High contrast
                            </strong>

                            <span>
                                Improve visual contrast
                                across AURA.
                            </span>

                        </div>

                        <b>
                            →
                        </b>

                    </button>


                    <button
                        class="accessibility-quick-card"
                        id="quickLargeText"
                    >

                        <div class="quick-access-icon">
                            Aa
                        </div>

                        <div>

                            <strong>
                                Larger text
                            </strong>

                            <span>
                                Increase the size of
                                interface text.
                            </span>

                        </div>

                        <b>
                            →
                        </b>

                    </button>

                </section>


                <!-- VOICE -->
                <section class="accessibility-section">

                    <div class="accessibility-section-heading">

                        <div>

                            <span class="accessibility-label">
                                VOICE
                            </span>

                            <h2>
                                Voice & speech
                            </h2>

                            <p>
                                Control how AURA listens
                                and responds.
                            </p>

                        </div>

                    </div>


                    <div class="accessibility-options">


                        <div class="accessibility-option">

                            <div class="accessibility-option-icon">
                                🎙
                            </div>

                            <div class="accessibility-option-content">

                                <strong>
                                    Voice commands
                                </strong>

                                <span>
                                    Allow AURA to process
                                    spoken commands.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="accessVoice"
                                    checked
                                >

                                <span></span>

                            </label>

                        </div>


                        <div class="accessibility-option">

                            <div class="accessibility-option-icon">
                                🔊
                            </div>

                            <div class="accessibility-option-content">

                                <strong>
                                    Text-to-speech
                                </strong>

                                <span>
                                    Allow AURA to speak
                                    responses aloud.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="accessSpeech"
                                    checked
                                >

                                <span></span>

                            </label>

                        </div>


                        <div class="accessibility-option">

                            <div class="accessibility-option-icon">
                                📝
                            </div>

                            <div class="accessibility-option-content">

                                <strong>
                                    Show spoken commands
                                </strong>

                                <span>
                                    Display recognized voice
                                    commands on screen.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="showCommands"
                                    checked
                                >

                                <span></span>

                            </label>

                        </div>


                    </div>

                </section>


                <!-- VISUAL -->
                <section class="accessibility-section">

                    <div class="accessibility-section-heading">

                        <div>

                            <span class="accessibility-label">
                                VISUAL
                            </span>

                            <h2>
                                Visual accessibility
                            </h2>

                            <p>
                                Adjust how information appears
                                on the screen.
                            </p>

                        </div>

                    </div>


                    <div class="accessibility-options">


                        <div class="accessibility-option">

                            <div class="accessibility-option-icon">
                                ◐
                            </div>

                            <div class="accessibility-option-content">

                                <strong>
                                    High contrast
                                </strong>

                                <span>
                                    Increase contrast between
                                    backgrounds and content.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="accessContrast"
                                >

                                <span></span>

                            </label>

                        </div>


                        <div class="accessibility-option">

                            <div class="accessibility-option-icon">
                                Aa
                            </div>

                            <div class="accessibility-option-content">

                                <strong>
                                    Larger text
                                </strong>

                                <span>
                                    Increase text size throughout
                                    the interface.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="accessLargeText"
                                >

                                <span></span>

                            </label>

                        </div>


                        <div class="accessibility-option">

                            <div class="accessibility-option-icon">
                                ↕
                            </div>

                            <div class="accessibility-option-content">

                                <strong>
                                    Reduced motion
                                </strong>

                                <span>
                                    Reduce animations and
                                    interface movement.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="accessReducedMotion"
                                >

                                <span></span>

                            </label>

                        </div>


                    </div>

                </section>


                <!-- NAVIGATION -->
                <section class="accessibility-section">

                    <div class="accessibility-section-heading">

                        <div>

                            <span class="accessibility-label">
                                NAVIGATION
                            </span>

                            <h2>
                                Navigation assistance
                            </h2>

                            <p>
                                Make interacting with AURA
                                easier and more predictable.
                            </p>

                        </div>

                    </div>


                    <div class="accessibility-options">


                        <div class="accessibility-option">

                            <div class="accessibility-option-icon">
                                ⌨
                            </div>

                            <div class="accessibility-option-content">

                                <strong>
                                    Keyboard navigation
                                </strong>

                                <span>
                                    Highlight interactive elements
                                    when navigating with a keyboard.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="keyboardNavigation"
                                    checked
                                >

                                <span></span>

                            </label>

                        </div>


                        <div class="accessibility-option">

                            <div class="accessibility-option-icon">
                                ✦
                            </div>

                            <div class="accessibility-option-content">

                                <strong>
                                    Focus indicators
                                </strong>

                                <span>
                                    Display a clear outline around
                                    focused controls.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="focusIndicators"
                                    checked
                                >

                                <span></span>

                            </label>

                        </div>


                    </div>

                </section>


                <!-- VOICE TEST -->
                <section class="accessibility-test">

                    <div>

                        <span class="accessibility-label">
                            TEST
                        </span>

                        <h2>
                            Test your accessibility settings
                        </h2>

                        <p>
                            Use the controls below to check
                            how AURA responds.
                        </p>

                    </div>


                    <div class="accessibility-test-buttons">

                        <button
                            id="testSpeech"
                            class="accessibility-test-button"
                        >
                            🔊 Test speech
                        </button>

                        <button
                            id="testVoice"
                            class="accessibility-test-button secondary"
                        >
                            🎙 Test microphone
                        </button>

                    </div>

                </section>


                <!-- SAVE -->
                <section class="accessibility-save-area">

                    <div>

                        <strong>
                            Accessibility preferences
                        </strong>

                        <p>
                            Your preferences are stored
                            locally for now. Backend
                            synchronization will be added later.
                        </p>

                    </div>


                    <button
                        id="saveAccessibility"
                        class="accessibility-save-button"
                    >
                        Save changes
                    </button>

                </section>


            </section>

        </main>

    </div>
`


/* =========================================
   ELEMENTS
   ========================================= */

const accessVoice =
    document.querySelector('#accessVoice')

const accessSpeech =
    document.querySelector('#accessSpeech')

const showCommands =
    document.querySelector('#showCommands')

const accessContrast =
    document.querySelector('#accessContrast')

const accessLargeText =
    document.querySelector('#accessLargeText')

const accessReducedMotion =
    document.querySelector('#accessReducedMotion')

const keyboardNavigation =
    document.querySelector('#keyboardNavigation')

const focusIndicators =
    document.querySelector('#focusIndicators')

const saveAccessibility =
    document.querySelector('#saveAccessibility')

const saveAccessibilityTop =
    document.querySelector('#saveAccessibilityTop')


/* =========================================
   LOCAL STORAGE
   ========================================= */

const savedAccessibility =
    JSON.parse(
        localStorage.getItem(
            'auraAccessibility'
        ) || '{}'
    )


/* =========================================
   LOAD SETTINGS
   ========================================= */

function loadAccessibilitySettings() {

    const settings = [
        'accessVoice',
        'accessSpeech',
        'showCommands',
        'accessContrast',
        'accessLargeText',
        'accessReducedMotion',
        'keyboardNavigation',
        'focusIndicators'
    ]


    settings.forEach((id) => {

        const element =
            document.querySelector(`#${id}`)

        if (
            typeof savedAccessibility[id] ===
            'boolean'
        ) {

            element.checked =
                savedAccessibility[id]

        }

    })


    applyAccessibilitySettings()
}


/* =========================================
   APPLY SETTINGS
   ========================================= */

function applyAccessibilitySettings() {

    document.body.classList.toggle(
        'accessibility-high-contrast',
        accessContrast.checked
    )


    document.body.classList.toggle(
        'accessibility-large-text',
        accessLargeText.checked
    )


    document.body.classList.toggle(
        'accessibility-reduced-motion',
        accessReducedMotion.checked
    )


    document.body.classList.toggle(
        'keyboard-navigation-enabled',
        keyboardNavigation.checked
    )


    document.body.classList.toggle(
        'focus-indicators-enabled',
        focusIndicators.checked
    )
}


/* =========================================
   SAVE SETTINGS
   ========================================= */

function saveSettings() {

    const settings = {

        accessVoice:
            accessVoice.checked,

        accessSpeech:
            accessSpeech.checked,

        showCommands:
            showCommands.checked,

        accessContrast:
            accessContrast.checked,

        accessLargeText:
            accessLargeText.checked,

        accessReducedMotion:
            accessReducedMotion.checked,

        keyboardNavigation:
            keyboardNavigation.checked,

        focusIndicators:
            focusIndicators.checked

    }


    localStorage.setItem(
        'auraAccessibility',
        JSON.stringify(settings)
    )


    applyAccessibilitySettings()

    showSavedMessage()
}


/* =========================================
   SAVE MESSAGE
   ========================================= */

function showSavedMessage() {

    const original =
        saveAccessibility.textContent

    saveAccessibility.textContent =
        '✓ Saved'

    saveAccessibility.classList.add(
        'saved'
    )


    setTimeout(() => {

        saveAccessibility.textContent =
            original

        saveAccessibility.classList.remove(
            'saved'
        )

    }, 1800)
}


/* =========================================
   QUICK ACTIONS
   ========================================= */

const quickReadPage =
    document.querySelector('#quickReadPage')

const quickContrast =
    document.querySelector('#quickContrast')

const quickLargeText =
    document.querySelector('#quickLargeText')


quickContrast.addEventListener(
    'click',
    () => {

        accessContrast.checked =
            !accessContrast.checked

        applyAccessibilitySettings()

    }
)


quickLargeText.addEventListener(
    'click',
    () => {

        accessLargeText.checked =
            !accessLargeText.checked

        applyAccessibilitySettings()

    }
)


/* =========================================
   TEXT TO SPEECH
   ========================================= */

function speakPage() {

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
            '.accessibility-content'
        ).innerText


    const utterance =
        new SpeechSynthesisUtterance(text)


    utterance.rate = 0.9

    utterance.pitch = 1

    utterance.volume = 1


    window.speechSynthesis.speak(
        utterance
    )
}


quickReadPage.addEventListener(
    'click',
    speakPage
)


/* =========================================
   TEST SPEECH
   ========================================= */

document
    .querySelector('#testSpeech')
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


            const speech =
                new SpeechSynthesisUtterance(
                    'Hello. This is AURA. Your speech accessibility feature is working.'
                )


            speech.rate = 0.9

            speech.pitch = 1

            speech.volume = 1


            window.speechSynthesis.cancel()

            window.speechSynthesis.speak(
                speech
            )

        }
    )


/* =========================================
   MICROPHONE TEST
   ========================================= */

document
    .querySelector('#testVoice')
    .addEventListener(
        'click',
        async () => {

            if (
                !navigator.mediaDevices ||
                !navigator.mediaDevices.getUserMedia
            ) {

                alert(
                    'Microphone access is not supported by this browser.'
                )

                return

            }


            try {

                const stream =
                    await navigator.mediaDevices
                        .getUserMedia({
                            audio: true
                        })


                stream
                    .getTracks()
                    .forEach(
                        track =>
                            track.stop()
                    )


                alert(
                    'Microphone access is working.'
                )

            } catch (error) {

                alert(
                    'Microphone permission was not granted.'
                )

            }

        }
    )


/* =========================================
   LIVE ACCESSIBILITY
   ========================================= */

accessContrast.addEventListener(
    'change',
    applyAccessibilitySettings
)


accessLargeText.addEventListener(
    'change',
    applyAccessibilitySettings
)


accessReducedMotion.addEventListener(
    'change',
    applyAccessibilitySettings
)


keyboardNavigation.addEventListener(
    'change',
    applyAccessibilitySettings
)


focusIndicators.addEventListener(
    'change',
    applyAccessibilitySettings
)


/* =========================================
   SAVE EVENTS
   ========================================= */

saveAccessibility.addEventListener(
    'click',
    saveSettings
)


saveAccessibilityTop.addEventListener(
    'click',
    saveSettings
)


/* =========================================
   LOGOUT
   ========================================= */

document
    .querySelector('#accessibilityLogout')
    .addEventListener(
        'click',
        () => {

            window.location.href =
                '/pages/login.html'

        }
    )


/* =========================================
   INITIALIZE
   ========================================= */

loadAccessibilitySettings()