
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Clock, Hammer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFeaturedProducts, Product } from '@/data/products';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Card className="product-card animate-fade-in">
      <Link to={`/product/${product.id}`}>
        <div className="overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image"
          />
        </div>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2 bg-hardware-orange text-white">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-hardware-blue text-lg">${product.price.toFixed(2)}</span>
            <div className="text-sm text-gray-500">{product.inventory > 0 ? 'In Stock' : 'Out of Stock'}</div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section text-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl animate-fade-in">
            <Badge variant="outline" className="mb-4 bg-white/20 text-white border-white/40">
              Quality Hardware
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Professional Hardware for Every Project
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/80">
              Find the perfect tools and equipment for your next project. From power tools to safety gear, we have everything you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-hardware-orange hover:bg-hardware-orange/90">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                <Link to="/inventory">Check Inventory</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-500">On orders over $100</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-sm text-gray-500">100% quality assurance</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-500">Dedicated support team</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Hammer className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Professional Tools</h3>
              <p className="text-sm text-gray-500">For experts and beginners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-hardware-gray">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link 
              to="/shop" 
              className="flex items-center text-primary hover:underline"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hardware-blue text-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-lg mb-8 text-white/80">
              Browse our extensive collection of professional-grade hardware and tools.
            </p>
            <Button asChild size="lg" className="bg-hardware-orange hover:bg-hardware-orange/90">
              <Link to="/shop">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
