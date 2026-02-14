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
          <Route path="/plan" element={<PlanTrip />} />
          <Route
            path="/create-trip"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <CreateTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="/itinerary/:id"
            element={
              <ProtectedRoute allowedRoles={["user", "guest"]}>
                <Itinerary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trips"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Trips />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-trips"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Trips />
              </ProtectedRoute>
            }
          />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/popular-destinations" element={<PopularDestinations />} />
          <Route path="/travel-tips" element={<TravelTips />} />
          <Route path="/budget-planning" element={<BudgetPlanning />} />
          <Route path="/blog" element={<Blog />} />

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
