import { useState, useEffect, Component, ErrorInfo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";
import "chartjs-chart-financial";
import { DollarSign, ArrowRight } from "lucide-react";
import "chartjs-adapter-date-fns";
import { Chart as ReactChart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement,
  Tooltip,
  Legend
);

// Error Boundary Component
interface ChartErrorBoundaryProps {
  children: React.ReactNode;
}

interface ChartErrorBoundaryState {
  hasError: boolean;
}

class ChartErrorBoundary extends Component<ChartErrorBoundaryProps, ChartErrorBoundaryState> {
  state: ChartErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ChartErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Chart rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-6 bg-red-100 dark:bg-red-900 rounded-xl">
          <p className="text-red-700 dark:text-red-200">
            Unable to render chart. Please try again later.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ForexDemo() {
  const [virtualBalance, setVirtualBalance] = useState(100000); // Default ₦100,000
  const [currencyPairs, setCurrencyPairs] = useState([
    { pair: "EUR/USD", basePrice: 1.0854 },
    { pair: "GBP/USD", basePrice: 1.2701 },
    { pair: "USD/JPY", basePrice: 151.82 },
    { pair: "AUD/USD", basePrice: 0.6612 },
    { pair: "USD/CAD", basePrice: 1.3580 },
  ]);

  // Update prices every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrencyPairs((prev) =>
        prev.map((currency) => {
          const fluctuation = (Math.random() * 0.002 - 0.001).toFixed(4);
          return { ...currency, basePrice: currency.basePrice + parseFloat(fluctuation) };
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mock candlestick data for EUR/USD (last 10 minutes)
  const chartData = {
    datasets: [
      {
        label: "EUR/USD",
        data: Array.from({ length: 10 }, (_, i) => {
          const base = 1.0854 + (i * 0.0005);
          const time = new Date("2025-05-19T06:00:00Z");
          time.setMinutes(time.getMinutes() + i);
          return {
            x: time.toISOString(),
            o: base - 0.0002,
            h: base + 0.0003,
            l: base - 0.0003,
            c: base,
          };
        }),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) => `Open: ${context.raw.o.toFixed(4)} Close: ${context.raw.c.toFixed(4)}`,
        },
      },
    },
    scales: {
      x: {
        type: "timeseries" as const,
        time: {
          unit: "minute" as const,
          displayFormats: { minute: "HH:mm" },
        },
        title: { display: true, text: "Time" },
      },
      y: {
        title: { display: true, text: "Price" },
      },
    },
  };

  const handleTrade = (pair: string, action: "buy" | "sell", price: string) => {
    alert(`${action.charAt(0).toUpperCase() + action.slice(1)} order placed for ${pair} at ${price} with virtual balance ₦${virtualBalance.toLocaleString()}`);
  };

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value.replace(/[^0-9.]/g, ""));
    if (!isNaN(value) && value >= 10000) {
      setVirtualBalance(value);
    }
  };

  return (
    <Layout>
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Try Forex Trading with a <span className="text-bank-gold">Demo Account</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience forex trading risk-free with our demo account. Practice with virtual funds and explore real-time market data.
            </p>
          </section>

          {/* Trading Interface */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trading Table */}
            <div className="lg:col-span-2">
              <div className="bg-background rounded-xl shadow-md overflow-hidden">
                <div className="grid grid-cols-12 bg-secondary/30 font-semibold p-4 border-b">
                  <div className="col-span-3">Currency Pair</div>
                  <div className="col-span-2 text-right">Current Price</div>
                  <div className="col-span-2 text-right">Buy At (+0.1%)</div>
                  <div className="col-span-2 text-right">Sell At (+0.2%)</div>
                  <div className="col-span-3 text-center">Action</div>
                </div>
                {currencyPairs.map((currency) => {
                  const currentPrice = currency.basePrice.toFixed(4);
                  const buyPrice = (currency.basePrice * 1.001).toFixed(4);
                  const sellPrice = (currency.basePrice * 1.002).toFixed(4);
                  return (
                    <div key={currency.pair} className="grid grid-cols-12 items-center p-4 border-b last:border-0 hover:bg-secondary/10">
                      <div className="col-span-3 font-medium">{currency.pair}</div>
                      <div className="col-span-2 text-right">{currentPrice}</div>
                      <div className="col-span-2 text-right text-green-500">{buyPrice}</div>
                      <div className="col-span-2 text-right text-red-500">{sellPrice}</div>
                      <div className="col-span-3 flex justify-center gap-2">
                        <Button
                          variant="outline"
                          className="bg-green-500/10 hover:bg-green-500/20 text-green-600 border-green-500/30 h-8"
                          onClick={() => handleTrade(currency.pair, "buy", buyPrice)}
                        >
                          Buy
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-600 border-red-500/30 h-8"
                          onClick={() => handleTrade(currency.pair, "sell", sellPrice)}
                        >
                          Sell
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Virtual Balance Form */}
            <div className="bg-background rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Demo Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="balance">Virtual Balance (₦)</Label>
                  <Input
                    id="balance"
                    type="text"
                    value={`₦${virtualBalance.toLocaleString()}`}
                    onChange={handleBalanceChange}
                    className="mt-1 border-gray-300 dark:border-gray-600"
                    placeholder="Enter balance (min ₦10,000)"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Your virtual balance: <span className="font-semibold">₦{virtualBalance.toLocaleString()}</span>
                </p>
                <Button
                  className="w-full bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text"
                  onClick={() => alert(`Demo account set with ₦${virtualBalance.toLocaleString()}`)}
                >
                  Start Trading
                </Button>
              </div>
            </div>
          </section>

          {/* Chart Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">EUR/USD Price Chart</h2>
            <ChartErrorBoundary>
              <div className="bg-background rounded-xl p-6 shadow-md">
                <ReactChart type="candlestick" data={chartData} options={chartOptions} />
              </div>
            </ChartErrorBoundary>
          </section>

          {/* Disclaimer and CTAs */}
          <section className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-6">
              <span className="font-semibold">Forex trading involves significant risk of loss.</span> This demo account uses virtual funds and does not reflect real market conditions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text px-6 py-2 rounded-full">
                <Link to="/signup">
                  Open Real Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-bank-gold text-bank-gold hover:bg-bank-gold/10">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}