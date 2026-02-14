import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardRedirect from "@/components/DashboardRedirect";

const Index = lazy(() => import("./pages/Index"));
const PlanTrip = lazy(() => import("./pages/PlanTrip"));
const Itinerary = lazy(() => import("./pages/Itinerary"));
const Trips = lazy(() => import("./pages/Trips"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminDestinations = lazy(() => import("./pages/admin/Destinations"));
const AdminAISettings = lazy(() => import("./pages/admin/AISettings"));
const AdminFeedback = lazy(() => import("./pages/admin/Feedback"));
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));
const CreateTrip = lazy(() => import("./pages/CreateTrip"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const PopularDestinations = lazy(() => import("./pages/PopularDestinations"));
const TravelTips = lazy(() => import("./pages/TravelTips"));
const BudgetPlanning = lazy(() => import("./pages/BudgetPlanning"));
const Blog = lazy(() => import("./pages/Blog"));
const CityInfo = lazy(() => import("./pages/CityInfo"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PartnerDashboard = lazy(() => import("./pages/PartnerDashboard"));

const queryClient = new QueryClient();

const routeFallback = (
  <div className="p-6 text-sm text-muted-foreground">Loading…</div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={routeFallback}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/plan"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "partner"]}>
                <PlanTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-trip"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "partner"]}>
                <CreateTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/itinerary/:id"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "partner", "guest"]}>
                <Itinerary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "partner"]}>
                <Trips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-trips"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "partner"]}>
                <Trips />
              </ProtectedRoute>
            }
          />

          <Route
            path="/about-us"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "partner"]}>
                <AboutUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "partner"]}>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/how-it-works"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "partner"]}>
                <HowItWorks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/popular-destinations"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "partner"]}>
                <PopularDestinations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/travel-tips"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "partner"]}>
                <TravelTips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budget-planning"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "partner"]}>
                <BudgetPlanning />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog"
            element={
              <ProtectedRoute allowedRoles={["user", "admin", "partner"]}>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route path="/city/:cityName" element={<CityInfo />} />

          <Route path="/auth" element={<Auth />} />
          <Route path="/login" element={<Auth />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/destinations"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDestinations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ai-settings"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminAISettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/feedback"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminAnalytics />
              </ProtectedRoute>
            }
          />

          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/dashboard/*" element={<DashboardRedirect />} />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Trips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/partner"
            element={
              <ProtectedRoute allowedRoles={["partner"]}>
                <PartnerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Trips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partner"
            element={
              <ProtectedRoute allowedRoles={["partner"]}>
                <PartnerDashboard />
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
