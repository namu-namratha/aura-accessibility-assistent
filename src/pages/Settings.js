
import '../style.css';

const app = document.querySelector('#settings-app');

if (!app) {
    throw new Error('Settings page container #settings-app was not found.');
}

app.innerHTML = `
    <div class="settings-page">
        <aside class="settings-sidebar">
            <div class="settings-brand">
                <div class="settings-brand-icon">A</div>
                <span>AURA</span>
            </div>

            <nav class="settings-nav" aria-label="Main navigation">
                <a href="/pages/dashboard.html"><span>⌂</span> Dashboard</a>
                <a href="/pages/assistant.html"><span>◉</span> Voice Assistant</a>
                <a href="/pages/accessibility.html"><span>♿</span> Accessibility</a>
                <a href="/pages/dashboard.html#activity"><span>◷</span> Activity</a>
                <a href="/pages/settings.html" class="active"><span>⚙</span> Settings</a>
            </nav>

            <div class="settings-sidebar-bottom">
                <button type="button" id="settingsLogout">↪ Log out</button>
            </div>
        </aside>

        <main class="settings-main">
            <header class="settings-topbar">
                <div class="settings-page-title">
                    <span>CONTROL CENTER</span>
                    <h1>Settings</h1>
                </div>
                <button type="button" class="settings-save-top" id="saveSettingsTop">
                    Save changes
                </button>
            </header>

            <section class="settings-content">
                <section class="settings-section">
                    <div class="settings-section-heading">
                        <div>
                            <span class="settings-label">ACCOUNT</span>
                            <h2>Profile</h2>
                            <p>Manage your AURA profile information.</p>
                        </div>
                    </div>

                    <div class="profile-card">
                        <div class="profile-avatar">U</div>
                        <div class="profile-details">
                            <strong id="profileName">AURA User</strong>
                            <span>AURA member</span>
                        </div>
                        <button type="button" class="secondary-settings-button" id="editProfileButton">
                            Edit profile
                        </button>
                    </div>

                    <div class="settings-form-grid">
                        <div class="settings-field">
                            <label for="fullName">Full name</label>
                            <input type="text" id="fullName" placeholder="Your full name" autocomplete="name">
                        </div>
                        <div class="settings-field">
                            <label for="email">Email address</label>
                            <input type="email" id="email" placeholder="Your email" autocomplete="email">
                        </div>
                    </div>
                </section>

                <section class="settings-section">
                    <div class="settings-section-heading">
                        <div>
                            <span class="settings-label">VOICE</span>
                            <h2>Voice preferences</h2>
                            <p>Customize how AURA speaks and listens.</p>
                        </div>
                    </div>

                    <div class="settings-options">
                        <div class="settings-option">
                            <div class="settings-option-icon" aria-hidden="true">🎙</div>
                            <div class="settings-option-content">
                                <strong>Voice assistant</strong>
                                <span>Allow AURA to listen for voice commands.</span>
                            </div>
                            <label class="aura-switch">
                                <input type="checkbox" id="voiceEnabled" checked>
                                <span></span>
                            </label>
                        </div>

                        <div class="settings-option">
                            <div class="settings-option-icon" aria-hidden="true">🔊</div>
                            <div class="settings-option-content">
                                <strong>Spoken responses</strong>
                                <span>Let AURA respond using text-to-speech.</span>
                            </div>
                            <label class="aura-switch">
                                <input type="checkbox" id="speechEnabled" checked>
                                <span></span>
                            </label>
                        </div>

                        <div class="settings-option">
                            <div class="settings-option-icon" aria-hidden="true">⚡</div>
                            <div class="settings-option-content">
                                <strong>Listening feedback</strong>
                                <span>Show visual feedback while AURA is listening.</span>
                            </div>
                            <label class="aura-switch">
                                <input type="checkbox" id="listeningFeedback" checked>
                                <span></span>
                            </label>
                        </div>
                    </div>
                </section>

                <section class="settings-section">
                    <div class="settings-section-heading">
                        <div>
                            <span class="settings-label">ACCESSIBILITY</span>
                            <h2>Accessibility preferences</h2>
                            <p>Adjust the interface to make AURA easier to use.</p>
                        </div>
                    </div>

                    <div class="settings-options">
                        <div class="settings-option">
                            <div class="settings-option-icon" aria-hidden="true">◐</div>
                            <div class="settings-option-content">
                                <strong>High contrast</strong>
                                <span>Increase contrast between interface elements.</span>
                            </div>
                            <label class="aura-switch">
                                <input type="checkbox" id="highContrast">
                                <span></span>
                            </label>
                        </div>

                        <div class="settings-option">
                            <div class="settings-option-icon" aria-hidden="true">Aa</div>
                            <div class="settings-option-content">
                                <strong>Larger text</strong>
                                <span>Increase the size of interface text.</span>
                            </div>
                            <label class="aura-switch">
                                <input type="checkbox" id="largeText">
                                <span></span>
                            </label>
                        </div>

                        <div class="settings-option">
                            <div class="settings-option-icon" aria-hidden="true">↕</div>
                            <div class="settings-option-content">
                                <strong>Reduced motion</strong>
                                <span>Reduce animations and movement throughout AURA.</span>
                            </div>
                            <label class="aura-switch">
                                <input type="checkbox" id="reducedMotion">
                                <span></span>
                            </label>
                        </div>
                    </div>
                </section>

                <section class="settings-section">
                    <div class="settings-section-heading">
                        <div>
                            <span class="settings-label">NOTIFICATIONS</span>
                            <h2>Notifications</h2>
                            <p>Choose which updates AURA can show.</p>
                        </div>
                    </div>

                    <div class="settings-options">
                        <div class="settings-option">
                            <div class="settings-option-icon" aria-hidden="true">🔔</div>
                            <div class="settings-option-content">
                                <strong>Notifications</strong>
                                <span>Receive useful updates from AURA.</span>
                            </div>
                            <label class="aura-switch">
                                <input type="checkbox" id="notifications" checked>
                                <span></span>
                            </label>
                        </div>

                        <div class="settings-option">
                            <div class="settings-option-icon" aria-hidden="true">💡</div>
                            <div class="settings-option-content">
                                <strong>Accessibility tips</strong>
                                <span>Receive suggestions for AURA accessibility features.</span>
                            </div>
                            <label class="aura-switch">
                                <input type="checkbox" id="accessibilityTips" checked>
                                <span></span>
                            </label>
                        </div>
                    </div>
                </section>

                <section class="settings-section">
                    <div class="settings-section-heading">
                        <div>
                            <span class="settings-label">SECURITY</span>
                            <h2>Account security</h2>
                            <p>Manage your account protection.</p>
                        </div>
                    </div>

                    <div class="security-card">
                        <div>
                            <strong>Password</strong>
                            <span>Keep your password secure and up to date.</span>
                        </div>
                        <button type="button" class="secondary-settings-button" id="changePassword">
                            Change password
                        </button>
                    </div>
                </section>

                <section class="settings-save-area">
                    <div>
                        <strong>Your preferences</strong>
                        <p>Changes are currently stored only in this browser.</p>
                    </div>
                    <button type="button" class="settings-save-button" id="saveSettings">
                        Save changes
                    </button>
                </section>

                <section class="settings-danger">
                    <div>
                        <span>ACCOUNT</span>
                        <h2>Log out of AURA</h2>
                        <p>End your current AURA session.</p>
                    </div>
                    <button type="button" id="dangerLogout">Log out</button>
                </section>
            </section>
        </main>
    </div>
`;

