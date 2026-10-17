
export function processCommand(command) {
    const text = String(command || "")
        .toLowerCase()
        .trim()
        .replace(/[.!?,]+$/g, "")
        .replace(/\s+/g, " ");

    if (!text) {
        return "I didn't hear a command. Please try again.";
    }

    // Greetings
    if (/^(hi|hello|hey)( aura)?$/.test(text)) {
        return "Hello! I am AURA. How can I help you today?";
    }

    // General conversation
    if (text.includes("how are you") || text.includes("what are you doing")) {
        return "I'm doing well! I'm ready to help you navigate AURA.";
    }

    if (
        text.includes("who are you") ||
        text.includes("what is aura") ||
        text.includes("introduce yourself")
    ) {
        return "I am AURA, your accessibility assistant. I help you navigate pages and use supported voice commands.";
    }

    if (text.includes("thank you") || text.includes("thanks")) {
        return "You're welcome! I'm happy to help.";
    }

    // Stop speech
    if (
        text === "stop" ||
        text.includes("stop speaking") ||
        text.includes("stop reading") ||
        text.includes("be quiet")
    ) {
        return { action: "stopSpeaking" };
    }

    // Stop voice recognition
    if (text === "stop listening" || text === "stop listening to me") {
        return { action: "stopListening" };
    }

    // Read page
    if (
        text.includes("read this page") ||
        text.includes("read the page") ||
        text.includes("read aloud") ||
        text.includes("read out loud") ||
        text.includes("read dashboard") ||
        text.includes("read everything") ||
        text.includes("start reading")
    ) {
        return { action: "readPage" };
    }

    // Login
    if (
        text.includes("open login") ||
        text.includes("go to login") ||
        text.includes("login page") ||
        text.includes("sign in page")
    ) {
        return { action: "login" };
    }

    // Registration
    if (
        text.includes("open register") ||
        text.includes("open registration") ||
        text.includes("go to registration") ||
        text === "register" ||
        text.includes("sign up")
    ) {
        return { action: "register" };
    }

    // Accessibility
    if (
        text.includes("open accessibility") ||
        text.includes("accessibility options") ||
        text.includes("accessibility page") ||
        text.includes("go to accessibility")
    ) {
        return { action: "accessibility" };
    }

    // Settings
    if (
        text.includes("settings") ||
        text.includes("setting") ||
        text.includes("preferences")
    ) {
        return { action: "settings" };
    }

    // Dashboard
    if (
        text.includes("open dashboard") ||
        text.includes("go to dashboard") ||
        text.includes("dashboard page")
    ) {
        return { action: "dashboard" };
    }

    // Home
    if (
        text === "home" ||
        text.includes("go home") ||
        text.includes("home page") ||
        text.includes("open home")
    ) {
        return { action: "home" };
    }

    // Help
    if (
        text === "help" ||
        text.includes("what can you do") ||
        text.includes("available commands")
    ) {
        return 'You can say "read this page", "stop reading", "open login", "register", "open dashboard", "open settings", "open accessibility", or "go home".';
    }

    return `I heard "${command}". I don't recognize that command yet. Say "Help" to hear supported commands.`;
}