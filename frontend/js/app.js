/* =========================================
   AURA VOICE ASSISTANT
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const voiceButton =
    document.getElementById("voiceButton");

const startAssistantButton =
    document.getElementById("startAssistantButton");

const voiceVisualizer =
    document.getElementById("voiceVisualizer");

const assistantStatus =
    document.getElementById("assistantStatus");

const voiceInstruction =
    document.getElementById("voiceInstruction");

const transcript =
    document.getElementById("transcript");

const assistantResponse =
    document.getElementById("assistantResponse");

const clearTranscript =
    document.getElementById("clearTranscript");

const speakResponse =
    document.getElementById("speakResponse");

const stopSpeech =
    document.getElementById("stopSpeech");

const learnMoreButton =
    document.getElementById("learnMoreButton");

const commandCards =
    document.querySelectorAll(".command-card");


/* =========================================
   SPEECH RECOGNITION
========================================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


let recognition = null;

let isListening = false;


if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = true;

    recognition.lang = "en-IN";


    /* =====================================
       SPEECH START
    ===================================== */

    recognition.onstart = function () {

        isListening = true;

        voiceButton.classList.add("listening");

        voiceVisualizer.classList.add("listening");

        assistantStatus.textContent =
            "Listening...";

        voiceInstruction.textContent =
            "Speak your command now";

    };


    /* =====================================
       SPEECH RESULT
    ===================================== */

    recognition.onresult = function (event) {

        let finalTranscript = "";

        let interimTranscript = "";


        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            const text =
                event.results[i][0].transcript;


            if (event.results[i].isFinal) {

                finalTranscript += text;

            } else {

                interimTranscript += text;

            }

        }


        transcript.innerHTML = `
            <span>
                ${escapeHTML(
                    finalTranscript || interimTranscript
                )}
            </span>
        `;


        if (finalTranscript) {

            processCommand(
                finalTranscript.trim()
            );

        }

    };


    /* =====================================
       SPEECH END
    ===================================== */

    recognition.onend = function () {

        stopListening();

    };


    /* =====================================
       SPEECH ERROR
    ===================================== */

    recognition.onerror = function (event) {

        stopListening();


        let message =
            "Something went wrong. Please try again.";


        if (event.error === "not-allowed") {

            message =
                "Microphone permission was denied.";

        }


        if (event.error === "no-speech") {

            message =
                "I didn't hear anything. Please try again.";

        }


        showResponse(message);

    };

}


/* =========================================
   START LISTENING
========================================= */

function startListening() {

    if (!recognition) {

        showResponse(
            "Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge."
        );

        return;

    }


    try {

        recognition.start();

    } catch (error) {

        console.log(
            "Recognition is already running."
        );

    }

}


/* =========================================
   STOP LISTENING
========================================= */

function stopListening() {

    isListening = false;

    voiceButton.classList.remove("listening");

    voiceVisualizer.classList.remove("listening");

    assistantStatus.textContent =
        "Ready to listen";

    voiceInstruction.textContent =
        "Click the microphone and start speaking";

}


/* =========================================
   VOICE BUTTON
========================================= */

voiceButton.addEventListener(
    "click",
    function () {

        if (isListening) {

            recognition.stop();

        } else {

            startListening();

        }

    }
);


/* =========================================
   HERO START BUTTON
========================================= */

startAssistantButton.addEventListener(
    "click",
    function () {

        document
            .querySelector(".assistant-card")
            .scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


        setTimeout(
            startListening,
            500
        );

    }
);


/* =========================================
   COMMAND PROCESSING
========================================= */

