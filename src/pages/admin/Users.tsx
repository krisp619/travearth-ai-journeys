import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download } from "lucide-react";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: "active" | "blocked";
  role: string;
  joinedDate: string;
  tripsCreated: number;
}

const Users = () => {
  const [users, setUsers] = useState<AdminUser[]>([
    { id: "u1", name: "Alex", email: "alex@travel.com", status: "active", role: "user", joinedDate: "2025-12-15", tripsCreated: 12 },
    { id: "u2", name: "Jordan", email: "jordan@travel.com", status: "blocked", role: "user", joinedDate: "2025-11-20", tripsCreated: 5 },
    { id: "u3", name: "Samira", email: "samira@travel.com", status: "active", role: "user", joinedDate: "2026-01-05", tripsCreated: 8 },
    { id: "u4", name: "Michael", email: "michael@travel.com", status: "active", role: "partner", joinedDate: "2025-10-10", tripsCreated: 25 },
    { id: "u5", name: "Emma", email: "emma@travel.com", status: "active", role: "user", joinedDate: "2026-01-18", tripsCreated: 3 },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleUser = (id: string) => {
    setUsers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: item.status === "active" ? "blocked" : "active" } : item)),
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-bold">User Management</h2>
        <p className="text-muted-foreground">View, manage, and monitor all users on the platform.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">1,248</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Users</CardDescription>
            <CardTitle className="text-3xl">1,186</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Blocked Users</CardDescription>
            <CardTitle className="text-3xl">62</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="border rounded-lg">
            <div className="grid grid-cols-6 gap-4 p-3 bg-muted/50 border-b font-medium text-sm">
              <div className="col-span-2">User</div>
              <div>Role</div>
              <div>Joined</div>
              <div>Trips</div>
              <div>Actions</div>
            </div>
            {filteredUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-6 gap-4 p-3 border-b last:border-b-0 items-center hover:bg-muted/30 transition-colors">
                <div className="col-span-2">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div>
                  <Badge variant="outline">{user.role}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">{user.joinedDate}</div>
                <div className="text-sm">{user.tripsCreated}</div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={user.status === "active" ? "outline" : "default"}
                    onClick={() => toggleUser(user.id)}
                  >
                    {user.status === "active" ? "Block" : "Unblock"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
