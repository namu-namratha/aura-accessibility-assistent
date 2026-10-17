
import { processCommand } from "./commands.js";
import { speak, stopSpeaking } from "./speech.js";

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;
let isListening = false;

function showMessage(selector, message) {
    const element = document.querySelector(selector);

    if (element) {
        element.textContent = message;
    }
}

function handleVoiceAction(action) {
    switch (action) {
        case "readPage": {
            const content =
                document.querySelector("main") ||
                document.querySelector("#dashboard-app") ||
                document.querySelector("#assistant-app") ||
                document.querySelector("#settings-app") ||
                document.querySelector("#accessibility-app") ||
                document.body;

            const pageText = content?.innerText?.trim();

            if (pageText) {
                showMessage("#assistantResponse", "Reading the page.");
                speak(pageText);
            } else {
                speak("I couldn't find any page content to read.");
            }
            break;
        }

        case "stopSpeaking":
            stopSpeaking();
            showMessage("#assistantResponse", "Speech stopped.");
            break;

        case "stopListening":
            stopListening();
            showMessage("#assistantResponse", "Voice recognition stopped.");
            speak("Voice recognition stopped.");
            break;

        case "login":
            window.location.href = "/pages/login.html";
            break;

        case "register":
            window.location.href = "/pages/register.html";
            break;

        case "dashboard":
            window.location.href = "/pages/dashboard.html";
            break;

        case "accessibility":
            window.location.href = "/pages/accessibility.html";
            break;

        case "settings":
            window.location.href = "/pages/settings.html";
            break;

        case "home":
            window.location.href = "/";
            break;

        default:
            console.warn("Unsupported AURA action:", action);
            showMessage(
                "#assistantResponse",
                'That action is not supported yet. Say "help" for available commands.'
            );
            speak("That action is not supported yet.");
    }
}

function handleCommand(command) {
    showMessage("#userTranscript", command);

    let response;

    try {
        response = processCommand(command);
    } catch (error) {
        console.error("AURA command processing error:", error);
        showMessage(
            "#assistantResponse",
            "I couldn't process that command. Please try again."
        );
        return;
    }

    if (
        response &&
        typeof response === "object" &&
        response.action
    ) {
        handleVoiceAction(response.action);
        return;
    }

    const message = String(response ?? "");

    showMessage("#assistantResponse", message);

    if (message) {
        speak(message);
    }
}

export function startListening() {
    if (!SpeechRecognition) {
        showMessage(
            "#assistantResponse",
            "Speech recognition is not supported in this browser. Please use a recent version of Chrome."
        );
        return;
    }

    if (isListening) return;

    recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        isListening = true;
        showMessage("#assistantResponse", "I'm listening. Please speak.");
    };

    recognition.onresult = (event) => {
        const result = event.results[event.resultIndex];

        if (!result || !result[0]) return;

        const command = result[0].transcript.trim();

        console.log("AURA heard:", command);
        handleCommand(command);
    };

    recognition.onerror = (event) => {
        console.error("AURA speech recognition error:", event.error);

        const messages = {
            "not-allowed":
                "Microphone access was denied. Allow microphone access in your browser settings.",
            "no-speech":
                "I didn't hear anything. Please try speaking again.",
            "audio-capture":
                "No microphone was detected. Check your microphone connection.",
            network:
                "Speech recognition encountered a network error. Please try again."
        };

        showMessage(
            "#assistantResponse",
            messages[event.error] ||
                `Speech recognition error: ${event.error}`
        );
    };

    recognition.onend = () => {
        isListening = false;
    };

    try {
        recognition.start();
    } catch (error) {
        isListening = false;
        console.error("Could not start AURA recognition:", error);
        showMessage(
            "#assistantResponse",
            "I couldn't start the microphone. Please try again."
        );
    }
}

export function stopListening() {
    if (recognition) {
        try {
            recognition.stop();
        } catch (error) {
            console.warn("Could not stop speech recognition:", error);
        }
    }

    isListening = false;
}

export function isVoiceListening() {
    return isListening;
}