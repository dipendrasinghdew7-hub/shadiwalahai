import { Product, Wholesaler } from './storage';

const PRODUCTS_KEY = 'shadiwala_products';
const WHOLESALER_KEY = 'shadiwala_wholesaler';
const SEEDED_KEY = 'shadiwala_seeded';

// Sample wholesalers
const sampleWholesalers = [
  { name: "Sharma Textiles", phone: "9876543210", city: "Surat" },
  { name: "Rajwada Fashion House", phone: "9123456789", city: "Jaipur" },
  { name: "Mumbai Silk Emporium", phone: "9988776655", city: "Mumbai" },
  { name: "Delhi Bridal Collection", phone: "9871234567", city: "Delhi" },
  { name: "Lucknow Chikan Works", phone: "9456789123", city: "Lucknow" },
  { name: "Ahmedabad Ethnic Wear", phone: "9567891234", city: "Ahmedabad" },
  { name: "Bangalore Designer Hub", phone: "9678912345", city: "Bangalore" },
  { name: "Hyderabad Pearl Fashion", phone: "9789123456", city: "Hyderabad" },
  { name: "Chennai Silk House", phone: "9891234567", city: "Chennai" },
  { name: "Kolkata Saree Palace", phone: "9912345678", city: "Kolkata" },
];

// Product images (placeholder gradients as data URIs with wedding colors)
const generateProductImage = (category: string, index: number): string => {
  const colors: Record<string, string[]> = {
    "Lehenga": ["#8B0A1A", "#D4AF37", "#800020", "#C41E3A", "#722F37"],
    "Saree": ["#006A4E", "#D4AF37", "#4B0082", "#8B4513", "#800000"],
    "Sherwani": ["#1C1C1C", "#D4AF37", "#2F4F4F", "#4A4A4A", "#5D3FD3"],
    "Suit": ["#1C1C1C", "#2F4F4F", "#3D3D3D", "#4A4A4A", "#191970"],
    "Gown": ["#FFC0CB", "#FFB6C1", "#FF69B4", "#C71585", "#8B008B"],
    "Kurta Pajama": ["#F5DEB3", "#DEB887", "#D2B48C", "#BC8F8F", "#F4A460"],
    "Bridal Wear": ["#8B0000", "#B22222", "#DC143C", "#FF0000", "#C41E3A"],
    "Groom Wear": ["#F5F5DC", "#FFFACD", "#FFD700", "#DAA520", "#B8860B"],
    "Indo-Western": ["#4169E1", "#6495ED", "#00CED1", "#20B2AA", "#008B8B"],
    "Accessories": ["#D4AF37", "#FFD700", "#FFC125", "#CDAA00", "#B8860B"],
  };
  
  const categoryColors = colors[category] || colors["Lehenga"];
  const color1 = categoryColors[index % categoryColors.length];
  const color2 = categoryColors[(index + 1) % categoryColors.length];
  
  // Create an SVG placeholder with wedding pattern
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
        <pattern id="pattern${index}" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.15)"/>
          <path d="M0 20 L10 10 L20 20 L10 30 Z" fill="rgba(255,255,255,0.08)"/>
          <path d="M20 0 L30 10 L20 20 L10 10 Z" fill="rgba(255,255,255,0.05)"/>
        </pattern>
      </defs>
      <rect width="400" height="500" fill="url(#grad${index})"/>
      <rect width="400" height="500" fill="url(#pattern${index})"/>
      <text x="200" y="230" text-anchor="middle" font-family="serif" font-size="24" fill="rgba(255,255,255,0.9)">${category}</text>
      <text x="200" y="270" text-anchor="middle" font-family="sans-serif" font-size="14" fill="rgba(255,255,255,0.7)">Premium Collection</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Sample products data
