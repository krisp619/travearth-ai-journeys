import { Wallet, ShieldCheck, TrendingUp, PiggyBank } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const bullets = [
  {
    icon: Wallet,
    title: "Budget clarity",
    description: "Understand how your trip spend breaks down across days.",
  },
  {
    icon: TrendingUp,
    title: "Better trade-offs",
    description: "Know where to splurge and where to save without guesswork.",
  },
  {
    icon: PiggyBank,
    title: "Fewer surprises",
    description: "Plan with a buffer so small changes don’t derail the trip.",
  },
  {
    icon: ShieldCheck,
    title: "Decision confidence",
    description: "Make bookings with a realistic estimate, not a rough hunch.",
  },
];

const BudgetBenefitsSection = () => {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className={cn(isVisible ? "animate-[fade-up_0.6s_ease-out_both]" : "")}
          >
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Budget Planning
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Spend smarter with a plan that respects your budget
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Travearth helps you balance experiences and costs—so you travel confidently and avoid last-minute surprises.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {bullets.map((b, index) => (
                <div
                  key={b.title}
                  className={cn(
                    "group rounded-2xl border border-border/50 bg-card p-5 hover:shadow-travel hover:border-primary/20 transition-all duration-500",
                    isVisible ? "animate-[fade-up_0.6s_ease-out_both]" : "",
                  )}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-coral/10 text-coral flex items-center justify-center group-hover:scale-110 transition-transform">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{b.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cn(
            "rounded-3xl overflow-hidden border border-border/50 bg-gradient-hero p-8 sm:p-10 shadow-travel",
            isVisible ? "animate-[fade-up_0.6s_ease-out_both]" : "",
          )}>
            <div className="text-primary-foreground/90">
              <div className="text-sm font-semibold uppercase tracking-wider">Example breakdown</div>
              <div className="mt-3 text-2xl font-display font-bold">5 days · Mid-range</div>
              <div className="mt-6 space-y-3 text-sm">
                {[
                  { label: "Stay", value: "40%" },
                  { label: "Food", value: "20%" },
                  { label: "Local transport", value: "15%" },
                  { label: "Activities", value: "20%" },
                  { label: "Buffer", value: "5%" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-primary-foreground/70">{row.label}</span>
                    <span className="font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-primary-foreground/70 leading-relaxed">
                Use this as a starting point and tune it to your destination, season, and travel style.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetBenefitsSection;
