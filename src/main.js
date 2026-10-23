const STORAGE_KEYS = {
    profile: "aura_profile_v2",
    settings: "aura_settings_v2",
    activity: "aura_activity_v2"
};

const DEFAULT_PROFILE = {
    name: "User",
    email: "",
    preferredMode: "standard"
};

const DEFAULT_SETTINGS = {
    darkMode: true,
    highContrast: false,
    largeText: false,
    reduceMotion: false,
    voiceEnabled: true,
    speechRate: 1,
    fontSize: 16
};

const PAGE_TITLES = {
    dashboard: "Dashboard",
    assistant: "AI Assistant",
    voice: "Voice Assistant",
    gestures: "Gesture Controls",
    accessibility: "Accessibility",
    activity: "Activity",
    profile: "My Profile",
    settings: "Settings"
};

const state = {
    currentPage: "dashboard",
    recognition: null,
    listening: false,
    cameraStream: null,
    cameraActive: false
};

function readStorage(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : structuredClone(fallback);
    } catch (error) {
        console.error("Could not read saved data:", error);
        return structuredClone(fallback);
    }
}

const profile = readStorage(STORAGE_KEYS.profile, DEFAULT_PROFILE);
const settings = readStorage(STORAGE_KEYS.settings, DEFAULT_SETTINGS);
const activity = readStorage(STORAGE_KEYS.activity, []);

function saveProfile() {
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
}

function saveSettings() {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function saveActivity() {
    localStorage.setItem(STORAGE_KEYS.activity, JSON.stringify(activity));
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");

    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    window.setTimeout(() => {
        toast.classList.add("toast-visible");
    }, 10);

    window.setTimeout(() => {
        toast.classList.remove("toast-visible");

        window.setTimeout(() => toast.remove(), 250);
    }, 3200);
}

function logActivity(title, description = "") {
    activity.unshift({
        id: Date.now(),
        title,
        description,
        date: new Date().toISOString()
    });

    activity.splice(100);
    saveActivity();
}

function applySettings() {
    document.body.classList.toggle(
        "high-contrast",
        Boolean(settings.highContrast)
    );

    document.body.classList.toggle(
        "large-text",
        Boolean(settings.largeText)
    );

    document.body.classList.toggle(
        "reduce-motion",
        Boolean(settings.reduceMotion)
    );

    document.documentElement.style.setProperty(
        "--base-font-size",
        `${Number(settings.fontSize) || 16}px`
    );

    document.body.dataset.theme = settings.darkMode ? "dark" : "light";
}

function updateUserDetails() {
    const name = profile.name || "User";
    const initial = name.trim().charAt(0).toUpperCase() || "U";

    const nameElement = document.getElementById("sidebarUserName");
    const avatarElement = document.getElementById("sidebarAvatar");

    if (nameElement) nameElement.textContent = name;
    if (avatarElement) avatarElement.textContent = initial;
}

function updateDate() {
    const dateElement = document.getElementById("currentDate");

    if (!dateElement) return;

    dateElement.textContent = new Intl.DateTimeFormat(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    }).format(new Date());
}

function setPage(page) {
    if (!PAGE_TITLES[page]) {
        page = "dashboard";
    }

    stopListening();
    state.currentPage = page;

    document.querySelectorAll(".nav-item").forEach(button => {
        button.classList.toggle("active", button.dataset.page === page);
    });

    const title = PAGE_TITLES[page];

    document.getElementById("pageTitle").textContent = title;
    document.getElementById("breadcrumbPage").textContent = title;

    document.getElementById("sidebar").classList.remove("sidebar-open");

    renderPage(page);
}

function renderPage(page) {
    const container = document.getElementById("pageContent");

    const pages = {
        dashboard: renderDashboard,
        assistant: renderAssistant,
        voice: renderVoiceAssistant,
        gestures: renderGestures,
        accessibility: renderAccessibility,
        activity: renderActivity,
        profile: renderProfile,
        settings: renderSettings
    };

    container.innerHTML = pages[page]();
    attachPageEvents(page);
}

