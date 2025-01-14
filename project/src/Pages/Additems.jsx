import React, { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PlusIcon, CurrencyIcon as CurrencyDollarIcon, TagIcon, TruckIcon, ArchiveIcon as ArchiveBoxIcon, BuildingIcon as BuildingStorefrontIcon, TextIcon as DocumentTextIcon, PercentIcon, ImageIcon, X } from 'lucide-react'
import axios from "axios"
import { useNavigate } from 'react-router'
import { useId } from 'react'
import { v4 as uuidv4 } from 'uuid'



const InputField = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={props.id}>{label}</Label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <Input className="pl-10" {...props} />
    </div>
  </div>
);

const SelectField = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={props.id}>{label}</Label>
    <Select onValueChange={props.onChange} defaultValue={props.value}>
      <SelectTrigger className="w-full">
        <div className="flex items-center">
          <Icon className="h-5 w-5 text-gray-400 mr-2" aria-hidden="true" />
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {props.children}
      </SelectContent>
    </Select>
  </div>
);

export default function AddItems() {
  const [adding , setAdding] = useState(false);
  const { toast } = useToast(); 
  const navigate = useNavigate(); 
  const id = useId(); 
  const [formData, setFormData] = useState({
    item_id: uuidv4(),
    itemName: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    quantity: '',
    shipping: '',
    discount: '',
    image: null,
    imagePreview: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   try { 
      setAdding(true);
      
      // Create FormData object
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key !== 'imagePreview') { // Skip the preview URL
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        import.meta.env.VITE_ADD_ITEM_API_URL, 
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if(response.status === 201){
        setAdding(false);
        navigate("/"); 
            toast({
              title: "Item Added",
              description: "Your new item has been successfully added to the inventory.",
            })
            
            setFormData({
              itemName: '',
              price: '',
              description: '',
              category: '',
              brand: '',
              quantity: '',
              shipping: '',
              discount: '',
              image: null,
              imagePreview: null
            });
      }
    } catch(err) { 
      console.log("error while submitting items: ", err);
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-center">Add New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InputField
                icon={TagIcon}
                label="Item Name"
                type="text"
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
              />

              <InputField
                icon={CurrencyDollarIcon}
                label="Price"
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />

              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <Textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="pl-10"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <SelectField
                icon={ArchiveBoxIcon}
                label="Category"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleSelectChange('category')}
                required
              >
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="books">Books</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
                <SelectItem value="toys">Toys & Games</SelectItem>
              </SelectField>

              <InputField
                icon={BuildingStorefrontIcon}
                label="Brand"
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />

              <InputField
                icon={ArchiveBoxIcon}
                label="Quantity"
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
              />

              <SelectField
                icon={TruckIcon}
                label="Shipping"
                id="shipping"
                name="shipping"
                value={formData.shipping}
                onChange={handleSelectChange('shipping')}
                required
              >
                <SelectItem value="free">Free Shipping</SelectItem>
                <SelectItem value="standard">Standard Shipping</SelectItem>
                <SelectItem value="express">Express Shipping</SelectItem>
              </SelectField>

              <InputField
                icon={PercentIcon}
                label="Discount (%)"
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                max="100"
              />

              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="grid gap-4">
                  <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  {formData.imagePreview && (
                    <div className="relative aspect-square w-40 mx-auto">
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="rounded-lg object-cover w-full h-full"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: null }))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled ={adding}>
                <PlusIcon className="h-5 w-5 mr-2" />
                {adding ? "Adding..." : "Add Item"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

