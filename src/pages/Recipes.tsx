
import React, { useState } from 'react';
import { useFridgely } from '@/context/FridgelyContext';
import AppLayout from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Recipes = () => {
  const { recipes, foodItems } = useFridgely();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredRecipes = searchTerm 
    ? recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase())) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : recipes;
  
  const availableIngredients = foodItems.map(item => item.name.toLowerCase());
  
  const getRecipeMatchScore = (recipe: typeof recipes[0]) => {
    let matchCount = 0;
    recipe.ingredients.forEach(ing => {
      if (availableIngredients.some(item => ing.toLowerCase().includes(item))) {
        matchCount++;
      }
    });
    return (matchCount / recipe.ingredients.length) * 100;
  };
  
  return (
    <AppLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Recipes</h1>
          <p className="text-gray-500">Use what you have</p>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search recipes or ingredients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="space-y-6">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No matching recipes found</p>
              <p className="text-gray-400 text-sm">Try searching for something else</p>
            </div>
          ) : (
            filteredRecipes.map(recipe => {
              const matchScore = getRecipeMatchScore(recipe);
              return (
                <div
                  key={recipe.id}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                >
                  <div className="h-48 bg-gray-200 relative">
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
                    <div className="absolute top-2 right-2 bg-white rounded-full px-3 py-1 text-sm font-medium shadow-sm">
                      {recipe.prepTime + recipe.cookTime} min
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{recipe.name}</h3>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {recipe.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-fridgely-lightGray px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium">Ingredients:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {recipe.ingredients.map((ingredient, i) => {
                          const isAvailable = availableIngredients.some(item => 
                            ingredient.toLowerCase().includes(item)
                          );
                          
                          return (
                            <span
                              key={i}
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                isAvailable 
                                  ? 'bg-fridgely-green/20 text-fridgely-green' 
                                  : 'bg-fridgely-lightGray text-gray-600'
                              }`}
                            >
                              {ingredient} {isAvailable && '✓'}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="mt-3 border-t border-gray-100 pt-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Ingredients match:</p>
                          <div className="w-36 h-2 bg-gray-200 rounded-full mt-1">
                            <div 
                              className="h-full bg-fridgely-green rounded-full" 
                              style={{ width: `${matchScore}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-fridgely-green">
                          {Math.round(matchScore)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Recipes;