function renderDashboard() {
    const today = new Date();
    const hour = today.getHours();

    let greeting = "Good evening";

    if (hour < 12) greeting = "Good morning";
    else if (hour < 17) greeting = "Good afternoon";

    const name = escapeHTML(profile.name || "User");

    return `
        <section class="welcome-banner">
            <div class="welcome-content">
                <span class="eyebrow">YOUR PERSONAL ACCESSIBILITY SPACE</span>

                <h1>${greeting}, ${name} <span>✦</span></h1>

                <p>
                    Welcome to AURA. Explore your assistant, voice tools,
                    and accessibility preferences from one place.
                </p>

                <button class="primary-button" data-go="assistant">
                    Open AI Assistant <span>→</span>
                </button>
            </div>

            <div class="welcome-visual" aria-hidden="true">
                <div class="orb-ring ring-one"></div>
                <div class="orb-ring ring-two"></div>
                <div class="aura-orb">A</div>
                <div class="orb-caption">AURA 2.0</div>
            </div>
        </section>

        <div class="section-heading">
            <div>
                <span class="eyebrow">QUICK ACCESS</span>
                <h2>Your workspace</h2>
            </div>

            <span class="muted-text">Choose a tool to get started</span>
        </div>

        <section class="feature-grid">
            <button class="feature-card" data-go="assistant">
                <div class="feature-icon purple">✦</div>
                <h3>AI Assistant</h3>
                <p>Ask questions and get helpful local guidance.</p>
                <span class="feature-link">Open assistant →</span>
            </button>

            <button class="feature-card" data-go="voice">
                <div class="feature-icon blue">♫</div>
                <h3>Voice Assistant</h3>
                <p>Use speech recognition and spoken responses.</p>
                <span class="feature-link">Try voice →</span>
            </button>

            <button class="feature-card" data-go="gestures">
                <div class="feature-icon pink">☝</div>
                <h3>Gesture Controls</h3>
                <p>Preview your camera for future gesture controls.</p>
                <span class="feature-link">Open controls →</span>
            </button>

            <button class="feature-card" data-go="accessibility">
                <div class="feature-icon green">◎</div>
                <h3>Accessibility</h3>
                <p>Adjust contrast, text size, and motion preferences.</p>
                <span class="feature-link">Customize →</span>
            </button>
        </section>

        <div class="section-heading section-heading-spaced">
            <div>
                <span class="eyebrow">YOUR ACTIVITY</span>
                <h2>Recent activity</h2>
            </div>

            <button class="text-button" data-go="activity">View all →</button>
        </div>

        <section class="panel">
            ${activity.length ? activity.slice(0, 4).map(item => `
                <div class="activity-row">
                    <div class="activity-indicator">•</div>

                    <div class="activity-copy">
                        <strong>${escapeHTML(item.title)}</strong>
                        <p>${escapeHTML(item.description || "AURA activity")}</p>
                    </div>

                    <time>${formatTime(item.date)}</time>
                </div>
            `).join("") : `
                <div class="empty-state">
                    <div class="empty-icon">◷</div>
                    <h3>Your activity will appear here</h3>
                    <p>Start using AURA tools to build your activity history.</p>
                </div>
            `}
        </section>

        <p class="disclaimer">
            Note: The assistant currently uses built-in local responses.
            It is not connected to a live AI service yet.
        </p>
    `;
}

function renderAssistant() {
    return `
        <section class="page-intro">
            <span class="eyebrow">YOUR CONVERSATION SPACE</span>
            <h1>How can I help you?</h1>
            <p>Ask a question or choose a suggested topic to begin.</p>
        </section>

        <section class="chat-panel panel">
            <div class="chat-header">
                <div class="assistant-avatar">A</div>

                <div>
                    <h3>AURA Assistant</h3>
                    <p><span class="status-dot"></span> Local assistant active</p>
                </div>

                <button class="secondary-button" id="clearChat">Clear chat</button>
            </div>

            <div class="chat-messages" id="chatMessages" aria-live="polite">
                <div class="message assistant-message">
                    <div class="message-avatar">A</div>

                    <div class="message-body">
                        <strong>AURA</strong>
                        <p>
                            Hello! I'm AURA. I can help you explore the
                            interface and explain the available tools.
                            What would you like to do?
                        </p>
                    </div>
                </div>
            </div>

            <div class="suggestion-list">
                <button class="suggestion-chip" data-prompt="What can you do?">
                    What can you do?
                </button>

                <button class="suggestion-chip" data-prompt="Help me with accessibility">
                    Accessibility help
                </button>

                <button class="suggestion-chip" data-prompt="How do I use voice controls?">
                    Voice controls
                </button>
            </div>

            <form class="chat-form" id="chatForm">
                <label class="sr-only" for="chatInput">Your message</label>

                <input
                    id="chatInput"
                    type="text"
                    placeholder="Type your message..."
                    autocomplete="off"
                    required
                >

                <button class="primary-button" type="submit">
                    Send <span>↑</span>
                </button>
            </form>

            <p class="chat-disclaimer">
                This is a local demonstration assistant, not a live AI model.
            </p>
        </section>
    `;
}

