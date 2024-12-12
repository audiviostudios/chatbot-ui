self.__WB_DISABLE_DEV_LOGS = true
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    const response = await fetch("/api/anthropic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();
    const botMessage = { text: data.reply, sender: "bot" };
    setMessages([...messages, userMessage, botMessage]);

    setInput("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chatbot con Anthropic</h1>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "10px 0",
            }}
          >
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%" }}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
