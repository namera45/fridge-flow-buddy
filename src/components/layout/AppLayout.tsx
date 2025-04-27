
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home,
  Calendar,
  Search,
  Share,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFridgely } from '@/context/FridgelyContext';
import { Badge } from '@/components/ui/badge';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
  notificationCount?: number;
}

const NavItem: React.FC<NavItemProps> = ({ 
  icon, 
  label, 
  to, 
  active,
  notificationCount 
}) => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => navigate(to)}
      className={cn(
        "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors", 
        active 
          ? "text-fridgely-green font-semibold" 
          : "text-fridgely-gray hover:text-fridgely-green"
      )}
    >
      <div className="relative">
        {icon}
        {notificationCount && notificationCount > 0 && (
          <Badge 
            className="absolute -top-1 -right-2 bg-fridgely-red text-white w-4 h-4 flex items-center justify-center p-0 text-xs rounded-full"
          >
            {notificationCount > 9 ? '9+' : notificationCount}
          </Badge>
        )}
      </div>
      <span className="text-xs">{label}</span>
    </button>
  );
};

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { notifications } = useFridgely();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-white">
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 max-w-lg mx-auto">
        <div className="flex justify-between items-center">
          <NavItem 
            icon={<Home size={22} />} 
            label="Home" 
            to="/" 
            active={location.pathname === '/'} 
          />
          <NavItem 
            icon={<Calendar size={22} />} 
            label="Expiring" 
            to="/expiring" 
            active={location.pathname === '/expiring'} 
          />
          <NavItem 
            icon={<Search size={22} />} 
            label="Recipes" 
            to="/recipes" 
            active={location.pathname === '/recipes'} 
          />
          <NavItem 
            icon={<Share size={22} />} 
            label="Share" 
            to="/roommates" 
            active={location.pathname === '/roommates'} 
          />
          <NavItem 
            icon={<Bell size={22} />} 
            label="Alerts" 
            to="/notifications" 
            active={location.pathname === '/notifications'}
            notificationCount={unreadCount}
          />
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
