import { motion } from "framer-motion";
import { Search, Sliders, Sparkles, Download } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Choose Your Destination",
    description: "Enter where you want to go, trip duration, and your total budget in INR.",
  },
  {
    step: "02",
    icon: Sliders,
    title: "Set Your Preferences",
    description: "Pick your travel type, interests, companions, and pace — solo, couple, family, or group.",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "AI Generates Your Itinerary",
    description: "Our AI creates a complete day-wise plan with timings, routes, costs, and local recommendations.",
  },
  {
    step: "04",
    icon: Download,
    title: "Customize, Save & Share",
    description: "Edit activities, save your trip, share via link, or download as PDF — it's all yours.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Plan Your Trip in{" "}
            <span className="text-coral">4 Simple Steps</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            No research, no spreadsheets. Just tell us what you love, and we'll handle the rest.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative text-center group"
            >
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
              )}

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-card border-2 border-primary/20 flex items-center justify-center mb-5 group-hover:border-primary group-hover:shadow-travel transition-all duration-300">
                  <s.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-xs font-bold text-coral uppercase tracking-widest mb-2">
                  Step {s.step}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-2 font-sans">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
