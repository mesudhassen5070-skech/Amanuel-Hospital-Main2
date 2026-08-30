Set-Content -Path "src/config/raw_reset.js" -Value @'
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  try {
    const hash = await bcrypt.hash('admin123', 10);
    await prisma.$executeRawUnsafe(`
      INSERT INTO "StaffAccount" ("id", "username", "passwordHash", "name", "role", "department", "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), 'admin', '${hash}', 'System Admin', 'ADMIN', 'Administration', NOW(), NOW())
      ON CONFLICT ("username") 
      DO UPDATE SET "passwordHash" = '${hash}', "role" = 'ADMIN', "updatedAt" = NOW();
    `);
    console.log('✅ Admin credentials guaranteed via Raw SQL');
  } catch (err) {
    console.error('❌ Error executing query:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
'@ -Encoding UTF8