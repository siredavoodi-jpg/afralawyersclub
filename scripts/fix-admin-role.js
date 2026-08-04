const { PrismaClient } = require('@prisma/client');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function checkAndFixAdmin() {
  console.log('\n========================================');
  console.log('   بررسی و اصلاح نقش ادمین');
  console.log('========================================\n');

  const phone = await ask('شماره موبایل ادمین را وارد کنید: ');

  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) {
    console.log('\n❌ کاربری با این شماره موبایل یافت نشد.');
    console.log('   لطفاً مطمئن شوید شماره را درست وارد کرده‌اید.');
    await prisma.$disconnect();
    rl.close();
    return;
  }

  console.log('\n----------------------------------------');
  console.log('نام:              ', user.name);
  console.log('موبایل:           ', user.phone);
  console.log('نقش فعلی:         ', user.role);
  console.log('وضعیت:            ', user.status);
  console.log('رمز عبور تنظیم شده:', user.password ? 'بله ✓' : 'خیر ✗');
  console.log('----------------------------------------\n');

  if (user.role === 'admin') {
    console.log('✅ نقش کاربر از قبل admin است. مشکلی نیست.');
    console.log('   اگر هنوز خطا می‌گیرید، شماره موبایل ورودی را چک کنید.\n');
    await prisma.$disconnect();
    rl.close();
    return;
  }

  const answer = await ask('نقش این کاربر admin نیست. آیا می‌خواهید آن را به admin تغییر دهید؟ (بله/خیر): ');
  const ans = answer.trim().toLowerCase();

  if (ans === 'بله' || ans === 'y' || ans === 'yes') {
    await prisma.user.update({
      where: { phone },
      data: { role: 'admin' },
    });
    console.log('\n✅ نقش کاربر با موفقیت به admin تغییر یافت!');
    console.log('   حالا می‌توانید دوباره وارد شوید.\n');
  } else {
    console.log('\n❌ تغییری اعمال نشد.\n');
  }

  await prisma.$disconnect();
  rl.close();
}

checkAndFixAdmin().catch((err) => {
  console.error('❌ خطا:', err.message);
  prisma.$disconnect();
  rl.close();
});