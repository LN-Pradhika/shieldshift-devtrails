import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
        </div>

        <div className="bg-card rounded-xl border p-6 card-shadow space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Profile Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue="Rahul Sharma" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input defaultValue="+91 98765 43210" />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input defaultValue="Mumbai" />
            </div>
            <div className="space-y-2">
              <Label>Work Type</Label>
              <Input defaultValue="Delivery" readOnly className="bg-muted/50" />
            </div>
          </div>
          <Button
            onClick={() => toast.success("Profile updated successfully!")}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
