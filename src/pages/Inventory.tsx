
import React from 'react';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Check if we have a valid Clerk key (for conditional rendering)
const hasValidClerkKey = typeof import.meta.env.VITE_CLERK_PUBLISHABLE_KEY === 'string' && 
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

const Inventory = () => {
  const InventoryContent = () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-hardware-blue text-white py-8">
          <div className="container px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl font-bold">Inventory Management</h1>
            <p className="mt-2">Control and monitor your product inventory</p>
          </div>
        </div>

        <div className="container px-4 md:px-6 py-8">
          {/* Your existing inventory content */}
        </div>
      </main>
      <Footer />
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
            <InventoryContent />
          </SignedOut>
        </>
      ) : (
        <InventoryContent />
      )}
    </>
  );
};

export default Inventory;
