import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, DollarSign, Thermometer, Calendar, Users, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { getCurrentUser } from "@/lib/auth";

const cityData: Record<string, any> = {
  Tokyo: {
    name: "Tokyo",
    country: "Japan",
    tagline: "Where ancient tradition meets cutting-edge innovation",
    heroImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80",
    description: "Tokyo seamlessly blends centuries-old temples with futuristic skyscrapers, creating a unique urban landscape. Experience world-class cuisine, vibrant neighborhoods, and cutting-edge technology in Japan's dynamic capital.",
    bestTimeToVisit: "March-May (Spring) or September-November (Fall)",
    averageBudget: "$150-300 per day",
    idealDuration: "5-7 days",
    mustVisit: [
      "Senso-ji Temple in Asakusa",
      "Shibuya Crossing & Harajuku",
      "Tsukiji Outer Market",
      "Tokyo Skytree & Imperial Palace",
      "Meiji Shrine & Yoyogi Park",
      "Akihabara Electric Town"
    ],
    experiences: [
      "Savor authentic sushi at Tsukiji",
      "Explore neon-lit streets of Shinjuku",
      "Visit tranquil gardens and shrines",
      "Experience a traditional tea ceremony",
      "Day trip to Mount Fuji",
      "Shop in Ginza luxury district"
    ],
    localTips: [
      "Get a JR Pass for unlimited train travel",
      "Cash is still king - many places don't accept cards",
      "Learn basic Japanese phrases for respect",
      "Remove shoes when entering homes and some restaurants"
    ],
    cuisine: "Sushi, Ramen, Tempura, Yakitori, Kaiseki",
    weather: "Hot humid summers, mild winters, cherry blossoms in spring"
  },
  Paris: {
    name: "Paris",
    country: "France",
    tagline: "The City of Light and timeless romance",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    description: "Paris captivates visitors with its iconic landmarks, world-renowned museums, and charming café culture. From the Eiffel Tower to hidden courtyards, every corner tells a story of art, history, and joie de vivre.",
    bestTimeToVisit: "April-June or September-October",
    averageBudget: "$200-400 per day",
    idealDuration: "4-6 days",
    mustVisit: [
      "Eiffel Tower & Trocadéro Gardens",
      "Louvre Museum & Arc de Triomphe",
      "Notre-Dame & Sainte-Chapelle",
      "Montmartre & Sacré-Cœur",
      "Champs-Élysées & Latin Quarter",
      "Musée d'Orsay"
    ],
    experiences: [
      "Seine River cruise at sunset",
      "Café hopping in Le Marais",
      "Wine tasting in Montmartre",
      "Picnic at Luxembourg Gardens",
      "Browse vintage bookstores",
      "Day trip to Versailles Palace"
    ],
    localTips: [
      "Learn basic French - locals appreciate the effort",
      "Avoid tourist traps near major landmarks",
      "Visit museums on first Sunday for free entry",
      "Metro is the fastest way to get around"
    ],
    cuisine: "Croissants, Coq au Vin, Escargot, Crêpes, Macarons",
    weather: "Mild springs and falls, hot summers, cold winters"
  },
  Bali: {
    name: "Bali",
    country: "Indonesia",
    tagline: "Island of gods, beaches, and spiritual serenity",
    heroImage: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=80",
    description: "Bali offers a perfect blend of pristine beaches, lush rice terraces, ancient temples, and vibrant culture. This Indonesian paradise is ideal for both adventure seekers and those seeking relaxation and spiritual renewal.",
    bestTimeToVisit: "April-October (Dry Season)",
    averageBudget: "$50-150 per day",
    idealDuration: "7-10 days",
    mustVisit: [
      "Tanah Lot Temple",
      "Tegalalang Rice Terraces",
      "Uluwatu Temple & Kecak Dance",
      "Sacred Monkey Forest Sanctuary",
      "Tirta Empul Water Temple",
      "Mount Batur Sunrise Trek"
    ],
    experiences: [
      "Sunrise at Mount Batur",
      "Beach hopping in Seminyak",
      "Traditional Balinese massage",
      "Surfing lessons in Canggu",
      "Yoga retreat in Ubud",
      "Snorkeling in Nusa Penida"
    ],
    localTips: [
      "Rent a scooter to explore easily",
      "Dress modestly when visiting temples",
      "Negotiate prices at markets",
      "Stay in Ubud for culture, Seminyak for beaches"
    ],
    cuisine: "Nasi Goreng, Satay, Babi Guling, Mie Goreng, Fresh Tropical Fruits",
    weather: "Tropical year-round, rainy season November-March"
  },
  Dubai: {
    name: "Dubai",
    country: "United Arab Emirates",
    tagline: "Modern luxury meets Arabian heritage",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    description: "Dubai dazzles with its ultramodern architecture, luxury shopping, and vibrant nightlife. From the world's tallest building to traditional souks, experience the perfect fusion of innovation and tradition.",
    bestTimeToVisit: "November-March (Cooler months)",
    averageBudget: "$150-400 per day",
    idealDuration: "4-5 days",
    mustVisit: [
      "Burj Khalifa & Dubai Mall",
      "Dubai Marina & JBR Beach",
      "Palm Jumeirah & Atlantis",
      "Gold & Spice Souks",
      "Dubai Frame",
      "Museum of the Future"
    ],
    experiences: [
      "Desert safari with dinner",
      "Indoor skiing at Ski Dubai",
      "Dhow cruise on Dubai Creek",
      "Shopping at traditional souks",
      "Skydiving over Palm Jumeirah",
      "Fountain show at Dubai Mall"
    ],
    localTips: [
      "Dress modestly in public areas",
      "Metro is efficient and air-conditioned",
      "Avoid visiting in summer - extremely hot",
      "Friday is a holy day - some places close"
    ],
    cuisine: "Shawarma, Hummus, Falafel, Mezze, Arabic Coffee & Dates",
    weather: "Hot year-round, extremely hot May-September"
  },
  "New York": {
    name: "New York",
    country: "United States",
    tagline: "The city that never sleeps",
    heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=80",
    description: "New York City is a global hub of culture, arts, and endless energy. From iconic landmarks to diverse neighborhoods, experience world-class museums, Broadway shows, and cuisine from every corner of the globe.",
    bestTimeToVisit: "April-June or September-November",
    averageBudget: "$200-500 per day",
    idealDuration: "5-7 days",
    mustVisit: [
      "Statue of Liberty & Ellis Island",
      "Central Park & Times Square",
      "Empire State Building",
      "Metropolitan Museum of Art",
      "Brooklyn Bridge & DUMBO",
      "9/11 Memorial & Museum"
    ],
    experiences: [
      "Broadway show in Theater District",
      "Walk the High Line park",
      "Food tour in Greenwich Village",
      "Sunset from Top of the Rock",
      "Street art in Williamsburg",
      "Shopping on Fifth Avenue"
    ],
    localTips: [
      "Get a MetroCard for subway travel",
      "Walking is often faster than driving",
      "Book Broadway tickets in advance",
      "Explore different boroughs beyond Manhattan"
    ],
    cuisine: "Pizza, Bagels, Hot Dogs, Cheesecake, International Cuisine",
    weather: "Four distinct seasons, hot humid summers, cold snowy winters"
  },
  Goa: {
    name: "Goa",
    country: "India",
    tagline: "Beaches, heritage, and laid-back coastal vibes",
    heroImage: "https://images.unsplash.com/photo-1580837119756-563d608dd119?auto=format&fit=crop&w=1600&q=80",
    description: "Goa blends Portuguese colonial charm with Indian culture and stunning coastline. Enjoy pristine beaches, historic churches, vibrant nightlife, and delicious seafood in India's smallest and most relaxed state.",
    bestTimeToVisit: "November-February (Dry & Cool)",
    averageBudget: "$30-100 per day",
    idealDuration: "5-7 days",
    mustVisit: [
      "Baga & Calangute Beaches",
      "Basilica of Bom Jesus",
      "Anjuna Flea Market",
      "Fort Aguada",
      "Dudhsagar Waterfalls",
      "Old Goa Churches"
    ],
    experiences: [
      "Sunset at Vagator Beach",
      "Water sports in Calangute",
      "Portuguese architecture tour",
      "Beach shacks for fresh seafood",
      "Spice plantation visit",
      "Night markets and beach parties"
    ],
    localTips: [
      "Rent a scooter to explore beaches",
      "Try local Goan fish curry",
      "Visit during Carnival for festivities",
      "North Goa for nightlife, South for peace"
    ],
    cuisine: "Fish Curry Rice, Vindaloo, Bebinca, Prawn Balchao, Feni",
    weather: "Tropical, monsoons June-September, pleasant winters"
  }
};

