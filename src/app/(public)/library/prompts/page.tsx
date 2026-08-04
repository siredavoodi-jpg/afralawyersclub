"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Search, Lock, Copy, Check, X, Sparkles } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { getAuthUser, type AuthUser } from "@/lib/auth-client";
import { prompts, categories, getExcerpt, PROMPT_VERSION, type PromptItem } from "@/lib/prompts-data";

const toFa = (n: number | string) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

function Inline({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = regex.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) nodes.push(<strong key={k++} className="font-bold text-primary-800">{m[1]}</strong>);
    else if (m[2] !== undefined) nodes.push(<code key={k++} className="rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-xs">{m[2]}</code>);
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

function PromptContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (t === "") { i++; continue; }
    if (t.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const line = lines[i].trim();
        if (!/^\|[\s:\-|]+\|$/.test(line)) {
          rows.push(line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
        }
        i++;
      }
      if (rows.length) {
        out.push(
          <div key={key++} className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>{rows[0].map((c, j) => (<th key={j} className="border border-neutral-200 bg-primary-50 px-2 py-1.5 text-right font-bold text-primary-800"><Inline text={c} /></th>))}</tr>
              </thead>
              <tbody>
                {rows.slice(1).map((r, ri) => (<tr key={ri}>{r.map((c, j) => (<td key={j} className="border border-neutral-200 px-2 py-1.5"><Inline text={c} /></td>))}</tr>))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }
    if (t.startsWith("- ") || t.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      out.push(<ul key={key++} className="mr-4 list-disc space-y-1">{items.map((it, j) => (<li key={j}><Inline text={it} /></li>))}</ul>);
      continue;
    }
    const h = t.match(/^\*\*(.+?)\*\*:?$/);
    if (h) {
      out.push(<h4 key={key++} className="mb-2 mt-4 border-t border-dashed border-neutral-200 pt-3 text-sm font-bold text-primary-700"><Inline text={h[1]} /></h4>);
      i++;
      continue;
    }
    if (/^\d+\.\s/.test(t)) {
      out.push(<p key={key++} className="my-1.5 font-semibold"><Inline text={t} /></p>);
      i++;
      continue;
    }
    out.push(<p key={key++} className="my-1.5"><Inline text={t} /></p>);
    i++;
  }
  return <div className="space-y-1 text-sm leading-7 text-neutral-700">{out}</div>;
}

export default function PromptsLibraryPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeCategory, setActiveCategory] = useState("همه");
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<PromptItem | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelected(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const term = searchTerm.trim();
    return prompts.filter((p) => {
      const matchCat = activeCategory === "همه" || p.category === activeCategory;
      const matchSearch = !term || (p.title + p.content).includes(term);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  const countOf = (c: string) => (c === "همه" ? prompts.length : prompts.filter((p) => p.category === c).length);

  async function copyPrompt(p: PromptItem) {
    try {
      await navigator.clipboard.writeText(p.content);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = p.content;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700">
              <Sparkles size={16} aria-hidden />
              نسخه {PROMPT_VERSION.version} — {toFa(prompts.length)} پرامپت کاربردی
            </span>
            <h1 className="text-3xl font-extrabold leading-tight text-neutral-900 sm:text-4xl">
              کتابخانه پرامپت‌های حقوقی <span className="text-primary-600">افرا</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-600">
              مجموعه‌ای از پرامپت‌های تخصصی برای وکلا و پژوهشگران حقوقی؛ از تحلیل پرونده تا تنظیم اسناد و شبیه‌سازی دادگاه.
            </p>
            {!user && (
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/register" variant="secondary" size="lg">ثبت‌نام رایگان</ButtonLink>
                <ButtonLink href="/login" variant="ghost" size="lg">ورود</ButtonLink>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <Image src="/images/avatar.png" alt="آواتار باشگاه وکلای افرا" width={280} height={187} className="h-40 w-auto" priority />
          </div>
        </div>
      </section>

      {/* جستجو و دسته‌بندی */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو در عنوان و متن پرامپت‌ها…"
            className="w-full rounded-full border border-neutral-300 bg-white py-2.5 pl-4 pr-11 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400" aria-hidden />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={
                "flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-fast " +
                (activeCategory === c
                  ? "border-primary-600 bg-primary-600 text-white"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:text-primary-700")
              }
            >
              {c}
              <span className={"rounded-full px-2 py-0.5 text-xs " + (activeCategory === c ? "bg-white/20" : "bg-neutral-100")}>
                {toFa(countOf(c))}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* کارت‌ها */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-neutral-900">{activeCategory}</h2>
          <span className="text-sm text-neutral-500">{toFa(filtered.length)} پرامپت</span>
        </div>
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-neutral-500">پرامپتی مطابق جستجوی شما یافت نشد.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <button key={p.id} onClick={() => { setSelected(p); setCopied(false); }} className="text-right">
                <Card className="h-full transition-fast hover:-translate-y-1 hover:border-primary-300">
                  <CardBody className="flex h-full flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-500 text-sm font-bold text-white">
                        {toFa(String(p.id).padStart(2, "0"))}
                      </span>
                      <Badge tone="primary">{p.category}</Badge>
                    </div>
                    <h3 className="font-bold text-neutral-900">{p.title}</h3>
                    <p className="line-clamp-3 text-sm leading-6 text-neutral-600">{getExcerpt(p.content)}</p>
                    <span className="mt-auto flex items-center gap-1 text-sm font-medium text-primary-600">
                      {user ? "مشاهده کامل پرامپت" : "پیش‌نمایش پرامپت"}
                      {!user && <Lock size={14} aria-hidden />}
                    </span>
                  </CardBody>
                </Card>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* بنر عضویت */}
      {!user && (
        <section className="bg-primary-600">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6">
            <Image src="/images/avatar.png" alt="آواتار افرا" width={140} height={93} className="h-24 w-auto" />
            <h2 className="text-2xl font-bold text-white">برای دسترسی به متن کامل پرامپت‌ها عضو شوید</h2>
            <p className="max-w-xl text-primary-100">
              نمایش کامل پرامپت‌ها برای کاربران و وکلای عضو فعال است. برای دسترسی به این مجموعه و سایر خدمات، به صورت رایگان عضو شوید.
            </p>
            <ButtonLink href="/register" variant="secondary" size="lg">ثبت‌نام رایگان</ButtonLink>
          </div>
        </section>
      )}

      {/* مودال */}
      {selected && (
        <div className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-black/55 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="my-8 w-full max-w-3xl rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 border-b border-neutral-100 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-500 font-bold text-white">
                  {toFa(String(selected.id).padStart(2, "0"))}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">{selected.title}</h3>
                  <p className="text-xs text-primary-600">{selected.category}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-full border border-neutral-200 p-2 text-neutral-500 hover:text-neutral-800" aria-label="بستن">
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-5">
              {user ? (
                <PromptContent content={selected.content} />
              ) : (
                <div>
                  <p className="rounded-lg bg-neutral-50 p-4 text-sm leading-7 text-neutral-600">{getExcerpt(selected.content, 300)}</p>
                  <div className="mt-6 flex flex-col items-center gap-4 rounded-xl border border-dashed border-primary-300 bg-primary-50 p-6 text-center">
                    <Lock size={28} className="text-primary-600" aria-hidden />
                    <p className="font-bold text-neutral-900">متن کامل این پرامپت مخصوص اعضای باشگاه است</p>
                    <p className="text-sm text-neutral-600">
                      برای مشاهده کامل این پرامپت و دسترسی به سایر خدمات، به عنوان کاربر یا وکیل عضو شوید.
                    </p>
                    <div className="flex gap-3">
                      <ButtonLink href="/register" variant="secondary">ثبت‌نام رایگان</ButtonLink>
                      <ButtonLink href="/login" variant="ghost">ورود</ButtonLink>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {user && (
              <div className="flex items-center justify-between border-t border-neutral-100 p-4">
                <span className="text-xs text-neutral-500">پرامپت شماره {toFa(selected.id)} از {toFa(prompts.length)}</span>
                <Button onClick={() => copyPrompt(selected)} variant={copied ? "primary" : "secondary"} size="sm">
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "کپی شد" : "کپی متن پرامپت"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}