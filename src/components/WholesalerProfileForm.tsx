import { useState, useEffect } from "react";
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
import { saveWholesaler, getWholesaler, CITIES, Wholesaler } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, MapPin, Save } from "lucide-react";

interface WholesalerProfileFormProps {
  onProfileSaved: () => void;
}

const WholesalerProfileForm = ({ onProfileSaved }: WholesalerProfileFormProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [existingProfile, setExistingProfile] = useState<Wholesaler | null>(null);

  useEffect(() => {
    const profile = getWholesaler();
    if (profile) {
      setExistingProfile(profile);
      setFormData({
        name: profile.name,
        phone: profile.phone,
        city: profile.city,
        whatsapp: profile.whatsapp || profile.phone,
      });
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Business name is required";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    
    if (!formData.city) {
      newErrors.city = "Please select a city";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    saveWholesaler({
      name: formData.name.trim(),
      phone: formData.phone.replace(/\D/g, ''),
      city: formData.city,
      whatsapp: formData.whatsapp.replace(/\D/g, '') || formData.phone.replace(/\D/g, ''),
    });

    toast({
      title: existingProfile ? "Profile Updated!" : "Profile Created!",
      description: "You can now start listing your products.",
    });

    setExistingProfile(getWholesaler());
    onProfileSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-foreground">
            {existingProfile ? "Update Profile" : "Create Your Profile"}
          </h3>
          <p className="text-sm text-muted-foreground">
            This information will be shown to retailers
          </p>
        </div>
      </div>

      {/* Business Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Business / Shop Name *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            placeholder="e.g., Sharma Textiles"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            placeholder="10-digit phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone}</p>
        )}
      </div>

      {/* WhatsApp (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp Number (if different)</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="whatsapp"
            placeholder="Same as phone if left empty"
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label>City *</Label>
        <Select
          value={formData.city}
          onValueChange={(value) => setFormData({ ...formData, city: value })}
        >
          <SelectTrigger className={errors.city ? "border-destructive" : ""}>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Select your city" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {CITIES.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.city && (
          <p className="text-xs text-destructive">{errors.city}</p>
        )}
      </div>

      <Button type="submit" className="w-full" size="lg">
        <Save className="h-4 w-4 mr-2" />
        {existingProfile ? "Update Profile" : "Save Profile"}
      </Button>
    </form>
  );
};

export default WholesalerProfileForm;
