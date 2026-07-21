import express from 'express';
import { sql } from '../db/index.js';

const router = express.Router();

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const users = await sql`
      SELECT id, email, first_name, last_name, phone, address, city, country, created_at
      FROM users
      WHERE id = ${userId}
    `;

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      data: users[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update user profile
router.put('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, phone, address, city, country } = req.body;

    const users = await sql`
      UPDATE users
      SET first_name = COALESCE(${firstName}, first_name),
          last_name = COALESCE(${lastName}, last_name),
          phone = COALESCE(${phone}, phone),
          address = COALESCE(${address}, address),
          city = COALESCE(${city}, city),
          country = COALESCE(${country}, country),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId}
      RETURNING id, email, first_name, last_name, phone, address, city, country
    `;

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    res.json({
      success: true,
      data: users[0],
      message: 'Profile updated successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
