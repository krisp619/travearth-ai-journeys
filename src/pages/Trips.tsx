import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { deleteTrip, duplicateTrip, listTrips } from "@/lib/trips";
import { getCurrentUser } from "@/lib/auth";
import type { Trip } from "@/types/trip";
import { Copy, Trash2 } from "lucide-react";

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  const user = getCurrentUser();
  const userId = user?.id;

  const refresh = () => setTrips(listTrips(userId));

  useEffect(() => {
    refresh();
  }, [userId]);

  const handleDuplicate = (id: string) => {
    if (!userId) return;
    const duplicated = duplicateTrip(id, userId);
    if (duplicated) {
      toast({ title: "Trip duplicated", description: duplicated.title });
      refresh();
    }
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Delete this trip? This action cannot be undone.");
    if (!confirmed) return;
    if (!userId) return;
    deleteTrip(id, userId);
    toast({ title: "Trip deleted" });
    refresh();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold">My Trips</h1>
              <p className="text-muted-foreground">Manage saved itineraries and continue planning.</p>
            </div>
            <Link to="/plan">
              <Button className="shadow-travel">Plan a new trip</Button>
            </Link>
          </div>

          {trips.length === 0 ? (
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>No trips yet</CardTitle>
                <CardDescription>Start by generating your first AI itinerary.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/plan">
                  <Button>Generate itinerary</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {trips.map((trip) => (
                <Card key={trip.id} className="shadow-travel">
                  <CardHeader>
                    <CardTitle className="text-xl">{trip.title}</CardTitle>
                    <CardDescription>
                      {trip.preferences.startDate} → {trip.preferences.endDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{trip.preferences.travelType}</Badge>
                      <Badge variant="outline">{trip.preferences.pace}</Badge>
                      <Badge variant={trip.status === "saved" ? "default" : "secondary"}>{trip.status}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/itinerary/${trip.id}`}>
                        <Button size="sm">Open</Button>
                      </Link>
                      <Button size="sm" variant="outline" onClick={() => handleDuplicate(trip.id)}>
                        <Copy className="h-4 w-4 mr-1" />
                        Duplicate
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(trip.id)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Last updated {new Date(trip.updatedAt).toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trips;
