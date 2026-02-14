import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
import { getCurrentUser } from "@/lib/auth";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const user = getCurrentUser();

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
    { title: "Users", icon: Users, url: "/admin/users" },
    { title: "Destinations", icon: MapPin, url: "/admin/destinations" },
    { title: "AI Settings", icon: Settings, url: "/admin/ai-settings" },
    { title: "Feedback", icon: MessageSquare, url: "/admin/feedback" },
    { title: "Analytics", icon: BarChart3, url: "/admin/analytics" },
  ];

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
                        <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                          <Link to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
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
              </div>
            </div>
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
      <Footer />
    </div>
  );
};

export default AdminLayout;
