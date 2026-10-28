import './style.css';

const app = document.querySelector('#login-app');

if (!app) {
    throw new Error('Login container #login-app was not found.');
}

app.innerHTML = `
    <main class="auth-page">
        <div class="auth-background-glow glow-one"></div>
        <div class="auth-background-glow glow-two"></div>

        <section class="auth-container">
            <div class="auth-brand">
                <div class="auth-logo">A</div>
                <span>AURA</span>
            </div>

            <div class="auth-card">
                <div class="auth-header">
                    <span class="auth-eyebrow">WELCOME BACK</span>
                    <h1>Sign in to AURA</h1>
                    <p>Continue your accessible, voice-first experience.</p>
                </div>

                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            autocomplete="email"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <div class="password-header">
                            <label for="password">Password</label>
                            <button type="button" id="forgotPassword">
                                Forgot password?
                            </button>
                        </div>

                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            autocomplete="current-password"
                            required
                        >
                    </div>

                    <label class="remember-me">
                        <input type="checkbox" id="remember">
                        <span>Remember me</span>
                    </label>

                    <button type="submit" class="auth-submit" id="loginSubmit">
                        Sign in
                    </button>
                    <p id="loginStatus" class="auth-status" role="status" aria-live="polite"></p>
                </form>

                <div class="auth-divider"><span>OR</span></div>

                <button type="button" class="guest-button" id="guestButton">
                    Continue as guest
                </button>

                <p class="auth-switch">
                    Don't have an account?
                    <a href="/pages/register.html">Create one</a>
                </p>
            </div>

            <button type="button" class="back-home" id="backHome">
                ← Back to AURA
            </button>
        </section>
    </main>
`;

const loginForm = document.querySelector('#loginForm');
const loginSubmit = document.querySelector('#loginSubmit');
const loginStatus = document.querySelector('#loginStatus');
const guestButton = document.querySelector('#guestButton');
const backHome = document.querySelector('#backHome');
const forgotPassword = document.querySelector('#forgotPassword');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;

    if (!email || !password) {
        if (loginStatus) {
            loginStatus.textContent = 'Please enter your email and password.';
            loginStatus.style.color = '#dc2626';
        }
        return;
    }

    loginSubmit.disabled = true;
    loginSubmit.textContent = 'Signing in...';
    if (loginStatus) {
        loginStatus.textContent = '';
    }

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Login failed. Please check your credentials.');
        }

        const user = data.user || { name: email.split('@')[0], email };

        // Save session and persistent data
        localStorage.setItem('auraUser', JSON.stringify(user));
        if (data.token) {
            localStorage.setItem('auraToken', data.token);
        }

        sessionStorage.setItem('auraDemoLoggedIn', 'true');
        sessionStorage.setItem('auraDemoEmail', user.email);
        sessionStorage.setItem('auraDemoName', user.name);

        // Update profile in localStorage for main SPA
        try {
            const existingProfile = JSON.parse(localStorage.getItem('aura_profile_v2') || '{}');
            localStorage.setItem(
                'aura_profile_v2',
                JSON.stringify({
                    ...existingProfile,
                    name: user.name,
                    email: user.email
                })
            );
        } catch {
            // Ignore storage parse error
        }

        if (loginStatus) {
            loginStatus.style.color = '#10b981';
            loginStatus.textContent = 'Login successful! Opening dashboard...';
        }

        setTimeout(() => {
            window.location.href = '/pages/dashboard.html';
        }, 600);
    } catch (error) {
        console.warn('Backend login error, checking fallback:', error.message);

        // Fallback for offline development: if backend cannot be reached
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            const registeredEmail = sessionStorage.getItem('auraDemoEmail');
            const registeredName = sessionStorage.getItem('auraDemoName') || email.split('@')[0];

            sessionStorage.setItem('auraDemoLoggedIn', 'true');
            sessionStorage.setItem('auraDemoEmail', email);
            sessionStorage.setItem('auraDemoName', registeredName);

            if (loginStatus) {
                loginStatus.style.color = '#10b981';
                loginStatus.textContent = 'Offline demo login active! Opening dashboard...';
            }

            setTimeout(() => {
                window.location.href = '/pages/dashboard.html';
            }, 600);
            return;
        }

        if (loginStatus) {
            loginStatus.style.color = '#dc2626';
            loginStatus.textContent = error.message;
        }
    } finally {
        loginSubmit.disabled = false;
        loginSubmit.textContent = 'Sign in';
    }
});

guestButton.addEventListener('click', () => {
    sessionStorage.setItem('auraDemoLoggedIn', 'true');
    sessionStorage.setItem('auraDemoName', 'Guest');
    sessionStorage.removeItem('auraDemoEmail');

    window.location.href = '/pages/dashboard.html';
});

backHome.addEventListener('click', () => {
    window.location.href = '/';
});

forgotPassword.addEventListener('click', () => {
    alert(
        'Password recovery: Contact your system administrator or reset your password in backend settings.'
    );
});
