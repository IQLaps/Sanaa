import express from 'express';
import { sql } from '../db/index.js';

const router = express.Router();

// Get user orders
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required',
      });
    }

    const orders = await sql`
      SELECT * FROM orders WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    res.json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get order details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await sql`
      SELECT * FROM orders WHERE id = ${id}
    `;

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }

    const orderItems = await sql`
      SELECT * FROM order_items WHERE order_id = ${id}
    `;

    res.json({
      success: true,
      data: { ...orders[0], items: orderItems },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Create order
router.post('/', async (req, res) => {
  try {
    const { userId, items, shippingAddress, paymentMethod } = req.body;

    if (!userId || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'User ID and order items are required',
      });
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of items) {
      const products = await sql`SELECT price FROM products WHERE id = ${item.productId}`;
      if (products.length > 0) {
        totalPrice += products[0].price * item.quantity;
      }
    }

    // Create order
    const orders = await sql`
      INSERT INTO orders (user_id, total_price, status, payment_method, shipping_address)
      VALUES (${userId}, ${totalPrice}, 'pending', ${paymentMethod || 'credit_card'}, ${shippingAddress || ''})
      RETURNING *
    `;

    const order = orders[0];

    // Add order items
    for (const item of items) {
      const products = await sql`SELECT price FROM products WHERE id = ${item.productId}`;
      if (products.length > 0) {
        await sql`
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES (${order.id}, ${item.productId}, ${item.quantity}, ${products[0].price})
        `;
      }
    }

    // Clear cart
    await sql`
      DELETE FROM cart_items WHERE user_id = ${userId}
    `;

    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
