
import React from 'react';
import { useFridgely } from '@/context/FridgelyContext';
import AppLayout from '@/components/layout/AppLayout';
import FoodItemCard from '@/components/food/FoodItemCard';
import AddFoodButton from '@/components/food/AddFoodButton';
import AddFoodModal from '@/components/food/AddFoodModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Expiring = () => {
  const { getExpiringItems, getExpiredItems, getRecipesByIngredients } = useFridgely();
  
  const expiringItems = getExpiringItems();
  const expiredItems = getExpiredItems();
  
  const expiringItemNames = expiringItems.map(item => item.name);
  const suggestedRecipes = getRecipesByIngredients(expiringItemNames).slice(0, 2);
  
  return (
    <AppLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Expiring Soon</h1>
        </div>
        
        <Tabs defaultValue="expiring" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
          
          <TabsContent value="expiring">
            {expiringItems.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No items expiring soon</p>
                <p className="text-gray-400 text-sm">Everything in your fridge is fresh!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-3">
                  {expiringItems.map(item => (
                    <FoodItemCard key={item.id} item={item} />
                  ))}
                </div>
                
                {suggestedRecipes.length > 0 && (
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-3">Recipe Suggestions</h2>
                    <p className="text-sm text-gray-500 mb-3">
                      Use your expiring items in these recipes:
                    </p>
                    
                    <div className="space-y-3">
                      {suggestedRecipes.map(recipe => (
                        <div 
                          key={recipe.id} 
                          className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3"
                        >
                          <div className="h-16 w-16 bg-gray-200 rounded-lg overflow-hidden">
                            {recipe.imageUrl ? (
                              <img 
                                src={recipe.imageUrl} 
                                alt={recipe.name} 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400">
                                No image
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-medium">{recipe.name}</h3>
                            <p className="text-xs text-gray-500">
                              {recipe.prepTime + recipe.cookTime} min • {recipe.ingredients.length} ingredients
                            </p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                                <span key={i} className="text-xs bg-fridgely-lightGray px-1.5 py-0.5 rounded-full">
                                  {ingredient}
                                </span>
                              ))}
                              {recipe.ingredients.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{recipe.ingredients.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="expired">
            {expiredItems.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No expired items</p>
                <p className="text-gray-400 text-sm">Great job managing your food!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {expiredItems.map(item => (
                  <FoodItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <AddFoodButton />
      <AddFoodModal />
    </AppLayout>
  );
};

export default Expiring;
