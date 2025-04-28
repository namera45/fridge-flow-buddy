
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FridgelyProvider } from "./context/FridgelyContext";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Expiring from "./pages/Expiring";
import Recipes from "./pages/Recipes";
import Roommates from "./pages/Roommates";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// This component handles automatic guest login
const AutoGuestLogin = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, signInAsGuest } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      signInAsGuest().catch(console.error);
    }
  }, [loading, user, signInAsGuest]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <AutoGuestLogin>
            <FridgelyProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/expiring" element={<Expiring />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/roommates" element={<Roommates />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </FridgelyProvider>
          </AutoGuestLogin>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
