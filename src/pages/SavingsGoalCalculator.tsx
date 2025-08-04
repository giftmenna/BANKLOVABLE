import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target } from "lucide-react";

interface SavingsResult {
  months: number;
  totalContributions: number;
  totalInterest: number;
}

const SavingsGoalCalculator: React.FC = () => {
  // State for inputs and results
  const [goalAmount, setGoalAmount] = useState<string>('');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [result, setResult] = useState<SavingsResult | null>(null);
  const [error, setError] = useState<string>('');

  // Calculate time to reach savings goal with compound interest
  const calculateSavingsGoal = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const goal = parseFloat(goalAmount);
    const monthly = parseFloat(monthlyContribution);
    const annualRate = parseFloat(interestRate) / 100;

    if (!goal || !monthly || !annualRate || goal <= 0 || monthly <= 0 || annualRate < 0) {
      setError('Please enter valid positive numbers for all fields (interest rate can be 0).');
      return;
    }

    // Use compound interest formula: A = P(1 + r/n)^(nt)
    // We solve for t (time in months) where A is goal, P is initial (0), and deposits are monthly
    const monthlyRate = annualRate / 12;
    let balance = 0;
    let months = 0;
    let totalContributions = 0;

    // Simulate monthly contributions with compound interest
    while (balance < goal && months < 1200) { // Cap at 100 years to prevent infinite loop
      balance = balance * (1 + monthlyRate) + monthly;
      totalContributions += monthly;
      months++;
    }

    if (balance < goal) {
      setError('Goal cannot be reached within a reasonable timeframe. Try increasing monthly contributions.');
      return;
    }

    const totalInterest = balance - totalContributions;
    setResult({
      months,
      totalContributions,
      totalInterest,
    });
  };

  // Generate progress data for visualization
  const generateProgressData = (): { month: number; balance: number; contributions: number; interest: number }[] => {
    if (!result) return [];

    const monthly = parseFloat(monthlyContribution);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const data = [];
    let balance = 0;
    let totalContributions = 0;

    for (let i = 1; i <= result.months; i++) {
      balance = balance * (1 + monthlyRate) + monthly;
      totalContributions += monthly;
      if (i % 12 === 0 || i === result.months) { // Sample yearly or at the end
        data.push({
          month: i,
          balance: balance,
          contributions: totalContributions,
          interest: balance - totalContributions,
        });
      }
    }

    return data;
  };

  // Render progress bar chart
  const renderProgressChart = () => {
    const data = generateProgressData();
    if (data.length === 0) return null;

    const maxBalance = Math.max(...data.map(d => d.balance));
    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Savings Progress (Yearly)</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-24 text-right">Month {item.month}</div>
              <div className="flex-1">
                <div className="flex gap-2">
                  <div
                    className="bg-bank-gold h-4"
                    style={{ width: `${(item.contributions / maxBalance) * 100}%` }}
                    title={`Contributions: $${item.contributions.toFixed(2)}`}
                  ></div>
                  <div
                    className="bg-green-500 h-4"
                    style={{ width: `${(item.interest / maxBalance) * 100}%` }}
                    title={`Interest: $${item.interest.toFixed(2)}`}
                  ></div>
                </div>
              </div>
              <div className="w-24 text-right">Balance: ${item.balance.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-bank-gold mr-2"></div>
            <span>Contributions</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 mr-2"></div>
            <span>Interest</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Savings Goal Calculator
        </h1>

        {/* Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Set Your Savings Goal
          </h2>
          <form onSubmit={calculateSavingsGoal} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goalAmount" className="text-gray-900 dark:text-white">
                Goal Amount ($)
              </Label>
              <Input
                id="goalAmount"
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                placeholder="Enter savings goal"
                className="mt-1"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="monthlyContribution" className="text-gray-900 dark:text-white">
                Monthly Contribution ($)
              </Label>
              <Input
                id="monthlyContribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                placeholder="Enter monthly contribution"
                className="mt-1"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="interestRate" className="text-gray-900 dark:text-white">
                Annual Interest Rate (%)
              </Label>
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
                className="mt-1"
                min="0"
                step="0.01"
              />
            </div>
            <div className="sm:col-span-2">
              <Button
                type="submit"
                className="w-full bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text flex items-center justify-center"
              >
                <Target className="h-5 w-5 mr-2" />
                Calculate Savings Goal
              </Button>
            </div>
          </form>
          {error && (
            <p className="mt-4 text-red-500 text-center">{error}</p>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Savings Goal Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Time to Goal
                </h3>
                <p className="text-2xl font-bold text-bank-gold">
                  {result.months} months (~{Math.ceil(result.months / 12)} years)
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total Contributions
                </h3>
                <p className="text-2xl font-bold text-bank-gold">${result.totalContributions.toFixed(2)}</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total Interest Earned
                </h3>
                <p className="text-2xl font-bold text-bank-gold">${result.totalInterest.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Chart */}
        {result && renderProgressChart()}
      </div>
    </div>
  );
};

export default SavingsGoalCalculator;