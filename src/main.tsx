
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx'
import './index.css'

// Replace with your publishable Clerk key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_placeholder_key_for_development";

// For production, we should still log a warning if the key is missing
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  console.warn("Warning: Clerk Publishable Key is missing. Authentication features will not work properly. Please set the VITE_CLERK_PUBLISHABLE_KEY environment variable.");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    clerkJSVersion="5.56.0-snapshot.v20250312225817"
    signInUrl="/sign-in"
    signUpUrl="/sign-up"
    signInFallbackRedirectUrl="/dashboard"
    signUpFallbackRedirectUrl="/"
    signInForceRedirectUrl="/dashboard"
    signUpForceRedirectUrl="/"
    afterSignOutUrl="/"
  >
    <App />
  </ClerkProvider>
);
