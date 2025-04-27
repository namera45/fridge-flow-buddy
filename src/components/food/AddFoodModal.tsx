
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useFridgely } from '@/context/FridgelyContext';
import { Button } from '@/components/ui/button';
import { AddMethod, FoodCategory, FridgeLocation } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AddFoodModal: React.FC = () => {
  const { isAddModalOpen, setIsAddModalOpen, addMethod, setAddMethod, addFoodItem } = useFridgely();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<FoodCategory>('other');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('count');
  const [location, setLocation] = useState<FridgeLocation>('middle shelf');
  const [days, setDays] = useState(7);
  const [owner, setOwner] = useState<string | null>(null);

  const handleClose = () => {
    setIsAddModalOpen(false);
    setAddMethod(null);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setCategory('other');
    setQuantity(1);
    setUnit('count');
    setLocation('middle shelf');
    setDays(7);
    setOwner(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    
    addFoodItem({
      name,
      category,
      expirationDate,
      quantity,
      unit,
      location,
      owner,
    });
    
    handleClose();
  };

  const renderMethod = () => {
    switch (addMethod) {
      case 'scan':
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-500">Scan barcode</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Position the barcode within the frame</p>
            <Button variant="outline" onClick={() => setAddMethod('manual')}>
              Enter manually instead
            </Button>
          </div>
        );
      case 'photo':
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-500">Take photo</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Take a clear photo of the food item</p>
            <Button variant="outline" onClick={() => setAddMethod('manual')}>
              Enter manually instead
            </Button>
          </div>
        );
      case 'voice':
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-24 h-24 rounded-full bg-fridgely-green flex items-center justify-center mb-4">
              <span className="text-white text-2xl">🎤</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Listening... Say what you're adding</p>
            <p className="text-xs text-gray-400 mb-4">Example: "Add a gallon of milk expiring in 5 days"</p>
            <Button variant="outline" onClick={() => setAddMethod('manual')}>
              Enter manually instead
            </Button>
          </div>
        );
      case 'manual':
      default:
        return renderManualForm();
    }
  };

  const renderManualForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Milk"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as FoodCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="produce">Produce</SelectItem>
                <SelectItem value="meat">Meat</SelectItem>
                <SelectItem value="seafood">Seafood</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="condiments">Condiments</SelectItem>
                <SelectItem value="snacks">Snacks</SelectItem>
                <SelectItem value="beverages">Beverages</SelectItem>
                <SelectItem value="leftovers">Leftovers</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="0.1"
              step="0.1"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="count">Count</SelectItem>
                <SelectItem value="lb">lb</SelectItem>
                <SelectItem value="oz">oz</SelectItem>
                <SelectItem value="g">g</SelectItem>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="gallon">Gallon</SelectItem>
                <SelectItem value="liter">Liter</SelectItem>
                <SelectItem value="box">Box</SelectItem>
                <SelectItem value="pack">Pack</SelectItem>
                <SelectItem value="can">Can</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Expires in (days)</Label>
            <Input
              id="expiry"
              type="number"
              min="0"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={(value) => setLocation(value as FridgeLocation)}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upper shelf">Upper Shelf</SelectItem>
                <SelectItem value="middle shelf">Middle Shelf</SelectItem>
                <SelectItem value="lower shelf">Lower Shelf</SelectItem>
                <SelectItem value="door">Door</SelectItem>
                <SelectItem value="crisper drawer">Crisper Drawer</SelectItem>
                <SelectItem value="freezer">Freezer</SelectItem>
                <SelectItem value="pantry">Pantry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="owner">Owner</Label>
          <Select value={owner || 'shared'} onValueChange={(value) => setOwner(value === 'shared' ? null : value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shared">Shared</SelectItem>
              <SelectItem value="user1">Mine</SelectItem>
              <SelectItem value="user2">Alex's</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-fridgely-green hover:bg-fridgely-green/90">
            Add Item
          </Button>
        </div>
      </form>
    );
  };

  const renderAddMethodSelector = () => {
    return (
      <div className="pt-4">
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="manual" onClick={() => setAddMethod('manual')}>
              <span className="flex flex-col items-center gap-1">
                <span className="text-xl">✏️</span>
                <span className="text-xs">Type</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="scan" onClick={() => setAddMethod('scan')}>
              <span className="flex flex-col items-center gap-1">
                <span className="text-xl">📷</span>
                <span className="text-xs">Scan</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="photo" onClick={() => setAddMethod('photo')}>
              <span className="flex flex-col items-center gap-1">
                <span className="text-xl">🖼️</span>
                <span className="text-xs">Photo</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="voice" onClick={() => setAddMethod('voice')}>
              <span className="flex flex-col items-center gap-1">
                <span className="text-xl">🎤</span>
                <span className="text-xs">Voice</span>
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    );
  };

  return (
    <Dialog open={isAddModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Food Item</DialogTitle>
        </DialogHeader>
        
        {!addMethod && renderAddMethodSelector()}
        {addMethod && renderMethod()}
      </DialogContent>
    </Dialog>
  );
};

export default AddFoodModal;
