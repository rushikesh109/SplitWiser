"use client";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "👋 Hi! I'm SplitWiser AI – how can I help you with your expenses today?",
    },
  ]);

  const suggestedQuestions = [
    "How do I create a new group?",
    "Can I split bills unevenly?",
    "How can I settle a payment?",
    "What are smart settlements?",
  ];

  const messagesEndRef = useRef(null);

  const sendMessage = async (q) => {
    if (!q.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: q }]);
    setQuestion("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        body: JSON.stringify({ question: q }),
        headers: { "Content-Type": "application/json" },
      });

      const { reply, error } = await res.json();
      const botText = error ? "❌ Something went wrong!" : reply;

      setMessages((prev) => [...prev, { type: "bot", text: botText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "❌ Error connecting to AI." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 text-white w-12 h-12 rounded-full shadow-xl text-2xl z-50 bg-gradient-to-r from-green-600 to-teal-500"
      >
        💬
      </button>

      {open && (
        <div
          className="fixed bottom-20 right-5 w-[95%] sm:w-[380px] min-h-[400px] max-h-[600px] rounded-xl shadow-2xl border z-50 flex flex-col resize overflow-hidden
          bg-white text-black border-gray-200 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
          style={{ resize: "both", overflow: "hidden" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 rounded-t-xl 
            bg-gradient-to-r from-green-600 to-teal-500 text-white dark:from-zinc-900 dark:to-zinc-800">
            <h2 className="font-semibold">🤖 SplitWiser AI</h2>
            <button onClick={() => setOpen(false)} className="text-lg">
              ❌
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-xs p-3 rounded-md text-sm whitespace-pre-wrap ${
                  msg.type === "bot"
                    ? "bg-gray-100 text-gray-800 self-start dark:bg-zinc-800 dark:text-white"
                    : "bg-blue-100 text-blue-800 self-end dark:bg-blue-900 dark:text-blue-200"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {isTyping && (
              <div className="text-gray-400 text-sm animate-pulse">
                SplitWiser AI is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="flex flex-wrap gap-2 p-3 border-t border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="text-white bg-gradient-to-r from-green-600 to-teal-500 hover:opacity-90 px-3 py-1 text-sm rounded-full"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(question);
            }}
            className="flex border-t p-3 border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
          >
            <input
              type="text"
              placeholder="Ask something..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md text-sm
              border-gray-300 text-black bg-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 text-white rounded-md text-sm bg-gradient-to-r from-green-600 to-teal-500"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
