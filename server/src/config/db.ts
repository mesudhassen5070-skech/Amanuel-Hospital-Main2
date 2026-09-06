import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

// Singleton pattern to prevent multiple Prisma instances in development
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// Auto-ensure public.doctors table exists in PostgreSQL database
async function initDb() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS public.doctors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT UNIQUE NOT NULL,
        department_id TEXT,
        specialty TEXT NOT NULL DEFAULT 'General Practice',
        experience TEXT DEFAULT '5+ years experience',
        bio TEXT DEFAULT 'Specialist physician at Dr. Amanuel Hospital.',
        is_available BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);
  } catch (e: any) {
    console.warn('[DB Init] Doctors table check warning:', e.message);
  }
}

initDb();

export default prisma;