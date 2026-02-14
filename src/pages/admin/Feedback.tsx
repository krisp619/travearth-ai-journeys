import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";

interface FeedbackItem {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
  status: "new" | "reviewed" | "resolved";
}

const Feedback = () => {
  const [feedbackList] = useState<FeedbackItem[]>([
    {
      id: "f1",
      user: "Alex",
      rating: 5,
      comment: "Amazing AI-generated itinerary! Saved me hours of planning.",
      date: "2026-02-12",
      category: "Feature",
      status: "reviewed",
    },
    {
      id: "f2",
      user: "Jordan",
      rating: 4,
      comment: "Great tool but would love more budget options for Southeast Asia.",
      date: "2026-02-11",
      category: "Suggestion",
      status: "new",
    },
    {
      id: "f3",
      user: "Samira",
      rating: 3,
      comment: "The app is slow sometimes when generating itineraries.",
      date: "2026-02-10",
      category: "Bug",
      status: "reviewed",
    },
    {
      id: "f4",
      user: "Michael",
      rating: 5,
      comment: "Love the local food recommendations! Very authentic.",
      date: "2026-02-09",
      category: "Feature",
      status: "resolved",
    },
    {
      id: "f5",
      user: "Emma",
      rating: 4,
      comment: "Could you add more European destinations?",
      date: "2026-02-08",
      category: "Suggestion",
      status: "new",
    },
  ]);

  const stats = [
    { label: "Average Rating", value: "4.6", icon: Star, color: "text-gold" },
    { label: "Positive Feedback", value: "89%", icon: ThumbsUp, color: "text-green-500" },
    { label: "Total Reviews", value: "1,247", icon: MessageSquare, color: "text-primary" },
    { label: "Response Rate", value: "94%", icon: ThumbsDown, color: "text-coral" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500";
      case "reviewed": return "bg-yellow-500";
      case "resolved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Feature": return "default";
      case "Bug": return "destructive";
      case "Suggestion": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-display font-bold">Feedback & Reviews</h2>
        <p className="text-muted-foreground">Monitor user feedback and satisfaction metrics.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardDescription>{stat.label}</CardDescription>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>Latest user reviews and comments</CardDescription>
            </div>
            <Button variant="outline">Export All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbackList.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="font-semibold">{item.user}</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < item.rating ? "fill-gold text-gold" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <Badge variant={getCategoryColor(item.category) as any}>
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                    <Badge variant="outline" className={`${getStatusColor(item.status)} text-white`}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.comment}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Reply</Button>
                  <Button size="sm" variant="outline">Mark as Resolved</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;
