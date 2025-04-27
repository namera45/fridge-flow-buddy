
import React from 'react';
import { useFridgely } from '@/context/FridgelyContext';
import AppLayout from '@/components/layout/AppLayout';
import FoodItemCard from '@/components/food/FoodItemCard';
import AddFoodButton from '@/components/food/AddFoodButton';
import AddFoodModal from '@/components/food/AddFoodModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const { foodItems, getExpiringItems, getExpiredItems } = useFridgely();
  
  const expiringItems = getExpiringItems();
  const expiredItems = getExpiredItems();
  
  return (
    <AppLayout>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Fridge</h1>
            <p className="text-gray-500">{foodItems.length} items</p>
          </div>
          <div className="flex items-center gap-2">
            <img 
              src="https://source.unsplash.com/random/100x100/?person" 
              alt="Profile" 
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        </div>
        
        {(expiredItems.length > 0 || expiringItems.length > 0) && (
          <div className="mb-6 p-4 bg-fridgely-lightGray rounded-lg">
            <h2 className="font-semibold mb-2">Attention Needed</h2>
            {expiredItems.length > 0 && (
              <div className="mb-2">
                <p className="text-fridgely-red font-medium text-sm">
                  {expiredItems.length} item{expiredItems.length !== 1 ? 's' : ''} expired!
                </p>
              </div>
            )}
            {expiringItems.length > 0 && (
              <div>
                <p className="text-fridgely-orange font-medium text-sm">
                  {expiringItems.length} item{expiringItems.length !== 1 ? 's' : ''} expiring soon
                </p>
              </div>
            )}
          </div>
        )}
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="produce">Produce</TabsTrigger>
            <TabsTrigger value="dairy">Dairy</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="space-y-3">
              {foodItems.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">No items in your fridge yet</p>
                  <p className="text-gray-400 text-sm">Add items using the + button</p>
                </div>
              ) : (
                foodItems.map(item => (
                  <FoodItemCard key={item.id} item={item} />
                ))
              )}
            </div>
          </TabsContent>
          <TabsContent value="produce">
            <div className="space-y-3">
              {foodItems.filter(item => item.category === 'produce').map(item => (
                <FoodItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="dairy">
            <div className="space-y-3">
              {foodItems.filter(item => item.category === 'dairy').map(item => (
                <FoodItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="other">
            <div className="space-y-3">
              {foodItems.filter(item => !['produce', 'dairy'].includes(item.category)).map(item => (
                <FoodItemCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <AddFoodButton />
      <AddFoodModal />
    </AppLayout>
  );
};

export default Index;
