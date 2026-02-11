import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Film } from "lucide-react";
import { useState } from "react";

interface RegisterPageProps {
  onRegister: (name: string, email: string) => void;
  onNavigateToLogin: () => void;
}

export function RegisterPage({ onRegister, onNavigateToLogin }: RegisterPageProps) {
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  // 🔵 SIGNUP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    setPasswordMatch(true);

    // call backend signup
    const res = await fetch("http://127.0.0.1:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: fullName,
        email: email,
        password: password
      })
    });

    const data = await res.json();
    alert(data.msg);

    // show OTP box
    setShowOtp(true);
  };

  // 🔵 VERIFY OTP
  const handleVerifyOtp = async () => {
    const res = await fetch("http://127.0.0.1:8000/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        otp: otp
      })
    });

    const data = await res.json();
    alert(data.msg);

    if (data.msg === "Account verified") {
      onRegister(fullName, email); // continue to app
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1739433437912-cca661ba902f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Cinema background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-border/50 bg-background/95">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <Film className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Join MOVIEBUZZ - Your movie recommendation community
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input name="password" type="password" required />
            </div>

            <div className="space-y-2">
              <Label>Confirm Password</Label>
              <Input name="confirmPassword" type="password" required />
              {!passwordMatch && (
                <p className="text-sm text-red-500">Passwords do not match</p>
              )}
            </div>

            <Button type="submit" className="w-full mt-6">
              Create Account
            </Button>
          </form>

          {/* OTP BOX */}
          {showOtp && (
            <div className="mt-6 space-y-3">
              <Label>Enter OTP (check your email)</Label>
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button onClick={handleVerifyOtp} className="w-full">
                Verify OTP
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <button className="text-primary hover:underline" onClick={onNavigateToLogin}>
              Sign in
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
