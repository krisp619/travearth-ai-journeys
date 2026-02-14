import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { getCurrentUser } from "@/lib/auth";
import { getPromptTemplate, savePromptTemplate } from "@/lib/ai";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Settings,
  MessageSquare,
  BarChart3,
  Home,
} from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: "active" | "blocked";
}

const Admin = () => {
  const user = getCurrentUser();
  const location = useLocation();
  const [destinations, setDestinations] = useState(["Paris", "Bali", "New York", "Kyoto"]);
  const [newDestination, setNewDestination] = useState("");
  const [promptTemplate, setPromptTemplate] = useState(getPromptTemplate());
  const [users, setUsers] = useState<AdminUser[]>([
    { id: "u1", name: "Alex", email: "alex@travel.com", status: "active" },
    { id: "u2", name: "Jordan", email: "jordan@travel.com", status: "blocked" },
    { id: "u3", name: "Samira", email: "samira@travel.com", status: "active" },
  ]);

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
    { title: "Users", icon: Users, url: "#users" },
    { title: "Destinations", icon: MapPin, url: "#destinations" },
    { title: "AI Settings", icon: Settings, url: "#ai-settings" },
    { title: "Feedback", icon: MessageSquare, url: "#feedback" },
    { title: "Analytics", icon: BarChart3, url: "#analytics" },
  ];

  const stats = useMemo(
    () => [
      { label: "Active users", value: "1,248" },
      { label: "Trips generated", value: "4,920" },
      { label: "Monthly revenue", value: "$12.4k" },
      { label: "Conversion", value: "6.4%" },
    ],
    [],
  );

  const toggleUser = (id: string) => {
    setUsers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: item.status === "active" ? "blocked" : "active" } : item)),
    );
  };

  const addDestination = () => {
    if (!newDestination.trim()) return;
    setDestinations((prev) => [newDestination.trim(), ...prev]);
    setNewDestination("");
    toast({ title: "Destination added" });
  };

  const savePrompt = () => {
    savePromptTemplate(promptTemplate);
    toast({ title: "Prompt updated", description: "AI template saved for future requests." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SidebarProvider>
        <div className="flex w-full pt-16">
          <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border p-4">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                <span className="font-semibold">Admin Panel</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-sidebar-border p-4">
              <div className="text-xs text-muted-foreground">
                Logged in as {user?.name}
              </div>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 overflow-auto">
            <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-14 items-center gap-4 px-4">
                <SidebarTrigger />
                <h1 className="text-lg font-semibold">Admin Panel</h1>
              </div>
            </div>
            <div className="p-6 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-display font-bold">Overview</h2>
                  <p className="text-muted-foreground">Manage Travearth operations and AI settings.</p>
                </div>
                {user?.role !== "admin" && (
                  <Badge variant="secondary">Limited access · sign in with admin email</Badge>
                )}
              </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardHeader>
                  <CardDescription>{stat.label}</CardDescription>
                  <CardTitle>{stat.value}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2" id="users">
            <Card className="shadow-travel">
              <CardHeader>
                <CardTitle>User management</CardTitle>
                <CardDescription>View and block/unblock users.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {users.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b border-border/50 pb-3">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.email}</p>
                    </div>
                    <Button size="sm" variant={item.status === "active" ? "outline" : "default"} onClick={() => toggleUser(item.id)}>
                      {item.status === "active" ? "Block" : "Unblock"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-travel" id="destinations">
              <CardHeader>
                <CardTitle>Destination management</CardTitle>
                <CardDescription>Prioritize destinations and content.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newDestination}
                    onChange={(event) => setNewDestination(event.target.value)}
                    placeholder="Add destination"
                  />
                  <Button onClick={addDestination}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {destinations.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2" id="ai-settings">
            <Card className="shadow-travel">
              <CardHeader>
                <CardTitle>AI prompt tuning</CardTitle>
                <CardDescription>Adjust structured prompts used by the itinerary generator.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={promptTemplate}
                  onChange={(event) => setPromptTemplate(event.target.value)}
                  rows={10}
                />
                <Button onClick={savePrompt}>Save prompt template</Button>
              </CardContent>
            </Card>

            <Card className="shadow-travel" id="feedback">
              <CardHeader>
                <CardTitle>Feedback & analytics</CardTitle>
                <CardDescription>Snapshot of recent insights.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm">Average rating</p>
                  <Badge>4.6 / 5</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Top request</p>
                  <Badge variant="outline">Food experiences</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Avg response time</p>
                  <Badge variant="secondary">8.4s</Badge>
                </div>
                <Button variant="outline">Download report</Button>
              </CardContent>
            </Card>
          </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
      <Footer />
    </div>
  );
};

export default Admin;
