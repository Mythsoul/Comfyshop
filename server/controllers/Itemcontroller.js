export const getItems = async (req, res) => {
  try {
    const items = await db.query("SELECT * FROM items");
    res.status(200).json(items.rows);
  } catch (err) {
    console.error("Error getting posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createItem = async (req , res)=>{ 
    const {itemName , price , image , description , category , brand , quantity , shipping , discount} = req.body;
    console.log("Got another item " , req.body);
    try{ 
       const newItem = await db.query("INSERT INTO items (itemName , price , description , category , brand , quantity , shipping , discount) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 , $9) RETURNING *", [itemName , price ,  description , category , brand , quantity , shipping , discount]);
       res.status(201).json(newItem.rows[0]);
    }catch(err){ 
       console.error("Error creating item:", err);
       res.status(500).json({ message: "Internal server error" });
    }
}