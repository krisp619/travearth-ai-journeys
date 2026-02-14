import type { TripPreferences, Itinerary, ItineraryDay, BudgetBreakdown } from "@/types/trip";

const PROMPT_KEY = "travearth_prompt";

export const savePromptTemplate = (template: string) => {
  localStorage.setItem(PROMPT_KEY, template);
};

export const getPromptTemplate = () => {
  const stored = localStorage.getItem(PROMPT_KEY);
  return stored ?? defaultPromptTemplate;
};

export const buildStructuredPrompt = (preferences: TripPreferences) => {
  return getPromptTemplate()
    .replace("{{destination}}", preferences.destination)
    .replace("{{startDate}}", preferences.startDate)
    .replace("{{endDate}}", preferences.endDate)
    .replace("{{durationDays}}", preferences.durationDays.toString())
    .replace("{{budget}}", preferences.budget.toString())
    .replace("{{currency}}", preferences.currency)
    .replace("{{travelType}}", preferences.travelType)
    .replace("{{interests}}", preferences.interests.join(", "))
    .replace("{{pace}}", preferences.pace)
    .replace("{{notes}}", preferences.notes || "None");
};

const defaultPromptTemplate = `You are Travearth AI. Generate a structured travel itinerary in JSON.
Destination: {{destination}}
Start Date: {{startDate}}
End Date: {{endDate}}
Duration Days: {{durationDays}}
Total Budget: {{budget}} {{currency}}
Traveler Type: {{travelType}}
Interests: {{interests}}
Travel Pace: {{pace}}
Additional Notes: {{notes}}

Requirements:
- Provide day-wise itinerary with title, summary, activities (array), transport, food, tips (array), estimatedCost per day.
- Include a budget breakdown: lodging, food, transport, activities, misc, total, currency.
- Optimize costs to fit total budget and reduce unnecessary travel time.
- Output ONLY valid JSON with keys: days, budget.
`;

const activityPool = {
  nature: ["Sunrise walk", "Botanical gardens visit", "Coastal hike", "National park tour"],
  culture: ["Museum tour", "Local heritage walk", "Historic site visit", "Art gallery"],
  food: ["Street food crawl", "Local market tasting", "Cooking class", "Chef's table"],
  adventure: ["Kayaking", "Zipline adventure", "Scenic bike ride", "Snorkeling"],
  wellness: ["Yoga session", "Spa recharge", "Beach relaxation", "Mindful cafe break"],
  nightlife: ["Rooftop lounge", "Live music", "Night market", "City lights walk"],
  family: ["Theme park", "Aquarium", "Interactive museum", "Picnic in park"],
  shopping: ["Boutique stroll", "Local crafts", "Mall visit", "Souvenir hunt"],
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const estimateBudget = (preferences: TripPreferences): BudgetBreakdown => {
  const total = preferences.budget;
  const lodging = Math.round(total * 0.32);
  const food = Math.round(total * 0.22);
  const transport = Math.round(total * 0.2);
  const activities = Math.round(total * 0.2);
  const misc = total - lodging - food - transport - activities;

  return {
    lodging,
    food,
    transport,
    activities,
    misc,
    total,
    currency: preferences.currency,
  };
};

const createDay = (preferences: TripPreferences, day: number): ItineraryDay => {
  const interestKeys = preferences.interests.length
    ? preferences.interests.map((interest) => interest.toLowerCase())
    : ["culture", "food", "nature"];

  const selected = interestKeys.flatMap((key) => activityPool[key as keyof typeof activityPool] ?? []);
  const activities = selected.length
    ? [selected[day % selected.length], selected[(day + 2) % selected.length], selected[(day + 4) % selected.length]]
    : ["City highlights tour", "Local neighborhood walk", "Relaxed dinner"];

  const paceNote =
    preferences.pace === "fast"
      ? "Packed day with efficient transfers"
      : preferences.pace === "relaxed"
        ? "Slow-paced exploration with breaks"
        : "Balanced schedule with time for spontaneity";

  const estimatedCost = Math.round(preferences.budget / preferences.durationDays);

  return {
    day,
    title: `Day ${day}: Explore ${preferences.destination}`,
    summary: `${paceNote}. Focus on ${preferences.interests.join(", ") || "top highlights"}.`,
    activities,
    transport: "Mix of walk + local transit",
    food: "Local cafe breakfast, regional lunch, signature dinner",
    tips: ["Carry reusable water bottle", "Pre-book popular attractions"],
    estimatedCost,
  };
};

export const generateItinerary = async (preferences: TripPreferences): Promise<Itinerary> => {
  const _prompt = buildStructuredPrompt(preferences);
  void _prompt;
  await delay(900);
  const days = Array.from({ length: preferences.durationDays }, (_, index) => createDay(preferences, index + 1));
  return {
    days,
    budget: estimateBudget(preferences),
  };
};

export const regenerateDay = async (
  preferences: TripPreferences,
  dayIndex: number,
  notes?: string,
): Promise<ItineraryDay> => {
  const _prompt = buildStructuredPrompt(preferences);
  void _prompt;
  await delay(700);
  const dayNumber = dayIndex + 1;
  const base = createDay(preferences, dayNumber);
  if (notes) {
    base.summary = `${base.summary} Update requested: ${notes}`;
  }
  base.activities = base.activities.map((item) => `${item} (alt)`);
  return base;
};