function renderVoiceAssistant() {
    const supported = Boolean(
        window.SpeechRecognition || window.webkitSpeechRecognition
    );

    return `
        <section class="page-intro">
            <span class="eyebrow">HANDS-FREE INTERACTION</span>
            <h1>Voice Assistant</h1>
            <p>Speak to AURA using your browser's speech features.</p>
        </section>

        <section class="voice-layout">
            <div class="panel voice-main-panel">
                <div class="voice-orb-container">
                    <div class="voice-ring"></div>
                    <div class="voice-orb" id="voiceOrb">♫</div>
                </div>

                <span class="eyebrow">VOICE CONTROL</span>
                <h2 id="voiceStatus">Ready to listen</h2>

                <p id="voiceDescription">
                    Press the microphone button and allow microphone access
                    when your browser asks.
                </p>

                <button class="primary-button microphone-button" id="voiceStart">
                    <span>🎙</span> Start listening
                </button>

                <button class="secondary-button" id="voiceStop" hidden>
                    Stop listening
                </button>

                <div class="voice-transcript" id="voiceTranscript">
                    Your recognized speech will appear here.
                </div>

                ${supported ? "" : `
                    <div class="notice notice-warning">
                        Speech recognition is not supported by this browser.
                        Try a compatible browser.
                    </div>
                `}
            </div>

            <div class="panel voice-help-panel">
                <span class="eyebrow">EXAMPLES</span>
                <h3>Try saying</h3>

                <div class="voice-example">
                    <span>01</span>
                    <p>What can you do?</p>
                </div>

                <div class="voice-example">
                    <span>02</span>
                    <p>Open accessibility settings</p>
                </div>

                <div class="voice-example">
                    <span>03</span>
                    <p>Open my profile</p>
                </div>

                <div class="voice-example">
                    <span>04</span>
                    <p>Go to the dashboard</p>
                </div>

                <div class="notice">
                    Speech recognition depends on your browser, microphone
                    permissions, and language settings.
                </div>
            </div>
        </section>
    `;
}

function renderGestures() {
    return `
        <section class="page-intro">
            <span class="eyebrow">CAMERA INTERACTION</span>
            <h1>Gesture Controls</h1>
            <p>Check camera access before adding gesture recognition.</p>
        </section>

        <section class="gesture-layout">
            <div class="panel camera-panel">
                <div class="camera-frame" id="cameraFrame">
                    <video id="cameraVideo" autoplay playsinline muted hidden></video>

                    <div class="camera-placeholder" id="cameraPlaceholder">
                        <div class="camera-placeholder-icon">▣</div>
                        <h3>Camera preview</h3>
                        <p>Your camera preview will appear here after permission is granted.</p>
                    </div>

                    <div class="camera-status">
                        <span class="status-dot" id="cameraStatusDot"></span>
                        <span id="cameraStatusText">Camera off</span>
                    </div>
                </div>

                <div class="camera-actions">
                    <button class="primary-button" id="cameraStart">
                        Enable camera
                    </button>

                    <button class="secondary-button" id="cameraStop" disabled>
                        Stop camera
                    </button>
                </div>
            </div>

            <div class="panel gesture-info-panel">
                <span class="eyebrow">GESTURE MODULE</span>
                <h3>Recognition status</h3>

                <div class="status-card">
                    <span class="status-indicator"></span>

                    <div>
                        <strong>Camera preview only</strong>
                        <p>No gesture model is connected yet.</p>
                    </div>
                </div>

                <h3>Planned controls</h3>

                <ul class="check-list">
                    <li>Hand gesture navigation</li>
                    <li>Gesture-based interaction</li>
                    <li>Accessibility-friendly alternatives</li>
                    <li>Visual feedback for detected gestures</li>
                </ul>

                <div class="notice notice-warning">
                    Enabling the camera does not detect or recognize gestures.
                    Gesture recognition requires a separate computer-vision
                    model and implementation.
                </div>
            </div>
        </section>
    `;
}

