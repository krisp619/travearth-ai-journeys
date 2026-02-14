import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold">Contact Us</h1>
            <p className="text-muted-foreground text-lg">
              Reach out to the Travearth team for support, partnerships, or feedback.
            </p>
            <p className="text-muted-foreground">
              We respond within 24–48 hours for product questions, partnerships, and itinerary support.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5 rounded-2xl border border-border/60 bg-card p-6 sm:p-8 shadow-travel"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us how we can help"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-travel transition-colors hover:bg-primary/90"
            >
              Submit
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
