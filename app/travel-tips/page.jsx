import { motion } from "framer-motion";

export default function TravelTipsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-bold">Travel Tips</h1>
          <p className="text-muted-foreground text-lg">
            Practical advice for packing, budgeting, safety, and making the most of every trip—aligned with Travearth’s
            AI-guided planning flow.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Planning tips",
              items: [
                "Build a flexible day-by-day outline before booking activities.",
                "Group attractions by neighborhood to reduce travel time.",
                "Keep buffer time for rest, transit, and surprises.",
              ],
            },
            {
              title: "Budget tips",
              items: [
                "Set a daily spending cap and track costs as you go.",
                "Mix premium experiences with free or low-cost activities.",
                "Reserve lodging early for better rates and availability.",
              ],
            },
            {
              title: "Safety tips",
              items: [
                "Share your itinerary with a trusted contact.",
                "Keep copies of important documents in secure storage.",
                "Stay aware of local guidelines and emergency contacts.",
              ],
            },
          ].map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-travel"
            >
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>
      </section>
    </main>
  );
}
