import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductForm from "@/components/ProductForm";
import WholesalerProfileForm from "@/components/WholesalerProfileForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts, getWholesaler, deleteProduct, Product, Wholesaler } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Package, User, Trash2, Eye, Plus } from "lucide-react";

const WholesalerPage = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [wholesaler, setWholesaler] = useState<Wholesaler | null>(null);
  const [activeTab, setActiveTab] = useState("profile");

  const loadData = () => {
    const savedWholesaler = getWholesaler();
    setWholesaler(savedWholesaler);
    
    if (savedWholesaler) {
      const allProducts = getProducts();
      const myProducts = allProducts.filter(
        (p) => p.wholesalerPhone === savedWholesaler.phone
      );
      setProducts(myProducts);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleProfileSaved = () => {
    loadData();
    setActiveTab("products");
  };

  const handleProductAdded = () => {
    loadData();
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    toast({
      title: "Product Deleted",
      description: "The product has been removed from your listings.",
    });
    loadData();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-hero py-12 pattern-indian">
          <div className="container">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground text-center mb-4">
              Wholesaler Dashboard
            </h1>
            <p className="text-primary-foreground/80 text-center max-w-xl mx-auto">
              Manage your profile and product listings
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container max-w-4xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="add" className="flex items-center gap-2" disabled={!wholesaler}>
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Product</span>
                </TabsTrigger>
                <TabsTrigger value="products" className="flex items-center gap-2" disabled={!wholesaler}>
                  <Package className="h-4 w-4" />
                  <span className="hidden sm:inline">My Products</span>
                  {products.length > 0 && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                      {products.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="bg-card rounded-xl p-6 shadow-elegant border border-border">
                  <WholesalerProfileForm onProfileSaved={handleProfileSaved} />
                </div>
              </TabsContent>

              {/* Add Product Tab */}
              <TabsContent value="add">
                <div className="bg-card rounded-xl p-6 shadow-elegant border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Plus className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-display text-lg font-semibold">Add New Product</h2>
                      <p className="text-sm text-muted-foreground">
                        List a new product for retailers to discover
                      </p>
                    </div>
                  </div>
                  <ProductForm onProductAdded={handleProductAdded} />
                </div>
              </TabsContent>

              {/* My Products Tab */}
              <TabsContent value="products">
                <div className="space-y-4">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-card rounded-xl p-4 shadow-sm border border-border flex gap-4 animate-fade-in"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-semibold text-foreground truncate">
                            {product.name}
                          </h3>
                          <p className="text-primary font-bold">
                            {product.price ? `₹${product.price}` : "Price on request"}
                          </p>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Listed on {new Date(product.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => window.open("/products", "_blank")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-card rounded-xl border border-border">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <Package className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-display text-lg font-semibold mb-2">No Products Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start adding products to reach retailers across India
                      </p>
                      <Button onClick={() => setActiveTab("add")}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Product
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WholesalerPage;
