

# 🌍 Travearth — AI Travel Itinerary Platform

A modern, travel-inspired web app that generates personalized day-wise itineraries using AI. Built with a vibrant, immersive design and a mobile-first approach.

---

## Phase 1: Foundation & Authentication

### 1.1 — Design System & Layout
- Vibrant, travel-inspired color palette with gradients (teal, coral, warm gold accents)
- Global layout with responsive navbar (logo, navigation links, auth buttons)
- Mobile-first responsive design with hamburger menu
- Light mode (dark mode can be added later)
- Beautiful landing/hero page with travel imagery, tagline, and CTA to start planning

### 1.2 — Authentication (Email + Google + Guest)
- Sign up / Log in pages with email & password
- Google OAuth login
- Guest access mode — users can try the generator without signing up (limited: no save/share)
- User profile page showing preferences, saved trips, and travel history

---

## Phase 2: AI-Powered Trip Creation (Core Feature)

### 2.1 — Trip Input Form
- Multi-step or single-page form collecting:
  - Destination(s)
  - Trip duration (number of days)
  - Total budget (INR)
  - Travel type (solo / couple / family / group)
  - Companions (friends / partner / family / colleagues)
  - Interests (adventure / culture / food / luxury / nature — multi-select)
  - Travel pace (relaxed / balanced / fast)
- Clean, visual UI with icons and cards for selections

### 2.2 — AI Itinerary Generation
- Powered by **Lovable AI** (Gemini model via edge function)
- Generates a **complete day-wise itinerary** including:
  - Morning / Afternoon / Evening activities per day
  - Place names with brief descriptions
  - Best visiting hours
  - Estimated travel time between locations
  - Logical routing to avoid backtracking
  - Budget breakdown per day
- Personalized based on user interests, pace, and budget
- Loading state with travel-themed animation during generation (~5-10 seconds)

### 2.3 — Itinerary Display
- Beautiful **timeline-style view** showing each day as a card
- Each time slot (morning/afternoon/evening) clearly separated
- Place names, descriptions, timings, and travel times displayed
- Budget summary per day and total
- Expandable sections for more detail

---

## Phase 3: Itinerary Customization & Extras

### 3.1 — Editable Itinerary
- Users can edit individual days and activities
- Replace places with AI-suggested alternatives
- Add custom activities or notes
- If budget, interests, or duration changes — only affected sections regenerate

### 3.2 — Accommodation Suggestions
- AI-generated suggestions for Budget / Mid-range / Luxury stays
- Location-based reasoning (near key attractions)
- Displayed as cards with estimated price ranges

### 3.3 — Transport Suggestions
- Local transport options for each destination
- Intercity transport if multi-city trip
- Estimated costs displayed

### 3.4 — Food & Experiences
- Local dish recommendations
- Café and restaurant suggestions
- Cultural activities and unique experiences

---

## Phase 4: Trip Management & Sharing

### 4.1 — Trip Management
- Save itineraries to user profile (requires login)
- View all saved trips in a dashboard
- Duplicate a trip to create variations
- Delete trips

### 4.2 — Sharing & Export
- Share itinerary via a public link
- Download itinerary as PDF
- Email itinerary to self or others

### 4.3 — Notifications (Basic)
- Toast notifications for trip actions (saved, shared, etc.)
- Trip reminder concept (UI placeholder for future push notifications)

---

## Phase 5: Admin Panel (Basic)

### 5.1 — Admin Dashboard
- Protected admin route (role-based access)
- Overview stats: total users, trips generated, popular destinations
- Simple charts for key metrics

### 5.2 — User Management
- View registered users list
- Block / unblock users

### 5.3 — Content & AI Management
- View and manage destination data
- View AI generation logs and user feedback
- Basic AI prompt tuning interface

---

## Pages Summary

| Page | Description |
|------|-------------|
| **Landing** | Hero section, features overview, CTA |
| **Login / Signup** | Email + Google auth |
| **Trip Creator** | Input form for trip preferences |
| **Itinerary View** | AI-generated timeline with full details |
| **My Trips** | Dashboard of saved itineraries |
| **Profile** | User preferences and travel history |
| **Share View** | Public read-only itinerary page |
| **Admin Dashboard** | Stats, user management, content controls |

---

## Backend (Lovable Cloud + Supabase)

- **Database tables**: users, trips, itineraries, destinations, feedback
- **Edge functions**: AI itinerary generation (streaming), PDF export, email sharing
- **Auth**: Supabase Auth with email + Google provider
- **Row Level Security**: Users can only access their own trips
- **Storage**: For any uploaded images or PDF exports

---

## What's Included vs. Future Scope

| ✅ Included in MVP | 🔮 Future Scope |
|---------------------|-----------------|
| AI itinerary generation | Real-time hotel/flight booking |
| Email + Google auth | Mobile OTP login |
| Guest access | Native mobile apps (Flutter/RN) |
| Trip save/edit/delete | Drag-drop itinerary editing |
| Share via link | Group collaboration |
| PDF download | AI chat assistant |
| Basic admin panel | Partner dashboards |
| Accommodation/transport/food suggestions | Offline access |
| Budget optimization | Visa & document checklist |
| | Expense tracking |
| | Payment gateway & subscriptions |

