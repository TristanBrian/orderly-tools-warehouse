
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx'
import './index.css'

// Get the publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if we have a valid key (starts with pk_)
const hasValidClerkKey = PUBLISHABLE_KEY && PUBLISHABLE_KEY.startsWith("pk_");

// Log appropriate messages
if (!hasValidClerkKey) {
  console.warn("Warning: Valid Clerk Publishable Key is missing. Running in development mode without authentication. To enable authentication, set the VITE_CLERK_PUBLISHABLE_KEY environment variable.");
}

// Render the application
if (hasValidClerkKey) {
  // With Clerk authentication if we have a valid key
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
} else {
  // Without Clerk in development mode
  createRoot(document.getElementById("root")!).render(<App />);
}
