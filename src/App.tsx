
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FridgelyProvider } from "./context/FridgelyContext";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Expiring from "./pages/Expiring";
import Recipes from "./pages/Recipes";
import Roommates from "./pages/Roommates";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/auth" element={<Auth />} />
    <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
    <Route path="/expiring" element={<ProtectedRoute><Expiring /></ProtectedRoute>} />
    <Route path="/recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
    <Route path="/roommates" element={<ProtectedRoute><Roommates /></ProtectedRoute>} />
    <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <FridgelyProvider>
            <AppRoutes />
          </FridgelyProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
