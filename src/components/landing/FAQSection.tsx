import { type LucideIcon, ChevronDown, Shield, BadgeCheck, Lock } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Do I need an account to try Travearth?",
    a: "For the MVP, some routes are protected. You can create an account or log in to plan and save trips.",
  },
  {
    q: "Is the itinerary final?",
    a: "No—treat it as a strong first draft. You can adjust the plan based on your preferences.",
  },
  {
    q: "Does Travearth book hotels and flights?",
    a: "Not yet. This version focuses on planning and structured itineraries.",
  },
  {
    q: "How does role-based access work?",
    a: "Roles are stored locally for demo purposes and used to protect routes like /admin.",
  },
];

const TrustItem = ({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) => (
  <div className="rounded-2xl border border-border/50 bg-card p-5 hover:shadow-travel transition-all duration-500">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{body}</div>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
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
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            FAQ & Trust
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Answers and a little peace of mind
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Quick details about the MVP and how to use it effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <details
                key={item.q}
                className={cn(
                  "group rounded-2xl border border-border/50 bg-card p-5 hover:shadow-travel transition-all duration-500",
                  isVisible ? "animate-[fade-up_0.6s_ease-out_both]" : "",
                )}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <summary className="list-none cursor-pointer flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-foreground">{item.q}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>

          <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-5", isVisible ? "animate-[fade-up_0.6s_ease-out_both]" : "")}>
            <TrustItem
              icon={Shield}
              title="MVP-safe"
              body="No backend/JWT required for the demo role system."
            />
            <TrustItem
              icon={Lock}
              title="Protected routes"
              body="Restricted pages redirect to /login when unauthorized."
            />
            <TrustItem
              icon={BadgeCheck}
              title="Clear roles"
              body="Admin, user, partner roles supported for access control."
            />
            <div className="rounded-2xl border border-border/50 bg-gradient-hero p-5 text-primary-foreground/90 shadow-travel">
              <div className="text-sm font-semibold">Tip</div>
              <div className="mt-2 text-sm text-primary-foreground/70 leading-relaxed">
                If a page redirects you to /login, sign in to unlock the feature.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