function processCommand(command) {

    const normalizedCommand =
        command.toLowerCase().trim();


    assistantStatus.textContent =
        "Processing command...";


    /* ==============================
       NAVIGATION
    ============================== */

    if (
        normalizedCommand.includes("go to home") ||
        normalizedCommand === "home"
    ) {

        showResponse(
            "Taking you to the home section."
        );

        document
            .getElementById("home")
            .scrollIntoView({
                behavior: "smooth"
            });

        return;

    }


    /* ==============================
       COMMANDS
    ============================== */

    if (
        normalizedCommand.includes("show commands") ||
        normalizedCommand.includes("open commands")
    ) {

        showResponse(
            "Opening the voice commands section."
        );

        document
            .getElementById("commands")
            .scrollIntoView({
                behavior: "smooth"
            });

        return;

    }


    /* ==============================
       HOW IT WORKS
    ============================== */

    if (
        normalizedCommand.includes("how does this work") ||
        normalizedCommand.includes("how it works")
    ) {

        showResponse(
            "AURA converts your speech into text, identifies your intent, performs an action, and provides voice feedback."
        );

        document
            .getElementById("how-it-works")
            .scrollIntoView({
                behavior: "smooth"
            });

        speakText(assistantResponse.textContent);

        return;

    }


    /* ==============================
       READ PAGE
    ============================== */

    if (
        normalizedCommand.includes("read this page") ||
        normalizedCommand.includes("read page")
    ) {

        const pageText =
            document.body.innerText;

        showResponse(
            "I'll read the page content for you."
        );

        speakText(
            pageText.substring(0, 2500)
        );

        return;

    }


    /* ==============================
       STOP SPEAKING
    ============================== */

    if (
        normalizedCommand.includes("stop speaking") ||
        normalizedCommand.includes("stop reading")
    ) {

        window.speechSynthesis.cancel();

        showResponse(
            "Speech stopped."
        );

        return;

    }


    /* ==============================
       SEARCH
    ============================== */

    if (
        normalizedCommand.startsWith("search for")
    ) {

        const searchQuery =
            normalizedCommand
                .replace("search for", "")
                .trim();


        if (searchQuery) {

            showResponse(
                `Searching for ${searchQuery}.`
            );

            speakText(
                `Searching for ${searchQuery}`
            );

            /*
             * Temporary frontend demonstration.
             *
             * In the backend phase this will
             * become a proper search API.
             */

            setTimeout(
                function () {

                    window.open(
                        "https://www.google.com/search?q=" +
                        encodeURIComponent(
                            searchQuery
                        ),
                        "_blank"
                    );

                },
                700
            );

        } else {

            showResponse(
                "What would you like me to search for?"
            );

        }

        return;

    }


    /* ==============================
       REGISTRATION FORM
    ============================== */

    if (
        normalizedCommand.includes(
            "open registration form"
        )
    ) {

        showResponse(
            "Opening the registration form."
        );

        speakText(
            "Opening the registration form."
        );

        setTimeout(
            function () {

                window.location.href =
                    "pages/register.html";

            },
            900
        );

        return;

    }


    /* ==============================
       LOGIN
    ============================== */

    if (
        normalizedCommand.includes(
            "open login"
        ) ||
        normalizedCommand.includes(
            "sign in"
        )
    ) {

        showResponse(
            "Opening the sign in page."
        );

        setTimeout(
            function () {

                window.location.href =
                    "pages/login.html";

            },
            700
        );

        return;

    }


    /* ==============================
       GREETING
    ============================== */

    if (
        normalizedCommand.includes("hello") ||
        normalizedCommand.includes("hi aura") ||
        normalizedCommand.includes("hey aura")
    ) {

        showResponse(
            "Hello! I'm AURA. How can I help you?"
        );

        speakText(
            "Hello! I'm AURA. How can I help you?"
        );

        return;

    }


    /* ==============================
       UNKNOWN COMMAND
    ============================== */

    showResponse(
        `I heard "${command}", but I don't have an action for that command yet.`
    );

}


/* =========================================
   SHOW RESPONSE
========================================= */

function showResponse(message) {

    assistantResponse.textContent =
        message;

    assistantStatus.textContent =
        "Command completed";

    setTimeout(
        function () {

            assistantStatus.textContent =
                "Ready to listen";

        },
        1800
    );

}


/* =========================================
   TEXT TO SPEECH
========================================= */

function speakText(text) {

    if (!("speechSynthesis" in window)) {

        showResponse(
            "Text-to-speech is not supported in this browser."
        );

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang = "en-IN";

    speech.rate = 0.95;

    speech.pitch = 1;


    window.speechSynthesis.speak(
        speech
    );

}


/* =========================================
   SPEAK CURRENT RESPONSE
========================================= */

speakResponse.addEventListener(
    "click",
    function () {

        speakText(
            assistantResponse.textContent
        );

    }
);


/* =========================================
   STOP SPEECH
========================================= */

stopSpeech.addEventListener(
    "click",
    function () {

        window.speechSynthesis.cancel();

    }
);


/* =========================================
   CLEAR TRANSCRIPT
========================================= */

clearTranscript.addEventListener(
    "click",
    function () {

        transcript.innerHTML = `
            <span class="placeholder-text">
                Your voice command will appear here...
            </span>
        `;

        assistantResponse.textContent =
            "Hello! I'm ready to assist you.";

    }
);


/* =========================================
   LEARN MORE
========================================= */

learnMoreButton.addEventListener(
    "click",
    function () {

        document
            .getElementById("how-it-works")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =========================================
   COMMAND CARD BUTTONS
========================================= */

commandCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const command =
                    card.dataset.command;


                transcript.innerHTML = `
                    <span>
                        ${escapeHTML(command)}
                    </span>
                `;


                processCommand(command);

            }
        );

    }
);


/* =========================================
   HTML ESCAPE
========================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


/* =========================================
   INITIALIZATION
========================================= */

if (!SpeechRecognition) {

    assistantStatus.textContent =
        "Voice recognition unavailable";

    voiceInstruction.textContent =
        "Please use Chrome or Edge for voice recognition.";

}


console.log(
    "AURA Accessibility Assistant initialized."
)
