import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveProduct, CATEGORIES, getWholesaler } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { Upload, ImagePlus, X } from "lucide-react";

interface ProductFormProps {
  onProductAdded: () => void;
}

const ProductForm = ({ onProductAdded }: ProductFormProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }
    
    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a valid number";
    }
    
    if (!formData.category) {
      newErrors.category = "Please select a category";
    }
    
    if (!imagePreview) {
      newErrors.image = "Product image is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image must be less than 5MB" });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
        setErrors({ ...errors, image: "" });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, image: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const wholesaler = getWholesaler();
    if (!wholesaler) {
      toast({
        title: "Profile Required",
        description: "Please set up your wholesaler profile first",
        variant: "destructive",
      });
      return;
    }
    
    if (!validate()) return;

    saveProduct({
      name: formData.name.trim(),
      price: formData.price.trim(),
      category: formData.category,
      image: formData.image,
      wholesalerName: wholesaler.name,
      wholesalerPhone: wholesaler.phone,
      wholesalerCity: wholesaler.city,
    });

    toast({
      title: "Product Added!",
      description: "Your product has been listed successfully.",
    });

    setFormData({ name: "", price: "", category: "", image: "" });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onProductAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="space-y-2">
        <Label>Product Image *</Label>
        <div
          className={`relative border-2 border-dashed rounded-xl transition-colors ${
            errors.image ? "border-destructive" : "border-border hover:border-primary/50"
          }`}
        >
          {imagePreview ? (
            <div className="relative aspect-[4/3]">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center aspect-[4/3] cursor-pointer">
              <ImagePlus className="h-12 w-12 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Click to upload image</span>
              <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
        {errors.image && (
          <p className="text-xs text-destructive">{errors.image}</p>
        )}
      </div>

      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          placeholder="e.g., Bridal Lehenga with Embroidery"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name}</p>
        )}
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="price">Price (₹) - Optional</Label>
        <Input
          id="price"
          placeholder="e.g., 15000"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className={errors.price ? "border-destructive" : ""}
        />
        {errors.price && (
          <p className="text-xs text-destructive">{errors.price}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Leave empty to show "Price on request"
        </p>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category *</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger className={errors.category ? "border-destructive" : ""}>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-xs text-destructive">{errors.category}</p>
        )}
      </div>

      <Button type="submit" className="w-full" size="lg">
        <Upload className="h-4 w-4 mr-2" />
        Add Product
      </Button>
    </form>
  );
};

export default ProductForm;
