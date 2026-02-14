import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">About Travearth</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Travearth is an AI-powered travel planning experience that helps you go from “Where should we go?”
              to a complete itinerary in minutes. We focus on clarity, customization, and practical plans you can
              actually follow.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">Our mission</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Make trip planning effortless by turning your preferences (budget, pace, interests) into a day-by-day
                  itinerary with helpful structure.
                </p>
              </section>
              <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">What we build</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Smart itineraries, editable plans, and a clean workflow—from idea to schedule—without overwhelming you
                  with tabs and spreadsheets.
                </p>
              </section>
            </div>

            <section className="mt-10 rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-foreground">Why Travearth</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Personalized suggestions based on your style and pace.</li>
                <li>Clear daily structure so you can actually follow the plan.</li>
                <li>Save trips and revisit itineraries anytime.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
