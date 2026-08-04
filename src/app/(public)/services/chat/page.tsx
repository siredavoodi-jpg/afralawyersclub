"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { getAuthToken } from "@/lib/auth-client";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function LegalChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "سلام! سوال حقوقی خود را بپرسید تا کمکتان کنم." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setLoading(true);

    const token = getAuthToken();
    if (!token) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "برای استفاده از چت حقوقی، ابتدا وارد حساب کاربری خود شوید." },
      ]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "خطایی رخ داد. دوباره تلاش کنید." },
        ]);
        return;
      }

      const answerText =
        typeof data.answer === "string"
          ? data.answer
          : data.answer?.result ?? JSON.stringify(data.answer);

      setMessages((prev) => [...prev, { role: "assistant", content: answerText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "ارتباط با سرور برقرار نشد. دوباره تلاش کنید." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="چت حقوقی" subtitle="پاسخ سریع به سوالات حقوقی همراه با منابع و قوانین مرتبط" />
      <section className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex min-h-[400px] flex-col gap-4 rounded-xl border border-neutral-100 bg-white p-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "self-end bg-primary-600 text-white"
                  : "self-start bg-neutral-100 text-neutral-800"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="self-start rounded-2xl bg-neutral-100 px-4 py-2.5 text-sm text-neutral-500">
              در حال پاسخ‌گویی...
            </div>
          )}
        </div>
        <form onSubmit={handleSend} className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="سوال حقوقی خود را بنویسید..."
            aria-label="سوال حقوقی"
            disabled={loading}
            className="flex-1 rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          <button
            type="submit"
            aria-label="ارسال پیام"
            disabled={loading}
            className="flex items-center justify-center rounded-lg bg-primary-600 px-5 text-white hover:bg-primary-700 disabled:opacity-50"
          >
            <Send size={18} aria-hidden />
          </button>
        </form>
      </section>
    </>
  );
}