const sampleProducts: Omit<Product, 'id' | 'createdAt'>[] = [
  // Lehengas (10 products)
  { name: "Royal Maroon Bridal Lehenga with Zardozi Work", price: "45000", category: "Lehenga", image: "", wholesalerName: "Sharma Textiles", wholesalerPhone: "9876543210", wholesalerCity: "Surat" },
  { name: "Pastel Pink Designer Lehenga with Mirror Work", price: "32000", category: "Lehenga", image: "", wholesalerName: "Rajwada Fashion House", wholesalerPhone: "9123456789", wholesalerCity: "Jaipur" },
  { name: "Emerald Green Velvet Lehenga Set", price: "55000", category: "Lehenga", image: "", wholesalerName: "Mumbai Silk Emporium", wholesalerPhone: "9988776655", wholesalerCity: "Mumbai" },
  { name: "Wine Red Silk Lehenga with Gold Embroidery", price: "38000", category: "Lehenga", image: "", wholesalerName: "Delhi Bridal Collection", wholesalerPhone: "9871234567", wholesalerCity: "Delhi" },
  { name: "Peach Organza Lehenga with Sequin Work", price: "28000", category: "Lehenga", image: "", wholesalerName: "Ahmedabad Ethnic Wear", wholesalerPhone: "9567891234", wholesalerCity: "Ahmedabad" },
  { name: "Navy Blue Raw Silk Lehenga", price: "42000", category: "Lehenga", image: "", wholesalerName: "Bangalore Designer Hub", wholesalerPhone: "9678912345", wholesalerCity: "Bangalore" },
  { name: "Magenta Banarasi Lehenga with Dupatta", price: "65000", category: "Lehenga", image: "", wholesalerName: "Lucknow Chikan Works", wholesalerPhone: "9456789123", wholesalerCity: "Lucknow" },
  { name: "Ivory White Bridal Lehenga Collection", price: "72000", category: "Lehenga", image: "", wholesalerName: "Hyderabad Pearl Fashion", wholesalerPhone: "9789123456", wholesalerCity: "Hyderabad" },
  { name: "Coral Orange Lehenga with Thread Work", price: "26000", category: "Lehenga", image: "", wholesalerName: "Chennai Silk House", wholesalerPhone: "9891234567", wholesalerCity: "Chennai" },
  { name: "Teal Blue Lehenga with Kundan Work", price: "48000", category: "Lehenga", image: "", wholesalerName: "Kolkata Saree Palace", wholesalerPhone: "9912345678", wholesalerCity: "Kolkata" },

  // Sarees (10 products)
  { name: "Red Banarasi Silk Saree with Gold Zari", price: "18000", category: "Saree", image: "", wholesalerName: "Lucknow Chikan Works", wholesalerPhone: "9456789123", wholesalerCity: "Lucknow" },
  { name: "Kanjivaram Purple Silk Wedding Saree", price: "35000", category: "Saree", image: "", wholesalerName: "Chennai Silk House", wholesalerPhone: "9891234567", wholesalerCity: "Chennai" },
  { name: "Green Patola Silk Saree", price: "28000", category: "Saree", image: "", wholesalerName: "Ahmedabad Ethnic Wear", wholesalerPhone: "9567891234", wholesalerCity: "Ahmedabad" },
  { name: "Cream Chiffon Saree with Embroidery", price: "12000", category: "Saree", image: "", wholesalerName: "Mumbai Silk Emporium", wholesalerPhone: "9988776655", wholesalerCity: "Mumbai" },
  { name: "Royal Blue Organza Saree", price: "15000", category: "Saree", image: "", wholesalerName: "Delhi Bridal Collection", wholesalerPhone: "9871234567", wholesalerCity: "Delhi" },
  { name: "Maroon Tussar Silk Saree with Kalamkari", price: "22000", category: "Saree", image: "", wholesalerName: "Hyderabad Pearl Fashion", wholesalerPhone: "9789123456", wholesalerCity: "Hyderabad" },
  { name: "Pink Chanderi Saree with Zari Border", price: "9500", category: "Saree", image: "", wholesalerName: "Sharma Textiles", wholesalerPhone: "9876543210", wholesalerCity: "Surat" },
  { name: "Yellow Bandhani Saree", price: "8000", category: "Saree", image: "", wholesalerName: "Rajwada Fashion House", wholesalerPhone: "9123456789", wholesalerCity: "Jaipur" },
  { name: "Black and Gold Mysore Silk Saree", price: "25000", category: "Saree", image: "", wholesalerName: "Bangalore Designer Hub", wholesalerPhone: "9678912345", wholesalerCity: "Bangalore" },
  { name: "Orange Tant Cotton Saree", price: "4500", category: "Saree", image: "", wholesalerName: "Kolkata Saree Palace", wholesalerPhone: "9912345678", wholesalerCity: "Kolkata" },

  // Sherwanis (8 products)
  { name: "Cream Silk Sherwani with Gold Embroidery", price: "35000", category: "Sherwani", image: "", wholesalerName: "Delhi Bridal Collection", wholesalerPhone: "9871234567", wholesalerCity: "Delhi" },
  { name: "Royal Blue Velvet Sherwani", price: "42000", category: "Sherwani", image: "", wholesalerName: "Rajwada Fashion House", wholesalerPhone: "9123456789", wholesalerCity: "Jaipur" },
  { name: "Maroon Brocade Sherwani with Stole", price: "28000", category: "Sherwani", image: "", wholesalerName: "Lucknow Chikan Works", wholesalerPhone: "9456789123", wholesalerCity: "Lucknow" },
  { name: "Ivory White Sherwani for Groom", price: "52000", category: "Sherwani", image: "", wholesalerName: "Mumbai Silk Emporium", wholesalerPhone: "9988776655", wholesalerCity: "Mumbai" },
  { name: "Black Jodhpuri Sherwani", price: "32000", category: "Sherwani", image: "", wholesalerName: "Ahmedabad Ethnic Wear", wholesalerPhone: "9567891234", wholesalerCity: "Ahmedabad" },
  { name: "Wine Colored Designer Sherwani", price: "45000", category: "Sherwani", image: "", wholesalerName: "Hyderabad Pearl Fashion", wholesalerPhone: "9789123456", wholesalerCity: "Hyderabad" },
  { name: "Beige Silk Sherwani with Zari Work", price: "38000", category: "Sherwani", image: "", wholesalerName: "Bangalore Designer Hub", wholesalerPhone: "9678912345", wholesalerCity: "Bangalore" },
  { name: "Gold Brocade Wedding Sherwani", price: "48000", category: "Sherwani", image: "", wholesalerName: "Sharma Textiles", wholesalerPhone: "9876543210", wholesalerCity: "Surat" },

  // Suits (5 products)
  { name: "Navy Blue Three-Piece Wedding Suit", price: "25000", category: "Suit", image: "", wholesalerName: "Mumbai Silk Emporium", wholesalerPhone: "9988776655", wholesalerCity: "Mumbai" },
  { name: "Charcoal Grey Designer Suit", price: "22000", category: "Suit", image: "", wholesalerName: "Delhi Bridal Collection", wholesalerPhone: "9871234567", wholesalerCity: "Delhi" },
  { name: "Black Tuxedo Style Suit", price: "35000", category: "Suit", image: "", wholesalerName: "Bangalore Designer Hub", wholesalerPhone: "9678912345", wholesalerCity: "Bangalore" },
  { name: "Cream Italian Cut Suit", price: "28000", category: "Suit", image: "", wholesalerName: "Hyderabad Pearl Fashion", wholesalerPhone: "9789123456", wholesalerCity: "Hyderabad" },
  { name: "Burgundy Velvet Blazer Suit", price: "32000", category: "Suit", image: "", wholesalerName: "Ahmedabad Ethnic Wear", wholesalerPhone: "9567891234", wholesalerCity: "Ahmedabad" },

  // Gowns (5 products)
  { name: "Rose Gold Reception Gown", price: "38000", category: "Gown", image: "", wholesalerName: "Delhi Bridal Collection", wholesalerPhone: "9871234567", wholesalerCity: "Delhi" },
  { name: "Wine Red Ball Gown with Trail", price: "55000", category: "Gown", image: "", wholesalerName: "Mumbai Silk Emporium", wholesalerPhone: "9988776655", wholesalerCity: "Mumbai" },
  { name: "Blush Pink Indo-Western Gown", price: "32000", category: "Gown", image: "", wholesalerName: "Bangalore Designer Hub", wholesalerPhone: "9678912345", wholesalerCity: "Bangalore" },
  { name: "Lavender Embroidered Evening Gown", price: "28000", category: "Gown", image: "", wholesalerName: "Hyderabad Pearl Fashion", wholesalerPhone: "9789123456", wholesalerCity: "Hyderabad" },
  { name: "Emerald Green Mermaid Gown", price: "42000", category: "Gown", image: "", wholesalerName: "Kolkata Saree Palace", wholesalerPhone: "9912345678", wholesalerCity: "Kolkata" },

  // Kurta Pajama (4 products)
  { name: "White Chikankari Kurta Pajama Set", price: "8500", category: "Kurta Pajama", image: "", wholesalerName: "Lucknow Chikan Works", wholesalerPhone: "9456789123", wholesalerCity: "Lucknow" },
  { name: "Cream Silk Kurta with Churidar", price: "12000", category: "Kurta Pajama", image: "", wholesalerName: "Sharma Textiles", wholesalerPhone: "9876543210", wholesalerCity: "Surat" },
  { name: "Mustard Yellow Kurta Pajama", price: "6500", category: "Kurta Pajama", image: "", wholesalerName: "Rajwada Fashion House", wholesalerPhone: "9123456789", wholesalerCity: "Jaipur" },
  { name: "Beige Pathani Suit with Embroidery", price: "9800", category: "Kurta Pajama", image: "", wholesalerName: "Delhi Bridal Collection", wholesalerPhone: "9871234567", wholesalerCity: "Delhi" },

  // Bridal Wear (4 products)
  { name: "Complete Bridal Trousseau Set", price: "125000", category: "Bridal Wear", image: "", wholesalerName: "Delhi Bridal Collection", wholesalerPhone: "9871234567", wholesalerCity: "Delhi" },
  { name: "Red Bridal Lehenga with Jewellery", price: "85000", category: "Bridal Wear", image: "", wholesalerName: "Mumbai Silk Emporium", wholesalerPhone: "9988776655", wholesalerCity: "Mumbai" },
  { name: "Golden Bridal Ensemble", price: "95000", category: "Bridal Wear", image: "", wholesalerName: "Rajwada Fashion House", wholesalerPhone: "9123456789", wholesalerCity: "Jaipur" },
  { name: "Pink Bridal Set with Dupatta", price: "78000", category: "Bridal Wear", image: "", wholesalerName: "Lucknow Chikan Works", wholesalerPhone: "9456789123", wholesalerCity: "Lucknow" },

  // Groom Wear (2 products)
  { name: "Complete Groom Wedding Collection", price: "75000", category: "Groom Wear", image: "", wholesalerName: "Delhi Bridal Collection", wholesalerPhone: "9871234567", wholesalerCity: "Delhi" },
  { name: "Royal Groom Sherwani Set with Accessories", price: "65000", category: "Groom Wear", image: "", wholesalerName: "Rajwada Fashion House", wholesalerPhone: "9123456789", wholesalerCity: "Jaipur" },

  // Indo-Western (2 products)
  { name: "Fusion Kurta with Jacket", price: "18000", category: "Indo-Western", image: "", wholesalerName: "Bangalore Designer Hub", wholesalerPhone: "9678912345", wholesalerCity: "Bangalore" },
  { name: "Indo-Western Lehenga with Cape", price: "35000", category: "Indo-Western", image: "", wholesalerName: "Mumbai Silk Emporium", wholesalerPhone: "9988776655", wholesalerCity: "Mumbai" },
];

export const seedDemoData = (): void => {
  // Check if already seeded
  if (localStorage.getItem(SEEDED_KEY)) {
    return;
  }

  // Generate products with images and IDs
  const productsWithDetails: Product[] = sampleProducts.map((product, index) => ({
    ...product,
    id: crypto.randomUUID(),
    image: generateProductImage(product.category, index),
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
  }));

  // Save to localStorage
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productsWithDetails));
  localStorage.setItem(SEEDED_KEY, 'true');

  console.log('✅ Seeded 50 demo products');
};

export const clearSeedData = (): void => {
  localStorage.removeItem(PRODUCTS_KEY);
  localStorage.removeItem(SEEDED_KEY);
  console.log('🗑️ Cleared demo data');
};
