
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
import { Search, SlidersHorizontal, X, List, Grid3x3, SortAsc, Filter, Star } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductCard: React.FC<{ product: Product; view: "grid" | "list" }> = ({ product, view }) => {
  return (
    <Card className={cn(
      "product-card h-full transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-gray-200 group",
      view === "list" ? "flex flex-row" : ""
    )}>
      <Link to={`/product/${product.id}`} className={view === "list" ? "w-1/3" : ""}>
        <div className="overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className={cn(
              "product-image w-full object-cover transition-transform duration-300 group-hover:scale-105",
              view === "list" ? "h-full" : "h-48"
            )}
          />
        </div>
      </Link>
      <CardContent className={cn(
        "p-4",
        view === "list" ? "w-2/3" : ""
      )}>
        <Link to={`/product/${product.id}`}>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="bg-hardware-gray/80 text-hardware-darkGray mb-1 capitalize">
              {product.category}
            </Badge>
            {product.featured && (
              <Badge className="bg-hardware-orange text-white">Featured</Badge>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          
          {view === "list" && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          )}
          
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-hardware-blue text-lg">KSh {product.price.toLocaleString()}</span>
            <div className={`text-sm ${product.inventory > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.inventory > 10 
                ? 'In Stock' 
                : product.inventory > 0 
                  ? `Only ${product.inventory} left` 
                  : 'Out of Stock'
              }
            </div>
          </div>
          
          {view === "list" && (
            <div className="mt-4">
              <Button size="sm" className="bg-hardware-blue hover:bg-hardware-blue/90">
                View Details
              </Button>
            </div>
          )}
        </Link>
      </CardContent>
    </Card>
  );
};

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState({
    category: initialCategory,
    search: initialSearch,
    priceRange: [0, 200],
    inStock: false,
    rating: 0
  });
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState("featured");

  const categories = Array.from(new Set(products.map(p => p.category)));

  // Sort products based on the selected option
  const sortProducts = (productsToSort: Product[]) => {
    switch (sortOption) {
      case "price-asc":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      case "rating":
        return [...productsToSort].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...productsToSort]; // Assuming the products array is already sorted by newest
      default: // featured or any other case
        return [...productsToSort].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  };

  useEffect(() => {
    // Update URL params when filters change
    const params = new URLSearchParams();
    if (filters.category) params.set('category', filters.category);
    if (filters.search) params.set('search', filters.search);
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
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Price filter
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    
    // In-stock filter
    if (filters.inStock) {
      result = result.filter(p => p.inventory > 0);
    }
    
    // Rating filter
    if (filters.rating > 0) {
      result = result.filter(p => p.rating >= filters.rating);
    }
    
    // Sort results
    result = sortProducts(result);
    
    setFilteredProducts(result);
  }, [filters, sortOption, setSearchParams]);

  const resetFilters = () => {
    setFilters({
      category: '',
      search: '',
      priceRange: [0, 200],
      inStock: false,
      rating: 0
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-hardware-blue to-hardware-lightBlue text-white py-8">
          <div className="container px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl font-bold">Mwananchi Hardware Shop</h1>
            <p className="mt-2">Browse our collection of quality tools and equipment</p>
          </div>
        </div>
        
        <div className="container px-4 md:px-6 py-8">
          {/* Top filter bar */}
          <div className="bg-white border border-gray-100 rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pl-8"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Label className="text-sm whitespace-nowrap">Sort by:</Label>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Best Rating</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="border-l pl-2 ml-2 hidden md:flex">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={cn(viewMode === "grid" ? "bg-gray-100" : "")}
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className={cn(viewMode === "list" ? "bg-gray-100" : "")}
                    onClick={() => setViewMode("list")}
                    title="List View"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Mobile Filters Toggle */}
                <Button 
                  className="md:hidden" 
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  variant="outline"
                  size="sm"
                >
                  <Filter className="mr-2 h-4 w-4" /> 
                  {mobileFiltersOpen ? 'Hide' : 'Filters'}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={cn(
              "lg:w-64 flex-shrink-0",
              mobileFiltersOpen ? "block" : "hidden lg:block"
            )}>
              <div className="sticky top-20 space-y-6 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <h2 className="font-semibold text-lg">Filters</h2>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                </div>
                
                {/* Categories */}
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-3">Categories</h3>
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
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-3">Price Range</h3>
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
                
                {/* Rating */}
                <div className="border-b pb-4">
                  <h3 className="font-medium mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={filters.rating === rating}
                          onCheckedChange={() => setFilters({
                            ...filters,
                            rating: filters.rating === rating ? 0 : rating
                          })}
                        />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                          ))}
                          <span className="ml-1 text-sm text-gray-600">& Up</span>
                        </Label>
                      </div>
                    ))}
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
                <div className="text-center py-12 bg-white rounded-lg border shadow-sm">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Products Found</h3>
                  <p className="text-gray-500 mb-4">Try changing your search criteria or filters</p>
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
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
                  
                  <div className={cn(
                    viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"
                  )}>
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} view={viewMode} />
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
