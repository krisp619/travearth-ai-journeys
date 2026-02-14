import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const destinations = [
  {
    name: "Tokyo",
    blurb: "Food, culture, neon nights, and easy day trips.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Paris",
    blurb: "Museums, cafés, architecture, and iconic walks.",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Bali",
    blurb: "Beaches, wellness, temples, and scenic sunsets.",
    image:
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Dubai",
    blurb: "Modern skyline, desert adventures, and luxury.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  },
];

const PopularDestinationsSection = () => {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={cn(
        "py-20 lg:py-28 bg-background transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Popular Destinations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Start with a destination travelers love
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Pick a city to kickstart your plan. Travearth will tailor the itinerary to your days, budget, and interests.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-coral" />
            Curated starting points
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((d, index) => (
            <Link
              key={d.name}
              to={`/plan?city=${encodeURIComponent(d.name)}`}
              className={cn(
                "group block rounded-2xl bg-card border border-border/50 overflow-hidden hover:shadow-travel hover:border-primary/20 transition-all duration-500",
                isVisible ? "animate-[fade-up_0.6s_ease-out_both]" : "",
              )}
              style={{ animationDelay: `${index * 70}ms` }}
              aria-label={`Plan a trip to ${d.name}`}
            >
              <div className="relative">
                <img
                  src={d.image}
                  alt={d.name}
                  className="h-44 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-foreground font-sans">{d.name}</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinationsSection;
