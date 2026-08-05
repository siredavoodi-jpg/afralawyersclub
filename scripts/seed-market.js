const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categories = [
  { name: "کتاب", slug: "books", icon: "📚" },
  { name: "تجهیزات اداری", slug: "office-equipment", icon: "🖨" },
  { name: "لپ‌تاپ", slug: "laptops", icon: "💻" },
  { name: "مانیتور", slug: "monitors", icon: "🖥" },
  { name: "مبلمان", slug: "furniture", icon: "🪑" },
  { name: "اجاره دفتر", slug: "office-rental", icon: "🏢" },
  { name: "انتقال دفتر وکالت", slug: "office-transfer", icon: "⚖" },
  { name: "نرم‌افزار حقوقی", slug: "legal-software", icon: "🧾" },
  { name: "موبایل", slug: "mobiles", icon: "📱" },
  { name: "دوره‌های آموزشی", slug: "courses", icon: "🎓" },
  { name: "خدمات", slug: "services", icon: "🛠" },
  { name: "استخدام", slug: "jobs", icon: "💼" },
  { name: "همکاری", slug: "partnership", icon: "🤝" },
  { name: "وسایل نقلیه", slug: "vehicles", icon: "🚗" },
  { name: "متفرقه", slug: "misc", icon: "📦" },
];

async function main() {
  for (const c of categories) {
    await prisma.marketCategory.upsert({
      where: { slug: c.slug },
      update: { name: c.name, icon: c.icon },
      create: c,
    });
  }
  console.log("✅ دسته‌بندی‌های افرا مارکت ایجاد شد:", categories.length);
}

main().finally(() => prisma.$disconnect());