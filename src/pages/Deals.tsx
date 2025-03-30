
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Percent, Clock, Flame, Tag } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Simulate deals by applying discounts to some products
const dealsProducts = products.map(product => {
  // Apply random discounts to products
  const isOnSale = Math.random() > 0.3; // 70% chance of being on sale
  if (isOnSale) {
    const discountPercent = Math.floor(Math.random() * 30) + 10; // 10-40% discount
    const salePrice = product.price * (1 - discountPercent / 100);
    return {
      ...product,
      originalPrice: product.price,
      price: salePrice,
      discountPercent,
      saleType: Math.random() > 0.5 ? 'flash' : 'weekly',
      saleEnds: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000) // Random date within a week
    };
  }
  return product;
}).filter(product => 'discountPercent' in product); // Only keep products with discounts

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  return (
    <Card className="overflow-hidden group border hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {product.discountPercent && (
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-red-500 text-white font-semibold">
              {product.discountPercent}% OFF
            </Badge>
          </div>
        )}
        {product.saleType === 'flash' && (
          <div className="absolute top-2 right-2 z-10">
            <Badge variant="outline" className="bg-yellow-500 text-white border-yellow-600 flex items-center gap-1">
              <Flame className="h-3 w-3" />
              Flash Sale
            </Badge>
          </div>
        )}
        <Link to={`/product/${product.id}`}>
          <div className="h-48 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </Link>
      </div>
      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <Badge variant="secondary" className="mb-2 bg-hardware-gray/80 text-hardware-darkGray">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-hardware-blue text-lg">KSh {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-500 text-sm line-through">KSh {product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          {product.saleEnds && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              Sale ends: {formatDate(product.saleEnds)}
            </div>
          )}
        </Link>
      </CardContent>
    </Card>
  );
};

const DealsPage: React.FC = () => {
  const flashDeals = dealsProducts.filter(deal => deal.saleType === 'flash');
  const weeklyDeals = dealsProducts.filter(deal => deal.saleType === 'weekly');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-hardware-orange to-yellow-500 text-white py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <Badge className="bg-white text-hardware-orange mb-3">Limited Time</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">Special Deals & Offers</h1>
                <p className="text-white/90 text-lg mb-6">
                  Save big on professional tools and equipment. Hurry, these deals won't last long!
                </p>
                <div className="flex gap-3">
                  <Button className="bg-white text-hardware-orange hover:bg-white/90">
                    Shop All Deals
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute -top-6 -right-6 bg-yellow-300 text-hardware-blue p-4 rounded-full rotate-12 shadow-lg">
                    <div className="flex flex-col items-center font-bold">
                      <span className="text-xl">UP TO</span>
                      <span className="text-4xl">40%</span>
                      <span className="text-xl">OFF</span>
                    </div>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1581147036324-c71f53c355f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Deal promo" 
                    className="rounded-lg shadow-lg max-w-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Countdown Section */}
        <div className="bg-hardware-blue text-white py-10">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="h-6 w-6 text-yellow-300" />
              <h2 className="text-2xl font-bold">Flash Deals End Soon!</h2>
            </div>
            
            <div className="flex justify-center gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg w-20 text-center">
                <div className="text-3xl font-bold">24</div>
                <div className="text-xs text-white/80">Hours</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg w-20 text-center">
                <div className="text-3xl font-bold">48</div>
                <div className="text-xs text-white/80">Minutes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg w-20 text-center">
                <div className="text-3xl font-bold">59</div>
                <div className="text-xs text-white/80">Seconds</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Deals Content */}
        <div className="container px-4 md:px-6 py-8">
          <Tabs defaultValue="flash" className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-hardware-gray">
                <TabsTrigger value="flash" className="data-[state=active]:bg-hardware-orange data-[state=active]:text-white">
                  <Flame className="h-4 w-4 mr-2" />
                  Flash Sales
                </TabsTrigger>
                <TabsTrigger value="weekly" className="data-[state=active]:bg-hardware-orange data-[state=active]:text-white">
                  <Tag className="h-4 w-4 mr-2" />
                  Weekly Deals
                </TabsTrigger>
              </TabsList>
              
              <Button variant="outline" asChild>
                <Link to="/shop">View All Products</Link>
              </Button>
            </div>
            
            <TabsContent value="flash" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {flashDeals.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="weekly" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {weeklyDeals.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Promo Cards */}
          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white overflow-hidden border-0">
              <CardContent className="p-8 flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-6 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Professional Tools Bundle</h3>
                  <p className="text-white/90 mb-4">Get a complete set of professional tools at a discounted price.</p>
                  <Button className="bg-white text-blue-700 hover:bg-white/90">View Bundle</Button>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <Badge className="text-2xl font-bold bg-yellow-400 text-blue-800 p-6 rounded-full rotate-12">
                    25% OFF
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-500 to-green-700 text-white overflow-hidden border-0">
              <CardContent className="p-8 flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-6 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">Safety Equipment Sale</h3>
                  <p className="text-white/90 mb-4">All safety gear and equipment on special discount this week.</p>
                  <Button className="bg-white text-green-700 hover:bg-white/90">Shop Now</Button>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <Badge className="text-2xl font-bold bg-yellow-400 text-green-800 p-6 rounded-full rotate-12">
                    30% OFF
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Newsletter */}
          <Card className="border-dashed border-2 p-8 mt-12">
            <CardContent className="p-0 text-center">
              <Percent className="h-12 w-12 mx-auto mb-4 text-hardware-orange" />
              <h3 className="text-2xl font-bold mb-2">Subscribe for Exclusive Deals</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Be the first to know about our special offers, new products, and exclusive deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                />
                <Button>Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DealsPage;