function renderAccessibility() {
    return `
        <section class="page-intro">
            <span class="eyebrow">MAKE AURA WORK FOR YOU</span>
            <h1>Accessibility</h1>
            <p>Adjust visual preferences for this application.</p>
        </section>

        <section class="settings-grid">
            <div class="panel settings-panel">
                <div class="settings-panel-heading">
                    <div class="feature-icon purple">◐</div>

                    <div>
                        <h3>Display preferences</h3>
                        <p>Choose how AURA appears on your screen.</p>
                    </div>
                </div>

                ${toggleRow(
                    "darkMode",
                    "Dark appearance",
                    "Use the dark theme across AURA.",
                    settings.darkMode
                )}

                ${toggleRow(
                    "highContrast",
                    "High contrast",
                    "Increase contrast for text and interface elements.",
                    settings.highContrast
                )}

                ${toggleRow(
                    "largeText",
                    "Large text",
                    "Increase text size across the interface.",
                    settings.largeText
                )}

                ${toggleRow(
                    "reduceMotion",
                    "Reduce motion",
                    "Reduce interface animations and transitions.",
                    settings.reduceMotion
                )}
            </div>

            <div class="panel settings-panel">
                <div class="settings-panel-heading">
                    <div class="feature-icon blue">♫</div>

                    <div>
                        <h3>Speech preferences</h3>
                        <p>Adjust spoken responses.</p>
                    </div>
                </div>

                ${toggleRow(
                    "voiceEnabled",
                    "Voice responses",
                    "Allow AURA to speak supported responses.",
                    settings.voiceEnabled
                )}

                <div class="range-setting">
                    <div>
                        <strong>Speech rate</strong>
                        <p>Adjust how quickly speech is spoken.</p>
                    </div>

                    <label for="speechRate">
                        <span id="speechRateValue">${Number(settings.speechRate).toFixed(1)}×</span>
                    </label>

                    <input
                        type="range"
                        id="speechRate"
                        min="0.6"
                        max="1.6"
                        step="0.1"
                        value="${Number(settings.speechRate)}"
                    >
                </div>

                <button class="secondary-button full-width" id="testSpeech">
                    Test spoken response
                </button>
            </div>

            <div class="panel settings-panel">
                <div class="settings-panel-heading">
                    <div class="feature-icon green">Aa</div>

                    <div>
                        <h3>Text size</h3>
                        <p>Set your preferred base font size.</p>
                    </div>
                </div>

                <div class="range-setting">
                    <div>
                        <strong>Font size</strong>
                        <p>Choose a size between 14 and 22 pixels.</p>
                    </div>

                    <label for="fontSize">
                        <span id="fontSizeValue">${Number(settings.fontSize)}px</span>
                    </label>

                    <input
                        type="range"
                        id="fontSize"
                        min="14"
                        max="22"
                        step="1"
                        value="${Number(settings.fontSize)}"
                    >
                </div>

                <button class="secondary-button full-width" id="resetAccessibility">
                    Reset accessibility preferences
                </button>
            </div>
        </section>
    `;
}

function renderActivity() {
    return `
        <section class="page-intro">
            <span class="eyebrow">YOUR RECENT ACTIONS</span>
            <h1>Activity</h1>
            <p>Review actions recorded by this browser on this device.</p>
        </section>

        <section class="panel">
            <div class="panel-header">
                <div>
                    <h3>Activity history</h3>
                    <p>Saved locally in this browser.</p>
                </div>

                <button class="secondary-button" id="clearActivity">
                    Clear history
                </button>
            </div>

            ${activity.length ? activity.map(item => `
                <div class="activity-row">
                    <div class="activity-indicator">•</div>

                    <div class="activity-copy">
                        <strong>${escapeHTML(item.title)}</strong>
                        <p>${escapeHTML(item.description || "AURA activity")}</p>
                    </div>

                    <time>${formatDate(item.date)}</time>
                </div>
            `).join("") : `
                <div class="empty-state">
                    <div class="empty-icon">◷</div>
                    <h3>No activity yet</h3>
                    <p>Your recorded actions will appear here.</p>
                </div>
            `}
        </section>
    `;
}

