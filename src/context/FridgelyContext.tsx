
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FoodItem, Recipe, Notification, User, Roommate, AddMethod } from '../types';
import { mockFoodItems, mockRecipes, mockNotifications, mockUser, mockRoommate } from '../data/mockData';
import { useToast } from '@/hooks/use-toast';

interface FridgelyContextType {
  foodItems: FoodItem[];
  recipes: Recipe[];
  notifications: Notification[];
  user: User;
  roommate: Roommate | null;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  setAddMethod: (method: AddMethod | null) => void;
  addMethod: AddMethod | null;
  addFoodItem: (item: Omit<FoodItem, 'id' | 'added'>) => void;
  removeFoodItem: (id: string) => void;
  updateFoodItem: (id: string, updates: Partial<FoodItem>) => void;
  markNotificationAsRead: (id: string) => void;
  getExpiringItems: () => FoodItem[];
  getExpiredItems: () => FoodItem[];
  getRecipesByIngredients: (ingredientNames: string[]) => Recipe[];
}

const FridgelyContext = createContext<FridgelyContextType | undefined>(undefined);

export const useFridgely = () => {
  const context = useContext(FridgelyContext);
  if (context === undefined) {
    throw new Error('useFridgely must be used within a FridgelyProvider');
  }
  return context;
};

interface FridgelyProviderProps {
  children: ReactNode;
}

export const FridgelyProvider: React.FC<FridgelyProviderProps> = ({ children }) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(mockFoodItems);
  const [recipes] = useState<Recipe[]>(mockRecipes);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [user] = useState<User>(mockUser);
  const [roommate] = useState<Roommate | null>(mockRoommate);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addMethod, setAddMethod] = useState<AddMethod | null>(null);
  const { toast } = useToast();

  const addFoodItem = (item: Omit<FoodItem, 'id' | 'added'>) => {
    const newItem: FoodItem = {
      ...item,
      id: Date.now().toString(),
      added: new Date(),
    };
    setFoodItems([...foodItems, newItem]);
    
    toast({
      title: "Item added",
      description: `${item.name} was added to your fridge`,
    });
  };

  const removeFoodItem = (id: string) => {
    const itemToRemove = foodItems.find(item => item.id === id);
    if (itemToRemove) {
      setFoodItems(foodItems.filter(item => item.id !== id));
      toast({
        title: "Item removed",
        description: `${itemToRemove.name} was removed from your fridge`,
      });
    }
  };

  const updateFoodItem = (id: string, updates: Partial<FoodItem>) => {
    setFoodItems(
      foodItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getExpiringItems = () => {
    const today = new Date();
    const thresholdDate = new Date(today);
    thresholdDate.setDate(thresholdDate.getDate() + user.preferences.notificationTiming);
    
    return foodItems.filter(item => {
      const expDate = new Date(item.expirationDate);
      return expDate > today && expDate <= thresholdDate;
    });
  };

  const getExpiredItems = () => {
    const today = new Date();
    return foodItems.filter(item => new Date(item.expirationDate) < today);
  };

  const getRecipesByIngredients = (ingredientNames: string[]) => {
    if (ingredientNames.length === 0) return [];

    const normalizedNames = ingredientNames.map(name => name.toLowerCase());
    
    return recipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => ing.toLowerCase());
      return normalizedNames.some(name => 
        recipeIngredients.some(ing => ing.includes(name))
      );
    });
  };

  const value = {
    foodItems,
    recipes,
    notifications,
    user,
    roommate,
    isAddModalOpen,
    setIsAddModalOpen,
    addMethod,
    setAddMethod,
    addFoodItem,
    removeFoodItem,
    updateFoodItem,
    markNotificationAsRead,
    getExpiringItems,
    getExpiredItems,
    getRecipesByIngredients,
  };

  return <FridgelyContext.Provider value={value}>{children}</FridgelyContext.Provider>;
};
