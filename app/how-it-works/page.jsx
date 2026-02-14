import { motion } from "framer-motion";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-bold">How It Works</h1>
          <p className="text-muted-foreground text-lg">
            Share your destination, budget, and style. Travearth AI builds a day-by-day itinerary with routes, timing,
            and budget breakdowns—ready to customize.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: "01", title: "Enter trip details", text: "Add destination, dates, budget, and travel preferences." },
            { step: "02", title: "AI generates itinerary", text: "Our AI builds a day-by-day plan optimized for you." },
            { step: "03", title: "Customize your plan", text: "Swap activities, adjust pace, and fine-tune budgets." },
            { step: "04", title: "Save or share", text: "Store your trip, export it, or share with friends." },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-travel"
            >
              <div className="text-sm font-semibold text-primary">Step {item.step}</div>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
