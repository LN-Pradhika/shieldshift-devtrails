import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { authAPI, setTokens } from "@/lib/api";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    password: "",
    city: "",
    work_type: "",
    experience: "",
    avg_daily_earnings: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setError("");
  };

  const handleSelect = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic client-side guard
    if (!form.work_type || !form.experience) {
      setError("Please select your work type and experience.");
      setLoading(false);
      return;
    }

    try {
      const data = await authAPI.register({
        full_name: form.full_name,
        phone: form.phone,
        password: form.password,
        city: form.city,
        work_type: form.work_type,
        experience: form.experience,
        avg_daily_earnings: Number(form.avg_daily_earnings),
      });

      if (!data.success) {
        // Show validation errors if any
        if (data.errors?.length) {
          setError(data.errors.join(" "));
        } else {
          setError(data.message || "Registration failed. Please try again.");
        }
        return;
      }

      setTokens(data.data.accessToken, data.data.refreshToken);
      navigate("/dashboard");
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12">
        <div className="max-w-md space-y-6 animate-fade-in">
          <ShieldCheck className="h-16 w-16 text-secondary" />
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight">
            Insurance built for the gig economy
          </h1>
          <p className="text-lg text-primary-foreground/70">
            AI-powered protection tailored to your daily risks. Get covered in minutes, not days.
          </p>
          <div className="flex gap-6 pt-4">
            {["10K+ Workers", "₹5Cr+ Claims", "98% Satisfaction"].map((stat) => (
              <div key={stat} className="text-sm font-medium text-primary-foreground/60">{stat}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 animate-fade-in-up">
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <ShieldCheck className="h-8 w-8 text-secondary" />
            <span className="text-2xl font-bold text-foreground">ShieldShift</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">Create your account</h2>
            <p className="text-muted-foreground mt-1">Get started with personalized coverage</p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                placeholder="Enter your full name"
                value={form.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="e.g. Mumbai"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Work Type</Label>
              <Select onValueChange={(val) => handleSelect("work_type", val)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="ride">Ride Sharing</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Experience</Label>
              <Select onValueChange={(val) => handleSelect("experience", val)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5+">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avg_daily_earnings">Average Daily Earnings (₹)</Label>
              <Input
                id="avg_daily_earnings"
                type="number"
                placeholder="e.g. 800"
                value={form.avg_daily_earnings}
                onChange={handleChange}
                min={0}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 text-base font-semibold"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Register <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}