import type { Trip, TripPreferences, Itinerary, ItineraryDay } from "@/types/trip";

const TRIPS_KEY = "travearth_trips";

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `trip_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const loadTrips = (): Trip[] => {
  const raw = localStorage.getItem(TRIPS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Trip[];
  } catch {
    return [];
  }
};

const saveTrips = (trips: Trip[]) => {
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
};

export const listTrips = (userId?: string) => {
  if (!userId) return [];
  return loadTrips()
    .filter((trip) => trip.userId === userId)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
};

export const getTrip = (id: string, userId?: string) => {
  if (!userId) return null;
  return loadTrips().find((trip) => trip.id === id && trip.userId === userId) ?? null;
};

export const createTrip = (preferences: TripPreferences, itinerary: Itinerary, userId: string) => {
  if (!userId) {
    throw new Error("User required to create a trip");
  }
  const now = new Date().toISOString();
  const title = `${preferences.destination} · ${preferences.durationDays} Days`;
  const trip: Trip = {
    id: createId(),
    title,
    status: "draft",
    preferences,
    itinerary,
    createdAt: now,
    updatedAt: now,
    userId,
  };
  const trips = loadTrips();
  trips.unshift(trip);
  saveTrips(trips);
  return trip;
};

export const updateTrip = (trip: Trip, userId: string) => {
  if (!userId || trip.userId !== userId) {
    throw new Error("Not authorized to update this trip");
  }
  const trips = loadTrips();
  const index = trips.findIndex((item) => item.id === trip.id);
  const nextTrip: Trip = {
    ...trip,
    updatedAt: new Date().toISOString(),
  };
  if (index >= 0) {
    trips[index] = nextTrip;
  } else {
    trips.unshift(nextTrip);
  }
  saveTrips(trips);
  return nextTrip;
};

export const deleteTrip = (id: string, userId: string) => {
  if (!userId) {
    throw new Error("User required to delete a trip");
  }
  const trips = loadTrips().filter((trip) => !(trip.id === id && trip.userId === userId));
  saveTrips(trips);
};

export const duplicateTrip = (id: string, userId: string) => {
  const trip = getTrip(id, userId);
  if (!trip) return null;
  const duplicated: Trip = {
    ...trip,
    id: createId(),
    title: `${trip.title} (Copy)`,
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const trips = loadTrips();
  trips.unshift(duplicated);
  saveTrips(trips);
  return duplicated;
};

export const updateDay = (trip: Trip, dayIndex: number, day: ItineraryDay, userId: string) => {
  const next: Trip = {
    ...trip,
    itinerary: {
      ...trip.itinerary,
      days: trip.itinerary.days.map((item, index) => (index === dayIndex ? day : item)),
    },
  };
  return updateTrip(next, userId);
};
