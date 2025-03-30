import React from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Inventory = () => {
  return (
    <>
      <SignedIn>
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
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Inventory;
