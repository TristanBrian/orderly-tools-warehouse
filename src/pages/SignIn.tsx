
import React from 'react';
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-hardware-lightBlue to-hardware-blue flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-hardware-blue mb-2">Sign In to HardTech</h1>
          <p className="text-gray-600">Access your account to manage your orders and inventory</p>
        </div>
        
        <ClerkSignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          redirectUrl="/dashboard"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none p-0",
              headerTitle: "text-xl font-bold text-hardware-blue",
              headerSubtitle: "text-gray-500",
              formButtonPrimary: "bg-hardware-blue hover:bg-hardware-darkBlue text-white",
              socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
              formFieldInput: "border-gray-300 focus:ring-hardware-blue focus:border-hardware-blue",
              footerAction: "text-hardware-blue hover:text-hardware-darkBlue"
            }
          }}
        />
        
        <div className="mt-6 text-center">
          <button onClick={() => navigate("/")} className="text-hardware-blue hover:text-hardware-darkBlue underline text-sm">
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
