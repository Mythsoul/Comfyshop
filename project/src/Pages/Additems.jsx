'use client'

import React, { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { PlusIcon, CurrencyIcon as CurrencyDollarIcon, TagIcon, TruckIcon, ArchiveIcon as ArchiveBoxIcon, BuildingIcon as BuildingStorefrontIcon, TextIcon as DocumentTextIcon, PercentIcon } from 'lucide-react'
import axios from "axios"
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
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    itemName: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    quantity: '',
    shipping: '',
    discount: ''
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

  const handleSubmit = async(e) => {
    e.preventDefault();
   try{ 
     const response = await axios.post(import.meta.env.VITE_ADD_ITEM_API_URL, formData);
     console.log("response : " , response);
   }catch(err){ 
    console.log("eror while submitting items : " , err);
   }
    console.log('Form submitted:', formData);
    toast({
      title: "Item Added",
      description: "Your new item has been successfully added to the inventory.",
    })
    // Reset form after submission
    setFormData({
      itemName: '',
      price: '',
      description: '',
      category: '',
      brand: '',
      quantity: '',
      shipping: '',
      discount: ''
    });
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
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Item
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

