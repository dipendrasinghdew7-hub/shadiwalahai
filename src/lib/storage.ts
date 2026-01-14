// Types for the platform
export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  wholesalerName: string;
  wholesalerPhone: string;
  wholesalerCity: string;
  createdAt: string;
}

export interface Wholesaler {
  id: string;
  name: string;
  phone: string;
  city: string;
  whatsapp: string;
}

const PRODUCTS_KEY = 'shadiwala_products';
const WHOLESALER_KEY = 'shadiwala_wholesaler';

// Product operations
export const getProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProduct = (product: Omit<Product, 'id' | 'createdAt'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
};

export const deleteProduct = (id: string): void => {
  const products = getProducts().filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  products[index] = { ...products[index], ...updates };
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return products[index];
};

// Wholesaler profile operations
export const getWholesaler = (): Wholesaler | null => {
  const data = localStorage.getItem(WHOLESALER_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveWholesaler = (wholesaler: Omit<Wholesaler, 'id'>): Wholesaler => {
  const newWholesaler: Wholesaler = {
    ...wholesaler,
    id: crypto.randomUUID(),
  };
  localStorage.setItem(WHOLESALER_KEY, JSON.stringify(newWholesaler));
  return newWholesaler;
};

// Categories
export const CATEGORIES = [
  'Lehenga',
  'Saree',
  'Sherwani',
  'Suit',
  'Gown',
  'Kurta Pajama',
  'Bridal Wear',
  'Groom Wear',
  'Indo-Western',
  'Accessories',
] as const;

// Cities
export const CITIES = [
  'Mumbai',
  'Delhi',
  'Surat',
  'Jaipur',
  'Ahmedabad',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Lucknow',
] as const;
