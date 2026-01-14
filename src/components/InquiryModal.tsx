import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Product } from "@/lib/storage";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Send, MessageCircle } from "lucide-react";

interface InquiryModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

const InquiryModal = ({ open, onClose, product }: InquiryModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: `Hi, I'm interested in "${product.name}". Please share more details including bulk pricing and availability.`,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length > 500) {
      newErrors.message = "Message must be less than 500 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Send via WhatsApp with inquiry details
    const message = encodeURIComponent(
      `*New Inquiry from Shadiwala*\n\n` +
      `*Product:* ${product.name}\n` +
      `*Buyer Name:* ${formData.name}\n` +
      `*Buyer Phone:* ${formData.phone}\n\n` +
      `*Message:*\n${formData.message}`
    );
    const phone = product.wholesalerPhone.replace(/\D/g, '');
    window.open(`https://wa.me/91${phone}?text=${message}`, '_blank');

    toast({
      title: "Inquiry Sent!",
      description: "You'll be redirected to WhatsApp to complete the inquiry.",
    });

    onClose();
    setFormData({
      name: "",
      phone: "",
      message: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Send Inquiry</DialogTitle>
          <DialogDescription>
            Send your inquiry directly to {product.wholesalerName}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 rounded-md object-cover"
          />
          <div>
            <p className="font-medium text-sm">{product.name}</p>
            {product.price && (
              <p className="text-primary font-bold">₹{product.price}</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Your Phone *</Label>
            <Input
              id="phone"
              placeholder="Enter 10-digit phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Write your inquiry message..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="whatsapp" className="flex-1">
              <MessageCircle className="h-4 w-4" />
              Send via WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryModal;
