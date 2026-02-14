import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BudgetPlanning = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Budget planning</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A simple way to estimate your trip cost before you book anything.
            </p>

            <div className="mt-10 space-y-6">
              <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">1) Choose your budget style</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Budget, mid-range, or premium—this influences stay, food, and activity costs.
                </p>
              </section>
              <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">2) Split into categories</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>Stay</li>
                  <li>Local transport + flights</li>
                  <li>Food</li>
                  <li>Activities</li>
                  <li>Shopping + extras</li>
                </ul>
              </section>
              <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">3) Add contingency</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Add 10–15% for last-minute changes, price swings, and surprise fees.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BudgetPlanning;
