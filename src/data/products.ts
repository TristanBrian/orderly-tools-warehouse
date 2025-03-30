
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inventory: number;
  featured: boolean;
  rating: number;
  reviews: number;
  specifications: Record<string, string | number>;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Power Drill",
    description: "Professional-grade power drill with adjustable speed settings. Perfect for both DIY enthusiasts and professionals.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "tools",
    inventory: 45,
    featured: true,
    rating: 4.7,
    reviews: 128,
    specifications: {
      power: "20V",
      weight: "3.5 lbs",
      chuckSize: "1/2 inch",
      maxSpeed: "2000 RPM",
      batteryLife: "5 hours"
    }
  },
  {
    id: "2",
    name: "Heavy Duty Tool Set",
    description: "Complete 215-piece tool set with ratchets, sockets, wrenches, and more. All stored in a durable case.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1581147036324-c71f53c355f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "tools",
    inventory: 23,
    featured: true,
    rating: 4.9,
    reviews: 85,
    specifications: {
      pieces: 215,
      caseType: "Heavy duty plastic",
      weight: "15 lbs",
      wrenchSizes: "SAE and Metric",
      warranty: "Lifetime"
    }
  },
  {
    id: "3",
    name: "Circular Saw",
    description: "Powerful circular saw with laser guide for precision cutting. Features a dust blower for clear line of sight.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "tools",
    inventory: 17,
    featured: false,
    rating: 4.5,
    reviews: 62,
    specifications: {
      power: "15 Amp",
      bladeSize: "7-1/4 inch",
      maxSpeed: "5800 RPM",
      weight: "10.5 lbs",
      cuttingDepth: "2.5 inches at 90°"
    }
  },
  {
    id: "4",
    name: "Digital Multimeter",
    description: "Professional digital multimeter for measuring voltage, current, and resistance. Essential for electrical work.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1589433607834-60113568f55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "electrical",
    inventory: 32,
    featured: false,
    rating: 4.3,
    reviews: 47,
    specifications: {
      displayType: "LCD",
      autoRange: "Yes",
      maxVoltage: "1000V",
      maxCurrent: "10A",
      battery: "9V"
    }
  },
  {
    id: "5",
    name: "Pipe Wrench Set",
    description: "Professional set of pipe wrenches for plumbing work. Includes 8-inch, 10-inch, and 14-inch wrenches.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1605152322593-6137f847c47f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "plumbing",
    inventory: 28,
    featured: false,
    rating: 4.6,
    reviews: 39,
    specifications: {
      material: "Forged steel",
      sizes: "8\", 10\", 14\"",
      weight: "5.5 lbs",
      gripType: "Non-slip",
      finish: "Rust-resistant"
    }
  },
  {
    id: "6",
    name: "Safety Helmet",
    description: "ANSI-certified safety helmet for construction work. Features adjustable suspension for comfort.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1635776062127-d379bfcba9f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "safety",
    inventory: 54,
    featured: false,
    rating: 4.8,
    reviews: 72,
    specifications: {
      certification: "ANSI Z89.1",
      material: "High-density polyethylene",
      weight: "0.9 lbs",
      adjustable: "Yes",
      colors: "White, Yellow, Red, Blue"
    }
  },
  {
    id: "7",
    name: "Cordless Impact Driver",
    description: "Compact and powerful impact driver perfect for driving screws and fasteners quickly.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1504280299543-139a21095bdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "tools",
    inventory: 19,
    featured: true,
    rating: 4.7,
    reviews: 93,
    specifications: {
      power: "18V",
      torque: "1500 in-lbs",
      speed: "0-2800 RPM",
      battery: "Lithium-ion",
      weight: "2.8 lbs"
    }
  },
  {
    id: "8",
    name: "Measuring Tape",
    description: "Professional 25 ft measuring tape with magnetic hook. Features easy-read markings and sturdy lock button.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "tools",
    inventory: 64,
    featured: false,
    rating: 4.4,
    reviews: 107,
    specifications: {
      length: "25 ft",
      width: "1 inch",
      hook: "Magnetic",
      casing: "Impact-resistant",
      lock: "Auto-lock"
    }
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};

export const getLowInventoryProducts = (threshold: number = 20): Product[] => {
  return products.filter(product => product.inventory <= threshold);
};
