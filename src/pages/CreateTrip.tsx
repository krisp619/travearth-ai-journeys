import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createTrip } from "@/lib/trips";
import { getCurrentUser } from "@/lib/auth";
import type { Itinerary, TripPreferences, TravelType } from "@/types/trip";

const interests = ["Adventure", "Culture", "Food", "Nature"];
const budgetMap: Record<string, number> = {
  low: 1000,
  medium: 2500,
  luxury: 6000,
};

const buildItinerary = (days: number, currency: string, budget: number): Itinerary => {
  const perDay = Math.max(1, Math.round(budget / Math.max(days, 1)));
  return {
    days: Array.from({ length: days }).map((_, index) => ({
      day: index + 1,
      title: `Day ${index + 1}`,
      summary: "Planned activities based on your preferences.",
      activities: ["Explore top attractions", "Local food experience"],
      transport: "Local transport",
      food: "Local cuisine",
      tips: ["Start early", "Keep some buffer time"],
      estimatedCost: perDay,
    })),
    budget: {
      lodging: Math.round(budget * 0.4),
      food: Math.round(budget * 0.2),
      transport: Math.round(budget * 0.15),
      activities: Math.round(budget * 0.2),
      misc: Math.round(budget * 0.05),
      total: budget,
      currency,
    },
  };
};

const CreateTrip = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("Bali, Indonesia");
  const [numberOfDays, setNumberOfDays] = useState(5);
  const [budgetTier, setBudgetTier] = useState("medium");
  const [travelType, setTravelType] = useState<TravelType>("solo");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Culture", "Food"]);

  const toggleInterest = (value: string) => {
    setSelectedInterests((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const days = Math.max(1, Number(numberOfDays) || 1);
    const budget = budgetMap[budgetTier] ?? budgetMap.medium;
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days - 1);

    const preferences: TripPreferences = {
      destination: destination.trim() || "Trip",
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      durationDays: days,
      budget,
      currency: "USD",
      travelType,
      interests: selectedInterests,
      pace: "balanced",
      notes: "",
    };

    const itinerary = buildItinerary(days, preferences.currency, budget);
    const user = getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }
    createTrip(preferences, itinerary, user.id);
    navigate("/my-trips");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-[600px] rounded-2xl shadow-travel">
        <CardHeader className="text-center">
          <div className="flex justify-start">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <CardTitle>Create your trip</CardTitle>
          <CardDescription>Share the basics and let Travearth build your itinerary.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <Input
                placeholder="Bali, Indonesia"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Number of days</label>
              <Input
                type="number"
                min={1}
                placeholder="5"
                value={numberOfDays}
                onChange={(event) => setNumberOfDays(Number(event.target.value) || 1)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Budget</label>
              <Select value={budgetTier} onValueChange={setBudgetTier}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Travel type</label>
              <RadioGroup value={travelType} onValueChange={(value) => setTravelType(value as TravelType)} className="grid grid-cols-2 gap-3">
                {["solo", "couple", "family", "group"].map((type) => (
                  <label key={type} className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2">
                    <RadioGroupItem value={type} />
                    <span className="text-sm capitalize">{type}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Interests</label>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((item) => (
                  <label key={item} className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2">
                    <Checkbox checked={selectedInterests.includes(item)} onCheckedChange={() => toggleInterest(item)} />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full shadow-travel" size="lg">
              Generate Itinerary
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTrip;
