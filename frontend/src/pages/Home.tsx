import { Link } from "react-router-dom";
import { ShieldCheck, Zap, CloudRain, TrendingUp, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAccessToken } from "@/lib/api";

const features = [
  {
    icon: CloudRain,
    title: "Weather Protection",
    description: "Automatic claims when weather disrupts your earnings. No paperwork needed.",
  },
  {
    icon: Zap,
    title: "AI-Powered Pricing",
    description: "Personalized premiums based on your daily routes, hours, and risk profile.",
  },
  {
    icon: TrendingUp,
    title: "Instant Payouts",
    description: "Get compensated within hours, not weeks. Direct to your bank account.",
  },
  {
    icon: Users,
    title: "Built for Gig Workers",
    description: "Designed for delivery partners, ride-share drivers, and freelancers.",
  },
];

const stats = [
  { value: "10,000+", label: "Workers Protected" },
  { value: "₹5 Cr+", label: "Claims Paid" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "<2 hrs", label: "Avg Claim Time" },
];

export default function Home() {
  const isLoggedIn = !!getAccessToken();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-secondary" />
            <span className="text-xl font-bold text-foreground tracking-tight">ShieldShift</span>
          </Link>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Button variant="hero" asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32 text-center relative">
          <div className="animate-fade-in-up space-y-6 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
              <Zap className="h-3.5 w-3.5" /> AI-Powered Insurance
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tight">
              Insurance built for the{" "}
              <span className="text-secondary">gig economy</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Personalized coverage for delivery partners, ride-share drivers, and freelancers.
              AI calculates your risk, you get protected in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button variant="hero" size="lg" asChild className="text-base px-8 h-12">
                <Link to="/register">
                  Start Free <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild className="text-base px-8 h-12">
                <Link to="/login">Login to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why ShieldShift?</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Traditional insurance doesn't understand gig work. We do.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border bg-card card-shadow hover:card-shadow-hover hover:border-secondary/20 transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-secondary/10 w-fit mb-4 group-hover:bg-secondary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Get covered in 3 steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Register", desc: "Sign up with your work details in under 2 minutes." },
              { step: "02", title: "Choose a Plan", desc: "Our AI recommends the best policy for your risk profile." },
              { step: "03", title: "Stay Protected", desc: "Automatic claims and instant payouts when disruptions happen." },
            ].map((item) => (
              <div key={item.step} className="relative p-6 rounded-xl bg-card border card-shadow">
                <span className="text-5xl font-extrabold text-secondary/10">{item.step}</span>
                <h3 className="text-xl font-bold text-foreground mt-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="gradient-primary rounded-2xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to protect your earnings?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of gig workers who trust ShieldShift for their daily protection.
          </p>
          <Button variant="hero" size="lg" asChild className="text-base px-8 h-12">
            <Link to="/register">
              Get Started Free <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-secondary" />
            <span className="font-semibold text-foreground">ShieldShift</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 ShieldShift. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}