import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, CheckCircle, CircleDollarSign, History, Printer, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { transactions } from "@/services/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

interface Transaction {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  description: string;
  date_time: string;
  status: string;
  recipient_details?: any;
}

export default function TransactionHistory() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  // Helper functions to determine credit or debit
  const isCredit = (type: string) => {
    const lower = type.toLowerCase();
    return lower.includes("deposit") || lower.includes("credit") || lower.includes("received");
  };
  const isDebit = (type: string) => {
    const lower = type.toLowerCase();
    return lower.includes("withdraw") || lower.includes("debit") || lower.includes("sent") || lower.includes("transfer");
  };

  console.log('Current user:', currentUser);

  const { data: transactionsList = [], isLoading, error } = useQuery({
    queryKey: ['transactions', currentUser?.id],
    queryFn: () => transactions.getByUserId(currentUser?.id || ''),
    enabled: !!currentUser?.id,
    staleTime: 30000,
  });

  console.log('Transactions list:', transactionsList);

  if (error) {
    console.error("Error fetching transactions:", error);
    toast.error("Failed to load transaction history. Please try again.");
  }

  const viewReceipt = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowReceipt(true);
  };

  // Print receipt
  const printReceipt = () => {
    if (!selectedTransaction) return;

    let recipientInfo = "";
    const recipientDetails = selectedTransaction.recipient_details || {};

    if (selectedTransaction.type === "Bank Transfer") {
      recipientInfo = `
Recipient: ${recipientDetails.name || 'N/A'}
Account Number: ****${recipientDetails.accountNumber?.slice(-4) || '0000'}
Routing Number: ${recipientDetails.routingNumber || 'N/A'}`;
    } else if (selectedTransaction.type === "Wire Transfer") {
      recipientInfo = `
Recipient: ${recipientDetails.name || 'N/A'}
Account Number: ****${recipientDetails.accountNumber?.slice(-4) || '0000'}
SWIFT Code: ${recipientDetails.swiftCode || 'N/A'}
Bank Name: ${recipientDetails.bankName || 'N/A'}
Bank Address: ${recipientDetails.bankAddress || 'N/A'}`;
    } else if (selectedTransaction.type === "P2P") {
      const identifier = recipientDetails.identifier || 'N/A';
      recipientInfo = `
Recipient: ${identifier.includes('@') ? 'Email' : 'Phone'}: ${identifier}`;
    }

    const receipt = `
======================================
           TRANSACTION RECEIPT
======================================
Nivalus Bank - Your Trusted Financial Partner

Transaction ID: ${selectedTransaction.id}
Date & Time: ${new Date(selectedTransaction.date_time).toLocaleString()}
Method: ${selectedTransaction.type}
Status: ${selectedTransaction.status}

Sender:
Username: ${currentUser?.username || 'N/A'}
Email: ${currentUser?.email || 'N/A'}
Account: ****${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}

${recipientInfo}

Amount: ${formatCurrency(selectedTransaction.amount)}
${selectedTransaction.description ? `Memo: ${selectedTransaction.description}` : ''}

======================================
        Thank you for banking with us!
======================================
`;

    // Create a Blob and download link
    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${selectedTransaction.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Receipt downloaded successfully!");
  };

  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Transaction History</h1>
              <p className="text-muted-foreground">View all your transactions and receipts</p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="w-full md:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="h-6 w-6 mr-2 text-bank-gold" />
                Your Transactions
              </CardTitle>
              <CardDescription>
                Complete record of all your financial activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="py-8 flex items-center justify-center">
                  <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-bank-gold rounded-full"></div>
                </div>
              ) : transactionsList.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactionsList.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="whitespace-nowrap">
                            <div className="flex items-start gap-2">
                              <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                              <span>{formatDate(transaction.date_time)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`p-1 rounded-full ${
                                isCredit(transaction.type) ? 'bg-green-100 text-green-600' :
                                isDebit(transaction.type) ? 'bg-red-100 text-red-600' :
                                'bg-blue-100 text-blue-600'
                              }`}>
                                <CircleDollarSign className="h-4 w-4" />
                              </div>
                              {transaction.type}
                            </div>
                          </TableCell>
                          <TableCell>
                            {transaction.description || "Transaction"}
                          </TableCell>
                          <TableCell className={`text-right font-medium ${
                            isCredit(transaction.type) ? 'text-green-600' :
                            isDebit(transaction.type) ? 'text-red-600' : ''
                          }`}>
                            {isCredit(transaction.type) ? '+' : isDebit(transaction.type) ? '-' : ''}
                            {formatCurrency(transaction.amount)}
                          </TableCell>
                          <TableCell className="text-right">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {transaction.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => viewReceipt(transaction)}
                              className="hover:text-bank-gold"
                            >
                              View Receipt
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  <History className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No transactions found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Transaction Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transaction Receipt</DialogTitle>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="mt-4 space-y-6">
              <div className="text-center mb-2">
                <p className="text-sm text-muted-foreground">
                  Nivalus Bank - Your Trusted Financial Partner
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-medium">{selectedTransaction.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date & Time:</span>
                  <span className="font-medium">{formatDate(selectedTransaction.date_time)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method:</span>
                  <span className="font-medium">{selectedTransaction.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-green-500">{selectedTransaction.status}</span>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <p className="font-medium mb-1">Sender</p>
                  <div className="pl-3 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Username:</span>
                      <span>{currentUser?.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{currentUser?.email}</span>
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
                    {selectedTransaction.recipient_details ? (
                      <>
                        {selectedTransaction.recipient_details.identifier ? (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              {String(selectedTransaction.recipient_details.identifier).includes('@') 
                                ? 'Email:' 
                                : 'Phone:'}
                            </span>
                            <span>{selectedTransaction.recipient_details.identifier}</span>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Name:</span>
                              <span>{selectedTransaction.recipient_details.name || 'N/A'}</span>
                            </div>
                            {selectedTransaction.recipient_details.accountNumber && (
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Account:</span>
                                <span>****{String(selectedTransaction.recipient_details.accountNumber).slice(-4)}</span>
                              </div>
                            )}
                            {selectedTransaction.type === "Wire Transfer" && selectedTransaction.recipient_details.swiftCode && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">SWIFT Code:</span>
                                  <span>{selectedTransaction.recipient_details.swiftCode}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Bank:</span>
                                  <span>{selectedTransaction.recipient_details.bankName || 'N/A'}</span>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <div className="text-muted-foreground">No recipient details available</div>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Amount:</span>
                    <span className={
                      isCredit(selectedTransaction.type) ? "text-green-600" :
                      isDebit(selectedTransaction.type) ? "text-red-600" : ""
                    }>
                      {isCredit(selectedTransaction.type) ? "+" : isDebit(selectedTransaction.type) ? "-" : ""}
                      {formatCurrency(selectedTransaction.amount)}
                    </span>
                  </div>
                  {selectedTransaction.description && (
                    <div className="flex justify-between mt-2">
                      <span className="text-muted-foreground">Memo:</span>
                      <span>{selectedTransaction.description}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={printReceipt} 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <Printer className="h-4 w-4" />
                  Print Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </Layout>
  );
}