import { Button } from "@/components/ui/button";
import { Store, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 pattern-indian opacity-20" />
      
      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
            Are You a <span className="text-gradient-gold">Wholesaler</span>?
          </h2>
          
          <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto">
            Reach thousands of retailers across India. List your products for free and grow your business with Shadiwala.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/wholesaler">
                <Store className="h-5 w-5" />
                Start Listing Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 max-w-lg mx-auto">
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-gold">Free</p>
              <p className="text-xs text-primary-foreground/70">No listing fees</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-gold">Easy</p>
              <p className="text-xs text-primary-foreground/70">5 min setup</p>
            </div>
            <div className="text-center">
              <p className="font-display text-2xl font-bold text-gold">Direct</p>
              <p className="text-xs text-primary-foreground/70">Direct inquiries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
