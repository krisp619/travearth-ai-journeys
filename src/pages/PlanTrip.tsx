import { useMemo, useState, useEffect, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { generateItinerary } from "@/lib/ai";
import { createTrip } from "@/lib/trips";
import { getCurrentUser } from "@/lib/auth";
import type { TripPreferences, TravelPace, TravelType } from "@/types/trip";
import { Loader2 } from "lucide-react";

const interestsOptions = [
  "Nature",
  "Culture",
  "Food",
  "Adventure",
  "Wellness",
  "Nightlife",
  "Family",
  "Shopping",
];

const computeDuration = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.max(0, end.getTime() - start.getTime());
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1);
};

const PlanTrip = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cityFromQuery = searchParams.get("city");

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState(2400);
  const [currency, setCurrency] = useState("USD");
  const [travelType, setTravelType] = useState<TravelType>("solo");
  const [pace, setPace] = useState<TravelPace>("balanced");
  const [interests, setInterests] = useState<string[]>(["Culture", "Food"]);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 PREFILL DESTINATION
  useEffect(() => {
    if (cityFromQuery) {
      setDestination(cityFromQuery);
    }
  }, [cityFromQuery]);

  const durationDays = useMemo(
    () => computeDuration(startDate, endDate),
    [startDate, endDate]
  );

  const toggleInterest = (label: string) => {
    setInterests((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const user = getCurrentUser();
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please log in or continue as guest to generate an itinerary.",
      });
      navigate("/login");
      return;
    }

    if (!destination.trim()) {
      toast({
        title: "Destination required",
        description: "Please add a destination.",
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Select dates",
        description: "Choose start and end dates.",
      });
      return;
    }

    const preferences: TripPreferences = {
      destination: destination.trim(),
      startDate,
      endDate,
      durationDays,
      budget,
      currency,
      travelType,
      interests,
      pace,
      notes,
    };

    try {
      setLoading(true);
      const itinerary = await generateItinerary(preferences);
      const trip = createTrip(preferences, itinerary, user.id);
      navigate(`/itinerary/${trip.id}`);
    } catch {
      toast({
        title: "Generation failed",
        description: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-travel">
              <CardHeader>
                <CardTitle>Plan your trip</CardTitle>
                <CardDescription>
                  Share your preferences and generate an AI itinerary.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Destination</label>
                    <Input
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Tokyo, Japan"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start date</label>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End date</label>
                      <Input
                        type="date"
                        min={startDate || undefined}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-card/50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-foreground">Trip length</div>
                        <div className="text-sm text-muted-foreground">{durationDays} day{durationDays === 1 ? "" : "s"}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {startDate && endDate ? `${startDate} → ${endDate}` : "Pick your dates"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <label className="text-sm font-medium">Budget</label>
                      <div className="text-sm text-muted-foreground">
                        {currency} {budget.toLocaleString()}
                      </div>
                    </div>
                    <Slider
                      value={[budget]}
                      min={300}
                      max={20000}
                      step={100}
                      onValueChange={(value) => setBudget(value[0] ?? 2400)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Currency</label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="INR">INR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                          <SelectItem value="AED">AED</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Travel type</label>
                      <Select value={travelType} onValueChange={(value) => setTravelType(value as TravelType)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solo">Solo</SelectItem>
                          <SelectItem value="couple">Couple</SelectItem>
                          <SelectItem value="family">Family</SelectItem>
                          <SelectItem value="group">Group</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Pace</label>
                      <Select value={pace} onValueChange={(value) => setPace(value as TravelPace)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relaxed">Relaxed</SelectItem>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="fast">Fast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Interests</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {interestsOptions.map((label) => {
                        const checked = interests.includes(label);
                        return (
                          <label
                            key={label}
                            className="flex items-center gap-2 rounded-lg border border-border/60 bg-background px-3 py-2 text-sm cursor-pointer hover:bg-secondary/50 transition-colors"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={() => toggleInterest(label)}
                            />
                            <span className="text-foreground">{label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes (optional)</label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Anything specific? e.g. vegetarian food, avoid long hikes, must-see museums, kid-friendly activities..."
                    />
                  </div>

                  <Button type="submit" disabled={loading || !destination.trim() || !startDate || !endDate}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating...
                      </span>
                    ) : (
                      "Generate itinerary"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlanTrip;
