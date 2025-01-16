import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Previewcard() {
  axios.defaults.withCredentials = true; 
  const [items, setitems] = useState([]); 

  useEffect(() => { 
    const getlatestitem = async () => {
      const items = await axios.get(import.meta.env.VITE_GET_ITEMS_URL);
      console.log("GOT ITEMS")
      console.log(items); 
      setitems(items.data);
    }
    getlatestitem();
  }, [])

  return (
    <>
      <div className="bg-white rounded-2xl p-8 md:p-16">
        <div className="flex items-center space-x-4">
          
          {items.map((item, index) => (
            <div key={`${item.item_id}-${index}`} className="item-card">
              {item.imageUrl && (
                <img 
                  src={item.imageUrl}
                  alt={item.itemName} 
                  className="w-full h-48 object-cover"
                />
              )}
              <h3>{item.itemName}</h3>
              <p>{item.description}</p>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>    
  )
}

export default Previewcard