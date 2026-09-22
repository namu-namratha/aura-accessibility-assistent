import '../style.css'

const app = document.querySelector('#settings-app')

app.innerHTML = `
    <div class="settings-page">

        <!-- SIDEBAR -->
        <aside class="settings-sidebar">

            <div class="settings-brand">
                <div class="settings-brand-icon">A</div>
                <span>AURA</span>
            </div>

            <nav class="settings-nav">

                <a href="/pages/dashboard.html">
                    <span>⌂</span>
                    Dashboard
                </a>

                <a href="/pages/dashboard.html#assistant">
                    <span>◉</span>
                    Voice Assistant
                </a>

                <a href="/pages/dashboard.html#accessibility">
                    <span>♿</span>
                    Accessibility
                </a>

                <a href="/pages/dashboard.html#activity">
                    <span>◷</span>
                    Activity
                </a>

                <a href="/pages/settings.html" class="active">
                    <span>⚙</span>
                    Settings
                </a>

            </nav>

            <div class="settings-sidebar-bottom">

                <button id="settingsLogout">
                    <span>↪</span>
                    Log out
                </button>

            </div>

        </aside>


        <!-- MAIN -->
        <main class="settings-main">

            <!-- TOP BAR -->
            <header class="settings-topbar">

                <div class="settings-mobile-brand">
                    <div class="settings-brand-icon">
                        A
                    </div>

                    <span>AURA</span>
                </div>

                <div class="settings-page-title">
                    <span>CONTROL CENTER</span>
                    <h1>Settings</h1>
                </div>

                <button
                    class="settings-save-top"
                    id="saveSettingsTop"
                >
                    Save changes
                </button>

            </header>


            <!-- CONTENT -->
            <section class="settings-content">

                <!-- PROFILE -->
                <section class="settings-section">

                    <div class="settings-section-heading">

                        <div>
                            <span class="settings-label">
                                ACCOUNT
                            </span>

                            <h2>
                                Profile
                            </h2>

                            <p>
                                Manage your AURA profile information.
                            </p>
                        </div>

                    </div>


                    <div class="profile-card">

                        <div class="profile-avatar">
                            U
                        </div>

                        <div class="profile-details">

                            <strong id="profileName">
                                AURA User
                            </strong>

                            <span>
                                AURA member
                            </span>

                        </div>

                        <button
                            class="secondary-settings-button"
                            id="editProfileButton"
                        >
                            Edit profile
                        </button>

                    </div>


                    <div class="settings-form-grid">

                        <div class="settings-field">

                            <label for="fullName">
                                Full name
                            </label>

                            <input
                                type="text"
                                id="fullName"
                                value="AURA User"
                                placeholder="Your full name"
                            >

                        </div>


                        <div class="settings-field">

                            <label for="email">
                                Email address
                            </label>

                            <input
                                type="email"
                                id="email"
                                value="user@example.com"
                                placeholder="Your email"
                            >

                        </div>

                    </div>

                </section>


                <!-- VOICE -->
                <section class="settings-section">

                    <div class="settings-section-heading">

                        <div>
                            <span class="settings-label">
                                VOICE
                            </span>

                            <h2>
                                Voice preferences
                            </h2>

                            <p>
                                Customize how AURA speaks and listens.
                            </p>
                        </div>

                    </div>


                    <div class="settings-options">

                        <div class="settings-option">

                            <div class="settings-option-icon">
                                🎙
                            </div>

                            <div class="settings-option-content">

                                <strong>
                                    Voice assistant
                                </strong>

                                <span>
                                    Allow AURA to listen for
                                    voice commands.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="voiceEnabled"
                                    checked
                                >

                                <span></span>

                            </label>

                        </div>


                        <div class="settings-option">

                            <div class="settings-option-icon">
                                🔊
                            </div>

                            <div class="settings-option-content">

                                <strong>
                                    Spoken responses
                                </strong>

                                <span>
                                    Let AURA respond using
                                    text-to-speech.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="speechEnabled"
                                    checked
                                >

                                <span></span>

                            </label>

                        </div>


                        <div class="settings-option">

                            <div class="settings-option-icon">
                                ⚡
                            </div>

                            <div class="settings-option-content">

                                <strong>
                                    Listening feedback
                                </strong>

                                <span>
                                    Show visual feedback while
                                    AURA is listening.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="listeningFeedback"
                                    checked
                                >

                                <span></span>

                            </label>

                        </div>

                    </div>

                </section>


                <!-- ACCESSIBILITY -->
                <section class="settings-section">

                    <div class="settings-section-heading">

                        <div>
                            <span class="settings-label">
                                ACCESSIBILITY
                            </span>

                            <h2>
                                Accessibility preferences
                            </h2>

                            <p>
                                Adjust the interface to make
                                AURA easier to use.
                            </p>
                        </div>

                    </div>


                    <div class="settings-options">

                        <div class="settings-option">

                            <div class="settings-option-icon">
                                ◐
                            </div>

                            <div class="settings-option-content">

                                <strong>
                                    High contrast
                                </strong>

                                <span>
                                    Increase contrast between
                                    interface elements.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="highContrast"
                                >

                                <span></span>

                            </label>

                        </div>


                        <div class="settings-option">

                            <div class="settings-option-icon">
                                Aa
                            </div>

                            <div class="settings-option-content">

                                <strong>
                                    Larger text
                                </strong>

                                <span>
                                    Increase the size of interface
                                    text.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="largeText"
                                >

                                <span></span>

                            </label>

                        </div>


                        <div class="settings-option">

                            <div class="settings-option-icon">
                                ↕
                            </div>

                            <div class="settings-option-content">

                                <strong>
                                    Reduced motion
                                </strong>

                                <span>
                                    Reduce animations and
                                    movement throughout AURA.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="reducedMotion"
                                >

                                <span></span>

                            </label>

                        </div>

                    </div>

                </section>


                <!-- NOTIFICATIONS -->
                <section class="settings-section">

                    <div class="settings-section-heading">

                        <div>
                            <span class="settings-label">
                                NOTIFICATIONS
                            </span>

                            <h2>
                                Notifications
                            </h2>

                            <p>
                                Choose which updates AURA can show.
                            </p>
                        </div>

                    </div>


                    <div class="settings-options">

                        <div class="settings-option">

                            <div class="settings-option-icon">
                                🔔
                            </div>

                            <div class="settings-option-content">

                                <strong>
                                    Notifications
                                </strong>

                                <span>
                                    Receive useful updates from
                                    AURA.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="notifications"
                                    checked
                                >

                                <span></span>

                            </label>

                        </div>


                        <div class="settings-option">

                            <div class="settings-option-icon">
                                💡
                            </div>

                            <div class="settings-option-content">

                                <strong>
                                    Accessibility tips
                                </strong>

                                <span>
                                    Receive suggestions for using
                                    AURA's accessibility features.
                                </span>

                            </div>

                            <label class="aura-switch">

                                <input
                                    type="checkbox"
                                    id="accessibilityTips"
                                    checked
                                >

                                <span></span>

                            </label>

                        </div>

                    </div>

                </section>


                <!-- SECURITY -->
                <section class="settings-section">

                    <div class="settings-section-heading">

                        <div>
                            <span class="settings-label">
                                SECURITY
                            </span>

                            <h2>
                                Account security
                            </h2>

                            <p>
                                Manage your account protection.
                            </p>
                        </div>

                    </div>


                    <div class="security-card">

                        <div>

                            <strong>
                                Password
                            </strong>

                            <span>
                                Keep your password secure and
                                up to date.
                            </span>

                        </div>

                        <button
                            class="secondary-settings-button"
                            id="changePassword"
                        >
                            Change password
                        </button>

                    </div>

                </section>


                <!-- SAVE AREA -->
                <section class="settings-save-area">

                    <div>

                        <strong>
                            Your preferences
                        </strong>

                        <p>
                            Changes are currently stored only
                            in this browser. Backend storage
                            will be connected later.
                        </p>

                    </div>

                    <button
                        class="settings-save-button"
                        id="saveSettings"
                    >
                        Save changes
                    </button>

                </section>


                <!-- DANGER ZONE -->
                <section class="settings-danger">

                    <div>

                        <span>
                            ACCOUNT
                        </span>

                        <h2>
                            Log out of AURA
                        </h2>

                        <p>
                            End your current AURA session.
                        </p>

                    </div>

                    <button id="dangerLogout">
                        Log out
                    </button>

                </section>

            </section>

        </main>

    </div>
`


