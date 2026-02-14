import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Plus, Trash2, Star } from "lucide-react";

interface Destination {
  id: string;
  name: string;
  country: string;
  featured: boolean;
  tripCount: number;
}

const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([
    { id: "d1", name: "Paris", country: "France", featured: true, tripCount: 452 },
    { id: "d2", name: "Bali", country: "Indonesia", featured: true, tripCount: 389 },
    { id: "d3", name: "New York", country: "USA", featured: true, tripCount: 567 },
    { id: "d4", name: "Kyoto", country: "Japan", featured: true, tripCount: 298 },
    { id: "d5", name: "Dubai", country: "UAE", featured: false, tripCount: 234 },
    { id: "d6", name: "Rome", country: "Italy", featured: false, tripCount: 312 },
  ]);
  const [newDestination, setNewDestination] = useState("");
  const [newCountry, setNewCountry] = useState("");

  const addDestination = () => {
    if (!newDestination.trim() || !newCountry.trim()) {
      toast({ title: "Error", description: "Please enter both destination and country", variant: "destructive" });
      return;
    }
    const newDest: Destination = {
      id: `d${Date.now()}`,
      name: newDestination.trim(),
      country: newCountry.trim(),
      featured: false,
      tripCount: 0,
    };
    setDestinations((prev) => [newDest, ...prev]);
    setNewDestination("");
    setNewCountry("");
    toast({ title: "Success", description: "Destination added successfully" });
  };

  const toggleFeatured = (id: string) => {
    setDestinations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, featured: !item.featured } : item))
    );
  };

  const removeDestination = (id: string) => {
    setDestinations((prev) => prev.filter((item) => item.id !== id));
    toast({ title: "Removed", description: "Destination removed successfully" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-bold">Destination Management</h2>
        <p className="text-muted-foreground">Manage and prioritize travel destinations on the platform.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Destinations</CardDescription>
            <CardTitle className="text-3xl">{destinations.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Featured</CardDescription>
            <CardTitle className="text-3xl">{destinations.filter(d => d.featured).length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Trips</CardDescription>
            <CardTitle className="text-3xl">{destinations.reduce((sum, d) => sum + d.tripCount, 0)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Destination</CardTitle>
          <CardDescription>Add destinations to the platform's database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Destination name"
              value={newDestination}
              onChange={(e) => setNewDestination(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Country"
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              className="flex-1"
            />
            <Button onClick={addDestination} className="sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Destinations</CardTitle>
          <CardDescription>Manage visibility and priority of destinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <div className="grid grid-cols-5 gap-4 p-3 bg-muted/50 border-b font-medium text-sm">
              <div className="col-span-2">Destination</div>
              <div>Trips Created</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {destinations.map((dest) => (
              <div key={dest.id} className="grid grid-cols-5 gap-4 p-3 border-b last:border-b-0 items-center hover:bg-muted/30 transition-colors">
                <div className="col-span-2">
                  <p className="font-medium">{dest.name}</p>
                  <p className="text-xs text-muted-foreground">{dest.country}</p>
                </div>
                <div className="text-sm">{dest.tripCount}</div>
                <div>
                  {dest.featured ? (
                    <Badge className="bg-gold text-navy">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  ) : (
                    <Badge variant="outline">Regular</Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleFeatured(dest.id)}
                  >
                    {dest.featured ? "Unfeature" : "Feature"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeDestination(dest.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Destinations;
