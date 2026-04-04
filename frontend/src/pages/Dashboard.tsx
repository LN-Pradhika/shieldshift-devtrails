import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, AlertTriangle, IndianRupee, FileText, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import StatCard from "@/components/StatCard";
import AppLayout from "@/components/AppLayout";
import { toast } from "sonner";
import { api } from "@/lib/api";

// ─── types ──────────────────────────────────────────────────────

interface UserProfile {
  full_name: string;
  city: string;
  work_type: string;
}

interface Policy {
  plan_name: string;
  coverage: string[];
  price_paid: number;
  expires_at: string;
  status: string;
}

interface Claim {
  id: string;
  claim_ref: string;
  est_payout: number | null;
  status: "pending" | "processing" | "approved" | "rejected";
  created_at: string;
}


const fmt = {
  date: (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
};


export default function Dashboard() {
  const navigate = useNavigate();

  const [profile,  setProfile]  = useState<UserProfile | null>(null);
  const [policy,   setPolicy]   = useState<Policy | null>(null);
  const [claims,   setClaims]   = useState<Claim[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [profileRes, policyRes, claimsRes] = await Promise.all([
          api.get<{ success: boolean; data: { user: UserProfile } }>("/api/settings/profile"),
          api.get<{ success: boolean; data: { policy: Policy | null } }>("/api/policies/my"),
          api.get<{ success: boolean; data: { claims: Claim[] } }>("/api/claims"),
        ]);

        setProfile(profileRes.data.user);
        setPolicy(policyRes.data.policy);
        setClaims(claimsRes.data.claims.slice(0, 3)); // show 3 most recent
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);


  const activeClaims   = claims.filter((c) => c.status === "pending" || c.status === "processing");
  const pendingPayout  = activeClaims.reduce((s, c) => s + (c.est_payout ?? 0), 0);
  const firstName      = profile?.full_name?.split(" ")[0] ?? "there";


  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-muted-foreground mt-1">Here's your insurance overview</p>
          </div>
          <div className="flex items-center gap-2">
            {policy ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" /> Active
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                No active policy
              </span>
            )}
          </div>
        </div>

        {/* ── Stats Grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Policy"
            value={policy?.plan_name ?? "None"}
            subtitle={policy?.coverage?.slice(0, 2).join(" + ") ?? "Subscribe to a plan"}
            icon={Shield}
            variant="secondary"
          />
          <StatCard
            title="Risk Level"
            value="Medium"
            subtitle="Based on today's data"
            icon={AlertTriangle}
            variant="warning"
          />
          <StatCard
            title="Monthly Premium"
            value={policy ? `₹${Number(policy.price_paid).toLocaleString("en-IN")}` : "—"}
            subtitle={policy?.expires_at ? `Next due: ${fmt.date(policy.expires_at)}` : "No active plan"}
            icon={IndianRupee}
            variant="accent"
          />
          <StatCard
            title="Claims Status"
            value={activeClaims.length > 0 ? `${activeClaims.length} Active` : "None"}
            subtitle={
              pendingPayout > 0
                ? `₹${pendingPayout.toLocaleString("en-IN")} pending`
                : "No pending claims"
            }
            icon={FileText}
          />
        </div>

        {/* ── Quick Actions ──────────────────────────────────── */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Select Policy",
                sub: "Browse plans",
                path: "/policies",
                icon: <Shield className="h-5 w-5 text-secondary" />,
                bg: "bg-secondary/10",
              },
              {
                label: "View Claims",
                sub: "Track status",
                path: "/claims",
                icon: <FileText className="h-5 w-5 text-accent" />,
                bg: "bg-accent/10",
              },
              {
                label: "Update Profile",
                sub: "Edit details",
                path: "/settings",
                icon: (
                  <svg className="h-5 w-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
                bg: "bg-muted",
              },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="group flex items-center justify-between p-5 rounded-xl border bg-card card-shadow hover:card-shadow-hover hover:border-secondary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${action.bg}`}>{action.icon}</div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.sub}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Recent Activity ────────────────────────────────── */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Claims</h2>
          <div className="bg-card rounded-xl border card-shadow divide-y divide-border">
            {claims.length === 0 ? (
              <div className="px-5 py-6 text-sm text-muted-foreground">No claims yet.</div>
            ) : (
              claims.map((claim) => (
                <div key={claim.id} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{claim.claim_ref}</p>
                    <p className="text-xs text-muted-foreground capitalize">{claim.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {claim.est_payout != null
                        ? `₹${Number(claim.est_payout).toLocaleString("en-IN")}`
                        : "—"}
                    </p>
                    <span className="text-xs text-muted-foreground">{fmt.date(claim.created_at)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}