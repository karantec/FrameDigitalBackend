const express = require('express');
const { 
    createOrder, 
    getAllOrders, 
    getOrderById, 
    updateOrder, 
    deleteOrder, 
    getOrdersByUser, 
    updateOrderStatus, 
    verifyPayment 
} = require('../controller/Order.Controlller');

const { verifyToken } = require('../middleware/authmiddleware');
const router = express.Router();

// Create a new order (Protected: Only authenticated users)
router.post('/create', verifyToken, createOrder);

// Verify payment (Protected: Only authenticated users)
router.post('/verify-payment', verifyToken, verifyPayment);

// Get all orders (Protected: Admin access only)
router.get('/', verifyToken, getAllOrders);

// Get a specific order by ID (Protected: User or Admin)
router.get('/:id', verifyToken, getOrderById);

// Get orders for a specific user (Protected: Only authenticated users)
router.get('/user/:userId', verifyToken, getOrdersByUser);

// Update an order (Protected: Admin or User who placed the order)
router.put('/:id', verifyToken, updateOrder);

// Update order status (Protected: Admin or authorized personnel)
router.patch('/:id/status', verifyToken, updateOrderStatus);

// Delete an order (Protected: Only admins can delete orders)
router.delete('/:id', verifyToken, deleteOrder);

module.exports = router;
