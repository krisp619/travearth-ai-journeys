"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const getRoleFromMock = (email) => {
  const normalized = String(email || "").trim().toLowerCase();
  if (normalized.includes("admin")) return "admin";
  if (normalized.includes("partner")) return "partner";
  return "user";
};

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const role = useMemo(() => getRoleFromMock(email), [email]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginResult = {
      role,
      user: {
        name: (name || "Traveler").trim() || "Traveler",
        email: (email || "").trim(),
      },
    };

    void loginResult;

    if (role === "admin") {
      router.push("/dashboard/admin");
      return;
    }

    if (role === "partner") {
      router.push("/dashboard/partner");
      return;
    }

    router.push("/dashboard/user");
  };

  const handleGoogle = () => {
    const googleLoginResult = {
      role,
      provider: "google",
      user: {
        name: (name || "Traveler").trim() || "Traveler",
        email: (email || "").trim(),
      },
    };

    void googleLoginResult;

    if (role === "admin") {
      router.push("/dashboard/admin");
      return;
    }

    if (role === "partner") {
      router.push("/dashboard/partner");
      return;
    }

    router.push("/dashboard/user");
  };

  const handleGuest = () => {
    const guestLoginResult = {
      role: "user",
      guest: true,
    };

    void guestLoginResult;

    router.push("/dashboard/user");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Signed in</CardTitle>
                <CardDescription>Manage your session below.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{(name || "Traveler").trim() || "Traveler"}</p>
                  <p className="text-xs text-muted-foreground">{(email || "").trim() || "you@example.com"}</p>
                  <Badge variant="outline" className="mt-2">
                    {role}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Logout
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-travel">
              <CardHeader>
                <CardTitle>{mode === "login" ? "Log in" : "Create account"}</CardTitle>
                <CardDescription>
                  {mode === "login" ? "Access your saved itineraries." : "Start planning in seconds."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {mode === "signup" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        name="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Alex"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="alex@travel.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      name="password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button type="submit" className="flex-1 shadow-travel">
                      {mode === "login" ? "Log in" : "Sign up"}
                    </Button>
                    <Button type="button" variant="outline" className="flex-1" onClick={handleGoogle}>
                      Continue with Google
                    </Button>
                  </div>
                </form>

                <div className="flex items-center justify-between mt-6">
                  <button
                    type="button"
                    className="text-sm text-primary hover:underline"
                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  >
                    {mode === "login" ? "Need an account? Sign up" : "Already have an account? Log in"}
                  </button>
                  <button
                    type="button"
                    className="text-sm text-muted-foreground hover:text-foreground"
                    onClick={handleGuest}
                  >
                    Continue as guest
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
