 import './style.css'

const app = document.querySelector('#login-app')

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

                    <p>
                        Continue your accessible,
                        voice-first experience.
                    </p>
                </div>

                <form id="loginForm">

                    <div class="form-group">
                        <label for="email">
                            Email address
                        </label>

                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            required
                        >
                    </div>

                    <div class="form-group">

                        <div class="password-header">
                            <label for="password">
                                Password
                            </label>

                            <button
                                type="button"
                                id="forgotPassword"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                        >
                    </div>

                    <label class="remember-me">
                        <input
                            type="checkbox"
                            id="remember"
                        >

                        <span>Remember me</span>
                    </label>

                    <button
                        type="submit"
                        class="auth-submit"
                    >
                        Sign in
                    </button>

                </form>

                <div class="auth-divider">
                    <span>OR</span>
                </div>

                <button
                    type="button"
                    class="guest-button"
                    id="guestButton"
                >
                    Continue as guest
                </button>

                <p class="auth-switch">
                    Don't have an account?
                    <a href="/pages/register.html">
                        Create one
                    </a>
                </p>

            </div>

            <button
                type="button"
                class="back-home"
                id="backHome"
            >
                ← Back to AURA
            </button>

        </section>

    </main>
`

const loginForm =
    document.querySelector('#loginForm')

const guestButton =
    document.querySelector('#guestButton')

const backHome =
    document.querySelector('#backHome')

const forgotPassword =
    document.querySelector('#forgotPassword')


loginForm.addEventListener('submit', (event) => {

    event.preventDefault()

    const email =
        document.querySelector('#email').value.trim()

    const password =
        document.querySelector('#password').value.trim()

    if (!email || !password) {
        alert('Please enter your email and password.')
        return
    }

    alert(
        'Login will be connected to the AURA backend next.'
    )
})


guestButton.addEventListener('click', () => {
    window.location.href = '/'
})


backHome.addEventListener('click', () => {
    window.location.href = '/'
})


forgotPassword.addEventListener('click', () => {
    alert(
        'Password recovery will be connected to the backend later.'
    )
})