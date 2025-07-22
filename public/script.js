const API_URL = "/api"

const chatBox = document.getElementById("chatBox");
const landPage = document.querySelector(".land-page");
const plus = document.querySelector(".fa-plus");

function appendMessage(text, className) {
  landPage.style.display = "none";
  const msg = document.createElement("div");
  msg.className = `${className}`;
  if (className === "bot") {
    msg.innerHTML = marked.parse(text);
    msg.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  } else {
    msg.innerText = text;
  }

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const inputField = document.getElementById("userInput");
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  appendMessage(userMessage, "user");
  inputField.value = "";

  const loadingMsg = document.createElement("div");
  loadingMsg.className = "bot loading";
  loadingMsg.innerText = "Bot is typing...";
  chatBox.appendChild(loadingMsg);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userMessage }] }],
      }),
    });

    const data = await response.json();
    console.log(data);
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    chatBox.removeChild(loadingMsg);
    appendMessage(reply, "bot");
  } catch (error) {
    console.error("Error:", error);
    appendMessage("Error fetching response.", "bot");
  }
}

document.getElementById("userInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});
