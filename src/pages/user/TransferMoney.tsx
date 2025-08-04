import { useState, useEffect, Component } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";

import { z } from "zod";
import { CheckCircle, Printer } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const { users, transactions, settings } = api;

class ErrorBoundary extends Component<React.PropsWithChildren<{}>> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-4">
          <h2 className="text-xl font-bold text-destructive">Something went wrong</h2>
          <p>{this.state.error?.message || "Please try again later."}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Define validation schemas for different transfer types
const bankTransferSchema = z.object({
  transferType: z.literal("Bank Transfer"),
  amount: z.coerce.number().positive("Amount must be positive").min(1, "Minimum amount is ₦1"),
  recipientName: z.string().min(1, "Recipient name is required"),
  accountNumber: z.string().min(5, "Account number is required"),
  routingNumber: z.string().min(9, "Routing number must be 9 digits"),
  memo: z.string().optional(),
});

const wireTransferSchema = z.object({
  transferType: z.literal("Wire Transfer"),
  amount: z.coerce.number().positive("Amount must be positive").min(1, "Minimum amount is $1"),
  recipientName: z.string().min(1, "Recipient name is required"),
  accountNumber: z.string().min(5, "Account number is required"),
  swiftCode: z.string().min(8, "SWIFT code is required"),
  bankName: z.string().min(1, "Bank name is required"),
  bankAddress: z.string().min(1, "Bank address is required"),
  memo: z.string().optional(),
});

const p2pTransferSchema = z.object({
  transferType: z.literal("P2P"),
  amount: z.coerce.number().positive("Amount must be positive").min(1, "Minimum amount is $1"),
  recipientIdentifier: z.string().min(5, "Email or phone number is required"),
  memo: z.string().optional(),
});

// Combine all schemas with discriminated union
const transferFormSchema = z.discriminatedUnion("transferType", [
  bankTransferSchema,
  wireTransferSchema,
  p2pTransferSchema,
]);

type TransferFormValues = z.infer<typeof transferFormSchema>;

