import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tips = [
  {
    title: "Keep a realistic pace",
    description: "If your day looks like a checklist, you’ll feel rushed. Leave buffer time.",
  },
  {
    title: "Budget with categories",
    description: "Split into stay, transport, food, activities, and a 10–15% contingency.",
  },
  {
    title: "Plan around neighborhoods",
    description: "Group activities by area to reduce transit and make days smoother.",
  },
  {
    title: "Backup options",
    description: "Have indoor alternatives in case of weather or closures.",
  },
];

const TravelTips = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Travel tips</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Practical advice to help you travel lighter, spend smarter, and enjoy more.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {tips.map((tip) => (
                <section key={tip.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-foreground">{tip.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{tip.description}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TravelTips;
