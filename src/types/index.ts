
export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  expirationDate: Date;
  quantity: number;
  unit: string;
  location: FridgeLocation;
  owner: string | null; // null if shared
  imageUrl?: string;
  notes?: string;
  added: Date;
}

export type FoodCategory = 
  | 'dairy'
  | 'produce'
  | 'meat'
  | 'seafood'
  | 'grains'
  | 'condiments'
  | 'snacks'
  | 'beverages'
  | 'leftovers'
  | 'other';

export type FridgeLocation =
  | 'upper shelf'
  | 'middle shelf'
  | 'lower shelf'
  | 'door'
  | 'crisper drawer'
  | 'freezer'
  | 'pantry';

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  imageUrl?: string;
  tags: string[];
}

export interface Notification {
  id: string;
  type: 'expiry' | 'recipe' | 'system';
  title: string;
  message: string;
  itemIds?: string[];
  recipeId?: string;
  read: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  preferences: {
    notificationsEnabled: boolean;
    notificationTiming: 1 | 2 | 3 | 5 | 7; // days before expiration
    shareInventory: boolean;
    defaultUnit: string;
  };
  stats: {
    itemsSaved: number;
    moneySaved: number; // estimated in dollars
    itemsTracked: number;
    wasteReduction: number; // percentage
  };
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earned: boolean;
  earnedAt?: Date;
}

export interface Roommate {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  shareStatus: 'invited' | 'active' | 'inactive';
}

export type AddMethod = 'scan' | 'photo' | 'voice' | 'manual';
