import { Star } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Aarav",
    role: "Weekend traveler",
    quote: "The itinerary felt realistic. We didn’t overpack the day and still saw everything we cared about.",
  },
  {
    name: "Meera",
    role: "Budget-conscious planner",
    quote: "The budget breakdown helped us decide where to spend more and where to keep it simple.",
  },
  {
    name: "Daniel",
    role: "First-time international trip",
    quote: "Loved the structure. It reduced planning stress and made booking much easier.",
  },
];

const TestimonialsSection = () => {
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
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Trusted by travelers who want clarity
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A few words from people who like plans that feel human.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className={cn(
                "group rounded-2xl bg-card border border-border/50 p-6 hover:shadow-travel hover:border-primary/20 transition-all duration-500 hover:-translate-y-1",
                isVisible ? "animate-[fade-up_0.6s_ease-out_both]" : "",
              )}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-gold" />
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">“{t.quote}”</p>
              <div className="mt-6">
                <div className="text-sm font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "mt-12 rounded-2xl border border-border/50 bg-card p-6 text-center transition-all duration-500 hover:shadow-travel",
            isVisible ? "animate-[fade-up_0.6s_ease-out_both]" : "",
          )}
          style={{ animationDelay: "320ms" }}
        >
          <p className="text-sm text-muted-foreground">
            Built for demo/MVP: reviews are sample content.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
