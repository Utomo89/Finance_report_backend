import express from 'express';
import {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all category routes
router.use(authMiddleware);

// Route to create a new category
router.post('/', createCategory);
// Route to get all categories for the authenticated user
router.get('/', getCategories);
// Route to update a specific category by ID
router.put('/:id', updateCategory);
// Route to delete a specific category by ID
router.delete('/:id', deleteCategory);

export default router;