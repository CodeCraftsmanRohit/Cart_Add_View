// ✅ controllers/itemsController.js (updated to use memory buffer and Cloudinary)
import itemModel from '../models/Items.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.js';
import transporter from "../config/nodemailer.js";

export const getAllItems = async (req, res) => {
  try {
    const items = await itemModel.find().sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addNewItem = async (req, res) => {
  try {
    const { name, type, description } = req.body;

    if (!name || !type || !description) {
      return res.status(400).json({ success: false, message: 'name, type or description is missing' });
    }

    const coverImageFile = req.files?.coverImage?.[0];
    if (!coverImageFile) {
      return res.status(400).json({ success: false, message: 'Cover image is required' });
    }

    const coverImageUpload = await uploadOnCloudinary(coverImageFile.buffer);

    const additionalImageBuffers = req.files?.additionalImages || [];
    const additionalImageUploads = await Promise.all(
      additionalImageBuffers.map(file => uploadOnCloudinary(file.buffer))
    );

    const newItem = await itemModel.create({
      name,
      type,
      description,
      coverImage: coverImageUpload.secure_url,
      additionalImages: additionalImageUploads.map(img => img.secure_url),
    });

    res.status(201).json({
      success: true,
      message: "Item successfully added",
      item: newItem,
    });
  } catch (err) {
    console.error("Add Item Error:", err);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Failed to add item"
    });
  }
};

export const sendEnquiry = async (req, res) => {
  const { name, email, itemName } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: `Enquiry for Item: ${itemName}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Enquired about:</strong> ${itemName}</p>
      `,
    });

    res.status(200).json({ success: true, message: 'Enquiry sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send enquiry', error: error.message });
  }
};
