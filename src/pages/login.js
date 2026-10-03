import '../style.css'


const app =
    document.querySelector('#login-app')


app.innerHTML = `

    <div class="login-page">

        <div class="login-card">


            <!-- BRAND -->

            <div class="login-brand">

                <div class="login-brand-icon">
                    A
                </div>

                <span>
                    AURA
                </span>

            </div>


            <!-- TITLE -->

            <div class="login-heading">

                <span class="dashboard-label">
                    AURA INTELLIGENT ASSISTANT
                </span>

                <h1>
                    Welcome back.
                </h1>

                <p>
                    Sign in to continue to your
                    intelligent assistant.
                </p>

            </div>


            <!-- FORM -->

            <form id="loginForm">


                <div class="login-field">

                    <label for="loginEmail">
                        Email
                    </label>

                    <input
                        type="email"
                        id="loginEmail"
                        placeholder="Enter your email"
                        required
                    >

                </div>


                <div class="login-field">

                    <label for="loginPassword">
                        Password
                    </label>

                    <input
                        type="password"
                        id="loginPassword"
                        placeholder="Enter your password"
                        required
                    >

                </div>


                <button
                    type="submit"
                    class="login-button"
                >
                    Login
                </button>


                <p
                    id="loginMessage"
                    class="login-message"
                ></p>


            </form>


            <!-- DEMO NOTE -->

            <div class="login-demo">

                <span>
                    DEMO MODE
                </span>

                <p>
                    Enter any valid email and password
                    to continue.
                </p>

            </div>


        </div>

    </div>

`



/* =========================================
   LOGIN ELEMENTS
   ========================================= */

const loginForm =
    document.querySelector('#loginForm')

const loginMessage =
    document.querySelector('#loginMessage')



/* =========================================
   LOGIN
   ========================================= */

loginForm.addEventListener(
    'submit',
    (event) => {

        event.preventDefault()


        const email =
            document.querySelector(
                '#loginEmail'
            ).value.trim()


        const password =
            document.querySelector(
                '#loginPassword'
            ).value.trim()


        if (
            !email ||
            !password
        ) {

            loginMessage.textContent =
                'Please enter your email and password.'

            return

        }


        loginMessage.textContent =
            'Login successful. Opening AURA...'


        setTimeout(
            () => {

                window.location.href =
                    '/pages/dashboard.html'

            },
            500
        )

    }
)
