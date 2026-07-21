import express from 'express';
import { sql } from '../db/index.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const products = await sql`
      SELECT * FROM products
      LIMIT ${limit} OFFSET ${offset}
    `;

    const totalCount = await sql`SELECT COUNT(*) as count FROM products`;

    res.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total: totalCount[0].count,
        totalPages: Math.ceil(totalCount[0].count / limit),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const products = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: products[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create product (Admin only)
router.post('/', async (req, res) => {
  try {
    const { name, description, price, stockQuantity, categoryId, sku, imageUrl } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        error: 'Name and price are required',
      });
    }

    const products = await sql`
      INSERT INTO products (name, description, price, stock_quantity, category_id, sku, image_url)
      VALUES (${name}, ${description || ''}, ${price}, ${stockQuantity || 0}, ${categoryId || null}, ${sku || ''}, ${imageUrl || ''})
      RETURNING *
    `;

    res.status(201).json({
      success: true,
      data: products[0],
      message: 'Product created successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stockQuantity } = req.body;

    const products = await sql`
      UPDATE products
      SET name = COALESCE(${name}, name),
          description = COALESCE(${description}, description),
          price = COALESCE(${price}, price),
          stock_quantity = COALESCE(${stockQuantity}, stock_quantity),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: products[0],
      message: 'Product updated successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await sql`
      DELETE FROM products WHERE id = ${id}
    `;

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
