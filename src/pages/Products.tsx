import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProducts, CATEGORIES, CITIES, Product } from "@/lib/storage";
import { Search, Filter, Package } from "lucide-react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [city, setCity] = useState("all");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.wholesalerName.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || product.category === category;
      const matchesCity = city === "all" || product.wholesalerCity === city;
      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [products, search, category, city]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-hero py-12 pattern-indian">
          <div className="container">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground text-center mb-4">
              Browse Wedding Clothing
            </h1>
            <p className="text-primary-foreground/80 text-center max-w-xl mx-auto">
              Discover thousands of products from verified wholesalers across India
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border py-4">
          <div className="container">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products or wholesalers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-3">
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {CITIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8">
          <div className="container">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Package className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  No Products Found
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {products.length === 0
                    ? "No products have been listed yet. Be the first wholesaler to list!"
                    : "Try adjusting your search or filters to find what you're looking for."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
