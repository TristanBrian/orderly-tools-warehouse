
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById, getRelatedProducts, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ArrowLeft, Truck, ShieldCheck, Package } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Card className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="font-bold text-hardware-blue">KSh {product.price.toLocaleString()}</span>
            <div className="text-sm text-gray-500">{product.inventory > 0 ? 'In Stock' : 'Out of Stock'}</div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  
  const product = id ? getProductById(id) : undefined;
  const relatedProducts = product ? getRelatedProducts(product) : [];
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow py-16 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you are looking for does not exist.</p>
            <Button asChild>
              <Link to="/shop">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Shop
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const increaseQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const addToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center mb-6 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-primary">Shop</Link>
            <span className="mx-2">/</span>
            <Link to={`/shop?category=${product.category}`} className="text-gray-500 hover:text-primary capitalize">{product.category}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
          
          {/* Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="bg-white p-4 rounded-lg border">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-contain rounded-md"
              />
            </div>
            
            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2 bg-hardware-orange text-white">
                  {product.category}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">{product.rating} ({product.reviews} reviews)</span>
                </div>
                <p className="text-xl font-bold text-hardware-blue mb-4">KSh {product.price.toLocaleString()}</p>
                <p className="text-gray-600">{product.description}</p>
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${product.inventory > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`${product.inventory > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                  {product.inventory > 20
                    ? 'In Stock'
                    : product.inventory > 0
                    ? `Only ${product.inventory} left in stock`
                    : 'Out of Stock'
                  }
                </span>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center">
                <span className="mr-3 font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={decreaseQuantity} 
                    className="px-3 py-1 border-r"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button 
                    onClick={increaseQuantity} 
                    className="px-3 py-1 border-l"
                    disabled={quantity >= product.inventory}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Add to Cart Button */}
              <Button 
                onClick={addToCart} 
                size="lg" 
                className="w-full"
                disabled={product.inventory === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              {/* Shipping Info */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 mr-3 text-hardware-blue" />
                  <span className="text-sm">Free shipping on orders over KSh 10,000</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-3 text-hardware-blue" />
                  <span className="text-sm">1-year warranty included</span>
                </div>
                <div className="flex items-center">
                  <Package className="h-5 w-5 mr-3 text-hardware-blue" />
                  <span className="text-sm">30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <Tabs defaultValue="details" className="mb-12">
            <TabsList className="w-full border-b grid grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4">
              <h3 className="font-bold text-lg mb-3">Product Description</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="mt-4 text-gray-700">
                This high-quality {product.name.toLowerCase()} is designed for both professional use and DIY enthusiasts. 
                Built with durability in mind, it's a reliable choice for your hardware needs.
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="p-4">
              <h3 className="font-bold text-lg mb-3">Technical Specifications</h3>
              <div className="border rounded-md divide-y">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex py-2 px-4">
                    <span className="font-medium capitalize w-1/3">{key}</span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-4">
              <h3 className="font-bold text-lg mb-3">Customer Reviews</h3>
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                  ))}
                </div>
                <span className="font-medium">{product.rating} out of 5</span>
                <span className="text-gray-500 ml-2">({product.reviews} reviews)</span>
              </div>
              <p className="text-gray-600">No reviews to display yet. Be the first to review this product!</p>
            </TabsContent>
          </Tabs>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
