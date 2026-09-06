import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

export const login = async (req, res) => {
  try {
    console.log('\n--- 🔍 LOCAL LOGIN DEBUG ---');
    console.log('1. Request Body Received:', req.body);

    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      console.log('❌ Failed: Missing username or password');
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Search user (trim space & ignore casing)
    const user = await prisma.staffAccount.findFirst({
      where: {
        username: {
          equals: username.trim(),
          mode: 'insensitive'
        }
      }
    });

    console.log('2. Database Search Result:', user ? { id: user.id, username: user.username, role: user.role } : 'USER NOT FOUND');

    if (!user) {
      console.log(`❌ Failed: Username "${username.trim()}" does not exist in local DB`);
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare Hash
    console.log('3. Stored Hash in DB:', user.passwordHash);
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    console.log('4. Bcrypt Compare Result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ Failed: Password mismatch');
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id.toString(), username: user.username, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    console.log('✅ Success: Login successful');
    return res.status(200).json({
      success: true,
      token,
      user: { id: user.id.toString(), username: user.username, displayName: user.displayName, role: user.role }
    });

  } catch (error) {
    console.error('💥 Server Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

router.post('/login', login);

export default router;