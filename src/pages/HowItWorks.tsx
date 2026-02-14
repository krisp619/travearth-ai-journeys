import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    title: "Tell us your preferences",
    description: "Destination, dates, budget, travel type, interests, and pace.",
  },
  {
    title: "Generate an itinerary",
    description: "Travearth turns your inputs into a structured day-by-day plan.",
  },
  {
    title: "Review and refine",
    description: "Adjust what you like—keep it relaxed, balanced, or fast.",
  },
  {
    title: "Save and reuse",
    description: "Store trips and revisit itineraries anytime.",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">How it works</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A simple workflow designed for real trips: give preferences, get a plan, and iterate.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {steps.map((step, index) => (
                <section key={step.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </section>
              ))}
            </div>

            <section className="mt-10 rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">Tip</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                For best results, be specific (neighborhoods, must-do activities, dietary needs, and any mobility
                constraints).
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
