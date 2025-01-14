import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Previewcard() {
  axios.defaults.withCredentials = true; 
  const [items, setitems] = useState([]); 
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => { 
    const getlatestitem = async () => {
      setLoading(true); // Set loading to true before fetching data
      const items = await axios.get(import.meta.env.VITE_GET_ITEMS_URL);
      console.log("GOT ITEMS")
      console.log(items); 
      setitems(items.data);
      setLoading(false); // Set loading to false after data is fetched
    }
    getlatestitem();
  }, [])

  return (
    <>
      <div className="bg-white rounded-2xl p-8 md:p-16">
        <div className="flex items-center space-x-4">
          {loading ? ( // Show loading message while data is being fetched
            <p>Loading...</p>
          ) : (
            items.map((item, index) => (
              <div key={`${item.item_id}-${index}`} className="item-card">
                {item.image && (
                  <img 
                    src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(item.image.data)))}`} 
                    alt={item.itemname} 
                    className="w-full h-48 object-cover"
                  />
                )}
                <h3>{item.itemname}</h3>
                <p>{item.description}</p>
                <p>${item.price}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>    
  )
}

export default Previewcard