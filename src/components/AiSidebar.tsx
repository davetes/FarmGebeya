"use client";

import React, { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

interface AiSidebarProps {
  open: boolean;
  onClose: () => void;
}

const AiSidebar: React.FC<AiSidebarProps> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestions: string[] = [
    "How do I register and sign in?",
    "Why did my AI request return 401 or 500?",
    "Make the country search select auto-complete differently",
    "Where do I set GROQ_API_KEY?",
    "Explain the project structure and main pages",
  ];

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(typeof data?.error === "string" ? data.error : "Request failed");
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: String(data.reply ?? "") },
        ]);
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity ${open ? "opacity-30" : "opacity-0"}`}
        onClick={onClose}
      />
      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transform transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Help Assistant</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </header>

        <section className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && !error && (
            <div className="space-y-3 text-sm">
              <p className="text-gray-700">
                Welcome to FarmGebeya’s in‑app help. I can answer questions and guide you through tasks without leaving this page.
              </p>
              <div className="rounded-md border border-gray-200 p-3 bg-gray-50">
                <p className="font-medium text-gray-800 mb-2">Quick prompts</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(s); setTimeout(() => send(), 0); }}
                      className="text-left rounded-full bg-white border border-gray-200 px-3 py-1 hover:bg-gray-100"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-md border border-gray-200 p-3">
                <p className="font-medium text-gray-800">About this project</p>
                <ul className="list-disc pl-5 text-gray-600 mt-1">
                  <li>Built with Next.js and Tailwind CSS.</li>
                  <li>Auth pages under <code>/controller/login</code> and <code>/controller/register</code>.</li>
                  <li>Help opens in a right sidebar; API at <code>/api/ask</code>.</li>
                  <li>Set <code>GROQ_API_KEY</code> in <code>.env.local</code>, then restart the server.</li>
                </ul>
              </div>
              <p className="text-xs text-gray-500">Tip: Press Enter to send, Shift+Enter for a new line.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <div
                className={`inline-block rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {error && <div className="text-sm text-red-600">{error}</div>}
        </section>

        <footer className="p-3 border-t">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              rows={2}
              className="flex-1 resize-none rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-500"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="rounded-md bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-400">Press Enter to send. Shift+Enter for new line.</p>
        </footer>
      </aside>
    </div>
  );
};

export default AiSidebar;
