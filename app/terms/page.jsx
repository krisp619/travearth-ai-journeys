import { motion } from "framer-motion";

export default function TermsPage() {
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
            <h1 className="text-4xl sm:text-5xl font-display font-bold">Terms of Service</h1>
            <p className="text-muted-foreground">
              Please read these terms carefully before using Travearth.
            </p>
          </motion.div>

          {[
            {
              title: "Acceptance of terms",
              body: "By accessing or using Travearth, you agree to be bound by these Terms of Service and all applicable laws.",
            },
            {
              title: "Service usage",
              body: "Travearth provides itinerary recommendations and planning tools. You are responsible for verifying travel details, availability, and local regulations.",
            },
            {
              title: "User responsibilities",
              body: "You agree to provide accurate information, use the service lawfully, and avoid misuse or disruption of the platform or its content.",
            },
            {
              title: "Limitation of liability",
              body: "Travearth is provided “as is.” We are not liable for indirect or consequential damages arising from the use of the service or reliance on itinerary recommendations.",
            },
            {
              title: "Changes to terms",
              body: "We may update these terms from time to time. Continued use of Travearth indicates acceptance of the revised terms.",
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
