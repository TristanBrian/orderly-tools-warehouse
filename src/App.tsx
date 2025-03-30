
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import Deals from "./pages/Deals";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Inventory from "./pages/Inventory";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

// Check if we have a valid Clerk key (for conditional rendering)
const hasValidClerkKey = typeof import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'string' && 
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      {/* Only use ClerkLoading and ClerkLoaded when we have a valid Clerk key */}
      {hasValidClerkKey ? (
        <>
          <div className="h-screen w-full flex items-center justify-center clerk-loading">
            <Loader2 className="h-8 w-8 animate-spin text-hardware-blue" />
          </div>
          
          <div className="clerk-loaded">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/sign-in/*" element={<SignIn />} />
                <Route path="/sign-up/*" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
