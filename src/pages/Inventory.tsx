
import React, { useState } from 'react';
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InventoryDashboard from '@/components/inventory/InventoryDashboard';
import InventoryTable from '@/components/inventory/InventoryTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Plus, ShieldAlert } from 'lucide-react';
import AddInventoryModal from '@/components/inventory/AddInventoryModal';
import { useToast } from '@/components/ui/use-toast';

// Check if we have a valid Clerk key (for conditional rendering)
const hasValidClerkKey = typeof import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'string' && 
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

// Mock function to check if user is admin - in production this should come from Clerk's metadata or a backend check
const isUserAdmin = (email?: string): boolean => {
  if (!email) return false;
  return email.endsWith('@admin.com') || email.includes('admin');
};

const Inventory = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();
  const { user } = hasValidClerkKey ? useUser() : { user: null };
  
  const isAdmin = isUserAdmin(user?.primaryEmailAddress?.emailAddress);

  const InventoryContent = () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-hardware-blue text-white py-8">
          <div className="container px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl font-bold">Mwananchi Hardware Inventory</h1>
            <p className="mt-2">Control and monitor your product inventory</p>
          </div>
        </div>

        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl font-semibold">Product Inventory</h2>
              <p className="text-gray-500">Manage your product stock levels and details</p>
            </div>
            {isAdmin && (
              <Button onClick={() => setIsAddModalOpen(true)} className="bg-hardware-blue hover:bg-hardware-darkBlue">
                <Plus className="mr-2 h-4 w-4" /> Add New Item
              </Button>
            )}
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-8">
              <InventoryDashboard />
            </TabsContent>

            <TabsContent value="products">
              <InventoryTable isAdmin={isAdmin} />
            </TabsContent>

            <TabsContent value="low-stock">
              <InventoryTable lowStockOnly isAdmin={isAdmin} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {isAdmin && (
        <AddInventoryModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            setIsAddModalOpen(false);
            toast({
              title: "Item Added",
              description: "New inventory item has been added successfully.",
            });
          }}
        />
      )}
    </div>
  );

  const AccessDeniedContent = () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="mb-6">
            You don't have administrative permissions to access the inventory management system. 
            Please contact an administrator if you believe this is an error.
          </p>
          <Button onClick={() => window.location.href = '/'}>
            Return to Homepage
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );

  // If Clerk is available with valid key, check user authentication and admin status
  if (hasValidClerkKey) {
    return (
      <>
        <SignedIn>
          {isAdmin ? <InventoryContent /> : <AccessDeniedContent />}
        </SignedIn>
        <SignedOut>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center">
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
                <p className="mb-6">Please sign in to access the inventory management system.</p>
                <Button onClick={() => window.location.href = '/sign-in'}>
                  Sign In
                </Button>
              </div>
            </main>
            <Footer />
          </div>
        </SignedOut>
      </>
    );
  } else {
    // In development mode without Clerk, show inventory content
    return <InventoryContent />;
  }
};

export default Inventory;
