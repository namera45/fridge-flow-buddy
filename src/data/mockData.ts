
import { FoodItem, Recipe, Notification, User, Badge, Roommate } from '../types';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);
const twoWeeksLater = new Date(today);
twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const threeMonthsAgo = new Date(today);
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

export const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Milk',
    category: 'dairy',
    expirationDate: tomorrow,
    quantity: 1,
    unit: 'gallon',
    location: 'door',
    owner: null,
    added: threeMonthsAgo,
  },
  {
    id: '2',
    name: 'Eggs',
    category: 'dairy',
    expirationDate: nextWeek,
    quantity: 12,
    unit: 'count',
    location: 'door',
    owner: null,
    added: threeMonthsAgo,
  },
  {
    id: '3',
    name: 'Spinach',
    category: 'produce',
    expirationDate: tomorrow,
    quantity: 1,
    unit: 'bag',
    location: 'crisper drawer',
    owner: 'user1',
    added: threeMonthsAgo,
  },
  {
    id: '4',
    name: 'Chicken Breast',
    category: 'meat',
    expirationDate: yesterday,
    quantity: 2,
    unit: 'lbs',
    location: 'middle shelf',
    owner: null,
    added: threeMonthsAgo,
  },
  {
    id: '5',
    name: 'Apples',
    category: 'produce',
    expirationDate: nextWeek,
    quantity: 6,
    unit: 'count',
    location: 'crisper drawer',
    owner: 'user2',
    added: threeMonthsAgo,
  },
  {
    id: '6',
    name: 'Bread',
    category: 'grains',
    expirationDate: tomorrow,
    quantity: 1,
    unit: 'loaf',
    location: 'pantry',
    owner: null,
    added: threeMonthsAgo,
  },
  {
    id: '7',
    name: 'Yogurt',
    category: 'dairy',
    expirationDate: twoWeeksLater,
    quantity: 4,
    unit: 'count',
    location: 'upper shelf',
    owner: 'user1',
    added: threeMonthsAgo,
  },
  {
    id: '8',
    name: 'Pasta Sauce',
    category: 'condiments',
    expirationDate: twoWeeksLater,
    quantity: 1,
    unit: 'jar',
    location: 'pantry',
    owner: null,
    added: threeMonthsAgo,
  },
  {
    id: '9',
    name: 'Leftover Pizza',
    category: 'leftovers',
    expirationDate: tomorrow,
    quantity: 3,
    unit: 'slices',
    location: 'middle shelf',
    owner: 'user2',
    added: threeMonthsAgo,
  },
  {
    id: '10',
    name: 'Orange Juice',
    category: 'beverages',
    expirationDate: nextWeek,
    quantity: 1,
    unit: 'carton',
    location: 'door',
    owner: null,
    added: threeMonthsAgo,
  },
  {
    id: '11',
    name: 'Bell Peppers',
    category: 'produce',
    expirationDate: tomorrow,
    quantity: 3,
    unit: 'count',
    location: 'crisper drawer',
    owner: 'user1',
    added: threeMonthsAgo,
  },
  {
    id: '12',
    name: 'Cheese',
    category: 'dairy',
    expirationDate: nextWeek,
    quantity: 1,
    unit: 'block',
    location: 'upper shelf',
    owner: null,
    added: threeMonthsAgo,
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Quick Spinach & Egg Breakfast',
    ingredients: ['Eggs', 'Spinach', 'Cheese'],
    instructions: [
      'Whisk eggs in a bowl.',
      'Sauté spinach until wilted.',
      'Pour eggs over spinach and cook until set.',
      'Sprinkle with cheese and serve.'
    ],
    prepTime: 5,
    cookTime: 10,
    imageUrl: 'https://source.unsplash.com/random/300x200/?spinach-eggs',
    tags: ['breakfast', 'quick', 'vegetarian']
  },
  {
    id: '2',
    name: 'Chicken & Bell Pepper Stir Fry',
    ingredients: ['Chicken Breast', 'Bell Peppers', 'Soy Sauce'],
    instructions: [
      'Slice chicken and bell peppers into strips.',
      'Stir-fry chicken until cooked through.',
      'Add bell peppers and cook for 2 minutes.',
      'Season with soy sauce and serve.'
    ],
    prepTime: 10,
    cookTime: 15,
    imageUrl: 'https://source.unsplash.com/random/300x200/?chicken-stirfry',
    tags: ['dinner', 'quick', 'high-protein']
  },
  {
    id: '3',
    name: 'Apple Yogurt Parfait',
    ingredients: ['Yogurt', 'Apples', 'Honey'],
    instructions: [
      'Dice apples into small pieces.',
      'Layer yogurt and apples in a glass.',
      'Drizzle with honey and enjoy.'
    ],
    prepTime: 5,
    cookTime: 0,
    imageUrl: 'https://source.unsplash.com/random/300x200/?yogurt-parfait',
    tags: ['breakfast', 'snack', 'quick', 'no-cook']
  },
  {
    id: '4',
    name: 'Pasta with Tomato Sauce',
    ingredients: ['Pasta', 'Pasta Sauce', 'Cheese'],
    instructions: [
      'Cook pasta according to package directions.',
      'Heat pasta sauce in a separate pan.',
      'Combine pasta and sauce, top with cheese.'
    ],
    prepTime: 5,
    cookTime: 15,
    imageUrl: 'https://source.unsplash.com/random/300x200/?pasta',
    tags: ['dinner', 'quick', 'vegetarian']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'expiry',
    title: 'Expiring Soon!',
    message: 'Your milk expires tomorrow. Use it soon to avoid waste!',
    itemIds: ['1'],
    read: false,
    createdAt: new Date()
  },
  {
    id: '2',
    type: 'expiry',
    title: 'Expired Item',
    message: 'Your chicken breast expired yesterday. Check if it\'s still good.',
    itemIds: ['4'],
    read: false,
    createdAt: yesterday
  },
  {
    id: '3',
    type: 'recipe',
    title: 'Recipe Suggestion',
    message: 'Use your spinach and eggs before they expire with this quick breakfast recipe!',
    itemIds: ['2', '3'],
    recipeId: '1',
    read: true,
    createdAt: yesterday
  },
  {
    id: '4',
    type: 'system',
    title: 'Welcome to Fridgely!',
    message: 'Start adding items to your inventory to get personalized notifications and recipe suggestions.',
    read: true,
    createdAt: threeMonthsAgo
  }
];

export const mockUser: User = {
  id: 'user1',
  name: 'Sam',
  email: 'sam@example.com',
  preferences: {
    notificationsEnabled: true,
    notificationTiming: 2,
    shareInventory: true,
    defaultUnit: 'count'
  },
  stats: {
    itemsSaved: 23,
    moneySaved: 47.50,
    itemsTracked: 78,
    wasteReduction: 35
  },
  badges: [
    {
      id: '1',
      name: 'Food Saver',
      description: 'Saved 20+ food items from going to waste',
      imageUrl: '/badges/food-saver.png',
      earned: true,
      earnedAt: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Inventory Master',
      description: 'Added 50+ items to your inventory',
      imageUrl: '/badges/inventory-master.png',
      earned: true,
      earnedAt: new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Recipe Explorer',
      description: 'Tried 10+ suggested recipes',
      imageUrl: '/badges/recipe-explorer.png',
      earned: false
    }
  ]
};

export const mockRoommate: Roommate = {
  id: 'user2',
  name: 'Alex',
  email: 'alex@example.com',
  avatarUrl: 'https://source.unsplash.com/random/100x100/?person',
  shareStatus: 'active'
};
