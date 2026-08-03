"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function LegalChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "سلام! سوال حقوقی خود را بپرسید تا کمکتان کنم." },
  ]);
  const [input, setInput] = useState("");

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: "TODO: پاسخ واقعی پس از اتصال به /api/ai/chat اینجا نمایش داده می‌شود." },
    ]);
    setInput("");
  }

  return (
    <>
      <PageHeader title="چت حقوقی" subtitle="پاسخ سریع به سوالات حقوقی همراه با منابع و قوانین مرتبط" />
      <section className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex min-h-[400px] flex-col gap-4 rounded-xl border border-neutral-100 bg-white p-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "self-end bg-primary-600 text-white"
                  : "self-start bg-neutral-100 text-neutral-800"
              }`}
            >
              {m.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="سوال حقوقی خود را بنویسید..."
            aria-label="سوال حقوقی"
            className="flex-1 rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          <button
            type="submit"
            aria-label="ارسال پیام"
            className="flex items-center justify-center rounded-lg bg-primary-600 px-5 text-white hover:bg-primary-700"
          >
            <Send size={18} aria-hidden />
          </button>
        </form>
      </section>
    </>
  );
}