const $ = (selector) => document.querySelector(selector);

const fullName = $('#fullName');
const email = $('#email');
const profileName = $('#profileName');
const saveSettings = $('#saveSettings');
const saveSettingsTop = $('#saveSettingsTop');

const checkboxIds = [
    'voiceEnabled',
    'speechEnabled',
    'listeningFeedback',
    'highContrast',
    'largeText',
    'reducedMotion',
    'notifications',
    'accessibilityTips'
];

function readSettings() {
    try {
        const stored = JSON.parse(localStorage.getItem('auraSettings') || '{}');
        return stored && typeof stored === 'object' ? stored : {};
    } catch {
        return {};
    }
}

let savedSettings = readSettings();

let auraUser = null;
try {
    auraUser = JSON.parse(localStorage.getItem('auraUser') || 'null');
} catch {}
const registeredName = auraUser?.name || sessionStorage.getItem('auraDemoName');
const registeredEmail = auraUser?.email || sessionStorage.getItem('auraDemoEmail');

if (registeredName && !savedSettings.name) {
    savedSettings.name = registeredName;
}

if (registeredEmail && !savedSettings.email) {
    savedSettings.email = registeredEmail;
}

function applyAccessibilitySettings() {
    const contrast = $('#highContrast').checked;
    const biggerText = $('#largeText').checked;
    const lessMotion = $('#reducedMotion').checked;

    document.body.classList.toggle('settings-high-contrast', contrast);
    document.body.classList.toggle('settings-large-text', biggerText);
    document.body.classList.toggle('settings-reduced-motion', lessMotion);

    // Keep accessibility preferences available to other AURA pages.
    try {
        const accessibility = JSON.parse(
            localStorage.getItem('auraAccessibility') || '{}'
        );

        accessibility.highContrast = contrast;
        accessibility.largeText = biggerText;
        accessibility.reducedMotion = lessMotion;

        localStorage.setItem('auraAccessibility', JSON.stringify(accessibility));
    } catch {
        // The settings remain usable even if browser storage is unavailable.
    }
}

