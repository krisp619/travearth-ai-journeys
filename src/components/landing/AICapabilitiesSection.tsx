import { Brain, Sparkles, Route, CalendarDays } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const items = [
  {
    icon: Brain,
    title: "Preference-aware planning",
    description: "Your pace, interests, and travel style shape every day of the itinerary.",
    tone: "bg-primary/10 text-primary",
  },
  {
    icon: Route,
    title: "Smart sequencing",
    description: "Logical ordering to reduce backtracking and keep days realistic.",
    tone: "bg-gold/10 text-gold",
  },
  {
    icon: CalendarDays,
    title: "Day-by-day structure",
    description: "A clear schedule you can follow, share, and adjust.",
    tone: "bg-coral/10 text-coral",
  },
  {
    icon: Sparkles,
    title: "Refresh-friendly edits",
    description: "Swap activities and tune the plan without starting over.",
    tone: "bg-primary/10 text-primary",
  },
];

const AICapabilitiesSection = () => {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={cn(
        "py-20 lg:py-28 bg-gradient-section transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-coral uppercase tracking-wider mb-3">
            Smart Planning
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            AI that plans like a thoughtful traveler
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Get structured itineraries that consider time, movement, and what you actually enjoy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "group p-6 rounded-2xl bg-card border border-border/50 hover:shadow-travel hover:border-primary/20 transition-all duration-500 hover:-translate-y-1",
                isVisible ? "animate-[fade-up_0.6s_ease-out_both]" : "",
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", item.tone)}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-sans">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AICapabilitiesSection;
