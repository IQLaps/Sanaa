import express from 'express';
import { sql } from '../db/index.js';

const router = express.Router();

// Get user cart
router.get('/', async (req, res) => {
  try {
    // In a real app, get user ID from auth middleware
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required',
      });
    }

    const cartItems = await sql`
      SELECT ci.*, p.name, p.price, p.image_url
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ${userId}
    `;

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.json({
      success: true,
      data: { items: cartItems, totalPrice },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Add to cart
router.post('/', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        error: 'User ID and Product ID are required',
      });
    }

    const cartItems = await sql`
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES (${userId}, ${productId}, ${quantity || 1})
      RETURNING *
    `;

    res.status(201).json({
      success: true,
      data: cartItems[0],
      message: 'Item added to cart',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Remove from cart
router.delete('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;

    await sql`
      DELETE FROM cart_items WHERE id = ${itemId}
    `;

    res.json({
      success: true,
      message: 'Item removed from cart',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