function loadSettings() {
    fullName.value = savedSettings.name || '';
    email.value = savedSettings.email || '';

    profileName.textContent = savedSettings.name || 'AURA User';

    checkboxIds.forEach((id) => {
        const element = $('#' + id);

        if (typeof savedSettings[id] === 'boolean') {
            element.checked = savedSettings[id];
        }
    });

    applyAccessibilitySettings();
}

function showSavedMessage() {
    const originalBottomText = saveSettings.textContent;
    const originalTopText = saveSettingsTop.textContent;

    saveSettings.textContent = '✓ Saved';
    saveSettingsTop.textContent = '✓ Saved';
    saveSettings.classList.add('settings-saved');

    window.setTimeout(() => {
        saveSettings.textContent = originalBottomText;
        saveSettingsTop.textContent = originalTopText;
        saveSettings.classList.remove('settings-saved');
    }, 1800);
}

function saveAllSettings() {
    const name = fullName.value.trim();
    const emailAddress = email.value.trim();

    if (emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
        alert('Please enter a valid email address.');
        email.focus();
        return;
    }

    const settings = {
        ...readSettings(),
        name,
        email: emailAddress
    };

    checkboxIds.forEach((id) => {
        settings[id] = $('#' + id).checked;
    });

    try {
        localStorage.setItem('auraSettings', JSON.stringify(settings));

        // Keep demo session details consistent with the saved profile.
        if (sessionStorage.getItem('auraDemoLoggedIn') === 'true') {
            if (name) {
                sessionStorage.setItem('auraDemoName', name);
            } else {
                sessionStorage.removeItem('auraDemoName');
    localStorage.removeItem('auraUser');
    localStorage.removeItem('auraToken');
            }

            if (emailAddress) {
                sessionStorage.setItem('auraDemoEmail', emailAddress);
            } else {
                sessionStorage.removeItem('auraDemoEmail');
            }
        }
    } catch {
        alert('Could not save settings in this browser.');
        return;
    }

    savedSettings = settings;
    profileName.textContent = name || 'AURA User';

    applyAccessibilitySettings();
    showSavedMessage();
}

$('#editProfileButton').addEventListener('click', () => {
    fullName.focus();
    fullName.select();
});

$('#changePassword').addEventListener('click', () => {
    alert(
        'Password changes will be available after backend authentication is connected.'
    );
});

function logout() {
    sessionStorage.removeItem('auraDemoLoggedIn');
    sessionStorage.removeItem('auraDemoEmail');
    sessionStorage.removeItem('auraDemoName');

    window.location.href = '/pages/login.html';
}

$('#settingsLogout').addEventListener('click', logout);
$('#dangerLogout').addEventListener('click', logout);

saveSettings.addEventListener('click', saveAllSettings);
saveSettingsTop.addEventListener('click', saveAllSettings);

['highContrast', 'largeText', 'reducedMotion'].forEach((id) => {
    $('#' + id).addEventListener('change', applyAccessibilitySettings);
});

loadSettings();