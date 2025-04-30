const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart items
router.get('/:sessionId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ sessionId: req.params.sessionId })
            .populate('items.productId');
        
        if (!cart) {
            return res.json({ items: [] });
        }
        
        res.json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Failed to fetch cart items' });
    }
});

// Add item to cart
router.post('/:sessionId/items', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find or create cart
        let cart = await Cart.findOne({ sessionId: req.params.sessionId });
        if (!cart) {
            cart = new Cart({
                sessionId: req.params.sessionId,
                items: []
            });
        }

        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(item => 
            item.productId.toString() === productId
        );

        if (existingItemIndex !== -1) {
            // Update quantity if item exists
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                productId,
                quantity
            });
        }

        // Update the updatedAt timestamp
        cart.updatedAt = new Date();

        const updatedCart = await cart.save();
        const populatedCart = await Cart.findById(updatedCart._id)
            .populate('items.productId');
        
        res.json(populatedCart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(400).json({ message: 'Failed to add item to cart' });
    }
});

// Update item quantity
router.put('/:sessionId/items/:productId', async (req, res) => {
    try {
        const { quantity } = req.body;
        const cart = await Cart.findOne({ sessionId: req.params.sessionId });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => 
            item.productId.toString() === req.params.productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        if (quantity < 1) {
            // Remove item if quantity is less than 1
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        // Update the updatedAt timestamp
        cart.updatedAt = new Date();

        const updatedCart = await cart.save();
        const populatedCart = await Cart.findById(updatedCart._id)
            .populate('items.productId');
        
        res.json(populatedCart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(400).json({ message: 'Failed to update cart' });
    }
});

// Remove item from cart
router.delete('/:sessionId/items/:productId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ sessionId: req.params.sessionId });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => 
            item.productId.toString() === req.params.productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        cart.items.splice(itemIndex, 1);
        cart.updatedAt = new Date();

        const updatedCart = await cart.save();
        const populatedCart = await Cart.findById(updatedCart._id)
            .populate('items.productId');
        
        res.json(populatedCart);
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(400).json({ message: 'Failed to remove item from cart' });
    }
});

// Clear cart
router.delete('/:sessionId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ sessionId: req.params.sessionId });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        await cart.deleteOne();
        res.json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Failed to clear cart' });
    }
});

module.exports = router; 