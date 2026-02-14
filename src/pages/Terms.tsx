import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Terms of Service</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This page is provided for project completeness in Travearth. Replace with finalized legal terms before
              launching.
            </p>

            <div className="mt-10 space-y-8">
              <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">Use of the service</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Travearth provides itinerary suggestions and planning tools. You are responsible for verifying details
                  like availability, pricing, safety, visas, and local regulations.
                </p>
              </section>

              <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">No travel guarantees</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  We don’t guarantee outcomes, bookings, or experiences. AI-generated output may contain mistakes—please
                  double-check before making purchases.
                </p>
              </section>

              <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">Changes</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  We may update these terms as the product evolves.
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

export default Terms;
