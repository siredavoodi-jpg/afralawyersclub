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

async function createAdmin() {
  console.log('\n========================================');
  console.log('   ساخت کاربر ادمین برای سایت افرا');
  console.log('========================================\n');

  const name = await ask('نام و نام خانوادگی ادمین: ');
  const phone = await ask('شماره موبایل ادمین (مثلاً 09123456789): ');
  const password = await ask('رمز عبور ادمین (حداقل ۸ کاراکتر قوی): ');
  const nationalId = await ask('کد ملی ادمین (۱۰ رقم): ');

  console.log('\nدر حال ساخت ادمین...');

  // بررسی وجود کاربر
  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing) {
    console.log('❌ این شماره موبایل قبلاً ثبت شده است.');
    await prisma.$disconnect();
    rl.close();
    return;
  }

  // هش کردن رمز عبور
  const hashedPassword = await bcrypt.hash(password, 10);

  // ساخت کاربر با نقش admin
  const admin = await prisma.user.create({
    data: {
      phone,
      name,
      nationalId,
      password: hashedPassword,
      role: 'admin',
      status: 'active',
    },
  });

  console.log('\n✅ کاربر ادمین با موفقیت ساخته شد!');
  console.log('----------------------------------------');
  console.log('ID:      ', admin.id);
  console.log('نام:     ', admin.name);
  console.log('موبایل:  ', admin.phone);
  console.log('نقش:     ', admin.role);
  console.log('----------------------------------------\n');

  await prisma.$disconnect();
  rl.close();
}

createAdmin().catch((err) => {
  console.error('❌ خطا:', err.message);
  prisma.$disconnect();
  rl.close();
});