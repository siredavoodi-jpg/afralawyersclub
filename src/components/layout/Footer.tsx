import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    title: "درباره افرا",
    links: [
      { href: "/about", label: "درباره ما" },
      { href: "/donate", label: "حمایت مالی" },
      { href: "/contact", label: "تماس با ما" },
    ],
  },
  {
    title: "لینک‌های مفید",
    links: [
      { href: "/courses", label: "دوره‌ها" },
      { href: "/services", label: "خدمات AI" },
      { href: "/library/articles", label: "مقالات" },
      { href: "/library/laws", label: "قوانین" },
    ],
  },
  {
    title: "تماس با ما",
    links: [
      { href: "/contact", label: "فرم تماس" },
      {
        href: "mailto:info@afralawyersclub.ir",
        label: "info@afralawyersclub.ir",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-primary-dark text-primary-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt="لوگوی باشگاه وکلای افرا"
              width={56}
              height={56}
              className="h-14 w-14 rounded-xl object-contain"
            />
            <p className="text-lg font-extrabold text-white">
              باشگاه وکلای افرا
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-primary-100/80">
            پلتفرم تخصصی آموزش هوش مصنوعی به وکلا و ارائه خدمات حقوقی مبتنی بر
            AI.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-bold text-white">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-primary-100/80 transition-all duration-300 hover:text-secondary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-sm font-bold text-white">شبکه‌های اجتماعی</p>
          <ul className="mt-4 flex gap-3 text-sm text-primary-100/80">
            <li>اینستاگرام</li>
            <li>لینکدین</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary/40 py-5 text-center text-xs text-primary-100/60">
        © {new Date().getFullYear()} باشگاه وکلای افرا. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}