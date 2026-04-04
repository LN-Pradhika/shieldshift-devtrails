import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "accent" | "secondary" | "warning";
}

const variantStyles = {
  default: "bg-card",
  accent: "bg-accent/10 border-accent/20",
  secondary: "bg-secondary/10 border-secondary/20",
  warning: "bg-amber-50 border-amber-200",
};

const iconStyles = {
  default: "bg-muted text-foreground",
  accent: "bg-accent/20 text-accent",
  secondary: "bg-secondary/20 text-secondary",
  warning: "bg-amber-100 text-amber-600",
};

export default function StatCard({ title, value, subtitle, icon: Icon, variant = "default" }: StatCardProps) {
  return (
    <div className={`rounded-xl border p-5 card-shadow hover:card-shadow-hover transition-all duration-300 ${variantStyles[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`p-2.5 rounded-lg ${iconStyles[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
