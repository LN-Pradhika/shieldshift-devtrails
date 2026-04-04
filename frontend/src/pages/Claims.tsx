import { useState } from "react";
import { CloudRain, MapPin, Clock, IndianRupee, FileText, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/AppLayout";
import { toast } from "sonner";

const pastClaims = [
  { id: "CLM-2024-001", date: "Mar 28, 2026", amount: "₹1,200", status: "Approved" },
  { id: "CLM-2024-002", date: "Mar 15, 2026", amount: "₹800", status: "Approved" },
  { id: "CLM-2024-003", date: "Feb 20, 2026", amount: "₹1,500", status: "Rejected" },
  { id: "CLM-2024-004", date: "Feb 10, 2026", amount: "₹950", status: "Approved" },
];

const statusIcon = {
  Approved: <CheckCircle2 className="h-4 w-4 text-accent" />,
  Pending: <AlertCircle className="h-4 w-4 text-amber-500" />,
  Rejected: <XCircle className="h-4 w-4 text-destructive" />,
};

const statusStyle = {
  Approved: "bg-accent/10 text-accent",
  Pending: "bg-amber-50 text-amber-600",
  Rejected: "bg-destructive/10 text-destructive",
};

export default function Claims() {
  const [requesting, setRequesting] = useState(false);

  const handleRequest = () => {
    setRequesting(true);
    setTimeout(() => {
      setRequesting(false);
      toast.success("Claim request submitted successfully!");
    }, 1200);
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Claims Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage your insurance claims</p>
        </div>

        {/* Active Claim */}
        <div className="bg-card rounded-xl border card-shadow p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Active Claim</h2>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
              <AlertCircle className="h-3.5 w-3.5" /> Processing
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <CloudRain className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Event</p>
                <p className="text-sm font-semibold text-foreground">Weather Disruption</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <MapPin className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Area</p>
                <p className="text-sm font-semibold text-foreground">Mumbai, Andheri</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <Clock className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="text-sm font-semibold text-foreground">2 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <IndianRupee className="h-5 w-5 text-accent" />
              <div>
                <p className="text-xs text-muted-foreground">Est. Payout</p>
                <p className="text-sm font-semibold text-accent">₹1,200</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleRequest}
              disabled={requesting}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              {requesting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Request Claim"
              )}
            </Button>
            <Button variant="outline" onClick={() => toast.info("Tracking claim CLM-2025-005...")}>
              Track Claim
            </Button>
          </div>
        </div>

        {/* Past Claims */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Past Claims</h2>
          {/* Desktop table */}
          <div className="hidden md:block bg-card rounded-xl border card-shadow overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Claim ID</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pastClaims.map((claim) => (
                  <tr key={claim.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4 text-sm font-medium text-foreground">{claim.id}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{claim.date}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-foreground">{claim.amount}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[claim.status as keyof typeof statusStyle]}`}>
                        {statusIcon[claim.status as keyof typeof statusIcon]}
                        {claim.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {pastClaims.map((claim) => (
              <div key={claim.id} className="bg-card rounded-xl border card-shadow p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{claim.id}</p>
                  <p className="text-xs text-muted-foreground">{claim.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{claim.amount}</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[claim.status as keyof typeof statusStyle]}`}>
                    {statusIcon[claim.status as keyof typeof statusIcon]}
                    {claim.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
