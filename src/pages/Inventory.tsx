
import React, { useState } from 'react';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InventoryDashboard from '@/components/inventory/InventoryDashboard';
import InventoryTable from '@/components/inventory/InventoryTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddInventoryModal from '@/components/inventory/AddInventoryModal';
import { useToast } from '@/components/ui/use-toast';

// Check if we have a valid Clerk key (for conditional rendering)
const hasValidClerkKey = typeof import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'string' && 
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

const Inventory = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

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
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-hardware-blue hover:bg-hardware-darkBlue">
              <Plus className="mr-2 h-4 w-4" /> Add New Item
            </Button>
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
              <InventoryTable />
            </TabsContent>

            <TabsContent value="low-stock">
              <InventoryTable lowStockOnly />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

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
    </div>
  );

  // If Clerk is available with valid key, use its auth components, otherwise just show the content
  return (
    <>
      {hasValidClerkKey ? (
        <>
          <SignedIn>
            <InventoryContent />
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
      ) : (
        <InventoryContent />
      )}
    </>
  );
};

export default Inventory;
