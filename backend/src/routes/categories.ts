import express from 'express';
import { sql } from '../db/index.js';

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await sql`
      SELECT * FROM categories
      ORDER BY created_at DESC
    `;

    res.json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get category by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const categories = await sql`
      SELECT * FROM categories WHERE id = ${id}
    `;

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Category not found',
      });
    }

    res.json({
      success: true,
      data: categories[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create category
router.post('/', async (req, res) => {
  try {
    const { name, description, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        error: 'Name and slug are required',
      });
    }

    const categories = await sql`
      INSERT INTO categories (name, description, slug)
      VALUES (${name}, ${description || ''}, ${slug})
      RETURNING *
    `;

    res.status(201).json({
      success: true,
      data: categories[0],
      message: 'Category created successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
