import '../style.css'


/* =========================================
   AURA VOICE ASSISTANT
   ========================================= */

const app = document.querySelector('#assistant-app')


app.innerHTML = `

    <div class="assistant-page">


        <!-- HEADER -->

        <header class="assistant-header">

            <div class="assistant-brand">

                <div class="assistant-brand-icon">
                    A
                </div>

                <span>
                    AURA
                </span>

            </div>


            <nav class="assistant-navigation">

                <a href="/pages/dashboard.html">
                    Dashboard
                </a>

                <a
                    href="/pages/assistant.html"
                    class="active"
                >
                    Voice Assistant
                </a>

                <a href="/pages/accessibility.html">
                    Accessibility
                </a>

                <a href="/pages/settings.html">
                    Settings
                </a>

            </nav>


            <div class="assistant-online">

                <span class="assistant-online-dot"></span>

                Online

            </div>

        </header>



        <!-- MAIN -->

        <main class="assistant-main">


            <!-- TITLE -->

            <section class="assistant-intro">

                <span class="dashboard-label">
                    AURA INTELLIGENT ASSISTANT
                </span>

                <h1>
                    How can I help?
                </h1>

                <p>
                    Speak naturally and let AURA
                    control your experience.
                </p>

            </section>



            <!-- ASSISTANT CARD -->

            <section class="assistant-main-card">


                <!-- ORB -->

                <div
                    class="assistant-large-orb"
                    id="assistantOrb"
                >

                    <div class="assistant-large-orb-inner">
                        A
                    </div>

                </div>



                <!-- STATUS -->

                <div
                    class="assistant-listening-status"
                    id="assistantStatus"
                >
                    Ready for your command
                </div>



                <!-- BUTTON -->

                <button
                    id="startListening"
                    class="assistant-listen-button"
                >

                    🎙

                    <span>
                        Start Listening
                    </span>

                </button>



                <!-- COMMAND -->

                <div class="assistant-result-card">

                    <span class="assistant-result-label">
                        YOU SAID
                    </span>

                    <p id="recognizedCommand">
                        Nothing yet
                    </p>

                </div>



                <!-- RESPONSE -->

                <div class="assistant-response-card">

                    <span class="assistant-result-label">
                        AURA
                    </span>

                    <p id="assistantResponse">
                        I'm ready. Tell me what you need.
                    </p>

                </div>


            </section>



            <!-- COMMANDS -->

            <section class="assistant-commands">

                <span class="dashboard-label">
                    AVAILABLE COMMANDS
                </span>

                <h2>
                    Try saying
                </h2>


                <div class="assistant-command-grid">


                    <button
                        class="assistant-command"
                        data-command="open dashboard"
                    >
                        <strong>
                            Open dashboard
                        </strong>

                        <span>
                            Go to your AURA dashboard
                        </span>

                    </button>



                    <button
                        class="assistant-command"
                        data-command="open accessibility"
                    >
                        <strong>
                            Open accessibility
                        </strong>

                        <span>
                            Open accessibility controls
                        </span>

                    </button>



                    <button
                        class="assistant-command"
                        data-command="open settings"
                    >
                        <strong>
                            Open settings
                        </strong>

                        <span>
                            Manage AURA settings
                        </span>

                    </button>



                    <button
                        class="assistant-command"
                        data-command="go back"
                    >
                        <strong>
                            Go back
                        </strong>

                        <span>
                            Return to the previous page
                        </span>

                    </button>



                    <button
                        class="assistant-command"
                        data-command="read page"
                    >
                        <strong>
                            Read page
                        </strong>

                        <span>
                            AURA will read this page aloud
                        </span>

                    </button>



                    <button
                        class="assistant-command"
                        data-command="stop speaking"
                    >
                        <strong>
                            Stop speaking
                        </strong>

                        <span>
                            Stop AURA's speech
                        </span>

                    </button>


                </div>

            </section>


        </main>

    </div>

`



/* =========================================
   ELEMENTS
   ========================================= */

const startListening =
    document.querySelector('#startListening')

const assistantStatus =
    document.querySelector('#assistantStatus')

const recognizedCommand =
    document.querySelector('#recognizedCommand')

const assistantResponse =
    document.querySelector('#assistantResponse')

const assistantOrb =
    document.querySelector('#assistantOrb')



/* =========================================
   SPEECH RECOGNITION
   ========================================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition


let recognition = null


if (SpeechRecognition) {

    recognition =
        new SpeechRecognition()

    recognition.lang =
        'en-IN'

    recognition.interimResults =
        false

    recognition.continuous =
        false

}



/* =========================================
   START LISTENING
   ========================================= */

