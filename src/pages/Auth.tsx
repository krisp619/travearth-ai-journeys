import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getCurrentUser, login, loginAsGuest, loginWithGoogle, logout, signup } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = getCurrentUser();

  const redirectByRole = (role: string) => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "guest") {
      navigate("/plan");
    } else {
      navigate("/dashboard");
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      toast({ title: "Email required", description: "Please enter your email." });
      return;
    }

    let signedUser;

    if (mode === "signup") {
      if (!name.trim()) {
        toast({ title: "Name required", description: "Please enter your name." });
        return;
      }

      signedUser = signup(name.trim(), email.trim());
      toast({ title: "Account created", description: "Welcome to Travearth." });

    } else {
      signedUser = login(email.trim());
      toast({ title: "Welcome back", description: "You are signed in." });
    }

    localStorage.setItem("travearth_role", signedUser.role);
    setPassword("");

    redirectByRole(signedUser.role);
  };

  const handleGuest = () => {
    const guest = loginAsGuest();

    localStorage.setItem("travearth_role", guest.role);
    toast({ title: "Guest access", description: "Limited features enabled." });

    redirectByRole(guest.role);
  };

  const handleGoogle = () => {
    if (!email.trim()) {
      toast({ title: "Email required", description: "Enter your Google email to continue." });
      return;
    }

    const signedIn = loginWithGoogle(email.trim(), name.trim() || "Traveler");

    localStorage.setItem("travearth_role", signedIn.role);
    toast({ title: "Google login", description: "Connected successfully." });

    redirectByRole(signedIn.role);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto space-y-6">

            {user && (
              <Card>
                <CardHeader>
                  <CardTitle>Signed in</CardTitle>
                  <CardDescription>Manage your session below.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <Badge variant="outline" className="mt-2">
                      {user.role}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      localStorage.removeItem("travearth_role");
                      toast({ title: "Logged out" });
                      navigate("/");
                    }}
                  >
                    Logout
                  </Button>
                </CardContent>
              </Card>
            )}

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
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@travel.com"
                    />
                    <p className="text-xs text-muted-foreground">
                      Admin access: use an email ending with{" "}
                      <span className="font-medium">@travearth.ai</span>.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    className="text-sm text-primary hover:underline"
                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  >
                    {mode === "login" ? "Need an account? Sign up" : "Already have an account? Log in"}
                  </button>

                  <button
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
      <Footer />
    </div>
  );
};

export default Auth;
