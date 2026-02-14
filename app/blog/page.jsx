import { motion } from "framer-motion";

export default function BlogPage() {
  const posts = [
    {
      title: "How to Plan a 7-Day Dream Trip in 30 Minutes",
      excerpt: "A quick framework for turning scattered ideas into a structured itinerary with room to explore.",
      image: "https://picsum.photos/seed/blog-1/900/600",
    },
    {
      title: "Budget-Friendly Travel Without Missing the Highlights",
      excerpt: "Learn how to split costs, prioritize must-dos, and keep your trip aligned with your budget.",
      image: "https://picsum.photos/seed/blog-2/900/600",
    },
    {
      title: "Slow Travel vs. Fast Travel: Choosing the Right Pace",
      excerpt: "Find the balance between covering more ground and creating deeper, memorable experiences.",
      image: "https://picsum.photos/seed/blog-3/900/600",
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
          <h1 className="text-4xl sm:text-5xl font-display font-bold">Travearth Blog</h1>
          <p className="text-muted-foreground text-lg">
            Stories, guides, and insights from the Travearth travel planning team, with tips to get more from your AI
            itineraries.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.04 }}
              viewport={{ once: true, amount: 0.2 }}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-travel"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                <button
                  type="button"
                  className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80"
                >
                  Read more
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
}
