
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { products, Product } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

// Sample cart items - normally this would come from a state management solution
const initialCartItems = [
  { product: products[0], quantity: 1 },
  { product: products[1], quantity: 1 },
];

type CartItem = {
  product: Product;
  quantity: number;
};

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const { toast } = useToast();
  
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    if (newQuantity > product.inventory) {
      toast({
        title: "Quantity Limited",
        description: `Only ${product.inventory} units available in stock.`,
        variant: "destructive"
      });
      newQuantity = product.inventory;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const removeItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    toast({
      title: "Item Removed",
      description: "The product has been removed from your cart."
    });
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };
  
  const calculateTax = () => {
    return calculateSubtotal() * 0.075; // 7.5% tax
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + (calculateSubtotal() >= 10000 ? 0 : 500); // Free shipping for orders over KSh 10,000
  };
  
  const handleCheckout = () => {
    toast({
      title: "Checkout Initiated",
      description: "This is a demo - no actual payment will be processed."
    });
  };
  
  // Format price in KSh
  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString()}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      
      <main className="flex-grow">
        <div className="container px-4 md:px-6 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Button asChild>
                <Link to="/shop">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="flex flex-col md:flex-row bg-white rounded-lg border p-4 animate-fade-in">
                    <div className="w-full md:w-32 h-32 mb-4 md:mb-0 md:mr-6">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:justify-between mb-4">
                        <div>
                          <Link to={`/product/${product.id}`} className="font-semibold text-lg hover:text-primary">
                            {product.name}
                          </Link>
                          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                        </div>
                        <div className="text-lg font-bold text-hardware-blue mt-2 md:mt-0">
                          {formatPrice(product.price)}
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                          <span className="mr-2 text-sm">Qty:</span>
                          <div className="flex items-center border rounded-md">
                            <button 
                              onClick={() => updateQuantity(product.id, quantity - 1)} 
                              className="px-3 py-1 border-r"
                              disabled={quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-4 py-1">{quantity}</span>
                            <button 
                              onClick={() => updateQuantity(product.id, quantity + 1)} 
                              className="px-3 py-1 border-l"
                              disabled={quantity >= product.inventory}
                            >
                              +
                            </button>
                          </div>
                          <div className="ml-4 text-sm text-gray-500">
                            {product.inventory > 20
                              ? 'In Stock'
                              : product.inventory > 0
                              ? `Only ${product.inventory} left`
                              : 'Out of Stock'
                            }
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(product.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center mt-8">
                  <Button variant="outline" asChild className="flex items-center">
                    <Link to="/shop">
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg border p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>{formatPrice(calculateSubtotal())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (7.5%)</span>
                      <span>{formatPrice(calculateTax())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{calculateSubtotal() >= 10000 ? 'Free' : 'KSh 500'}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                    {calculateSubtotal() < 10000 && (
                      <div className="text-sm text-orange-600 mt-2">
                        Add {formatPrice(10000 - calculateSubtotal())} more to qualify for free shipping!
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full mb-4" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  {/* Promo Code */}
                  <div>
                    <div className="text-sm font-medium mb-2">Promo Code</div>
                    <div className="flex space-x-2">
                      <Input placeholder="Enter code" />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
