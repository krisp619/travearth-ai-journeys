import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const destinations = [
  { name: "Tokyo", description: "Neon cityscapes, ramen alleys, temples, and day trips." },
  { name: "Paris", description: "Museums, cafés, architecture, and iconic neighborhoods." },
  { name: "Bali", description: "Beaches, wellness, culture, and scenic adventures." },
  { name: "Dubai", description: "Modern skyline, desert experiences, and luxury shopping." },
  { name: "New York", description: "Broadway, landmarks, food spots, and endless districts." },
  { name: "Goa", description: "Coastal vibes, markets, nightlife, and Portuguese heritage." },
];

const PopularDestinations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              Popular destinations
            </h1>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Pick a destination and start planning instantly.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {destinations.map((d) => (
                <Link
                  key={d.name}
                  to={`/plan?city=${encodeURIComponent(d.name)}`}
                  className="block group"
                >
                  <section className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-1 cursor-pointer">
                    <h2 className="text-lg font-semibold text-foreground">
                      {d.name}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {d.description}
                    </p>
                  </section>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PopularDestinations;
