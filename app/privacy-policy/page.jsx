import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center space-y-3"
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Your privacy matters to us. This policy explains what we collect, how we use it, and your choices.
            </p>
          </motion.div>

          {[
            {
              title: "Introduction",
              body: "Travearth provides AI-powered travel planning tools. We only collect information required to deliver itineraries, personalize recommendations, and improve the product experience.",
            },
            {
              title: "Data we collect",
              body: "We may collect your name, email, trip preferences, destinations, budget range, and usage analytics. We do not sell personal data to third parties.",
            },
            {
              title: "How we use data",
              body: "Data is used to generate itineraries, personalize recommendations, provide support, and improve platform performance. Aggregated insights help us refine the travel planning experience.",
            },
            {
              title: "Data security",
              body: "We implement industry-standard safeguards to protect data in transit and at rest. Access is limited to authorized personnel with a legitimate business need.",
            },
            {
              title: "User rights",
              body: "You can request access, correction, or deletion of your data. Contact us to manage your preferences or opt out of non-essential communications.",
            },
          ].map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.04 }}
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-2"
            >
              <h2 className="text-2xl font-display font-semibold">{section.title}</h2>
              <p className="text-muted-foreground">{section.body}</p>
            </motion.section>
          ))}
        </div>
      </section>
    </main>
  );
}
