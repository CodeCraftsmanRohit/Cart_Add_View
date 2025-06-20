// middlewares/multer.js
import multer from 'multer';

// Use memory storage (no local file saving)
const storage = multer.memoryStorage();

export const upload = multer({ storage });
