
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products, Product } from '@/data/products';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Card className="product-card h-full">
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
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-hardware-blue text-lg">${product.price.toFixed(2)}</span>
            <div className="text-sm text-gray-500">
              {product.inventory > 10 ? 'In Stock' : product.inventory > 0 ? `Only ${product.inventory} left` : 'Out of Stock'}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: initialCategory,
    search: '',
    priceRange: [0, 200],
    inStock: false
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = Array.from(new Set(products.map(p => p.category)));

  useEffect(() => {
    // Update URL params when filters change
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    setSearchParams(params);

    // Apply filters
    let result = [...products];
    
    // Category filter
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }
    
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Price filter
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    
    // In-stock filter
    if (filters.inStock) {
      result = result.filter(p => p.inventory > 0);
    }
    
    setFilteredProducts(result);
  }, [filters, setSearchParams]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-hardware-blue text-white py-8">
          <div className="container px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl font-bold">Shop Hardware Products</h1>
            <p className="mt-2">Browse our collection of quality tools and equipment</p>
          </div>
        </div>
        
        <div className="container px-4 md:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filters Toggle */}
            <div className="lg:hidden mb-4">
              <Button 
                className="w-full" 
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                variant="outline"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" /> 
                {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            {/* Filters Sidebar */}
            <div className={cn(
              "lg:w-64 flex-shrink-0",
              mobileFiltersOpen ? "block" : "hidden lg:block"
            )}>
              <div className="sticky top-20 space-y-6 bg-white p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setFilters({
                      category: '',
                      search: '',
                      priceRange: [0, 200],
                      inStock: false
                    })}
                  >
                    Reset
                  </Button>
                </div>
                
                {/* Search */}
                <div>
                  <h3 className="font-medium mb-2">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      className="pl-8"
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                    />
                  </div>
                </div>
                
                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={filters.category === category}
                          onCheckedChange={() => setFilters({
                            ...filters,
                            category: filters.category === category ? '' : category
                          })}
                        />
                        <Label 
                          htmlFor={`category-${category}`}
                          className="capitalize"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <Slider
                    defaultValue={[0, 200]}
                    min={0}
                    max={200}
                    step={5}
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters({...filters, priceRange: value as [number, number]})}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
                
                {/* In Stock */}
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="in-stock"
                      checked={filters.inStock}
                      onCheckedChange={(checked) => setFilters({...filters, inStock: checked as boolean})}
                    />
                    <Label htmlFor="in-stock">In Stock Only</Label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="flex-grow">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No Products Found</h3>
                  <p className="text-gray-500 mb-4">Try changing your search criteria</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({
                      category: '',
                      search: '',
                      priceRange: [0, 200],
                      inStock: false
                    })}
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-gray-500">{filteredProducts.length} products found</p>
                    
                    {/* Mobile filters close button */}
                    {mobileFiltersOpen && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="lg:hidden"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <X className="mr-1 h-4 w-4" /> Close Filters
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopPage;
