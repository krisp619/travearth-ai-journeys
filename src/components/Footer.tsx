import { Link } from "react-router-dom";
import { Globe, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
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

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 font-sans uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {["Plan a Trip", "My Trips", "How It Works"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-primary-foreground/60 hover:text-coral transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 font-sans uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {["About Us", "Contact", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-primary-foreground/60 hover:text-coral transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-4 font-sans uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-3">
              {["Popular Destinations", "Travel Tips", "Budget Planning", "Blog"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-primary-foreground/60 hover:text-coral transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

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
