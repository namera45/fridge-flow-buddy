
import React from 'react';
import { useFridgely } from '@/context/FridgelyContext';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Roommates = () => {
  const { user, roommate, foodItems } = useFridgely();
  
  const sharedItems = foodItems.filter(item => item.owner === null);
  const myItems = foodItems.filter(item => item.owner === 'user1');
  const roommateItems = foodItems.filter(item => item.owner === 'user2');
  
  return (
    <AppLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Share</h1>
          <p className="text-gray-500">Manage shared items with roommates</p>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-medium mb-4">Fridge Sharing</h2>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="share-inventory">Share inventory</Label>
              <Switch
                id="share-inventory"
                checked={user.preferences.shareInventory}
              />
            </div>
            
            {user.preferences.shareInventory && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-3">Connected with:</p>
                
                <div className="flex items-center gap-3 p-3 bg-fridgely-lightGray rounded-lg">
                  <img
                    src={roommate?.avatarUrl || "https://source.unsplash.com/random/100x100/?person"}
                    alt={roommate?.name || "Roommate"}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{roommate?.name || "Alex"}</p>
                    <p className="text-sm text-gray-500">{roommate?.email || "alex@example.com"}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs bg-fridgely-green text-white px-2 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {user.preferences.shareInventory && (
            <>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h2 className="font-medium mb-4">Invite New Roommate</h2>
                
                <div className="flex gap-2">
                  <Input placeholder="Email address" />
                  <Button className="bg-fridgely-green hover:bg-fridgely-green/90 gap-2">
                    <Share size={16} />
                    Invite
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <h2 className="font-medium mb-4">Shared Items</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-fridgely-lightGray rounded-lg">
                    <div>
                      <p className="font-medium">Shared Items</p>
                      <p className="text-sm text-gray-500">Accessible to all roommates</p>
                    </div>
                    <div>
                      <span className="text-2xl font-bold">{sharedItems.length}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-fridgely-lightGray rounded-lg">
                    <div>
                      <p className="font-medium">My Items</p>
                      <p className="text-sm text-gray-500">Only you can see these</p>
                    </div>
                    <div>
                      <span className="text-2xl font-bold">{myItems.length}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-fridgely-lightGray rounded-lg">
                    <div>
                      <p className="font-medium">Alex's Items</p>
                      <p className="text-sm text-gray-500">Only Alex can manage these</p>
                    </div>
                    <div>
                      <span className="text-2xl font-bold">{roommateItems.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h2 className="font-medium mb-4">Shopping List</h2>
            
            <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
              <p className="text-gray-500">Create a shared shopping list</p>
              <p className="text-sm text-gray-400 mt-1">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Roommates;