const CityInfo = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  const city = cityName ? cityData[cityName] : null;

  if (!city) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold">City not found</h1>
            <Link to="/popular-destinations">
              <Button className="mt-6">Browse Destinations</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePlanTrip = () => {
    if (user) {
      navigate(`/plan?city=${encodeURIComponent(city.name)}`);
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img
          src={city.heroImage}
          alt={city.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-coral" />
                <span className="text-primary-foreground/80">{city.country}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-4">
                {city.name}
              </h1>
              <p className="text-xl text-primary-foreground/80 italic mb-6">
                {city.tagline}
              </p>
              <Button
                size="lg"
                className="bg-coral hover:bg-coral-dark text-primary-foreground shadow-coral"
                onClick={handlePlanTrip}
              >
                Plan Your Trip to {city.name}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {city.description}
            </p>

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <div className="p-6 rounded-xl bg-card border border-border">
                <Calendar className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-sm font-semibold text-foreground mb-2">Best Time</h3>
                <p className="text-sm text-muted-foreground">{city.bestTimeToVisit}</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <DollarSign className="w-8 h-8 text-coral mb-3" />
                <h3 className="text-sm font-semibold text-foreground mb-2">Budget</h3>
                <p className="text-sm text-muted-foreground">{city.averageBudget}</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <Clock className="w-8 h-8 text-gold mb-3" />
                <h3 className="text-sm font-semibold text-foreground mb-2">Ideal Duration</h3>
                <p className="text-sm text-muted-foreground">{city.idealDuration}</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <Thermometer className="w-8 h-8 text-primary mb-3" />
                <h3 className="text-sm font-semibold text-foreground mb-2">Weather</h3>
                <p className="text-sm text-muted-foreground">{city.weather}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Must Visit Places */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Camera className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-display font-bold text-foreground">
                Must-Visit Places
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {city.mustVisit.map((place: string, index: number) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-card border border-border hover:border-primary/20 transition-colors"
                >
                  <p className="text-foreground">{place}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Users className="w-6 h-6 text-coral" />
              <h2 className="text-3xl font-display font-bold text-foreground">
                Top Experiences
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {city.experiences.map((exp: string, index: number) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-card border border-border hover:border-coral/20 transition-colors"
                >
                  <p className="text-foreground">{exp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Tips & Cuisine */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Local Tips */}
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Local Tips
              </h2>
              <ul className="space-y-3">
                {city.localTips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <p className="text-muted-foreground">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cuisine */}
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Local Cuisine
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {city.cuisine}
              </p>
              <div className="mt-6 p-6 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground">
                  Don't miss trying authentic local dishes when you visit. Food is a key part of experiencing the culture!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-6">
            Ready to Explore {city.name}?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let our AI create a personalized itinerary tailored to your interests, budget, and travel style.
          </p>
          <Button
            size="lg"
            className="bg-coral hover:bg-coral-dark text-primary-foreground shadow-coral text-lg px-10 py-6"
            onClick={handlePlanTrip}
          >
            Start Planning Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CityInfo;
