import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PartnerDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Partner dashboard</h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Partner tools are in future scope. This page is a protected placeholder for the MVP.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PartnerDashboard;
