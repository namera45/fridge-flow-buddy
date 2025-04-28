
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FridgelyProvider } from "./context/FridgelyContext";
import Index from "./pages/Index";
import Expiring from "./pages/Expiring";
import Recipes from "./pages/Recipes";
import Roommates from "./pages/Roommates";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
