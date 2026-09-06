import { Router } from 'express';
import { getAllDoctors } from '../controllers/doctors.controller.js';

const router = Router();

// GET /api/doctors - Fetch all active doctors for public display
router.get('/', getAllDoctors);

export default router;
