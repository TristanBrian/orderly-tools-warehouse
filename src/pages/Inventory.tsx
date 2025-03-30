
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products, getLowInventoryProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, AlertTriangle, Package, Info, TrendingDown, TrendingUp, BarChart3, Clock, Printer } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mocked chart data
const inventoryChart = [65, 62, 68, 70, 58, 52, 60];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const lowInventoryProducts = getLowInventoryProducts(20);
  
  const getFilteredProducts = () => {
    let filtered = products;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }
    
    return filtered;
  };
  
  const filteredProducts = getFilteredProducts();
  
  const totalInventory = products.reduce((sum, product) => sum + product.inventory, 0);
  const totalProducts = products.length;
  const outOfStockCount = products.filter(product => product.inventory === 0).length;
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-hardware-blue to-hardware-lightBlue text-white py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Inventory Management</h1>
                <p className="mt-2">Track and manage your hardware inventory</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
                  <Printer className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" className="bg-hardware-orange hover:bg-hardware-orange/90">
                  <Package className="h-4 w-4 mr-2" />
                  New Item
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container px-4 md:px-6 py-8">
          {/* Inventory Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-r from-transparent to-blue-50"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold text-hardware-blue">{totalProducts}</div>
                  <div className="text-sm text-gray-500 ml-2">items in inventory</div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-green-600">
                    <Package className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">All categories</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <TrendingUp className="h-3 w-3 mr-1" /> 4%
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-r from-transparent to-blue-50"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Units</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold text-hardware-blue">{totalInventory}</div>
                  <div className="text-sm text-gray-500 ml-2">total items in stock</div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-blue-600">
                    <Info className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">Across all warehouses</span>
                  </div>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    <TrendingDown className="h-3 w-3 mr-1" /> 2%
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md overflow-hidden">
              <div className="absolute top-0 right-0 h-full w-1/4 bg-gradient-to-r from-transparent to-blue-50"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Out of Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold text-hardware-blue">{outOfStockCount}</div>
                  <div className="text-sm text-gray-500 ml-2">products out of stock</div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-orange-600">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">Requires attention</span>
                  </div>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Critical
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Inventory Chart */}
            <Card className="lg:col-span-2 border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Inventory Trends</CardTitle>
                  <Select defaultValue="3months">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="3months">Last 3 months</SelectItem>
                      <SelectItem value="6months">Last 6 months</SelectItem>
                      <SelectItem value="year">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>Total inventory items over time</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Simple chart visualization */}
                <div className="h-64 w-full flex items-end justify-between gap-1">
                  {inventoryChart.map((value, i) => (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors"
                        style={{ height: `${value}%` }}
                      ></div>
                      <span className="text-xs mt-1 text-gray-500">{months[i]}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    <span className="text-sm text-gray-600">Total Items</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Average: <span className="font-semibold">62 items</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Low Inventory Alert */}
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-3 bg-orange-50 border-b border-orange-100">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                  <CardTitle>Low Inventory Alert</CardTitle>
                </div>
                <CardDescription className="text-orange-700">
                  Items with less than 20 units left
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-64 overflow-auto">
                  {lowInventoryProducts.length > 0 ? (
                    <ul className="divide-y">
                      {lowInventoryProducts.map(product => (
                        <li key={product.id}>
                          <Link 
                            to={`/product/${product.id}`}
                            className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                              <div className="flex items-center justify-between mt-1">
                                <Badge variant="outline" className="text-xs bg-orange-100 border-orange-200 text-orange-800">
                                  {product.inventory} left
                                </Badge>
                                <span className="text-xs text-gray-500">ID: {product.id}</span>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <p>No low inventory items.</p>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t">
                  <Button variant="ghost" size="sm" className="w-full text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                    View All Low Inventory
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Products Inventory Table */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>
                    Manage your hardware inventory across all categories
                  </CardDescription>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      placeholder="Search inventory..."
                      className="pl-10 w-full sm:w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category} className="capitalize">{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Items</TabsTrigger>
                  <TabsTrigger value="low">Low Stock</TabsTrigger>
                  <TabsTrigger value="out">Out of Stock</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="w-[80px]">ID</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">In Stock</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProducts.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                              No products found matching your search
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredProducts.map(product => (
                            <TableRow key={product.id} className="hover:bg-gray-50">
                              <TableCell className="font-mono text-xs">{product.id}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-10 h-10 mr-3 bg-gray-100 rounded-md overflow-hidden">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="font-medium line-clamp-1">{product.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  className="capitalize"
                                >
                                  {product.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                              <TableCell className="text-right font-medium">{product.inventory}</TableCell>
                              <TableCell>
                                <div 
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    product.inventory === 0
                                      ? 'bg-red-100 text-red-800'
                                      : product.inventory < 20
                                      ? 'bg-orange-100 text-orange-800'
                                      : 'bg-green-100 text-green-800'
                                  }`}
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                    product.inventory === 0
                                      ? 'bg-red-600'
                                      : product.inventory < 20
                                      ? 'bg-orange-500'
                                      : 'bg-green-600'
                                  }`}></div>
                                  {product.inventory === 0
                                    ? 'Out of stock'
                                    : product.inventory < 20
                                    ? 'Low stock'
                                    : 'In stock'
                                  }
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0"
                                  >
                                    <BarChart3 className="h-4 w-4 text-gray-500" />
                                    <span className="sr-only">View history</span>
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0"
                                    asChild
                                  >
                                    <Link to={`/product/${product.id}`}>
                                      <Package className="h-4 w-4 text-gray-500" />
                                      <span className="sr-only">View product</span>
                                    </Link>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="low" className="mt-0">
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="w-[80px]">ID</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">In Stock</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lowInventoryProducts.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                              No low inventory products found
                            </TableCell>
                          </TableRow>
                        ) : (
                          lowInventoryProducts.map(product => (
                            <TableRow key={product.id} className="hover:bg-gray-50">
                              <TableCell className="font-mono text-xs">{product.id}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-10 h-10 mr-3 bg-gray-100 rounded-md overflow-hidden">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="font-medium">{product.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  className="capitalize"
                                >
                                  {product.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                              <TableCell className="text-right font-medium">{product.inventory}</TableCell>
                              <TableCell>
                                <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-orange-100 text-orange-800">
                                  <div className="w-1.5 h-1.5 rounded-full mr-1.5 bg-orange-500"></div>
                                  Low stock
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  asChild
                                >
                                  <Link to={`/product/${product.id}`}>
                                    View
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="out" className="mt-0">
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="w-[80px]">ID</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">In Stock</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.filter(p => p.inventory === 0).length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                              No out of stock products found
                            </TableCell>
                          </TableRow>
                        ) : (
                          products.filter(p => p.inventory === 0).map(product => (
                            <TableRow key={product.id} className="hover:bg-gray-50">
                              <TableCell className="font-mono text-xs">{product.id}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-10 h-10 mr-3 bg-gray-100 rounded-md overflow-hidden">
                                    <img
                                      src={product.image}
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <span className="font-medium">{product.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  className="capitalize"
                                >
                                  {product.category}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                              <TableCell className="text-right font-medium">0</TableCell>
                              <TableCell>
                                <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                                  <div className="w-1.5 h-1.5 rounded-full mr-1.5 bg-red-600"></div>
                                  Out of stock
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  asChild
                                >
                                  <Link to={`/product/${product.id}`}>
                                    View
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InventoryPage;
