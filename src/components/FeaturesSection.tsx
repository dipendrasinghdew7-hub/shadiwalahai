import { Shield, Zap, Users, IndianRupee, Phone, Search } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Easy Discovery",
    description: "Browse thousands of products from verified wholesalers across India with powerful search and filters.",
  },
  {
    icon: Phone,
    title: "Direct Contact",
    description: "Connect directly with wholesalers via WhatsApp or phone. No middlemen, no hidden charges.",
  },
  {
    icon: Shield,
    title: "Verified Sellers",
    description: "All wholesalers are verified to ensure quality and reliability for your business.",
  },
  {
    icon: Zap,
    title: "Quick Listing",
    description: "Wholesalers can list products in minutes with our simple and intuitive interface.",
  },
  {
    icon: Users,
    title: "Growing Network",
    description: "Join India's fastest growing B2B wedding clothing network with retailers nationwide.",
  },
  {
    icon: IndianRupee,
    title: "Best Prices",
    description: "Get factory-direct prices from manufacturers and wholesalers without retail markup.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">Shadiwala</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            We make B2B wedding fashion simple, direct, and profitable for both wholesalers and retailers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-elegant transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
