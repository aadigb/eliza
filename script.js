document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const apiKey = "qNHgGGkwlhGw_uVLC7Px9hdRpIEaWt1P8DQ2_zIGm8"; // Venice AI API Key

    async function sendMessage(message) {
        const response = await fetch("https://api.venice.ai/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        return data.reply; // Adjust based on Venice API response format
    }

    function appendMessage(text, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
        messageElement.innerText = text;
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    sendBtn.addEventListener("click", async () => {
        const message = userInput.value.trim();
        if (message) {
            appendMessage(message, "user");
            userInput.value = "";

            const reply = await sendMessage(message);
            appendMessage(reply, "bot");
        }
    });

    userInput.addEventListener("keypress", async (event) => {
        if (event.key === "Enter") {
            sendBtn.click();
        }
    });
});
