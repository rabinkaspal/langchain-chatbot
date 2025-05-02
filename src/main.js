import "./style.css";
import { loadPageContent } from "./util/pageContent";
import { askChatbot } from "./chat";

const chat_conversation = [];

document.addEventListener("DOMContentLoaded", function () {
    loadPageContent();

    // Chat Modal Elements
    const chatIcon = document.getElementById("openChat");
    const chatModal = document.getElementById("chatModal");
    const closeBtn = document.getElementById("closeChat");
    const chatInput = document.getElementById("chatInput");
    const sendButton = document.getElementById("sendMessage");
    const chatMessages = document.getElementById("chatMessages");

    const chatUsers = {
        human: { name: "Human" },
        ai: { name: "AI Assistant" },
    };

    chatIcon.addEventListener("click", function () {
        chatModal.classList.add("active");
        chatInput.focus();
    });

    closeBtn.addEventListener("click", function () {
        chatModal.classList.remove("active");
    });

    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText !== "") {
            addMessage(messageText, chatUsers.human.name);
            chatInput.value = "";
        }
    }

    async function addMessage(text, user) {
        const type = user === chatUsers.human.name ? "outgoing" : "incoming";
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", type);

        const now = new Date();
        const timeString =
            now.getHours().toString().padStart(2, "0") +
            ":" +
            now.getMinutes().toString().padStart(2, "0");

        messageElement.innerHTML = `${text}<div class="message-time">${timeString}</div>`;
        chatMessages.appendChild(messageElement);
        chat_conversation.push(`${user}: ${text}`);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (type === "outgoing") {
            const answer = await askChatbot(text, chat_conversation.join("\n\n"));
            addMessage(answer, chatUsers.ai.name);
        }
    }

    sendButton.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    setTimeout(() => {
        addMessage("Hi there! How can I help you today?.", chatUsers.ai.name);
    }, 500);
});
