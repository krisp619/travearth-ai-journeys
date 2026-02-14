"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const interests = ["Adventure", "Culture", "Food", "Nature"];

export default function CreateTripPage() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [budget, setBudget] = useState("medium");
  const [travelType, setTravelType] = useState("solo");
  const [selectedInterests, setSelectedInterests] = useState(["Culture", "Food"]);

  const toggleInterest = (value) => {
    setSelectedInterests((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formValues = {
      destination,
      numberOfDays,
      budget,
      travelType,
      interests: selectedInterests,
    };

    void formValues;

    router.push("/itinerary");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-[600px] rounded-2xl shadow-travel">
        <CardHeader className="text-center">
          <CardTitle>Create your trip</CardTitle>
          <CardDescription>Share the basics and let Travearth build your itinerary.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <Input
                name="destination"
                placeholder="Bali, Indonesia"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Number of days</label>
              <Input
                name="numberOfDays"
                type="number"
                min={1}
                placeholder="5"
                value={numberOfDays}
                onChange={(e) => setNumberOfDays(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Budget</label>
              <Select value={budget} onValueChange={setBudget}>
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
              <RadioGroup value={travelType} onValueChange={setTravelType} className="grid grid-cols-2 gap-3">
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
                    <Checkbox
                      checked={selectedInterests.includes(item)}
                      onCheckedChange={() => toggleInterest(item)}
                    />
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
}