function startVoiceRecognition() {

    if (!recognition) {

        assistantStatus.textContent =
            'Voice recognition is not supported in this browser.'

        assistantResponse.textContent =
            'Please use Google Chrome for voice commands.'

        return

    }


    assistantStatus.textContent =
        'Listening... Speak now.'

    startListening.querySelector('span').textContent =
        'Listening...'


    assistantOrb.classList.add(
        'assistant-orb-listening'
    )


    try {

        recognition.start()

    } catch (error) {

        console.log(
            'Recognition already running.'
        )

    }

}



/* =========================================
   RECOGNITION START
   ========================================= */

if (recognition) {

    recognition.onstart =
        () => {

            assistantStatus.textContent =
                'Listening...'

        }



    recognition.onresult =
        (event) => {

            const command =
                event.results[0][0]
                    .transcript
                    .trim()


            recognizedCommand.textContent =
                command


            assistantStatus.textContent =
                'Command received.'


            startListening
                .querySelector('span')
                .textContent =
                    'Start Listening'


            assistantOrb.classList.remove(
                'assistant-orb-listening'
            )


            processCommand(
                command
            )

        }



    recognition.onerror =
        (event) => {

            console.log(
                'Speech recognition error:',
                event.error
            )


            assistantStatus.textContent =
                'Unable to hear you.'


            assistantResponse.textContent =
                'Please try again.'


            startListening
                .querySelector('span')
                .textContent =
                    'Start Listening'


            assistantOrb.classList.remove(
                'assistant-orb-listening'
            )

        }



    recognition.onend =
        () => {

            startListening
                .querySelector('span')
                .textContent =
                    'Start Listening'


            assistantOrb.classList.remove(
                'assistant-orb-listening'
            )

        }

}



/* =========================================
   COMMAND PROCESSOR
   ========================================= */

function processCommand(
    command
) {

    const text =
        command
            .toLowerCase()
            .trim()



    /* DASHBOARD */

    if (
        text.includes('open dashboard') ||
        text.includes('go to dashboard') ||
        text === 'dashboard'
    ) {

        respond(
            'Opening your dashboard.'
        )

        setTimeout(
            () => {

                window.location.href =
                    '/pages/dashboard.html'

            },
            700
        )

        return

    }



    /* ACCESSIBILITY */

    if (
        text.includes('open accessibility') ||
        text.includes('accessibility')
    ) {

        respond(
            'Opening accessibility settings.'
        )

        setTimeout(
            () => {

                window.location.href =
                    '/pages/accessibility.html'

            },
            700
        )

        return

    }



    /* SETTINGS */

    if (
        text.includes('open settings') ||
        text.includes('settings')
    ) {

        respond(
            'Opening AURA settings.'
        )

        setTimeout(
            () => {

                window.location.href =
                    '/pages/settings.html'

            },
            700
        )

        return

    }



    /* GO BACK */

    if (
        text.includes('go back') ||
        text.includes('back')
    ) {

        respond(
            'Going back.'
        )

        setTimeout(
            () => {

                window.history.back()

            },
            500
        )

        return

    }



    /* READ PAGE */

    if (
        text.includes('read page') ||
        text.includes('read this page') ||
        text.includes('read the page')
    ) {

        respond(
            'Reading the current page.'
        )

        readPage()

        return

    }



    /* STOP SPEAKING */

    if (
        text.includes('stop speaking') ||
        text.includes('stop talking') ||
        text === 'stop'
    ) {

        window.speechSynthesis.cancel()

        assistantResponse.textContent =
            'Speech stopped.'

        assistantStatus.textContent =
            'Ready for your command.'

        return

    }



    /* UNKNOWN COMMAND */

    respond(
        `I heard "${command}". I don't have an action for that command yet.`
    )

}



/* =========================================
   AURA RESPONSE
   ========================================= */

function respond(
    message
) {

    assistantResponse.textContent =
        message


    speak(
        message
    )

}



/* =========================================
   TEXT TO SPEECH
   ========================================= */

function speak(
    text
) {

    if (
        !('speechSynthesis' in window)
    ) {

        return

    }


    window.speechSynthesis.cancel()


    const speech =
        new SpeechSynthesisUtterance(
            text
        )


    speech.rate =
        0.9

    speech.pitch =
        1

    speech.volume =
        1


    window.speechSynthesis.speak(
        speech
    )

}



/* =========================================
   READ PAGE
   ========================================= */

function readPage() {

    const pageText =
        document.querySelector(
            '.assistant-main'
        ).innerText


    speak(
        pageText
    )

}



/* =========================================
   LISTEN BUTTON
   ========================================= */

startListening.addEventListener(
    'click',
    startVoiceRecognition
)



/* =========================================
   COMMAND BUTTONS
   ========================================= */

document
    .querySelectorAll(
        '.assistant-command'
    )
    .forEach(
        (button) => {

            button.addEventListener(
                'click',
                () => {

                    const command =
                        button.dataset.command


                    recognizedCommand.textContent =
                        command


                    processCommand(
                        command
                    )

                }
            )

        }
    )