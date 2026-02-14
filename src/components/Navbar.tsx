import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser, logout } from "@/lib/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = getCurrentUser();
  const role = user?.role ?? null;

  const primaryLinks = [
    { label: "Home", to: "/" },
    ...(user ? [{ label: "Plan Trip", to: "/plan" }] : []),
  ];

  const exploreLinks = [
    { label: "Popular Destinations", to: "/popular-destinations" },
    { label: "Travel Tips", to: "/travel-tips" },
    { label: "Budget Planning", to: "/budget-planning" },
    { label: "Blog", to: "/blog" },
  ];

  const companyLinks = [
    { label: "How It Works", to: "/how-it-works" },
    { label: "About Us", to: "/about-us" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-display font-bold text-foreground">
              Trav<span className="text-primary">earth</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {primaryLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all"
              >
                {link.label}
              </Link>
            ))}

            {user && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all inline-flex items-center gap-1">
                      Explore <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {exploreLinks.map((link) => (
                      <DropdownMenuItem key={link.to} asChild>
                        <Link to={link.to}>{link.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all inline-flex items-center gap-1">
                      Company <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {companyLinks.map((link) => (
                      <DropdownMenuItem key={link.to} asChild>
                        <Link to={link.to}>{link.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {role && role !== "guest" && (
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all"
              >
                Dashboard
              </Link>
            )}

            {role === "admin" && (
              <Link
                to="/admin"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    {user.name}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem disabled className="flex flex-col items-start gap-0.5">
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {role && role !== "guest" && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  {role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      localStorage.removeItem("travearth_role");
                      window.location.assign("/");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Log in
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="shadow-travel">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-card/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {primaryLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all"
                >
                  {link.label}
                </Link>
              ))}

              {user && (
                <>
                  <div className="pt-2">
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                      Explore
                    </div>
                    {exploreLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="pt-2">
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                      Company
                    </div>
                    {companyLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {role && role !== "guest" && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all"
                >
                  Dashboard
                </Link>
              )}

              {role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-all"
                >
                  Admin
                </Link>
              )}

              <div className="pt-3 border-t border-border/50 space-y-2">
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                      localStorage.removeItem("travearth_role");
                      window.location.assign("/");
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Log in
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button className="w-full shadow-travel">
                        Sign up
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
