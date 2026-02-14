import { Link } from "react-router-dom";
import { Globe, Heart } from "lucide-react";

const Footer = () => {
  const role = typeof window !== "undefined"
    ? localStorage.getItem("travearth_role")
    : null;

  return (
    <footer className="bg-navy text-primary-foreground/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* 5 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-primary-foreground">
                Trav<span className="text-coral">earth</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              AI-powered travel planning that creates personalized itineraries tailored to your style, budget, and pace.
            </p>
          </div>

          {/* Navigation (Navbar Duplicate) */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm hover:text-coral transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/plan" className="text-sm hover:text-coral transition-colors">
                  Plan Trip
                </Link>
              </li>
              <li>
                <Link to="/popular-destinations" className="text-sm hover:text-coral transition-colors">
                  Popular Destinations
                </Link>
              </li>
              <li>
                <Link to="/travel-tips" className="text-sm hover:text-coral transition-colors">
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link to="/budget-planning" className="text-sm hover:text-coral transition-colors">
                  Budget Planning
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-coral transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm hover:text-coral transition-colors">
                  How It Works
                </Link>
              </li>

              {role && role !== "guest" && (
                <li>
                  <Link to="/dashboard" className="text-sm hover:text-coral transition-colors">
                    Dashboard
                  </Link>
                </li>
              )}

              {role === "admin" && (
                <li>
                  <Link to="/admin" className="text-sm hover:text-coral transition-colors">
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/plan" className="text-sm hover:text-coral transition-colors">
                  Plan a Trip
                </Link>
              </li>
              <li>
                <Link to="/my-trips" className="text-sm hover:text-coral transition-colors">
                  My Trips
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about-us" className="text-sm hover:text-coral transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-coral transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm hover:text-coral transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-coral transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/popular-destinations" className="text-sm hover:text-coral transition-colors">
                  Popular Destinations
                </Link>
              </li>
              <li>
                <Link to="/travel-tips" className="text-sm hover:text-coral transition-colors">
                  Travel Tips
                </Link>
              </li>
              <li>
                <Link to="/budget-planning" className="text-sm hover:text-coral transition-colors">
                  Budget Planning
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-coral transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2026 Travearth. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/50 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-coral fill-coral" /> for travelers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
