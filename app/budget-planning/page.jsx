import { motion } from "framer-motion";

export default function BudgetPlanningPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-bold">Budget Planning</h1>
          <p className="text-muted-foreground text-lg">
            Learn how to optimize spending and keep your itinerary aligned with your budget goals using Travearth’s
            AI-guided breakdowns.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mt-12 space-y-10">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-2xl font-display font-semibold">Budget breakdown concept</h2>
            <p className="text-muted-foreground">
              Travearth splits your total budget into clear categories like lodging, transport, food, activities, and
              extras. This keeps daily spending balanced and prevents last-minute surprises.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-2xl font-display font-semibold">Tips for saving money</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>Book flights and stays early to lock in lower rates.</li>
              <li>Combine paid experiences with free local highlights.</li>
              <li>Use public transport passes to reduce daily costs.</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-display font-semibold">Example budget table</h2>
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-travel">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/40 text-foreground">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Category</th>
                    <th className="px-5 py-3 font-semibold">Estimated Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50 text-muted-foreground">
                  <tr>
                    <td className="px-5 py-3">Lodging</td>
                    <td className="px-5 py-3">$850</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3">Food</td>
                    <td className="px-5 py-3">$420</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3">Transport</td>
                    <td className="px-5 py-3">$300</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3">Activities</td>
                    <td className="px-5 py-3">$260</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3">Misc</td>
                    <td className="px-5 py-3">$120</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 font-semibold text-foreground">Total</td>
                    <td className="px-5 py-3 font-semibold text-foreground">$1,950</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>
        </div>
      </section>
    </main>
  );
}