/* =========================================
   ELEMENTS
   ========================================= */

const fullName =
    document.querySelector('#fullName')

const email =
    document.querySelector('#email')

const profileName =
    document.querySelector('#profileName')

const saveSettings =
    document.querySelector('#saveSettings')

const saveSettingsTop =
    document.querySelector('#saveSettingsTop')

const editProfileButton =
    document.querySelector('#editProfileButton')

const changePassword =
    document.querySelector('#changePassword')

const settingsLogout =
    document.querySelector('#settingsLogout')

const dangerLogout =
    document.querySelector('#dangerLogout')

const highContrast =
    document.querySelector('#highContrast')

const largeText =
    document.querySelector('#largeText')

const reducedMotion =
    document.querySelector('#reducedMotion')


/* =========================================
   LOCAL STORAGE
   ========================================= */

const savedSettings =
    JSON.parse(
        localStorage.getItem(
            'auraSettings'
        ) || '{}'
    )


function loadSettings() {

    if (savedSettings.name) {

        fullName.value =
            savedSettings.name

        profileName.textContent =
            savedSettings.name

    }


    if (savedSettings.email) {

        email.value =
            savedSettings.email

    }


    const checkboxIds = [
        'voiceEnabled',
        'speechEnabled',
        'listeningFeedback',
        'highContrast',
        'largeText',
        'reducedMotion',
        'notifications',
        'accessibilityTips'
    ]


    checkboxIds.forEach((id) => {

        const element =
            document.querySelector(`#${id}`)

        if (
            typeof savedSettings[id] ===
            'boolean'
        ) {

            element.checked =
                savedSettings[id]

        }

    })


    applyAccessibilitySettings()
}


