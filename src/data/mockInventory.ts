
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  price: number;
  lastUpdated: string;
}

export const mockInventoryData: InventoryItem[] = [
  {
    id: '1',
    name: 'Intel Core i9-12900K',
    sku: 'CPU-I9-12900K',
    category: 'Processors',
    quantity: 15,
    price: 589.99,
    lastUpdated: '2023-10-15'
  },
  {
    id: '2',
    name: 'AMD Ryzen 9 5950X',
    sku: 'CPU-R9-5950X',
    category: 'Processors',
    quantity: 8,
    price: 549.99,
    lastUpdated: '2023-10-17'
  },
  {
    id: '3',
    name: 'NVIDIA GeForce RTX 4090',
    sku: 'GPU-RTX-4090',
    category: 'Graphics Cards',
    quantity: 5,
    price: 1599.99,
    lastUpdated: '2023-10-12'
  },
  {
    id: '4',
    name: 'AMD Radeon RX 7900 XTX',
    sku: 'GPU-RX-7900XTX',
    category: 'Graphics Cards',
    quantity: 7,
    price: 999.99,
    lastUpdated: '2023-10-18'
  },
  {
    id: '5',
    name: 'Samsung 980 PRO 2TB NVMe SSD',
    sku: 'SSD-980PRO-2TB',
    category: 'Storage',
    quantity: 30,
    price: 249.99,
    lastUpdated: '2023-10-05'
  },
  {
    id: '6',
    name: 'G.SKILL Trident Z5 RGB 32GB DDR5',
    sku: 'MEM-Z5-32GB',
    category: 'Memory',
    quantity: 25,
    price: 189.99,
    lastUpdated: '2023-10-08'
  },
  {
    id: '7',
    name: 'ASUS ROG Swift PG32UQX 32" 4K Monitor',
    sku: 'MON-PG32UQX',
    category: 'Peripherals',
    quantity: 3,
    price: 2999.99,
    lastUpdated: '2023-10-11'
  },
  {
    id: '8',
    name: 'Logitech G Pro X Superlight Mouse',
    sku: 'MOU-GPRO-X',
    category: 'Peripherals',
    quantity: 12,
    price: 149.99,
    lastUpdated: '2023-10-13'
  },
  {
    id: '9',
    name: 'Seagate IronWolf 16TB HDD',
    sku: 'HDD-IRON-16TB',
    category: 'Storage',
    quantity: 10,
    price: 329.99,
    lastUpdated: '2023-10-16'
  },
  {
    id: '10',
    name: 'Corsair RM850x Power Supply',
    sku: 'PSU-RM850X',
    category: 'Power Supplies',
    quantity: 0,
    price: 139.99,
    lastUpdated: '2023-10-10'
  },
  {
    id: '11',
    name: 'NZXT Kraken X73 RGB AIO Cooler',
    sku: 'COOL-X73-RGB',
    category: 'Cooling',
    quantity: 6,
    price: 199.99,
    lastUpdated: '2023-10-20'
  },
  {
    id: '12',
    name: 'WD Black SN850 1TB NVMe SSD',
    sku: 'SSD-SN850-1TB',
    category: 'Storage',
    quantity: 0,
    price: 149.99,
    lastUpdated: '2023-10-07'
  }
];
