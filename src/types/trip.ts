export type TravelType = "solo" | "couple" | "family" | "group";
export type TravelPace = "relaxed" | "balanced" | "fast";

export interface TripPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  budget: number;
  currency: string;
  travelType: TravelType;
  interests: string[];
  pace: TravelPace;
  notes?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  summary: string;
  activities: string[];
  transport: string;
  food: string;
  tips: string[];
  estimatedCost: number;
}

export interface BudgetBreakdown {
  lodging: number;
  food: number;
  transport: number;
  activities: number;
  misc: number;
  total: number;
  currency: string;
}

export interface Itinerary {
  days: ItineraryDay[];
  budget: BudgetBreakdown;
}

export interface Trip {
  id: string;
  title: string;
  status: "draft" | "saved";
  preferences: TripPreferences;
  itinerary: Itinerary;
  createdAt: string;
  updatedAt: string;
  userId?: string;
}
