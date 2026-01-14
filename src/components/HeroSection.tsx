import { Button } from "@/components/ui/button";
import { ArrowRight, Store, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 pattern-indian opacity-30" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full text-gold-light text-sm font-medium animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              India's #1 B2B Wedding Clothing Marketplace
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Connect with Top{" "}
              <span className="text-gradient-gold">Wedding Clothing</span>{" "}
              Wholesalers
            </h1>

            <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Discover thousands of products from verified wholesalers. 
              Lehengas, Sarees, Sherwanis, and more — directly from manufacturers across India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/products">
                  <ShoppingBag className="h-5 w-5" />
                  Browse Products
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link to="/wholesaler">
                  <Store className="h-5 w-5" />
                  List Your Products
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl font-bold text-gold">500+</p>
                <p className="text-sm text-primary-foreground/70">Wholesalers</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl font-bold text-gold">10K+</p>
                <p className="text-sm text-primary-foreground/70">Products</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-display text-3xl font-bold text-gold">50+</p>
                <p className="text-sm text-primary-foreground/70">Cities</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden lg:block relative animate-slide-in-right">
            <div className="relative">
              {/* Main Image Placeholder - Grid of product categories */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-2xl bg-primary-foreground/10 backdrop-blur-sm overflow-hidden border border-primary-foreground/20 shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-xl text-primary-foreground/60">Lehenga</span>
                    </div>
                  </div>
                  <div className="aspect-square rounded-2xl bg-gold/20 backdrop-blur-sm overflow-hidden border border-gold/30 shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-lg text-primary-foreground/60">Saree</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-2xl bg-gold/20 backdrop-blur-sm overflow-hidden border border-gold/30 shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-lg text-primary-foreground/60">Sherwani</span>
                    </div>
                  </div>
                  <div className="aspect-[3/4] rounded-2xl bg-primary-foreground/10 backdrop-blur-sm overflow-hidden border border-primary-foreground/20 shadow-lg hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-xl text-primary-foreground/60">Gown</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
