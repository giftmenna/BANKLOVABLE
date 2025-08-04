import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Interface for budget items
interface BudgetItem {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const BudgetPlanner: React.FC = () => {
  // State management
  const [incomes, setIncomes] = useState<BudgetItem[]>([]);
  const [expenses, setExpenses] = useState<BudgetItem[]>([]);
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [error, setError] = useState<string>('');

  // Categories
  const incomeCategories = ['Salary', 'Freelance', 'Investments', 'Other'];
  const expenseCategories = ['Rent', 'Utilities', 'Groceries', 'Transportation', 'Entertainment', 'Other'];

  // Calculations
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const parsedAmount = parseFloat(amount);
    if (!description || !parsedAmount || parsedAmount <= 0 || !category) {
      setError('Please fill all fields with valid values.');
      return;
    }

    const newItem: BudgetItem = {
      id: Date.now(),
      description,
      amount: parsedAmount,
      category,
    };

    if (type === 'income') {
      setIncomes([...incomes, newItem]);
    } else {
      setExpenses([...expenses, newItem]);
    }

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('');
  };

  const deleteItem = (id: number, type: 'income' | 'expense') => {
    if (type === 'income') {
      setIncomes(incomes.filter(item => item.id !== id));
    } else {
      setExpenses(expenses.filter(item => item.id !== id));
    }
  };

  // Chart configuration
  const chartData = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [
      {
        label: 'Budget Overview ($)',
        data: [totalIncome, totalExpenses, balance],
        backgroundColor: ['#22c55e', '#ef4444', '#3b82f6'],
        borderColor: ['#16a34a', '#dc2626', '#2563eb'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Budget Planner
        </h1>

        {/* Form Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Add Income or Expense
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="0"
                step="0.01"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {(type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type">Type</Label>
              <Select value={type} onValueChange={(value: 'income' | 'expense') => setType(value)}>
                <SelectTrigger id="type" className="mt-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Item
              </Button>
            </div>
          </form>
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>

        {/* Summary Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
          {/* ... Rest of your component code ... */}
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;