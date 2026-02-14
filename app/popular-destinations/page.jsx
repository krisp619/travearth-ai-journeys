import { motion } from "framer-motion";

export default function PopularDestinationsPage() {
  const destinations = [
    {
      name: "Kyoto, Japan",
      description: "Temples, gardens, and traditional culture in every district.",
      image: "https://picsum.photos/seed/kyoto/800/600",
    },
    {
      name: "Santorini, Greece",
      description: "Cliffside sunsets, whitewashed villages, and island breezes.",
      image: "https://picsum.photos/seed/santorini/800/600",
    },
    {
      name: "Bali, Indonesia",
      description: "Lush rice terraces, surf towns, and wellness retreats.",
      image: "https://picsum.photos/seed/bali/800/600",
    },
    {
      name: "Paris, France",
      description: "Iconic landmarks, art museums, and cafe culture.",
      image: "https://picsum.photos/seed/paris/800/600",
    },
    {
      name: "Cape Town, South Africa",
      description: "Coastal drives, mountain views, and vibrant food scenes.",
      image: "https://picsum.photos/seed/capetown/800/600",
    },
    {
      name: "Banff, Canada",
      description: "Glacial lakes, alpine hikes, and cozy mountain towns.",
      image: "https://picsum.photos/seed/banff/800/600",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-display font-bold">Popular Destinations</h1>
          <p className="text-muted-foreground text-lg">
            Explore trending destinations curated from traveler demand and seasonal highlights. Each destination pairs
            perfectly with Travearth’s AI-generated day plans and budget breakdowns.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <motion.article
              key={destination.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.04 }}
              viewport={{ once: true, amount: 0.2 }}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-travel"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-foreground">{destination.name}</h3>
                <p className="text-sm text-muted-foreground">{destination.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
