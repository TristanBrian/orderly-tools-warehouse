
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products, getLowInventoryProducts } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, AlertTriangle, Package, Info } from 'lucide-react';
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

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const lowInventoryProducts = getLowInventoryProducts(20);
  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.id.includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalInventory = products.reduce((sum, product) => sum + product.inventory, 0);
  const totalProducts = products.length;
  const outOfStockCount = products.filter(product => product.inventory === 0).length;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-hardware-blue text-white py-8">
          <div className="container px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl font-bold">Inventory Management</h1>
            <p className="mt-2">Track and manage your hardware inventory</p>
          </div>
        </div>
        
        <div className="container px-4 md:px-6 py-8">
          {/* Inventory Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold text-hardware-blue">{totalProducts}</div>
                  <div className="text-sm text-gray-500 ml-2">items in inventory</div>
                </div>
                <div className="flex items-center mt-4 text-green-600">
                  <Package className="mr-2 h-4 w-4" />
                  <span className="text-sm font-medium">All categories</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Units</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold text-hardware-blue">{totalInventory}</div>
                  <div className="text-sm text-gray-500 ml-2">total items in stock</div>
                </div>
                <div className="flex items-center mt-4 text-blue-600">
                  <Info className="mr-2 h-4 w-4" />
                  <span className="text-sm font-medium">Across all warehouses</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Out of Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline">
                  <div className="text-3xl font-bold text-hardware-blue">{outOfStockCount}</div>
                  <div className="text-sm text-gray-500 ml-2">products out of stock</div>
                </div>
                <div className="flex items-center mt-4 text-orange-600">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  <span className="text-sm font-medium">Requires attention</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Low Inventory Alert */}
          {lowInventoryProducts.length > 0 && (
            <Card className="mb-8 border-orange-200 bg-orange-50">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                  <CardTitle>Low Inventory Alert</CardTitle>
                </div>
                <CardDescription>
                  The following products are running low on inventory (less than 20 items)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {lowInventoryProducts.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id}>
                      <div className="flex items-center p-3 border rounded-lg hover:bg-orange-100 transition-colors">
                        <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium text-sm">{product.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline" className="text-xs bg-orange-100 border-orange-200 text-orange-800">
                              {product.inventory} left
                            </Badge>
                            <span className="text-xs text-gray-500">ID: {product.id}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Search and Filter */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search by product name, ID or category..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Products Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>
                Manage your hardware inventory across all categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
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
                      <TableRow key={product.id}>
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
                          <div 
                            className={`flex items-center ${
                              product.inventory === 0
                                ? 'text-red-600'
                                : product.inventory < 20
                                ? 'text-orange-600'
                                : 'text-green-600'
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full mr-2 ${
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
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InventoryPage;
