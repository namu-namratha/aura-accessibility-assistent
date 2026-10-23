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
                        <input type="text" id="name" autocomplete="name"
                            placeholder="Enter your full name" required>
                    </div>

                    <div class="form-group">
                        <label for="registerEmail">Email address</label>
                        <input type="email" id="registerEmail"
                            autocomplete="email" placeholder="you@example.com" required>
                    </div>

                    <div class="form-group">
                        <label for="registerPassword">Password</label>
                        <input type="password" id="registerPassword"
                            autocomplete="new-password" minlength="8" required>
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword">Confirm password</label>
                        <input type="password" id="confirmPassword"
                            autocomplete="new-password" minlength="8" required>
                    </div>

                    <label class="remember-me">
                        <input type="checkbox" id="terms" required>
                        <span>I agree to the AURA terms and conditions</span>
                    </label>

                    <button type="submit" class="auth-submit">
                        Create account
                    </button>
                    <p id="registerMessage" role="status" aria-live="polite"></p>
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
const registerMessage = document.querySelector('#registerMessage');
const submitButton = registerForm.querySelector('button[type="submit"]');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#registerEmail').value.trim();
    const password = document.querySelector('#registerPassword').value;
    const confirmPassword = document.querySelector('#confirmPassword').value;
    const terms = document.querySelector('#terms').checked;

    if (!name || !email || !password || !confirmPassword || !terms) {
        registerMessage.textContent = 'Please complete all required fields.';
        return;
    }

    if (password.length < 8) {
        registerMessage.textContent = 'Use a password with at least 8 characters.';
        return;
    }

    if (password !== confirmPassword) {
        registerMessage.textContent = 'Passwords do not match.';
        return;
    }

    submitButton.disabled = true;
    registerMessage.textContent = 'Creating your account...';

    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Registration failed.');
        }

        registerMessage.textContent =
            'Account created. Redirecting to sign in...';

        window.location.href = '/pages/login.html';
    } catch (error) {
        registerMessage.textContent =
            error.message === 'Failed to fetch'
                ? 'Cannot reach AURA backend. Please try again.'
                : error.message;
    } finally {
        submitButton.disabled = false;
    }
});

backHome.addEventListener('click', () => {
    window.location.href = '/';
});
