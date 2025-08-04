import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, UserPlus, Trash2, UserX, UserCheck, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { users } from "@/services/api";
import { formatCurrency } from "@/lib/utils";

// Form validation schema
const formSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  pin: z
    .string()
    .length(4, "PIN must be exactly 4 digits")
    .regex(/^\d{4}$/, "PIN must contain only numbers"),
  phone: z.string().min(5, "Phone number is required"),
  balance: z.coerce.number().min(0, "Balance must be non-negative").default(100),
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminUsers() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isBalanceDialogOpen, setBalanceDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newBalance, setNewBalance] = useState("");

  // Fetch users with a shorter stale time
  const { data: userList = [], isLoading: isLoadingUsers, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: users.getAll,
    staleTime: 30000,
    refetchOnWindowFocus: true,
  });

  // Periodically refetch users
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);
    return () => clearInterval(interval);
  }, [refetch]);

  // Create user form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      username: "",
      email: "",
      password: "",
      pin: "1234",
      phone: "",
      balance: 100,
    },
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: (userData: FormValues) => {
      console.log("Creating user with data:", userData);
      return users.create(userData);
    },
    onSuccess: (data) => {
      console.log("User created successfully:", data);
      toast.success("User created successfully");
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      toast.error(error.response?.data?.message || "Error creating user");
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => users.delete(userId),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error deleting user");
    },
  });

  // Update user status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      users.updateStatus(id, status),
    onSuccess: () => {
      toast.success("User status updated successfully");
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error updating user status");
    },
  });

  // Update user balance mutation
  const updateBalanceMutation = useMutation({
    mutationFn: ({ id, balance }: { id: string; balance: number }) =>
      users.updateBalance(id, balance),
    onSuccess: () => {
      toast.success("Balance updated successfully");
      setBalanceDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error updating balance");
    },
  });

  const onSubmit = (data: FormValues) => {
    createUserMutation.mutate(data);
  };

  const handleDeleteUser = (userId: string, username: string) => {
    if (confirm(`Are you sure you want to delete ${username}?`)) {
      deleteUserMutation.mutate(userId);
    }
  };

  const handleUpdateStatus = (userId: string, username: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    const message = newStatus === 'Active'
      ? `Activate ${username}? They will be able to log in.`
      : `Deactivate ${username}? They will not be able to log in.`;
    if (confirm(message)) {
      updateStatusMutation.mutate({ id: userId, status: newStatus });
    }
  };

 const handleUpdateBalance = () => {
  const amount = parseFloat(newBalance);
  if (!selectedUser || isNaN(amount) || amount < 0) {
    toast.error("Please enter a valid positive number");
    return;
  }
  const current = parseFloat(selectedUser.balance || "0");
  updateBalanceMutation.mutate({
    id: selectedUser.id,
    balance: current + amount,   // add the delta to the current balance
  });
};


  const openBalanceDialog = (user: any) => {
    setSelectedUser(user);
    setNewBalance(user.balance || "0");
    setBalanceDialogOpen(true);
  };

  // Ensure userList is sorted by username
  const userListArray = Array.isArray(userList)
    ? [...userList].sort((a, b) => (a.username || '').localeCompare(b.username || ''))
    : [];

  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button
                variant="outline"
                className="mr-4"
                onClick={() => navigate("/admin")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <h1 className="text-3xl font-bold text-bank-gold">User Management</h1>
            </div>
            <Button
              onClick={() => refetch()}
              variant="outline"
              disabled={isLoadingUsers}
            >
              Refresh Users
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create User Form */}
            <Card className="lg:col-span-1 border-2 border-bank-gold">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2 text-bank-gold" />
                  Create User
                </CardTitle>
                <CardDescription>Add a new user to the system</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>4-Digit Transfer PIN</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="1234"
                              maxLength={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 123 456 7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="balance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Initial Balance (USD)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="100"
                              value={field.value ?? ""}
                              onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text"
                      disabled={createUserMutation.isPending}
                    >
                      {createUserMutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-bank-dark-text border-r-transparent animate-spin"></span>
                          Creating...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <UserPlus className="h-4 w-4" />
                          Create User
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            {/* Users Table */}
            <Card className="lg:col-span-2 overflow-hidden">
              <CardHeader>
                <CardTitle>Users ({userListArray.length})</CardTitle>
                <CardDescription>Manage existing users in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  {isLoadingUsers ? (
                    <div className="flex justify-center items-center p-6">
                      <div className="h-6 w-6 rounded-full border-2 border-bank-gold border-r-transparent animate-spin"></div>
                      <span className="ml-2">Loading users...</span>
                    </div>
                  ) : userListArray.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      No users found
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted">
                          <th className="px-4 py-2 text-left">Full Name</th>
                          <th className="px-4 py-2 text-left">Username</th>
                          <th className="px-4 py-2 text-left">Email</th>
                          <th className="px-4 py-2 text-left">Balance</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userListArray.map((user: any) => (
                          <tr key={user.id} className="border-b hover:bg-muted/50">
                            <td className="px-4 py-2">{user.full_name || user.fullName}</td>
                            <td className="px-4 py-2">{user.username}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{formatCurrency(parseFloat(user.balance || '0'))}</td>
                            <td className="px-4 py-2">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                user.status === 'Active'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {user.status || 'Active'}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex space-x-1">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => openBalanceDialog(user)}
                                  title="Update Balance"
                                >
                                  <Wallet className="h-4 w-4 text-bank-gold" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleUpdateStatus(user.id, user.username, user.status || 'Active')}
                                  title={user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                                >
                                  {user.status === 'Active' ? (
                                    <UserX className="h-4 w-4 text-red-500" />
                                  ) : (
                                    <UserCheck className="h-4 w-4 text-green-500" />
                                  )}
                                </Button>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => handleDeleteUser(user.id, user.username)}
                                  title="Delete User"
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Balance Update Dialog */}
      <Dialog open={isBalanceDialogOpen} onOpenChange={setBalanceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Balance</DialogTitle>
            <DialogDescription>
              Update the balance for {selectedUser?.username}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="balance">New Balance (USD)</Label>
              <Input
                id="balance"
                type="number"
                min="0"
                step="0.01"
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleUpdateBalance}
                disabled={updateBalanceMutation.isPending}
                className="bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text"
              >
                {updateBalanceMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-bank-dark-text border-r-transparent animate-spin"></span>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save
                  </span>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </Layout>
  );
}