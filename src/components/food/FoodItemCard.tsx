
import React from 'react';
import { FoodItem } from '@/types';
import { cn } from '@/lib/utils';
import { format, differenceInDays, isPast } from 'date-fns';
import { useFridgely } from '@/context/FridgelyContext';

interface FoodItemCardProps {
  item: FoodItem;
  onClick?: () => void;
}

// Icon mappings for food categories
const categoryIcons: Record<string, string> = {
  dairy: '🥛',
  produce: '🥬',
  meat: '🥩',
  seafood: '🐟',
  grains: '🍞',
  condiments: '🧂',
  snacks: '🍿',
  beverages: '🥤',
  leftovers: '🍱',
  other: '🍽️',
};

const FoodItemCard: React.FC<FoodItemCardProps> = ({ item, onClick }) => {
  const { removeFoodItem } = useFridgely();
  
  const expirationDate = new Date(item.expirationDate);
  const today = new Date();
  
  // Calculate days until expiration
  const daysUntilExpiry = differenceInDays(expirationDate, today);
  const isExpired = isPast(expirationDate);
  
  const getExpiryStatusColor = () => {
    if (isExpired) return 'bg-fridgely-red text-white';
    if (daysUntilExpiry <= 2) return 'bg-fridgely-orange text-white';
    if (daysUntilExpiry <= 5) return 'bg-fridgely-lightGreen text-white';
    return 'bg-fridgely-blue text-white';
  };
  
  const getExpiryText = () => {
    if (isExpired) return `Expired ${Math.abs(daysUntilExpiry)}d ago`;
    if (daysUntilExpiry === 0) return 'Expires today';
    if (daysUntilExpiry === 1) return 'Expires tomorrow';
    return `Expires in ${daysUntilExpiry}d`;
  };
  
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeFoodItem(item.id);
  };

  return (
    <div 
      className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all"
      onClick={onClick}
    >
      <div className="text-2xl">{categoryIcons[item.category] || '🍽️'}</div>
      
      <div className="flex-1">
        <div className="font-medium">{item.name}</div>
        <div className="text-xs text-gray-500">
          {item.quantity} {item.unit} • {item.location}
          {item.owner && <span> • {item.owner === 'user1' ? 'Mine' : 'Alex\'s'}</span>}
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-2">
        <div className={cn(
          "text-xs font-medium py-1 px-2 rounded-full",
          getExpiryStatusColor()
        )}>
          {getExpiryText()}
        </div>
        
        <button 
          className="text-xs text-fridgely-red hover:underline"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default FoodItemCard;
