import { database as db } from "../config/db.js";
import { storage, BUCKET_ID } from '../appwrite/config.js';
import { ID } from 'node-appwrite';
import fs from 'fs';
import path from 'path';
import os from 'os';

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
        ? `${process.env.AppwriteUrl}/storage/buckets/${BUCKET_ID}/files/${item.image_id}/view`
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
  const { item_id, itemName, price, description, category, brand, quantity, shipping, discount } = req.body;

  try {
    // Handle file upload if present
    let fileId = null;
    if (req.file) {
      fileId = ID.unique();

      try {
        await storage.createFile(
          BUCKET_ID,
          fileId,
          req.file.buffer // Upload file buffer
        );
      } catch (uploadError) {
        console.error("Error uploading file to Appwrite:", uploadError);
        return res.status(500).json({ message: "File upload failed" });
      }
    }

    // Insert new item into the database
    const newItem = await db.query(
      `INSERT INTO items(item_id, itemName, price, description, category, brand, quantity, shipping, discount)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING item_id, itemName, price, description, category, brand, quantity, shipping, discount`,
      [item_id, itemName, price, description, category, brand, quantity, shipping, discount]
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
        ? `${process.env.AppwriteUrl}/storage/buckets/${BUCKET_ID}/files/${fileId}/view`
        : null,
    });
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).json({
      message: "Failed to create item",
      error: err.message,
    });
  }
};
