import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { regenerateDay, generateItinerary } from "@/lib/ai";
import { getTrip, updateTrip, updateDay } from "@/lib/trips";
import { getCurrentUser } from "@/lib/auth";
import type { ItineraryDay, Trip } from "@/types/trip";
import { Loader2, RefreshCcw, Save } from "lucide-react";

const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat("en", { style: "currency", currency }).format(value);

const Itinerary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const userId = user?.id;
  const isGuest = user?.role === "guest";

  const [trip, setTrip] = useState<Trip | null>(() => (id && userId ? getTrip(id, userId) : null));
  const [loadingDay, setLoadingDay] = useState<number | null>(null);
  const [loadingAll, setLoadingAll] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!userId) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Sign in required</CardTitle>
                <CardDescription>Please log in or continue as guest to view your itinerary.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate("/login")}>Go to login</Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const budget = useMemo(() => trip?.itinerary.budget, [trip]);

  if (!trip) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Itinerary not found</CardTitle>
                <CardDescription>Please return to your trips list.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate("/my-trips")}>Go to My Trips</Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleActivitiesChange = (index: number, value: string) => {
    if (isGuest) {
      toast({ title: "Sign in required", description: "Guests cannot edit itineraries." });
      return;
    }
    const activities = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const updatedDay: ItineraryDay = {
      ...trip.itinerary.days[index],
      activities,
    };
    const updatedTrip = {
      ...trip,
      itinerary: {
        ...trip.itinerary,
        days: trip.itinerary.days.map((day, dayIndex) => (dayIndex === index ? updatedDay : day)),
      },
    };
    setTrip(updatedTrip);
  };

  const handleRegenerateDay = async (index: number) => {
    if (isGuest) {
      toast({ title: "Sign in required", description: "Guests cannot regenerate itineraries." });
      return;
    }
    try {
      setLoadingDay(index);
      const newDay = await regenerateDay(trip.preferences, index);
      const updatedTrip = updateDay(trip, index, newDay, userId);
      setTrip(updatedTrip);
      toast({ title: "Day updated", description: "AI regenerated this day." });
    } catch {
      toast({ title: "Unable to regenerate", description: "Please try again." });
    } finally {
      setLoadingDay(null);
    }
  };

  const handleRegenerateAll = async () => {
    if (isGuest) {
      toast({ title: "Sign in required", description: "Guests cannot regenerate itineraries." });
      return;
    }
    try {
      setLoadingAll(true);
      const itinerary = await generateItinerary(trip.preferences);
      const updated = updateTrip({ ...trip, itinerary }, userId);
      setTrip(updated);
      toast({ title: "Itinerary refreshed", description: "All days were regenerated." });
    } catch {
      toast({ title: "Regeneration failed", description: "Please try again." });
    } finally {
      setLoadingAll(false);
    }
  };

  const handleSave = () => {
    if (isGuest) {
      toast({ title: "Sign in required", description: "Create an account to save trips." });
      return;
    }
    setSaving(true);
    const updated = updateTrip({ ...trip, status: "saved" }, userId);
    setTrip(updated);
    toast({ title: "Trip saved", description: "You can access it in My Trips." });
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold">{trip.title}</h1>
              <p className="text-muted-foreground">
                {trip.preferences.startDate} → {trip.preferences.endDate} · {trip.preferences.travelType} · {trip.preferences.pace}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleRegenerateAll} disabled={loadingAll}>
                {loadingAll ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Regenerating
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <RefreshCcw className="h-4 w-4" />
                    Regenerate all
                  </span>
                )}
              </Button>
              <Button onClick={handleSave} disabled={saving} className="shadow-travel">
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {saving ? "Saving" : "Save itinerary"}
                </span>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Budget summary</CardTitle>
              <CardDescription>Optimized for your total budget.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <p className="text-xs text-muted-foreground">Lodging</p>
                <p className="text-lg font-semibold">{formatCurrency(budget?.lodging ?? 0, budget?.currency ?? "USD")}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Food</p>
                <p className="text-lg font-semibold">{formatCurrency(budget?.food ?? 0, budget?.currency ?? "USD")}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Transport</p>
                <p className="text-lg font-semibold">{formatCurrency(budget?.transport ?? 0, budget?.currency ?? "USD")}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Activities</p>
                <p className="text-lg font-semibold">{formatCurrency(budget?.activities ?? 0, budget?.currency ?? "USD")}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-lg font-semibold">{formatCurrency(budget?.total ?? 0, budget?.currency ?? "USD")}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {trip.itinerary.days.map((day, index) => (
              <Card key={day.day} className="shadow-travel">
                <CardHeader className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle>{day.title}</CardTitle>
                      <CardDescription>{day.summary}</CardDescription>
                    </div>
                    <Badge variant="outline">Day {day.day}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Transport</p>
                      <p className="text-sm font-medium">{day.transport}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Food</p>
                      <p className="text-sm font-medium">{day.food}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Estimated cost</p>
                      <p className="text-sm font-medium">
                        {formatCurrency(day.estimatedCost, trip.preferences.currency)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Activities (editable)</p>
                    <Textarea
                      value={day.activities.join("\n")}
                      onChange={(event) => handleActivitiesChange(index, event.target.value)}
                      rows={4}
                      disabled={isGuest}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {day.tips.map((tip, tipIndex) => (
                      <Badge key={`${day.day}-tip-${tipIndex}`} variant="secondary">
                        {tip}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => handleRegenerateDay(index)}
                      disabled={loadingDay === index || isGuest}
                    >
                      {loadingDay === index ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Regenerating
                        </span>
                      ) : (
                        "Regenerate day"
                      )}
                    </Button>
                    <Link to="/my-trips" className="text-sm text-primary hover:underline">
                      View all trips
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Itinerary;
