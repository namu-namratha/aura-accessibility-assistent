
import './style.css';

const app = document.querySelector('#register-app');

if (!app) {
    throw new Error('Registration container #register-app was not found.');
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
                    <span class="auth-eyebrow">GET STARTED</span>
                    <h1>Create your AURA account</h1>
                    <p>Set up your accessible, voice-first experience.</p>
                </div>

                <form id="registerForm">
                    <div class="form-group">
                        <label for="name">Full name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            autocomplete="name"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="registerEmail">Email address</label>
                        <input
                            type="email"
                            id="registerEmail"
                            placeholder="you@example.com"
                            autocomplete="email"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="registerPassword">Password</label>
                        <input
                            type="password"
                            id="registerPassword"
                            placeholder="Create a password"
                            autocomplete="new-password"
                            minlength="6"
                            required
                        >
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword">Confirm password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            autocomplete="new-password"
                            minlength="6"
                            required
                        >
                    </div>

                    <label class="remember-me">
                        <input type="checkbox" id="terms" required>
                        <span>I agree to the AURA terms and conditions</span>
                    </label>

                    <button type="submit" class="auth-submit">
                        Create account
                    </button>
                </form>

                <p class="auth-switch">
                    Already have an account?
                    <a href="/pages/login.html">Sign in</a>
                </p>
            </div>

            <button type="button" class="back-home" id="backHome">
                ← Back to AURA
            </button>
        </section>
    </main>
`;

const registerForm = document.querySelector('#registerForm');
const backHome = document.querySelector('#backHome');

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#registerEmail').value.trim();
    const password = document.querySelector('#registerPassword').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;
    const terms = document.querySelector('#terms').checked;

    if (!name || !email || !password || !confirmPassword) {
        alert('Please complete all required fields.');
        return;
    }

    if (password.length < 6) {
        alert('Password must contain at least 6 characters.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    if (!terms) {
        alert('Please accept the terms and conditions.');
        return;
    }

    // Demo only: do not save the password in browser storage.
    sessionStorage.setItem('auraDemoLoggedIn', 'true');
    sessionStorage.setItem('auraDemoEmail', email);
    sessionStorage.setItem('auraDemoName', name);

    alert(`Welcome to AURA, ${name}!`);
    window.location.href = '/pages/dashboard.html';
});

backHome.addEventListener('click', () => {
    window.location.href = '/';
});