import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PlusCircle, Trash2, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { users, transactions } from "@/services/api";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calender";
import { Textarea } from "@/components/ui/textarea";

// Form validation schema
const formSchema = z.object({
  user_id: z.string().min(1, "User is required"),
  type: z.string().min(1, "Transaction type is required"),
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Amount must be a positive number",
  }),
  description: z.string().optional(),
  date_time: z.date(),
  recipient_details: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminTransactions() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("12:00");

  // Fetch users for dropdown with default empty array
  const { data: userList = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: users.getAll,
  });

  // Fetch transactions with default empty array
  const { data: transactionList = [], isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: transactions.getAll,
  });

  // Create transaction form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: "",
      type: "Deposit",
      amount: "",
      description: "",
      date_time: new Date(),
      recipient_details: "",
    },
  });

  // Watch transaction type for conditional fields
  const transactionType = form.watch("type");
  
  // Create transaction mutation
  const createTransactionMutation = useMutation({
    mutationFn: (data: any) => transactions.create(data),
    onSuccess: () => {
      toast.success("Transaction created successfully");
      form.reset({
        user_id: "",
        type: "Deposit",
        amount: "",
        description: "",
        date_time: new Date(),
        recipient_details: "",
      });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error creating transaction");
    },
  });

  // Delete transaction mutation
  const deleteTransactionMutation = useMutation({
    mutationFn: (id: string) => transactions.delete(id),
    onSuccess: () => {
      toast.success("Transaction deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error deleting transaction");
    },
  });

  const onSubmit = (data: FormValues) => {
    // Combine date and time
    const [hours, minutes] = time.split(':').map(Number);
    const dateTime = new Date(data.date_time);
    dateTime.setHours(hours || 0, minutes || 0, 0, 0);
    
    // Format recipient details as JSON if needed
    const formattedData = {
      ...data,
      date_time: dateTime.toISOString(),
      recipient_details: data.recipient_details 
        ? JSON.stringify({ details: data.recipient_details }) 
        : null
    };
    
    createTransactionMutation.mutate(formattedData);
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      deleteTransactionMutation.mutate(id);
    }
  };

  // Helper for formatting date/time
  const formatDateTime = (dateTimeStr: string) => {
    try {
      const date = new Date(dateTimeStr);
      return format(date, "MMM d, yyyy h:mm a");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Ensure the lists are always arrays
  const userListArray = Array.isArray(userList) ? userList : [];
  const transactionListArray = Array.isArray(transactionList) ? transactionList : [];

  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <Button 
              variant="outline" 
              className="mr-4" 
              onClick={() => navigate("/admin")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-bank-gold">Transaction Management</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create Transaction Form */}
            <Card className="lg:col-span-1 border-2 border-bank-gold">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PlusCircle className="h-5 w-5 mr-2 text-bank-gold" />
                  Create Transaction
                </CardTitle>
                <CardDescription>Add a new transaction to the system</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="user_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              disabled={isLoadingUsers}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a user" />
                              </SelectTrigger>
                              <SelectContent>
                                {isLoadingUsers ? (
                                  <SelectItem value="loading" disabled>
                                    Loading users...
                                  </SelectItem>
                                ) : userListArray.map((user: any) => (
                                  <SelectItem key={user.id} value={user.id}>
                                    {user.username} ({user.full_name || user.fullName})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transaction Type</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Deposit">Deposit</SelectItem>
                                <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                                <SelectItem value="Transfer">Transfer</SelectItem>
                                <SelectItem value="Bill Pay">Bill Pay</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="0.01"
                              min="0.01"
                              placeholder="0.00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Transaction description" 
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date_time"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={`w-full pl-3 text-left font-normal ${
                                      !field.value && "text-muted-foreground"
                                    }`}
                                  >
                                    {field.value ? (
                                      format(field.value, "MMM d, yyyy")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <CalendarComponent
                                  mode="single"
                                  selected={field.value}
                                  onSelect={(date) => {
                                    setDate(date);
                                    field.onChange(date);
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {/* Show recipient details field for Transfer and Bill Pay */}
                    {(transactionType === "Transfer" || transactionType === "Bill Pay") && (
                      <FormField
                        control={form.control}
                        name="recipient_details"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recipient Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={
                                  transactionType === "Transfer" 
                                    ? "Name, Account Number, Bank" 
                                    : "Biller Name, Account Number, Reference"
                                }
                                className="resize-none"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text"
                      disabled={createTransactionMutation.isPending}
                    >
                      {createTransactionMutation.isPending ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-bank-dark-text border-r-transparent animate-spin"></span>
                          Creating...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <PlusCircle className="h-4 w-4" />
                          Create Transaction
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            {/* Transactions Table */}
            <Card className="lg:col-span-2 overflow-hidden">
              <CardHeader>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>View and manage all transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  {isLoadingTransactions ? (
                    <div className="flex justify-center items-center p-6">
                      <div className="h-6 w-6 rounded-full border-2 border-bank-gold border-r-transparent animate-spin"></div>
                      <span className="ml-2">Loading transactions...</span>
                    </div>
                  ) : transactionListArray.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      No transactions found
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted">
                          <th className="px-4 py-2 text-left">User</th>
                          <th className="px-4 py-2 text-left">Type</th>
                          <th className="px-4 py-2 text-left">Amount</th>
                          <th className="px-4 py-2 text-left">Description</th>
                          <th className="px-4 py-2 text-left">Date & Time</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactionListArray.map((transaction: any) => (
                          <tr key={transaction.id} className="border-b hover:bg-muted/50">
                            <td className="px-4 py-2">{transaction.username}</td>
                            <td className="px-4 py-2">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                transaction.type === 'Deposit' 
                                  ? 'bg-green-100 text-green-800' 
                                  : transaction.type === 'Withdrawal'
                                    ? 'bg-red-100 text-red-800'
                                    : transaction.type === 'Transfer'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-orange-100 text-orange-800'
                              }`}>
                                {transaction.type}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              ${parseFloat(transaction.amount || '0').toFixed(2)}
                            </td>
                            <td className="px-4 py-2">
                              {transaction.description || "N/A"}
                            </td>
                            <td className="px-4 py-2">
                              {formatDateTime(transaction.date_time)}
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex space-x-1">
                                {/* Delete Button */}
                                <Button 
                                  size="icon" 
                                  variant="outline"
                                  onClick={() => handleDeleteTransaction(transaction.id)}
                                  title="Delete Transaction"
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
      <Footer />
    </Layout>
  );
}