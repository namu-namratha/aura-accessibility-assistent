export function processCommand(command) {
    const text = command.toLowerCase().trim();

    if (/^(hi|hello|hey)( aura)?[.! ]*$/.test(text)) {
        return "Hello! I am AURA. How can I help you today?";
    }

    if (text.includes("how are you") || text.includes("what are you doing")) {
        return "I am doing great! I am ready to help you navigate the website using your voice.";
    }

    if (text.includes("who are you") || text.includes("what is aura")) {
        return "I am AURA, an accessibility assistant that helps you interact with websites using voice commands.";
    }

    if (
        text.includes("read aloud") ||
        text.includes("read out loud") ||
        text.includes("read this page") ||
        text.includes("read the page") ||
        text.includes("read dashboard")
    ) {
        return { action: "readPage" };
    }

    if (
        text.includes("stop speaking") ||
        text.includes("stop reading") ||
        text === "stop"
    ) {
        return { action: "stopSpeaking" };
    }

    if (text.includes("open login") || text.includes("login page")) {
        return { action: "login" };
    }

    if (
        text.includes("register") ||
        text.includes("registration") ||
        text.includes("sign up")
    ) {
        return { action: "register" };
    }

    if (text.includes("accessibility")) {
        return { action: "accessibility" };
    }

    if (text.includes("open settings") || text.includes("go to settings")) {
        return { action: "settings" };
    }

    if (text.includes("go home") || text.includes("home page")) {
        return { action: "home" };
    }

    if (text.includes("help") || text.includes("what can you do")) {
        return "You can ask me to read this page, open login, open registration, open settings, or open accessibility options.";
    }

    if (text.includes("thank you") || text.includes("thanks")) {
        return "You're welcome! I am happy to help.";
    }

    return `I heard "${command}". Try saying "Hello AURA", "How are you?", "Read this page", or "Help".`;
}