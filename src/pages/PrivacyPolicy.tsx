import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Privacy Policy</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              This is a project/demo privacy policy page for Travearth. Replace with your final legal text before
              production.
            </p>

            <div className="mt-10 space-y-8">
              <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">What we collect</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Trip preferences you enter (destination, dates, budget, interests) and app usage data needed to provide
                  core features.
                </p>
              </section>

              <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">How we use it</h2>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>Generate itineraries and personalize recommendations.</li>
                  <li>Save and retrieve trips you created.</li>
                  <li>Improve product quality and reliability.</li>
                </ul>
              </section>

              <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground">Data retention</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  In the current demo build, trips may be stored locally in your browser. If you enable a backend
                  (e.g., Supabase), define retention and deletion policies.
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

export default PrivacyPolicy;