function renderProfile() {
    return `
        <section class="page-intro">
            <span class="eyebrow">PERSONAL WORKSPACE</span>
            <h1>My Profile</h1>
            <p>Manage your local AURA profile.</p>
        </section>

        <section class="panel profile-panel">
            <div class="profile-heading">
                <div class="profile-avatar-large">
                    ${escapeHTML((profile.name || "U").trim().charAt(0).toUpperCase())}
                </div>

                <div>
                    <h2>${escapeHTML(profile.name || "User")}</h2>
                    <p>${escapeHTML(profile.email || "No email added")}</p>
                    <span class="badge">Local profile</span>
                </div>
            </div>

            <form id="profileForm" class="form-grid">
                <div class="form-field">
                    <label for="profileName">Display name</label>

                    <input
                        type="text"
                        id="profileName"
                        value="${escapeHTML(profile.name)}"
                        maxlength="80"
                        required
                    >
                </div>

                <div class="form-field">
                    <label for="profileEmail">Email address (optional)</label>

                    <input
                        type="email"
                        id="profileEmail"
                        value="${escapeHTML(profile.email)}"
                        maxlength="254"
                    >
                </div>

                <div class="form-field full-span">
                    <label for="preferredMode">Preferred interaction mode</label>

                    <select id="preferredMode">
                        <option value="standard" ${profile.preferredMode === "standard" ? "selected" : ""}>
                            Standard
                        </option>

                        <option value="voice" ${profile.preferredMode === "voice" ? "selected" : ""}>
                            Voice
                        </option>

                        <option value="visual" ${profile.preferredMode === "visual" ? "selected" : ""}>
                            Visual accessibility
                        </option>
                    </select>
                </div>

                <div class="form-actions full-span">
                    <button class="primary-button" type="submit">
                        Save profile
                    </button>
                </div>
            </form>

            <div class="notice">
                This profile is stored in your browser. It is not a secure
                account and does not synchronize across devices.
            </div>
        </section>
    `;
}

function renderSettings() {
    return `
        <section class="page-intro">
            <span class="eyebrow">YOUR PREFERENCES</span>
            <h1>Settings</h1>
            <p>Manage AURA's local preferences and saved browser data.</p>
        </section>

        <section class="settings-grid">
            <div class="panel settings-panel">
                <div class="settings-panel-heading">
                    <div class="feature-icon purple">⚙</div>

                    <div>
                        <h3>Appearance</h3>
                        <p>Personalize the interface.</p>
                    </div>
                </div>

                ${toggleRow(
                    "darkMode",
                    "Dark appearance",
                    "Use AURA's dark theme.",
                    settings.darkMode
                )}

                ${toggleRow(
                    "highContrast",
                    "High contrast",
                    "Improve visual contrast.",
                    settings.highContrast
                )}

                ${toggleRow(
                    "largeText",
                    "Large text",
                    "Increase the text size.",
                    settings.largeText
                )}
            </div>

            <div class="panel settings-panel">
                <div class="settings-panel-heading">
                    <div class="feature-icon blue">◉</div>

                    <div>
                        <h3>Application information</h3>
                        <p>Current demonstration configuration.</p>
                    </div>
                </div>

                <div class="info-row">
                    <span>Application</span>
                    <strong>AURA 2.0</strong>
                </div>

                <div class="info-row">
                    <span>Interface</span>
                    <strong>Vite + JavaScript</strong>
                </div>

                <div class="info-row">
                    <span>Profile storage</span>
                    <strong>Browser local storage</strong>
                </div>

                <div class="info-row">
                    <span>Live AI connection</span>
                    <strong class="warning-text">Not connected</strong>
                </div>

                <div class="info-row">
                    <span>MySQL database</span>
                    <strong class="warning-text">Not connected</strong>
                </div>
            </div>

            <div class="panel settings-panel">
                <div class="settings-panel-heading">
                    <div class="feature-icon pink">⌫</div>

                    <div>
                        <h3>Local data</h3>
                        <p>Clear information saved by this application.</p>
                    </div>
                </div>

                <p class="muted-text">
                    Clearing local data removes your saved profile,
                    preferences, and activity history from this browser.
                </p>

                <button class="danger-button" id="clearLocalData">
                    Clear local AURA data
                </button>
            </div>
        </section>
    `;
}

function toggleRow(key, title, description, checked) {
    return `
        <div class="toggle-row">
            <div class="toggle-copy">
                <strong>${escapeHTML(title)}</strong>
                <p>${escapeHTML(description)}</p>
            </div>

            <label class="switch">
                <input
                    type="checkbox"
                    data-setting="${escapeHTML(key)}"
                    ${checked ? "checked" : ""}
                    aria-label="${escapeHTML(title)}"
                >

                <span class="switch-slider"></span>
            </label>
        </div>
    `;
}

function formatTime(value) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function formatDate(value) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short"
    });
}

