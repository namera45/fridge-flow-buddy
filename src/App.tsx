
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

// Create QueryClient outside of component to avoid recreation on rerenders
const queryClient = new QueryClient();

// Place AppRoutes inside the App component to have access to AuthContext
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          {/* Routes moved inside AuthProvider to access auth context */}
          <FridgelyProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/expiring" element={<ProtectedRoute><Expiring /></ProtectedRoute>} />
              <Route path="/recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
              <Route path="/roommates" element={<ProtectedRoute><Roommates /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </FridgelyProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// ProtectedRoute component to check authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // This component is now within AuthProvider scope
  const auth = useAuth();

  if (auth.loading) {
    // Show loading state while checking auth
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!auth.user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

// Import useAuth at the end to avoid the "used before defined" error
import { useAuth } from "./context/AuthContext";

export default App;
