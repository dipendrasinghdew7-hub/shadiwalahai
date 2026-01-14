import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Store, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Store className="h-5 w-5" />
          </div>
          <span className="font-display text-2xl font-bold text-primary">
            Shadiwala
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/products") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Browse Products
          </Link>
          <Link
            to="/wholesaler"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/wholesaler") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            For Wholesalers
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/products">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Browse
            </Link>
          </Button>
          <Button asChild>
            <Link to="/wholesaler">
              <Store className="h-4 w-4 mr-2" />
              List Products
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container py-4 flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/products") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
              }`}
            >
              Browse Products
            </Link>
            <Link
              to="/wholesaler"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/wholesaler") ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
              }`}
            >
              For Wholesalers
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
