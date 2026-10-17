
import '../style.css';

const app =
    document.querySelector('#profile-app') ||
    document.querySelector('#dashboard-app');

if (!app) {
    throw new Error('Profile page container was not found.');
}

const name = sessionStorage.getItem('auraDemoName') || 'Guest';
const email = sessionStorage.getItem('auraDemoEmail') || 'Not provided';
const isLoggedIn =
    sessionStorage.getItem('auraDemoLoggedIn') === 'true';

app.innerHTML = `
    <main class="dashboard-page">
        <section class="dashboard-main"
            style="max-width: 900px; margin: 0 auto; width: 100%;">

            <header class="dashboard-topbar">
                <div class="dashboard-title">
                    <span>AURA INTELLIGENT ASSISTANT</span>
                    <h1>My Profile</h1>
                </div>
                <a href="/pages/dashboard.html">← Dashboard</a>
            </header>

            <section class="dashboard-content">
                <section class="dashboard-welcome">
                    <div>
                        <span class="dashboard-label">YOUR ACCOUNT</span>
                        <h2 id="profileGreeting">Welcome to AURA</h2>
                        <p>View the account details used for this demo.</p>
                    </div>
                    <div class="dashboard-brand-icon" aria-hidden="true">A</div>
                </section>

                <section class="dashboard-section">
                    <div class="dashboard-section-heading">
                        <div>
                            <span class="dashboard-label">PROFILE DETAILS</span>
                            <h2>Personal information</h2>
                        </div>
                    </div>

                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="activity-icon" aria-hidden="true">👤</div>
                            <div>
                                <strong>Name</strong>
                                <span id="profileName"></span>
                            </div>
                        </div>

                        <div class="activity-item">
                            <div class="activity-icon" aria-hidden="true">✉</div>
                            <div>
                                <strong>Email</strong>
                                <span id="profileEmail"></span>
                            </div>
                        </div>

                        <div class="activity-item">
                            <div class="activity-icon" aria-hidden="true">✓</div>
                            <div>
                                <strong>Account mode</strong>
                                <span id="profileMode"></span>
                            </div>
                        </div>
                    </div>

                    <p style="margin-top: 20px;">
                        This demo profile displays session details only.
                        Account information is not stored in MySQL yet.
                    </p>

                    <div class="assistant-controls">
                        <a class="assistant-primary-button"
                           href="/pages/settings.html"
                           style="text-decoration: none;">
                            Open Settings
                        </a>

                        <a class="assistant-secondary-button"
                           href="/pages/dashboard.html"
                           style="text-decoration: none;">
                            Back to Dashboard
                        </a>
                    </div>
                </section>
            </section>
        </section>
    </main>
`;

document.querySelector('#profileGreeting').textContent =
    `Welcome, ${name}`;

document.querySelector('#profileName').textContent = name;
document.querySelector('#profileEmail').textContent = email;
document.querySelector('#profileMode').textContent =
    isLoggedIn ? 'Demo account' : 'Guest preview';