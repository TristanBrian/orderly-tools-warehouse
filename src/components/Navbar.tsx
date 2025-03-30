
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

interface NavbarProps {
  cartItemCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-hardware-blue">HardTech</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link to="/shop" className="text-sm font-medium hover:text-primary">
            Shop
          </Link>
          <Link to="/categories" className="text-sm font-medium hover:text-primary">
            Categories
          </Link>
          <Link to="/deals" className="text-sm font-medium hover:text-primary">
            Deals
          </Link>
          <SignedIn>
            <Link to="/inventory" className="text-sm font-medium hover:text-primary">
              Inventory
            </Link>
          </SignedIn>
        </nav>

        {/* Search and Cart (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleSearch} aria-label="Search">
            <Search className="w-5 h-5" />
          </Button>
          
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-hardware-orange text-white"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                }
              }}
            />
          </SignedIn>
          
          <SignedOut>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => navigate("/sign-in")}>
                Sign In
              </Button>
              <Button onClick={() => navigate("/sign-up")}>
                Sign Up
              </Button>
            </div>
          </SignedOut>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <Link to="/cart" className="relative mr-2">
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-hardware-orange text-white text-xs"
              >
                {cartItemCount}
              </Badge>
            )}
          </Link>
          
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                }
              }}
            />
          </SignedIn>
          
          <Button
            variant="ghost"
            size="icon"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="container md:hidden py-4 px-4 bg-white border-t animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-lg font-medium" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/shop" className="text-lg font-medium" onClick={toggleMobileMenu}>Shop</Link>
            <Link to="/categories" className="text-lg font-medium" onClick={toggleMobileMenu}>Categories</Link>
            <Link to="/deals" className="text-lg font-medium" onClick={toggleMobileMenu}>Deals</Link>
            
            <SignedIn>
              <Link to="/inventory" className="text-lg font-medium" onClick={toggleMobileMenu}>
                Inventory
              </Link>
              <Link to="/dashboard" className="text-lg font-medium" onClick={toggleMobileMenu}>
                Dashboard
              </Link>
            </SignedIn>
            
            <SignedOut>
              <div className="pt-2 flex flex-col space-y-2">
                <Button variant="outline" className="w-full" onClick={() => { 
                  navigate("/sign-in"); 
                  toggleMobileMenu(); 
                }}>
                  Sign In
                </Button>
                <Button className="w-full" onClick={() => { 
                  navigate("/sign-up"); 
                  toggleMobileMenu(); 
                }}>
                  Sign Up
                </Button>
              </div>
            </SignedOut>
            
            <div className="pt-2">
              <Button variant="outline" className="w-full" onClick={() => { 
                toggleSearch(); 
                toggleMobileMenu(); 
              }}>
                <Search className="w-4 h-4 mr-2" /> Search Products
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-16 px-4 animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Search Products</h2>
              <Button variant="ghost" size="icon" onClick={toggleSearch}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
