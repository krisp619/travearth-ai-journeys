"use client";

import { motion } from "framer-motion";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-bold">About Travearth</h1>
          <p className="text-muted-foreground text-lg">
            Travearth is an AI-based travel itinerary platform that helps you plan smarter, faster, and more personally.
            We transform preferences into structured, day-by-day itineraries with budget clarity and time-efficient routes.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mt-12 space-y-10">
          {[
            {
              title: "Mission & Vision",
              body: "Our mission is to remove the stress from trip planning and make exceptional travel accessible to everyone. We envision a world where every traveler can explore with confidence, guided by intelligent, transparent AI.",
            },
            {
              title: "What problem we solve",
              body: "Planning a trip often means hours of fragmented research across blogs, maps, and reviews. Travearth brings everything together into a cohesive, day-by-day itinerary—optimized for time, budget, and preferences.",
            },
            {
              title: "Why AI-powered planning",
              body: "AI helps us personalize every journey. It adapts to your travel style, highlights what matters most, and recommends efficient routes and realistic budgets. The result is a plan that feels curated—not generic.",
            },
          ].map((section, index) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-3"
            >
              <h2 className="text-2xl font-display font-semibold text-foreground">{section.title}</h2>
              <p className="text-muted-foreground">{section.body}</p>
            </motion.section>
          ))}
        </div>
      </section>
    </main>
  );
}
