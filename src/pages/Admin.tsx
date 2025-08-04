import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  ArrowRight,
  Settings,
  UserCheck,
  Receipt
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { users, transactions } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

export default function Admin() {
  const { currentUser } = useAuth();
  const [recentActivityCount, setRecentActivityCount] = useState(5);

  // Fetch users
  const { data: usersList, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: users.getAll
  });

  // Fetch transactions
  const { data: transactionList, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: transactions.getAll
  });

  // Calculate today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // User metrics
  const totalUsers = Array.isArray(usersList) ? usersList.length : 0;
  const activeUsers = Array.isArray(usersList) 
    ? usersList.filter((user: any) => user.status === 'Active').length
    : 0;
  const inactiveUsers = totalUsers - activeUsers;

  // Transaction metrics
  const totalTransactions = Array.isArray(transactionList) ? transactionList.length : 0;
  
  const todayTransactionsCount = Array.isArray(transactionList) 
    ? transactionList.filter((trans: any) => {
        const transDate = new Date(trans.date_time);
        transDate.setHours(0, 0, 0, 0);
        return transDate.getTime() === today.getTime();
      }).length
    : 0;

  const totalDeposits = Array.isArray(transactionList) 
    ? transactionList.filter((trans: any) => trans.type === 'Deposit')
    : [];
  
  const totalWithdrawals = Array.isArray(transactionList) 
    ? transactionList.filter((trans: any) => trans.type === 'Withdrawal')
    : [];

  const depositAmount = totalDeposits.reduce((sum: number, trans: any) => 
    sum + parseFloat(trans.amount), 0);
  
  const withdrawalAmount = totalWithdrawals.reduce((sum: number, trans: any) => 
    sum + parseFloat(trans.amount), 0);

  // Format date for display
  const formatTransactionDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy h:mm a");
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  };

  // Load more transactions
  const handleLoadMore = () => {
    setRecentActivityCount(prev => prev + 5);
  };

  return (
    <Layout>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-bank-gold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {currentUser?.fullName || currentUser?.username}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Users Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users className="h-4 w-4 text-bank-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoadingUsers ? "..." : totalUsers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {isLoadingUsers ? "..." : activeUsers} active, {isLoadingUsers ? "..." : inactiveUsers} inactive
                </p>
                <div className="h-1 w-full bg-muted mt-3">
                  <div 
                    className="h-1 bg-bank-gold" 
                    style={{ width: `${isLoadingUsers ? 0 : (activeUsers / Math.max(totalUsers, 1) * 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Transactions Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Transactions
                </CardTitle>
                <CreditCard className="h-4 w-4 text-bank-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoadingTransactions ? "..." : totalTransactions}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {isLoadingTransactions ? "..." : todayTransactionsCount} today
                </p>
              </CardContent>
            </Card>

            {/* Deposits Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Deposits
                </CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${isLoadingTransactions ? "..." : depositAmount.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {isLoadingTransactions ? "..." : totalDeposits.length} deposits
                </p>
              </CardContent>
            </Card>

            {/* Withdrawals Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Withdrawals
                </CardTitle>
                <DollarSign className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${isLoadingTransactions ? "..." : withdrawalAmount.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {isLoadingTransactions ? "..." : totalWithdrawals.length} withdrawals
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Links */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/admin/users" className="w-full">
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center">
                      <UserCheck className="mr-2 h-4 w-4 text-bank-gold" />
                      User Management
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/admin/transactions" className="w-full">
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center">
                      <Receipt className="mr-2 h-4 w-4 text-bank-gold" />
                      Transactions
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/admin/settings" className="w-full">
                  <Button variant="outline" className="w-full justify-between">
                    <span className="flex items-center">
                      <Settings className="mr-2 h-4 w-4 text-bank-gold" />
                      Settings
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingTransactions ? (
                  <div className="flex justify-center items-center p-6">
                    <div className="h-6 w-6 rounded-full border-2 border-bank-gold border-r-transparent animate-spin"></div>
                    <span className="ml-2">Loading transactions...</span>
                  </div>
                ) : !Array.isArray(transactionList) || transactionList.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No transactions found
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactionList
                      .slice(0, recentActivityCount)
                      .map((transaction: any) => (
                        <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full mr-3 ${
                              transaction.type === 'Deposit' 
                                ? 'bg-green-100' 
                                : transaction.type === 'Withdrawal'
                                  ? 'bg-red-100'
                                  : 'bg-blue-100'
                            }`}>
                              <Activity className={`h-4 w-4 ${
                                transaction.type === 'Deposit' 
                                  ? 'text-green-500' 
                                  : transaction.type === 'Withdrawal'
                                    ? 'text-red-500'
                                    : 'text-blue-500'
                              }`} />
                            </div>
                            <div>
                              <div className="font-medium">{transaction.type}</div>
                              <div className="text-sm text-muted-foreground">
                                {transaction.username || "Unknown user"}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-medium ${
                              transaction.type === 'Deposit' 
                                ? 'text-green-500' 
                                : transaction.type === 'Withdrawal'
                                  ? 'text-red-500'
                                  : ''
                            }`}>
                              {transaction.type === 'Withdrawal' ? '-' : ''}
                              ${parseFloat(transaction.amount).toFixed(2)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatTransactionDate(transaction.date_time)}
                            </div>
                          </div>
                        </div>
                      ))}

                    {transactionList.length > recentActivityCount && (
                      <Button 
                        variant="outline" 
                        className="w-full mt-2" 
                        onClick={handleLoadMore}
                      >
                        Load More
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}