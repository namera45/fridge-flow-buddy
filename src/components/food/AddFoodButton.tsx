
import React from 'react';
import { useFridgely } from '@/context/FridgelyContext';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AddFoodButton: React.FC = () => {
  const { setIsAddModalOpen } = useFridgely();
  
  return (
    <Button 
      className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg bg-fridgely-green hover:bg-fridgely-green/90 p-0 flex items-center justify-center"
      onClick={() => setIsAddModalOpen(true)}
    >
      <Plus size={24} className="text-white" />
    </Button>
  );
};

export default AddFoodButton;
