recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;

    // Show the recognized words
    const saidElement = document.querySelector("#userTranscript");
    if (saidElement) {
        saidElement.textContent = command;
    }

    // Process the command
    const response = processCommand(command);

    // Show and speak the response
    const responseElement = document.querySelector("#assistantResponse");
    if (responseElement) {
        responseElement.textContent = response;
    }

    speak(response);
};