function attachPageEvents(page) {
    document.querySelectorAll("[data-go]").forEach(button => {
        button.addEventListener("click", () => {
            setPage(button.dataset.go);
        });
    });

    if (page === "assistant") {
        attachChatEvents();
    }

    if (page === "voice") {
        attachVoiceEvents();
    }

    if (page === "gestures") {
        attachCameraEvents();
    }

    if (page === "accessibility" || page === "settings") {
        attachSettingsEvents();
    }

    if (page === "activity") {
        attachActivityEvents();
    }

    if (page === "profile") {
        attachProfileEvents();
    }
}

/* Local assistant responses */

function getLocalAssistantResponse(message) {
    const text = message.toLowerCase().trim();

    if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(text)) {
        return "Hello! I'm AURA, your accessibility assistant. You can explore the AI Assistant, Voice Assistant, Gesture Controls, Accessibility, Activity, Profile, and Settings pages.";
    }

    if (
        text.includes("what can you do") ||
        text.includes("your features") ||
        text.includes("help me")
    ) {
        return "This demonstration includes a dashboard, local assistant responses, browser speech recognition, spoken responses, a camera preview, accessibility preferences, a local profile, and activity history. A live AI model, secure account system, database, and gesture-recognition model are not connected yet.";
    }

    if (text.includes("accessibility") || text.includes("contrast") || text.includes("font size")) {
        return "Open Accessibility from the sidebar. You can change the theme, enable high contrast, enlarge text, reduce motion, adjust speech rate, and test spoken responses.";
    }

    if (text.includes("voice") || text.includes("microphone") || text.includes("speak")) {
        return "Open Voice Assistant. Press Start listening and allow microphone permission if requested. Your browser must support speech recognition. You can also enable spoken responses in Accessibility settings.";
    }

    if (text.includes("gesture") || text.includes("camera")) {
        return "Open Gesture Controls and press Enable camera to preview your camera. This page does not recognize gestures yet; a computer-vision model must be added for that functionality.";
    }

    if (text.includes("profile") || text.includes("my name")) {
        return "Open My Profile to update your display name, optional email, and preferred interaction mode. These details are saved only in this browser.";
    }

    if (text.includes("setting")) {
        return "Open Settings to change appearance preferences or clear AURA's local browser data.";
    }

    if (text.includes("activity") || text.includes("history")) {
        return "Open Activity to review actions recorded in this browser. You can clear the history from that page.";
    }

    if (text.includes("database") || text.includes("mysql")) {
        return "MySQL is not connected in this frontend version. A backend API and database configuration are required before AURA can save information to MySQL.";
    }

    if (text.includes("ai") || text.includes("artificial intelligence")) {
        return "This assistant currently uses built-in local responses, not a live AI model. To support open-ended questions, we need to connect the backend to an AI provider and keep the API key on the server.";
    }

    if (text.includes("dashboard")) {
        return "You can return to the Dashboard using the sidebar. It contains quick links to the available AURA tools and your recent activity.";
    }

    return "I can currently answer a limited set of built-in questions about AURA's interface and features. A live AI service has not been connected, so I may not understand questions outside those topics.";
}

function appendChatMessage(message, sender) {
    const container = document.getElementById("chatMessages");

    if (!container) return;

    const row = document.createElement("div");
    row.className = `message ${sender === "user" ? "user-message" : "assistant-message"}`;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = sender === "user"
        ? (profile.name || "U").trim().charAt(0).toUpperCase()
        : "A";

    const body = document.createElement("div");
    body.className = "message-body";

    const label = document.createElement("strong");
    label.textContent = sender === "user" ? "You" : "AURA";

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    body.append(label, paragraph);
    row.append(avatar, body);
    container.appendChild(row);

    container.scrollTop = container.scrollHeight;
}

function sendChatMessage(message) {
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    appendChatMessage(cleanMessage, "user");

    const response = getLocalAssistantResponse(cleanMessage);

    window.setTimeout(() => {
        appendChatMessage(response, "assistant");

        if (settings.voiceEnabled) {
            speakText(response);
        }
    }, 250);

    logActivity("Used AI Assistant", cleanMessage.slice(0, 100));
}

function attachChatEvents() {
    const form = document.getElementById("chatForm");
    const input = document.getElementById("chatInput");
    const clearButton = document.getElementById("clearChat");

    form.addEventListener("submit", event => {
        event.preventDefault();

        const message = input.value;
        input.value = "";

        sendChatMessage(message);
    });

    document.querySelectorAll("[data-prompt]").forEach(button => {
        button.addEventListener("click", () => {
            sendChatMessage(button.dataset.prompt);
        });
    });

    clearButton.addEventListener("click", () => {
        document.getElementById("chatMessages").innerHTML = "";
        showToast("Conversation cleared.");
    });
}

