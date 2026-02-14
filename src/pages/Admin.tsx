import { useMemo } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

const Admin = () => {
  const user = getCurrentUser();

  const stats = useMemo(
    () => [
      { label: "Active users", value: "1,248" },
      { label: "Trips generated", value: "4,920" },
      { label: "Monthly revenue", value: "$12.4k" },
      { label: "Conversion", value: "6.4%" },
    ],
    [],
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-display font-bold">Overview</h2>
            <p className="text-muted-foreground">Welcome to the admin dashboard.</p>
          </div>
          {user?.role !== "admin" && (
            <Badge variant="secondary">Limited access · sign in with admin email</Badge>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <Button asChild>
              <Link to="/admin/users">Manage Users</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/destinations">Edit Destinations</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/ai-settings">Configure AI</Link>
            </Button>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">New user registered</p>
                <p className="text-muted-foreground">2 minutes ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Trip generated for Paris</p>
                <p className="text-muted-foreground">12 minutes ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Feedback submitted</p>
                <p className="text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-3">System Health</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Status</span>
                <Badge variant="default">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="default">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Service</span>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
