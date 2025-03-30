
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Hammer, 
  ShieldCheck, 
  Zap, 
  Wrench, 
  CircuitBoard, 
  HardHat, 
  Lightbulb,
  PaintBucket
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Get all unique categories
const categories = Array.from(new Set(products.map(p => p.category)));

// Define category icons and images
const categoryData = {
  tools: { 
    icon: Hammer, 
    color: 'from-blue-500 to-blue-700',
    image: 'https://images.unsplash.com/photo-1581147036324-c71f53c355f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  electrical: { 
    icon: Zap, 
    color: 'from-yellow-400 to-yellow-600',
    image: 'https://images.unsplash.com/photo-1589433607834-60113568f55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  plumbing: { 
    icon: Wrench, 
    color: 'from-cyan-400 to-cyan-600',
    image: 'https://images.unsplash.com/photo-1605152322593-6137f847c47f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  safety: { 
    icon: ShieldCheck, 
    color: 'from-green-400 to-green-600',
    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
};

const CategoryCard: React.FC<{ category: string }> = ({ category }) => {
  const data = categoryData[category as keyof typeof categoryData] || {
    icon: Hammer,
    color: 'from-gray-400 to-gray-600',
    image: 'https://images.unsplash.com/photo-1581147036324-c71f53c355f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };
  
  const Icon = data.icon;
  const productCount = products.filter(p => p.category === category).length;

  return (
    <Link to={`/shop?category=${category}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group border-0">
        <div className="relative h-48 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br bg-opacity-80 transition-all duration-500 group-hover:scale-110"
            style={{
              backgroundImage: `url(${data.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className={`p-4 rounded-full bg-gradient-to-br ${data.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
              <Icon className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold capitalize mb-2">{category}</h3>
            <p className="text-white/80">{productCount} Products</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const FeaturedCollection = () => {
  return (
    <div className="bg-hardware-gray rounded-lg p-6 md:p-8 shadow-inner">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Featured Collection</h3>
        <Button variant="link" asChild>
          <Link to="/shop" className="flex items-center">View All</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: 'Power Tools', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
          { name: 'Hand Tools', icon: Hammer, color: 'bg-blue-100 text-blue-600' },
          { name: 'Safety Gear', icon: HardHat, color: 'bg-green-100 text-green-600' },
          { name: 'Electrical', icon: CircuitBoard, color: 'bg-red-100 text-red-600' },
        ].map((item, index) => (
          <Link key={index} to={`/shop?search=${item.name}`}>
            <Card className="border-0 shadow hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className={`p-3 rounded-full ${item.color} mb-3`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <h4 className="font-medium">{item.name}</h4>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

const CategoriesPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-hardware-blue text-white py-8">
          <div className="container px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl font-bold">Categories</h1>
            <p className="mt-2">Browse our products by category</p>
          </div>
        </div>
        
        <div className="container px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category} category={category} />
            ))}
          </div>
          
          <div className="mt-12">
            <FeaturedCollection />
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-hardware-blue to-hardware-lightBlue text-white rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold mb-2">Need Help Finding the Right Tools?</h2>
              <p className="text-white/80 mb-4">Our experts are ready to assist you with your project needs</p>
              <Button className="bg-white text-hardware-blue hover:bg-white/90">Contact Support</Button>
            </div>
            <div className="hidden md:block">
              <Wrench className="h-24 w-24 text-white/30" />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