/* Browser speech synthesis */

function speakText(text) {
    if (!settings.voiceEnabled) return;

    if (!("speechSynthesis" in window)) {
        showToast("Speech synthesis is not supported in this browser.", "error");
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(String(text));
    utterance.rate = Number(settings.speechRate) || 1;

    window.speechSynthesis.speak(utterance);
}

/* Browser speech recognition */

function attachVoiceEvents() {
    const startButton = document.getElementById("voiceStart");
    const stopButton = document.getElementById("voiceStop");

    startButton.addEventListener("click", startListening);
    stopButton.addEventListener("click", stopListening);
}

function startListening() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) {
        showToast("Speech recognition is not supported in this browser.", "error");
        return;
    }

    stopListening();

    const recognition = new Recognition();

    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
        state.listening = true;

        document.getElementById("voiceStatus").textContent = "Listening...";
        document.getElementById("voiceDescription").textContent =
            "Speak clearly. AURA will process the recognized words.";

        document.getElementById("voiceStart").hidden = true;
        document.getElementById("voiceStop").hidden = false;

        document.getElementById("voiceOrb").classList.add("voice-orb-active");
    };

    recognition.onresult = event => {
        const transcript = event.results[0][0].transcript;

        document.getElementById("voiceTranscript").textContent = transcript;

        const response = getLocalAssistantResponse(transcript);

        document.getElementById("voiceStatus").textContent = "Response ready";
        document.getElementById("voiceDescription").textContent = response;

        logActivity("Used Voice Assistant", transcript.slice(0, 100));

        if (settings.voiceEnabled) {
            speakText(response);
        }

        const normalized = transcript.toLowerCase();

        const navigationTargets = [
            ["dashboard", "dashboard"],
            ["assistant", "assistant"],
            ["voice", "voice"],
            ["gesture", "gestures"],
            ["accessibility", "accessibility"],
            ["activity", "activity"],
            ["profile", "profile"],
            ["settings", "settings"]
        ];

        for (const [keyword, page] of navigationTargets) {
            if (
                normalized.includes(`open ${keyword}`) ||
                normalized.includes(`go to ${keyword}`)
            ) {
                setPage(page);
                break;
            }
        }
    };

    recognition.onerror = event => {
        const message = event.error === "not-allowed"
            ? "Microphone permission was denied."
            : `Speech recognition error: ${event.error}`;

        showToast(message, "error");
    };

    recognition.onend = () => {
        state.listening = false;

        const status = document.getElementById("voiceStatus");
        const description = document.getElementById("voiceDescription");
        const start = document.getElementById("voiceStart");
        const stop = document.getElementById("voiceStop");
        const orb = document.getElementById("voiceOrb");

        if (status) status.textContent = "Ready to listen";

        if (description) {
            description.textContent = "Press the microphone button to speak again.";
        }

        if (start) start.hidden = false;
        if (stop) stop.hidden = true;
        if (orb) orb.classList.remove("voice-orb-active");
    };

    state.recognition = recognition;

    try {
        recognition.start();
    } catch (error) {
        console.error(error);
        showToast("Could not start speech recognition. Please try again.", "error");
    }
}

function stopListening() {
    if (state.recognition) {
        try {
            state.recognition.stop();
        } catch {
            // The recognition session may already have ended.
        }
    }

    state.recognition = null;
    state.listening = false;
}

/* Camera preview only */

function attachCameraEvents() {
    document.getElementById("cameraStart").addEventListener("click", startCamera);
    document.getElementById("cameraStop").addEventListener("click", stopCamera);
}

async function startCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
        showToast("Camera access is not supported by this browser.", "error");
        return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        state.cameraStream = stream;
        state.cameraActive = true;

        const video = document.getElementById("cameraVideo");

        video.srcObject = stream;
        video.hidden = false;

        document.getElementById("cameraPlaceholder").hidden = true;
        document.getElementById("cameraStart").disabled = true;
        document.getElementById("cameraStop").disabled = false;
        document.getElementById("cameraStatusText").textContent = "Camera active";

        logActivity("Enabled camera preview", "Gesture controls camera preview.");
        showToast("Camera preview enabled.");
    } catch (error) {
        console.error(error);

        showToast(
            "Camera access failed. Check permissions and try again.",
            "error"
        );
    }
}

