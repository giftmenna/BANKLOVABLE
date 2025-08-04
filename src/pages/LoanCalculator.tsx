import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart2 } from "lucide-react";

// Define interface for amortization data
interface AmortizationData {
  year: number;
  principal: string;
  interest: string;
  balance: string;
}

const LoanCalculator: React.FC = () => {
  // State for loan parameters and results with TypeScript types
  const [principal, setPrincipal] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [monthlyPayment, setMonthlyPayment] = useState<string | null>(null);
  const [totalInterest, setTotalInterest] = useState<string | null>(null);
  const [totalCost, setTotalCost] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  // Calculate loan details
  const calculateLoan = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const p = parseFloat(principal);
    const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const n = parseInt(loanTerm) * 12; // Total months

    if (!p || !r || !n || p <= 0 || r <= 0 || n <= 0) {
      setError('Please enter valid positive numbers for all fields.');
      setMonthlyPayment(null);
      setTotalInterest(null);
      setTotalCost(null);
      return;
    }

    // Monthly payment formula: P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthly = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthly * n;
    const interestPaid = totalPaid - p;

    setMonthlyPayment(monthly.toFixed(2));
    setTotalInterest(interestPaid.toFixed(2));
    setTotalCost(totalPaid.toFixed(2));
  };

  // Generate simple amortization data for visualization
  const generateAmortizationData = (): AmortizationData[] => {
    if (!monthlyPayment || !principal || !interestRate || !loanTerm) return [];

    const p = parseFloat(principal);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseInt(loanTerm) * 12;
    const data: AmortizationData[] = [];
    let remainingBalance = p;

    for (let i = 0; i < n && remainingBalance > 0; i++) {
      const interestPayment = remainingBalance * r;
      const principalPayment = parseFloat(monthlyPayment) - interestPayment;
      remainingBalance -= principalPayment;

      if (i % 12 === 0) { // Sample data yearly for simplicity
        data.push({
          year: i / 12 + 1,
          principal: principalPayment.toFixed(2),
          interest: interestPayment.toFixed(2),
          balance: Math.max(0, remainingBalance).toFixed(2),
        });
      }
    }

    return data;
  };

  // Render simple bar chart for amortization
  const renderAmortizationChart = () => {
    const data = generateAmortizationData();
    if (data.length === 0) return null;

    const maxValue = Math.max(...data.map(d => parseFloat(d.principal) + parseFloat(d.interest)));
    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Amortization Breakdown (Yearly)</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-16 text-right">Year {item.year}</div>
              <div className="flex-1">
                <div className="flex gap-2">
                  <div
                    className="bg-bank-gold h-4"
                    style={{ width: `${(parseFloat(item.principal) / maxValue) * 100}%` }}
                    title={`Principal: $${item.principal}`}
                  ></div>
                  <div
                    className="bg-red-500 h-4"
                    style={{ width: `${(parseFloat(item.interest) / maxValue) * 100}%` }}
                    title={`Interest: $${item.interest}`}
                  ></div>
                </div>
              </div>
              <div className="w-24 text-right">Balance: ${item.balance}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-bank-gold mr-2"></div>
            <span>Principal</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 mr-2"></div>
            <span>Interest</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Loan Calculator
        </h1>

        {/* Loan Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Enter Loan Details
          </h2>
          <form onSubmit={calculateLoan} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="principal" className="text-gray-900 dark:text-white">
                Loan Amount ($)
              </Label>
              <Input
                id="principal"
                type="number"
                value={principal}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrincipal(e.target.value)}
                placeholder="Enter loan amount"
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
                className="mt-1"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="loanTerm" className="text-gray-900 dark:text-white">
                Loan Term (Years)
              </Label>
              <Input
                id="loanTerm"
                type="number"
                value={loanTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoanTerm(e.target.value)}
                placeholder="Enter loan term"
                className="mt-1"
                min="0"
                step="1"
              />
            </div>
            <div className="sm:col-span-2">
              <Button
                type="submit"
                className="w-full bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text flex items-center justify-center"
              >
                <BarChart2 className="h-5 w-5 mr-2" />
                Calculate Loan
              </Button>
            </div>
          </form>
          {error && (
            <p className="mt-4 text-red-500 text-center">{error}</p>
          )}
        </div>

        {/* Results Section */}
        {monthlyPayment && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Loan Summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Monthly Payment
                </h3>
                <p className="text-2xl font-bold text-bank-gold">${monthlyPayment}</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total Interest
                </h3>
                <p className="text-2xl font-bold text-bank-gold">${totalInterest}</p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total Cost
                </h3>
                <p className="text-2xl font-bold text-bank-gold">${totalCost}</p>
              </div>
            </div>
          </div>
        )}

        {/* Amortization Chart */}
        {monthlyPayment && renderAmortizationChart()}
      </div>
    </div>
  );
};

export default LoanCalculator;