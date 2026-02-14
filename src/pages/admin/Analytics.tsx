import AdminLayout from "@/components/AdminLayout";import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Users, MapPin, DollarSign, Clock } from "lucide-react";

const Analytics = () => {
  const metrics = [
    { label: "Active Users", value: "1,248", change: "+12.5%", trend: "up" },
    { label: "Trips Generated", value: "4,920", change: "+8.2%", trend: "up" },
    { label: "Monthly Revenue", value: "$12.4k", change: "+15.3%", trend: "up" },
    { label: "Conversion Rate", value: "6.4%", change: "-2.1%", trend: "down" },
  ];

  const topDestinations = [
    { name: "Paris", trips: 452, revenue: "$3,240" },
    { name: "New York", trips: 567, revenue: "$4,050" },
    { name: "Bali", trips: 389, revenue: "$2,780" },
    { name: "Tokyo", trips: 334, revenue: "$2,390" },
    { name: "Dubai", trips: 298, revenue: "$2,130" },
  ];

  const recentActivity = [
    { action: "New user registration", user: "emma@travel.com", time: "2 minutes ago" },
    { action: "Trip generated", user: "alex@travel.com", time: "5 minutes ago" },
    { action: "Payment received", user: "jordan@travel.com", time: "12 minutes ago" },
    { action: "Trip shared", user: "michael@travel.com", time: "18 minutes ago" },
    { action: "Feedback submitted", user: "samira@travel.com", time: "25 minutes ago" },
  ];

  const performanceMetrics = [
    { metric: "Avg Response Time", value: "8.4s", icon: Clock, color: "text-primary" },
    { metric: "API Success Rate", value: "99.4%", icon: TrendingUp, color: "text-green-500" },
    { metric: "User Satisfaction", value: "4.6/5", icon: Users, color: "text-gold" },
    { metric: "Revenue per User", value: "$9.93", icon: DollarSign, color: "text-coral" },
  ];

  return (
    <AdminLayout>
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-bold">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Comprehensive insights and performance metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-3">
              <CardDescription>{metric.label}</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl">{metric.value}</CardTitle>
                <Badge
                  variant={metric.trend === "up" ? "default" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {metric.change}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Destinations</CardTitle>
            <CardDescription>Most popular travel destinations by trips generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topDestinations.map((dest, index) => (
                <div
                  key={dest.name}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{dest.name}</p>
                      <p className="text-xs text-muted-foreground">{dest.trips} trips</p>
                    </div>
                  </div>
                  <Badge variant="outline">{dest.revenue}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>System health and key indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map((item) => (
                <div
                  key={item.metric}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span className="text-sm font-medium">{item.metric}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Live feed of platform events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border-b last:border-b-0"
              >
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
};

export default Analytics;
