import { useNavigate } from "react-router-dom";
import { Shield, AlertTriangle, IndianRupee, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import AppLayout from "@/components/AppLayout";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back, Rahul 👋</h1>
            <p className="text-muted-foreground mt-1">Here's your insurance overview</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <CheckCircle2 className="h-4 w-4" /> Active
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Active Policy" value="Standard" subtitle="Weather + Traffic" icon={Shield} variant="secondary" />
          <StatCard title="Risk Level" value="Medium" subtitle="Based on today's data" icon={AlertTriangle} variant="warning" />
          <StatCard title="Monthly Premium" value="₹349" subtitle="Next due: Apr 15" icon={IndianRupee} variant="accent" />
          <StatCard title="Claims Status" value="1 Active" subtitle="₹1,200 pending" icon={FileText} />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/policies")}
              className="group flex items-center justify-between p-5 rounded-xl border bg-card card-shadow hover:card-shadow-hover hover:border-secondary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Shield className="h-5 w-5 text-secondary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Select Policy</p>
                  <p className="text-xs text-muted-foreground">Browse plans</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors" />
            </button>

            <button
              onClick={() => navigate("/claims")}
              className="group flex items-center justify-between p-5 rounded-xl border bg-card card-shadow hover:card-shadow-hover hover:border-secondary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">View Claims</p>
                  <p className="text-xs text-muted-foreground">Track status</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors" />
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="group flex items-center justify-between p-5 rounded-xl border bg-card card-shadow hover:card-shadow-hover hover:border-secondary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <svg className="h-5 w-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Update Profile</p>
                  <p className="text-xs text-muted-foreground">Edit details</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors" />
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="bg-card rounded-xl border card-shadow divide-y divide-border">
            {[
              { label: "Policy renewed", detail: "Standard Plan — ₹349/month", time: "2 hours ago", color: "text-secondary" },
              { label: "Claim approved", detail: "Weather disruption — ₹1,200", time: "Yesterday", color: "text-accent" },
              { label: "Risk alert", detail: "Heavy rain expected in Mumbai", time: "2 days ago", color: "text-amber-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className={`text-sm font-medium ${item.color}`}>{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