function stopCamera() {
    if (state.cameraStream) {
        state.cameraStream.getTracks().forEach(track => track.stop());
    }

    state.cameraStream = null;
    state.cameraActive = false;

    const video = document.getElementById("cameraVideo");
    const placeholder = document.getElementById("cameraPlaceholder");
    const startButton = document.getElementById("cameraStart");
    const stopButton = document.getElementById("cameraStop");
    const statusText = document.getElementById("cameraStatusText");

    if (video) {
        video.srcObject = null;
        video.hidden = true;
    }

    if (placeholder) placeholder.hidden = false;
    if (startButton) startButton.disabled = false;
    if (stopButton) stopButton.disabled = true;
    if (statusText) statusText.textContent = "Camera off";
}

function attachSettingsEvents() {
    document.querySelectorAll("[data-setting]").forEach(input => {
        input.addEventListener("change", () => {
            const key = input.dataset.setting;

            if (!(key in DEFAULT_SETTINGS)) return;

            settings[key] = input.checked;

            saveSettings();
            applySettings();

            showToast("Preference updated.");
        });
    });

    const speechRate = document.getElementById("speechRate");

    if (speechRate) {
        speechRate.addEventListener("input", () => {
            settings.speechRate = Number(speechRate.value);

            document.getElementById("speechRateValue").textContent =
                `${settings.speechRate.toFixed(1)}×`;

            saveSettings();
        });
    }

    const fontSize = document.getElementById("fontSize");

    if (fontSize) {
        fontSize.addEventListener("input", () => {
            settings.fontSize = Number(fontSize.value);

            document.getElementById("fontSizeValue").textContent =
                `${settings.fontSize}px`;

            applySettings();
            saveSettings();
        });
    }

    const testSpeech = document.getElementById("testSpeech");

    if (testSpeech) {
        testSpeech.addEventListener("click", () => {
            speakText("Hello. This is a test of AURA's spoken response.");
        });
    }

    const resetButton = document.getElementById("resetAccessibility");

    if (resetButton) {
        resetButton.addEventListener("click", () => {
            Object.assign(settings, DEFAULT_SETTINGS);

            saveSettings();
            applySettings();
            renderPage(state.currentPage);

            showToast("Accessibility preferences reset.");
        });
    }

    const clearDataButton = document.getElementById("clearLocalData");

    if (clearDataButton) {
        clearDataButton.addEventListener("click", () => {
            const confirmed = window.confirm(
                "Clear your saved AURA profile, preferences, and activity from this browser?"
            );

            if (!confirmed) return;

            localStorage.removeItem(STORAGE_KEYS.profile);
            localStorage.removeItem(STORAGE_KEYS.settings);
            localStorage.removeItem(STORAGE_KEYS.activity);

            Object.assign(profile, DEFAULT_PROFILE);
            Object.assign(settings, DEFAULT_SETTINGS);
            activity.splice(0, activity.length);

            applySettings();
            updateUserDetails();

            setPage("dashboard");
            showToast("Local AURA data cleared.");
        });
    }
}

function attachActivityEvents() {
    const button = document.getElementById("clearActivity");

    button.addEventListener("click", () => {
        const confirmed = window.confirm("Clear your activity history?");

        if (!confirmed) return;

        activity.splice(0, activity.length);
        saveActivity();

        renderPage("activity");
        showToast("Activity history cleared.");
    });
}

function attachProfileEvents() {
    const form = document.getElementById("profileForm");

    form.addEventListener("submit", event => {
        event.preventDefault();

        profile.name = document.getElementById("profileName").value.trim() || "User";
        profile.email = document.getElementById("profileEmail").value.trim();
        profile.preferredMode = document.getElementById("preferredMode").value;

        saveProfile();
        updateUserDetails();

        logActivity("Updated profile", "Saved local profile preferences.");

        showToast("Profile saved successfully.");
        renderPage("profile");
    });
}

/* Global application events */

document.querySelectorAll(".nav-item").forEach(button => {
    button.addEventListener("click", () => {
        setPage(button.dataset.page);
    });
});

document.getElementById("topbarProfile").addEventListener("click", () => {
    setPage("profile");
});

document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("sidebar-open");
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.getElementById("sidebar").classList.remove("sidebar-open");
    }
});

window.addEventListener("beforeunload", () => {
    stopListening();
    stopCamera();

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
});

/* Start AURA */

applySettings();
updateUserDetails();
updateDate();
setPage("dashboard");