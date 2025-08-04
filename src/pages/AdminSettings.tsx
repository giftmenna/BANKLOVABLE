import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { settings } from "@/services/api";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badget";

export default function AdminSettings() {
  const [formData, setFormData] = useState({
    systemName: "",
    maintenance: false,
    allowNewUsers: true,
    contactEmail: "",
  });

  // Fetch settings
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["settings"],
    queryFn: settings.getAll,
  });

  // Update settings with useMutation
  const mutation = useMutation({
    mutationFn: settings.update,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
      refetch();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: `Failed to update settings: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Set form data when settings are loaded
  useState(() => {
    if (data) {
      setFormData(data);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggle = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  // Rest of the component remains the same
  if (isLoading) return <div className="py-8 text-center">Loading settings...</div>;
  if (error) return <div className="py-8 text-center text-red-500">Error loading settings: {(error as Error).message}</div>;

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">Configure system-wide settings</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic system configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="systemName">System Name</Label>
                <Input
                  id="systemName"
                  name="systemName"
                  value={formData.systemName}
                  onChange={handleChange}
                  placeholder="Nivalus Banking System"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="admin@nivalus.com"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Control system availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable access to the application
                  </p>
                </div>
                <Switch
                  checked={formData.maintenance}
                  onCheckedChange={(checked) => handleToggle("maintenance", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Allow New User Registration</p>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable new user signups
                  </p>
                </div>
                <Switch
                  checked={formData.allowNewUsers}
                  onCheckedChange={(checked) => handleToggle("allowNewUsers", checked)}
                />
              </div>

              <div>
                <p className="font-medium mb-2">Current System Status</p>
                <div className="flex gap-2">
                  {formData.maintenance ? (
                    <Badge variant="destructive">Maintenance Mode</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-green-500 hover:bg-green-600">Online</Badge>
                  )}
                  {formData.allowNewUsers ? (
                    <Badge variant="outline">Registration Open</Badge>
                  ) : (
                    <Badge variant="outline">Registration Closed</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button 
            type="submit" 
            disabled={mutation.isPending}
            className="bg-bank-gold hover:bg-bank-gold/90"
          >
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}