/* =========================================
   SAVE SETTINGS
   ========================================= */

function saveAllSettings() {

    const settings = {

        name:
            fullName.value.trim(),

        email:
            email.value.trim(),

        voiceEnabled:
            document.querySelector(
                '#voiceEnabled'
            ).checked,

        speechEnabled:
            document.querySelector(
                '#speechEnabled'
            ).checked,

        listeningFeedback:
            document.querySelector(
                '#listeningFeedback'
            ).checked,

        highContrast:
            document.querySelector(
                '#highContrast'
            ).checked,

        largeText:
            document.querySelector(
                '#largeText'
            ).checked,

        reducedMotion:
            document.querySelector(
                '#reducedMotion'
            ).checked,

        notifications:
            document.querySelector(
                '#notifications'
            ).checked,

        accessibilityTips:
            document.querySelector(
                '#accessibilityTips'
            ).checked
    }


    localStorage.setItem(
        'auraSettings',
        JSON.stringify(settings)
    )


    profileName.textContent =
        settings.name || 'AURA User'


    applyAccessibilitySettings()


    showSavedMessage()
}


/* =========================================
   ACCESSIBILITY SETTINGS
   ========================================= */

function applyAccessibilitySettings() {

    document.body.classList.toggle(
        'settings-high-contrast',
        highContrast.checked
    )


    document.body.classList.toggle(
        'settings-large-text',
        largeText.checked
    )


    document.body.classList.toggle(
        'settings-reduced-motion',
        reducedMotion.checked
    )
}


/* =========================================
   SAVE MESSAGE
   ========================================= */

function showSavedMessage() {

    const originalText =
        saveSettings.textContent

    saveSettings.textContent =
        '✓ Saved'

    saveSettings.classList.add(
        'settings-saved'
    )


    setTimeout(() => {

        saveSettings.textContent =
            originalText

        saveSettings.classList.remove(
            'settings-saved'
        )

    }, 1800)
}


/* =========================================
   EDIT PROFILE
   ========================================= */

editProfileButton.addEventListener(
    'click',
    () => {

        fullName.focus()

        fullName.select()

    }
)


/* =========================================
   CHANGE PASSWORD
   ========================================= */

changePassword.addEventListener(
    'click',
    () => {

        alert(
            'Password change will be connected to the backend authentication system later.'
        )

    }
)


/* =========================================
   LOGOUT
   ========================================= */

function logout() {

    window.location.href =
        '/pages/login.html'

}


settingsLogout.addEventListener(
    'click',
    logout
)


dangerLogout.addEventListener(
    'click',
    logout
)


/* =========================================
   SAVE EVENTS
   ========================================= */

saveSettings.addEventListener(
    'click',
    saveAllSettings
)


saveSettingsTop.addEventListener(
    'click',
    saveAllSettings
)


/* =========================================
   LIVE ACCESSIBILITY PREVIEW
   ========================================= */

highContrast.addEventListener(
    'change',
    applyAccessibilitySettings
)


largeText.addEventListener(
    'change',
    applyAccessibilitySettings
)


reducedMotion.addEventListener(
    'change',
    applyAccessibilitySettings
)


/* =========================================
   INITIALIZE
   ========================================= */

loadSettings()