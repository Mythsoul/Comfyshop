import { database as db } from "../config/db.js";

export const getItems = async (req, res) => {
  try {
    const items = await db.query(
      "SELECT items.item_id, itemName, price, description, category, brand, quantity, shipping, discount, images.image FROM items LEFT JOIN images ON items.item_id = images.item_id ORDER BY items.item_id DESC"
    );

    if (!items.rows) {
      return res.status(404).json({ message: "No items found" });
    }

    // Convert image buffer to base64 string
    const formattedItems = items.rows.map(item => ({
      ...item,
      image: item.image ? { type: 'Buffer', data: item.image.toString('base64') } : null
    }));

    res.status(200).json(formattedItems);
  } catch (err) {
    console.error("Error getting items:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createItem = async (req, res) => {
    const { item_id, itemName, price, description, category, brand, quantity, shipping, discount } = req.body;
    
    try {
        let imageBuffer = null;
        if (req.file) {
            imageBuffer = req.file.buffer;
        }

        const newItem = await db.query(
            "INSERT INTO items(item_id, itemName, price, description, category, brand, quantity, shipping, discount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING item_id, itemName, price, description, category, brand, quantity, shipping, discount",
            [item_id, itemName, price, description, category, brand, quantity, shipping, discount]
        );
        const insertimage = await db.query("insert into images(id , item_id , image) values ($1 , $2 , $3)", [Math.random().toString(36).slice(2), item_id, imageBuffer]);
        if(!newItem.rows[0] || !insertimage.rows[0]){
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json(newItem.rows[0]);
    } catch (err) {
        console.error("Error creating item:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
