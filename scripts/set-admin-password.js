const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function setAdminPassword() {
  console.log('\n========================================');
  console.log('   تنظیم رمز عبور ادمین');
  console.log('========================================\n');

  const phone = await ask('شماره موبایل ادمین را وارد کنید: ');

  const user = await prisma.user.findUnique({ where: { phone } });

  if (!user) {
    console.log('\n❌ کاربری با این شماره موبایل یافت نشد.');
    await prisma.$disconnect();
    rl.close();
    return;
  }

  if (user.role !== 'admin') {
    console.log('\n❌ نقش این کاربر admin نیست. ابتدا با اسکریپت fix-admin-role.js نقش را تغییر دهید.');
    await prisma.$disconnect();
    rl.close();
    return;
  }

  console.log('\nکاربر یافت شد: ' + user.name);
  console.log('رمز عبور باید حداقل ۸ کاراکتر و شامل عدد، حرف کوچک و بزرگ انگلیسی باشد.\n');

  const password = await ask('رمز عبور جدید: ');
  const confirmPassword = await ask('تکرار رمز عبور: ');

  // اعتبارسنجی رمز عبور قوی
  if (password.length < 8) {
    console.log('\n❌ رمز عبور باید حداقل ۸ کاراکتر باشد.');
    await prisma.$disconnect();
    rl.close();
    return;
  }
  if (!/[0-9]/.test(password)) {
    console.log('\n❌ رمز عبور باید شامل حداقل یک عدد باشد.');
    await prisma.$disconnect();
    rl.close();
    return;
  }
  if (!/[a-z]/.test(password)) {
    console.log('\n❌ رمز عبور باید شامل حداقل یک حرف کوچک انگلیسی باشد.');
    await prisma.$disconnect();
    rl.close();
    return;
  }
  if (!/[A-Z]/.test(password)) {
    console.log('\n❌ رمز عبور باید شامل حداقل یک حرف بزرگ انگلیسی باشد.');
    await prisma.$disconnect();
    rl.close();
    return;
  }
  if (password !== confirmPassword) {
    console.log('\n❌ رمز عبور و تکرار آن مطابقت ندارند.');
    await prisma.$disconnect();
    rl.close();
    return;
  }

  // هش کردن و ذخیره
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { phone },
    data: { password: hashedPassword },
  });

  console.log('\n✅ رمز عبور ادمین با موفقیت تنظیم شد!');
  console.log('   حالا می‌توانید از صفحه /admin-login وارد شوید.\n');

  await prisma.$disconnect();
  rl.close();
}

setAdminPassword().catch((err) => {
  console.error('❌ خطا:', err.message);
  prisma.$disconnect();
  rl.close();
});