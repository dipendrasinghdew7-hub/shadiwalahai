import { Product } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Tag } from "lucide-react";
import { useState } from "react";
import InquiryModal from "./InquiryModal";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [showInquiry, setShowInquiry] = useState(false);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in your product: ${product.name}. Please share more details.`
    );
    const phone = product.wholesalerPhone.replace(/\D/g, '');
    window.open(`https://wa.me/91${phone}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:+91${product.wholesalerPhone}`, '_self');
  };

  return (
    <>
      <div className="group bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold/90 text-foreground text-xs font-medium">
              <Tag className="h-3 w-3" />
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2">
              {product.name}
            </h3>
            {product.price && (
              <p className="text-primary font-bold text-xl mt-1">
                ₹{product.price}
              </p>
            )}
          </div>

          {/* Wholesaler Info */}
          <div className="pt-3 border-t border-border space-y-1">
            <p className="text-sm font-medium text-foreground">
              {product.wholesalerName}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {product.wholesalerCity}
            </p>
          </div>

          {/* Actions */}
          <div className="pt-3 flex gap-2">
            <Button
              variant="whatsapp"
              size="sm"
              className="flex-1"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleCall}
            >
              <Phone className="h-4 w-4" />
              Call
            </Button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => setShowInquiry(true)}
          >
            Send Inquiry
          </Button>
        </div>
      </div>

      <InquiryModal
        open={showInquiry}
        onClose={() => setShowInquiry(false)}
        product={product}
      />
    </>
  );
};

export default ProductCard;
