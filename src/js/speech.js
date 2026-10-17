
export function speak(message) {
    if (!("speechSynthesis" in window)) {
        console.error("Text-to-speech is not supported in this browser.");
        return false;
    }

    const text = String(message ?? "").trim();

    if (!text) {
        return false;
    }

    // Stop any previous speech before starting a new message.
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onerror = (event) => {
        console.error("AURA speech error:", event.error);
    };

    window.speechSynthesis.speak(utterance);

    return true;
}

export function stopSpeaking() {
    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}