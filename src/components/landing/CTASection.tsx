import { Link } from "react-router-dom";
import { ArrowRight, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-hero p-10 sm:p-14 lg:p-20 text-center"
        >
          {/* Decorative elements */}
          <div className="absolute top-6 right-8 opacity-20">
            <Plane className="w-24 h-24 text-primary-foreground rotate-12" />
          </div>
          <div className="absolute bottom-6 left-8 opacity-10">
            <Plane className="w-16 h-16 text-primary-foreground -rotate-12" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-5">
              Ready to Explore the World?
            </h2>
            <p className="text-lg text-primary-foreground/70 mb-8 leading-relaxed">
              Start planning your dream trip in seconds. No account required to try — just enter your destination and let AI do the magic.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/plan">
                <Button
                  size="lg"
                  className="text-base px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-travel group"
                >
                  Plan My Trip Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 bg-coral hover:bg-coral-dark text-primary-foreground shadow-coral"
                >
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