export default function TransferMoney() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showPinConfirmation, setShowPinConfirmation] = useState(false);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [pin, setPin] = useState("");
  const [balance, setBalance] = useState(0);
  const [minimumBalance, setMinimumBalance] = useState(0);
  const [currentTransaction, setCurrentTransaction] = useState<any>(null);
  
  // Form setup with zod validation
  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      transferType: "Bank Transfer" as const,
      amount: 0,
      memo: "",
    },
    mode: "onChange",
  });
  
  // Get current transfer type from form
  const selectedTransferType = form.watch("transferType");

  // Fetch user balance and settings on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!currentUser?.id) {
          toast.error("User not authenticated.");
          navigate("/login");
          return;
        }
        const userResponse = await users.getById(currentUser.id);
        setBalance(parseFloat(userResponse.balance) || 0);
        
        const settingsResponse = await settings.getAll();
        setMinimumBalance(parseFloat(settingsResponse.minimum_balance) || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load your account data.");
      }
    };
    
    fetchUserData();
  }, [currentUser?.id, navigate]);

  // Handle transfer submission
  const onSubmit = async (data: TransferFormValues) => {
    try {
      console.log("Form errors:", form.formState.errors);
      if (data.amount > balance) {
        toast.error("Insufficient balance for this transaction.");
        return;
      }
      
      if ((balance - data.amount) < minimumBalance) {
        toast.error(`This transaction would put your account below the minimum balance of ${formatCurrency(minimumBalance)}.`);
        return;
      }
      
      setCurrentTransaction(data);
      setShowPinConfirmation(true);
      setPin("");
      console.log("Form submitted successfully, showing PIN confirmation:", data);
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error("Failed to process form submission.");
    }
  };
  
  // Handle PIN verification
 const verifyPin = async () => {
  if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
    toast.error("Please enter a valid 4-digit PIN.");
    return;
  }

  setIsLoading(true);

  try {
    if (!currentUser?.id) {
      throw new Error("User not authenticated.");
    }

    console.log("Verifying PIN for user:", { userId: currentUser.id, pin });

    // ✅ FIXED: call verifyPin from destructured 'users'
    const pinResponse = await users.verifyPin(currentUser.id, pin);

    console.log("PIN verification response:", pinResponse);

    if (!pinResponse.valid) {
      toast.error("Invalid PIN. Please try again.");
      setIsLoading(false);
      return;
    }

    startTransactionProcess();
  } catch (error) {
    console.error("Error verifying PIN:", error);
    toast.error("Failed to verify PIN. Please try again.");
    setIsLoading(false);
    }
  };
  
  // Start the transaction loading animation
  const startTransactionProcess = () => {
    setShowPinConfirmation(false);
    setShowLoadingAnimation(true);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        completeTransaction();
      }
    }, 1000);
  };
  
  // Process the transaction after the animation completes
  const completeTransaction = async () => {
    try {
      if (!currentUser?.id) {
        throw new Error("User not authenticated.");
      }
      let recipientDetails;
      
      switch (currentTransaction.transferType) {
        case "Wire Transfer":
          recipientDetails = {
            name: currentTransaction.recipientName,
            accountNumber: currentTransaction.accountNumber,
            swiftCode: currentTransaction.swiftCode,
            bankName: currentTransaction.bankName,
            bankAddress: currentTransaction.bankAddress,
          };
          break;
           case "Bank Transfer":
          recipientDetails = {
            name: currentTransaction.recipientName,
            accountNumber: currentTransaction.accountNumber,
            routingNumber: currentTransaction.routingNumber,
          };
          break;
        case "P2P":
          recipientDetails = {
            identifier: currentTransaction.recipientIdentifier,
          };
          break;
      }
      
      const response = await transactions.create({
        user_id: currentUser.id,
        type: "Transfer", // All transfer types should be "Transfer" for balance updates
        amount: currentTransaction.amount,
        description: currentTransaction.memo || `${currentTransaction.transferType} Transaction`,
        date_time: new Date().toISOString(),
        status: "Completed",
        recipient_details: recipientDetails,
      });
      
      setCurrentTransaction({
        ...currentTransaction,
        id: response.transaction?.id || `TXN${Math.floor(Math.random() * 1000000)}`,
        date_time: new Date().toISOString(),
        status: "Completed",
        recipient_details: recipientDetails,
      });
      
      setShowLoadingAnimation(false);
      setShowCompletion(true);
    } catch (error) {
      console.error("Error completing transaction:", error);
      toast.error("Transaction failed. Please try again.");
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Print receipt
  const printReceipt = () => {
    if (!currentTransaction) return;
    
    let recipientInfo = "";
    if (currentTransaction.transferType === "Bank Transfer") {
      recipientInfo = `
Recipient: ${currentTransaction.recipientName}
Account Number: ****${currentTransaction.accountNumber.slice(-4)}
Routing Number: ${currentTransaction.routingNumber}`;
    } else if (currentTransaction.transferType === "Wire Transfer") {
      recipientInfo = `
Recipient: ${currentTransaction.recipientName}
Account Number: ****${currentTransaction.accountNumber.slice(-4)}
SWIFT Code: ${currentTransaction.swiftCode}
Bank Name: ${currentTransaction.bankName}
Bank Address: ${currentTransaction.bankAddress}`;
    } else if (currentTransaction.transferType === "P2P") {
      const identifier = currentTransaction.recipientIdentifier;
      recipientInfo = `
Recipient: ${identifier.includes('@') ? 'Email' : 'Phone'}: ${identifier}`;
    }
    
    const receipt = `
======================================
           TRANSACTION RECEIPT
======================================
Nivalus Bank - Your Trusted Financial Partner

Transaction ID: ${currentTransaction.id}
Date & Time: ${new Date(currentTransaction.date_time).toLocaleString()}
Method: ${currentTransaction.transferType}
Status: ${currentTransaction.status}

Sender:
Username: ${currentUser?.username || 'N/A'}
Email: ${currentUser?.email || 'N/A'}
Account: ****${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}

${recipientInfo}

Amount: ${formatCurrency(currentTransaction.amount)}
${currentTransaction.memo ? `Memo: ${currentTransaction.memo}` : ''}

======================================
        Thank you for banking with us!
======================================
`;
    
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${currentTransaction.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Receipt downloaded successfully!");
  };

  console.log("Rendering with states:", {
    showPinConfirmation,
    showLoadingAnimation,
    showCompletion,
  });

  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Transfer Money</h1>
            <p className="text-muted-foreground">Send money to accounts and individuals securely</p>
          </div>
          
          <ErrorBoundary>
            {!showPinConfirmation && !showLoadingAnimation && !showCompletion && (
              <Card>
                <CardHeader>
                  <CardTitle>New Transfer</CardTitle>
                  <CardDescription>Fill in the details to make a transfer</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="transferType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transfer Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select transfer type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                <SelectItem value="Wire Transfer">Wire Transfer</SelectItem>
                                <SelectItem value="P2P">P2P Transfer</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose the type of transfer you want to make
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  className="pl-8"
                                  value={field.value ?? ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    field.onChange(value === "" ? undefined : Number(value));
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Available balance: {formatCurrency(balance)}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {selectedTransferType === "Bank Transfer" && (
                        <>
                          <FormField
                            control={form.control}
                            name="recipientName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Recipient Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Kim Joon" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="accountNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Account Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="123456789" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="routingNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Routing Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="987654321" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      
                      {selectedTransferType === "Wire Transfer" && (
                        <>
                          <FormField
                            control={form.control}
                            name="recipientName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Recipient Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Kim Joon" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="accountNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Account Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="123456789" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="swiftCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>SWIFT Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="ABABUS33" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bankName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bank Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Chase Bank" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bankAddress"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bank Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="123 Banking St, New York, NY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      
                      {selectedTransferType === "P2P" && (
                        <FormField
                          control={form.control}
                          name="recipientIdentifier"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Recipient Email or Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="kimjoon@example.com or +1234567890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <FormField
                        control={form.control}
                        name="memo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Memo (Optional)</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Rent payment, gift, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text"
                      >
                        Continue
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
            
            {showPinConfirmation && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Confirm PIN</CardTitle>
                  <CardDescription>
                    Enter your 4-digit PIN to authorize this transaction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <p className="font-medium mb-2">Transaction Summary</p>
                    <div className="bg-muted p-4 rounded-md">
                      <div className="grid grid-cols-2 gap-2">
                        <p className="text-sm text-muted-foreground">Type:</p>
                        <p className="text-sm font-medium">{currentTransaction?.transferType}</p>
                        <p className="text-sm text-muted-foreground">Amount:</p>
                        <p className="text-sm font-medium">{formatCurrency(currentTransaction?.amount || 0)}</p>
                        <p className="text-sm text-muted-foreground">Recipient:</p>
                        <p className="text-sm font-medium">
                          {currentTransaction?.transferType === "P2P" 
                            ? currentTransaction?.recipientIdentifier 
                            : currentTransaction?.recipientName}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Enter 4-Digit PIN</Label>
                      <Input
                        type="password"
                        placeholder="••••"
                        maxLength={4}
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="text-center text-xl"
                      />
                    </div>
                    <Button 
                      onClick={verifyPin} 
                      className="w-full bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text"
                      disabled={isLoading}
                    >
                      {isLoading ? "Verifying..." : "Confirm Transaction"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowPinConfirmation(false)} 
                      className="w-full"
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
           {showLoadingAnimation && (
  <Card className="animate-fade-in">
    <CardHeader>
      <CardTitle className="text-center">Processing Transaction</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-8">
        {/* Animated circle with progress */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Animated progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#f59e0b" // Using your bank gold color
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * loadingProgress) / 100}
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{loadingProgress}%</span>
        </div>
      </div>
      
      {/* Animated dots */}
      <div className="flex space-x-2 mb-6">
        {[1, 2, 3].map((dot) => (
          <div
            key={dot}
            className="w-3 h-3 rounded-full bg-bank-gold"
            style={{
              animation: `pulse 1.5s infinite ${dot * 0.2}s`,
            }}
          />
        ))}
      </div>
      
      <p className="text-muted-foreground text-center">
        Please wait while we process your transaction...
        <br />
        This may take a few moments
      </p>
      
      {/* Add some keyframes for the animation (you should add this to your global CSS) */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </CardContent>
  </Card>
)}
            
            {showCompletion && currentTransaction && (
              <Card className="animate-fade-in">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <CardTitle className="text-green-500 text-2xl">Completed</CardTitle>
                  <CardDescription>Your transaction has been processed successfully</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-center mb-1">Transaction Receipt</h3>
                    <p className="text-sm text-center text-muted-foreground mb-6">
                      Nivalus Bank - Your Trusted Financial Partner
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transaction ID:</span>
                        <span className="font-medium">{currentTransaction.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date & Time:</span>
                        <span className="font-medium">{formatDate(currentTransaction.date_time)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Method:</span>
                        <span className="font-medium">{currentTransaction.transferType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium text-green-500">Completed</span>
                      </div>
                      
                      <div className="border-t pt-3 mt-3">
                        <p className="font-medium mb-1">Sender</p>
                        <div className="pl-3 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Username:</span>
                            <span>{currentUser?.username || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <span>{currentUser?.email || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Account:</span>
                            <span>****{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-3 mt-3">
                        <p className="font-medium mb-1">Receiver</p>
                        <div className="pl-3 space-y-1">
                          {currentTransaction.transferType === "P2P" ? (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                {currentTransaction.recipientIdentifier?.includes('@') ? 'Email:' : 'Phone:'}
                              </span>
                              <span>{currentTransaction.recipientIdentifier}</span>
                            </div>
                          ) : (
                            <>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Name:</span>
                                <span>{currentTransaction.recipientName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Account:</span>
                                <span>****{currentTransaction.accountNumber?.slice(-4) || '0000'}</span>
                              </div>
                              {currentTransaction.transferType === "Wire Transfer" && (
                                <>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">SWIFT Code:</span>
                                    <span>{currentTransaction.swiftCode}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Bank:</span>
                                    <span>{currentTransaction.bankName}</span>
                                  </div>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Amount:</span>
                          <span>{formatCurrency(currentTransaction.amount)}</span>
                        </div>
                        {currentTransaction.memo && (
                          <div className="flex justify-between mt-2">
                            <span className="text-muted-foreground">Memo:</span>
                            <span>{currentTransaction.memo}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={printReceipt} 
                      variant="outline" 
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <Printer className="h-4 w-4" />
                      Print Receipt
                    </Button>
                    <Button 
                      onClick={() => navigate('/dashboard')} 
                      className="flex-1 bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text"
                    >
                      Close
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </ErrorBoundary>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}