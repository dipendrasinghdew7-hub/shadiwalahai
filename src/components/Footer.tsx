import { Store, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold text-foreground">
                <Store className="h-5 w-5" />
              </div>
              <span className="font-display text-2xl font-bold">Shadiwala</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm">
              India's premier B2B marketplace connecting wedding clothing wholesalers with retailers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold transition-colors">
                  Browse Products
                </Link>
              </li>
              <li>
                <Link to="/wholesaler" className="hover:text-gold transition-colors">
                  For Wholesalers
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li className="hover:text-gold transition-colors cursor-pointer">Lehenga</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Saree</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Sherwani</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Bridal Wear</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <span>+91 7400759106</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                <span>diprajsingh337@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Shadiwala. All rights reserved.</p>
          <p className="mt-1">Connecting Wedding Fashion Across India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
