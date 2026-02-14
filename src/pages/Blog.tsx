import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    title: "How to plan a 3-day city trip",
    excerpt: "A lightweight framework for sightseeing, food, and rest without burnout.",
    date: "2026-01-10",
  },
  {
    title: "Budgeting basics for first-time travelers",
    excerpt: "A simple category-based method to estimate costs and avoid surprises.",
    date: "2026-01-22",
  },
  {
    title: "Relaxed vs fast-paced itineraries",
    excerpt: "How to choose a travel pace that matches your group and energy.",
    date: "2026-02-03",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Blog</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Short reads on planning, budgets, and making itineraries that feel human.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <article key={post.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="text-xs text-muted-foreground">{post.date}</div>
                  <h2 className="mt-2 text-lg font-semibold text-foreground">{post.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
