import { database as db } from "../config/db.js";
import { uploadImage, BUCKET_ID } from '../appwrite/config.js';
import { ID } from 'node-appwrite';
import { conf } from '../config/conf.js';
import dotenv from "dotenv"

dotenv.config();

// Middleware for getting items
export const getItems = async (req, res) => {
  try {
    const items = await db.query(
      "SELECT items.*, images.image_id FROM items LEFT JOIN images ON items.item_id = images.item_id ORDER BY items.item_id DESC"
    );

    if (!items.rows || items.rows.length === 0) {
      return res.status(404).json({ message: "No items found" });
    }

    const formattedItems = items.rows.map(item => ({
      ...item,
      imageUrl: item.image_id
        ? `${conf.AppwriteUrl}/storage/buckets/${BUCKET_ID}/files/${item.image_id}/view?project=${conf.Appwrite_projectid}`
        : null
    }));

    res.status(200).json(formattedItems);
  } catch (err) {
    console.error("Error getting items:", err);
    res.status(500).json({ message: "Failed to fetch items" });
  }
};

// Middleware for creating an item
export const createItem = async (req, res) => {
  const { itemName, price, description, category, brand, quantity, shipping, discount } = req.body;
  const item_id = ID.unique();

  try {
    // Convert numeric values
    const numericPrice = parseFloat(price) || 0;
    const numericQuantity = parseInt(quantity) || 0;
    const numericDiscount = parseFloat(discount) || 0;

    let fileId = null;
    if (req.file) {
      fileId = ID.unique();
      try {
        // Get file details from multer
        const { originalname, buffer, mimetype } = req.file;
        
        await uploadImage(
          buffer,
          originalname,
          fileId
        );
      } catch (uploadError) {
        console.error("Error uploading file to Appwrite:", uploadError);
        return res.status(500).json({ 
          message: "File upload failed", 
          error: uploadError.message,
          details: uploadError.stack
        });
      }
    }

    // Insert new item into the database with proper type conversion
    const newItem = await db.query(
      `INSERT INTO items(item_id, itemName, price, description, category, brand, quantity, shipping, discount)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING item_id, itemName, price, description, category, brand, quantity, shipping, discount`,
      [
        item_id, 
        itemName, 
        numericPrice, 
        description, 
        category, 
        brand, 
        numericQuantity, 
        shipping, 
        numericDiscount
      ]
    );

    // Insert image ID into the images table if file was uploaded
    if (fileId) {
      await db.query(
        `INSERT INTO images(id, item_id, image_id) VALUES ($1, $2, $3)`,
        [ID.unique(), item_id, fileId]
      );
    }

    res.status(201).json({
      ...newItem.rows[0],
      imageUrl: fileId
        ? storage.getFileView(BUCKET_ID, fileId)
        : null,
    });
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({
      message: "Failed to create item",
      error: err.message,
      details: err.stack
    });
  }
};
