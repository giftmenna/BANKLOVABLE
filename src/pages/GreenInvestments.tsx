import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Leaf, Sun, Wind, Droplets, Recycle, Zap, 
  ArrowRight, BarChart2, BadgePercent, Shield 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function GreenInvestments() {
  const investmentOptions = [
    {
      category: "Renewable Energy",
      options: [
        {
          name: "Solar Farm Fund",
          return: "7.2%",
          risk: "Medium",
          description: "Invest in large-scale solar energy projects across Africa",
          icon: <Sun className="h-6 w-6 text-bank-gold" />
        },
        {
          name: "Wind Energy Bonds",
          return: "5.8%",
          risk: "Low",
          description: "Fixed-income securities funding wind turbine installations",
          icon: <Wind className="h-6 w-6 text-bank-gold" />
        }
      ]
    },
    {
      category: "Sustainable Infrastructure",
      options: [
        {
          name: "Green Real Estate Trust",
          return: "6.5%",
          risk: "Medium",
          description: "Invest in LEED-certified commercial properties",
          icon: <Recycle className="h-6 w-6 text-bank-gold" />
        },
        {
          name: "Clean Water Initiative",
          return: "4.9%",
          risk: "Low",
          description: "Fund water purification plants in underserved communities",
          icon: <Droplets className="h-6 w-6 text-bank-gold" />
        }
      ]
    }
  ];

  return (
    <Layout>
      <Navbar />
      
      <section className="py-16 bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-bank-gold">Green</span> Investment Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Grow your wealth while supporting environmental and social progress
            </p>
          </div>

          <Tabs defaultValue="renewable-energy" className="w-full">
            <TabsList className="flex overflow-x-auto py-2 bg-secondary/10">
              {investmentOptions.map((category, index) => (
                <TabsTrigger 
                  key={index}
                  value={category.category.toLowerCase().replace(/\s+/g, '-')}
                  className="whitespace-nowrap"
                >
                  {category.category}
                </TabsTrigger>
              ))}
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="impact">Our Impact</TabsTrigger>
            </TabsList>
            
            {investmentOptions.map((category, index) => (
              <TabsContent 
                key={index} 
                value={category.category.toLowerCase().replace(/\s+/g, '-')} 
                className="mt-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {category.options.map((option, i) => (
                    <Card key={i} className="hover:shadow-lg transition-all hover:translate-y-[-4px]">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="bg-bank-gold/10 p-3 rounded-full">
                            {option.icon}
                          </div>
                          <div className="text-right">
                            <span className="block text-xl font-bold text-bank-gold">{option.return}</span>
                            <span className="text-sm text-muted-foreground">Avg. annual return</span>
                          </div>
                        </div>
                        <CardTitle className="mt-6 text-2xl">{option.name}</CardTitle>
                        <CardDescription>{option.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between mb-6">
                          <div>
                            <span className="block text-sm text-muted-foreground">Risk Level</span>
                            <span className="font-medium">{option.risk}</span>
                          </div>
                          <div>
                            <span className="block text-sm text-muted-foreground">Minimum</span>
                            <span className="font-medium">₦500,000</span>
                          </div>
                          <div>
                            <span className="block text-sm text-muted-foreground">ESG Rating</span>
                            <span className="font-medium">AA+</span>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Button asChild className="flex-1 bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text">
                            <Link to="/login">
                              Invest Now
                            </Link>
                          </Button>
                          <Button variant="outline" asChild className="flex-1">
                            <Link to="/login">
                              Details
                            </Link>
                          </Button>
                        </div>
                      </CardContent> 
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}

            <TabsContent value="performance" className="mt-8">
              {/* Performance content */}
            </TabsContent>

            <TabsContent value="impact" className="mt-8">
              {/* Impact content */}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-bank-gold/10 to-transparent rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Why Choose Green Investments?</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Shield className="h-6 w-6 text-bank-gold mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">Future-Proof</h3>
                      <p className="text-muted-foreground">
                        Sustainable sectors show consistent growth as global priorities shift
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <BadgePercent className="h-6 w-6 text-bank-gold mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">Competitive Returns</h3>
                      <p className="text-muted-foreground">
                        Our green portfolio averages 6.2% returns over 5 years
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <BarChart2 className="h-6 w-6 text-bank-gold mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium mb-1">Transparent Impact</h3>
                      <p className="text-muted-foreground">
                        Quarterly reports detail exactly where your money is working
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 bg-bank-gold/5 rounded-xl p-8 border border-bank-gold/20">
                <h3 className="text-xl font-semibold mb-4">Schedule a Consultation</h3>
                <p className="text-muted-foreground mb-6">
                  Our sustainable investment specialists can help you build a portfolio aligned with your values and goals.
                </p>
                <Button asChild className="w-full bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text">
                  <Link to="/contact">
                    Book Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}