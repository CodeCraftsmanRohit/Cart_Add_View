import express from 'express';
import {
  getAllItems,
  addNewItem,
  sendEnquiry
} from '../controllers/itemsController.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

// ✅ Route to get all items
router.get('/view', getAllItems);

// ✅ Route to add a new item with image uploads (cover + additional images)
router.post(
  '/add',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 }
  ]),
  addNewItem
);

// ✅ Route to send enquiry email
router.post('/enquire', sendEnquiry);

export default router;
