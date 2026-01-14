import { Link } from "react-router-dom";
import { CATEGORIES } from "@/lib/storage";

const categoryImages: Record<string, string> = {
  "Lehenga": "🥻",
  "Saree": "🪭",
  "Sherwani": "🎩",
  "Suit": "👔",
  "Gown": "👗",
  "Kurta Pajama": "🥋",
  "Bridal Wear": "👰",
  "Groom Wear": "🤵",
  "Indo-Western": "✨",
  "Accessories": "💍",
};

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our wide range of wedding clothing categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((category, index) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative aspect-square rounded-xl bg-card border border-border overflow-hidden hover:border-primary/50 hover:shadow-elegant transition-all duration-300 group-hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {categoryImages[category] || "👗"}
                  </span>
                  <span className="font-medium text-sm text-center text-foreground group-hover:text-primary-foreground transition-colors">
                    {category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
