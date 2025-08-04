import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Leaf, TreePine, Sun, Recycle, Sprout, Banknote, 
  BadgePercent, Shield, Globe, CheckCircle, ArrowRight 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SustainableAccounts() {
  const accountTypes = [
    {
      title: "Green Savings Account",
      apy: "3.25%",
      description: "Earn competitive interest while funding renewable energy projects",
      features: [
        "Plant 5 trees when you open account",
        "0.1% of balance donated to conservation",
        "Paperless banking only"
      ],
      icon: <TreePine className="h-8 w-8 text-bank-gold" />
    },
    {
      title: "Social Impact Checking",
      apy: "1.75%",
      description: "Round up transactions to donate to vetted charities",
      features: [
        "Choose from 20+ causes",
        "Tax deductible donations",
        "Fee-free overdraft protection"
      ],
      icon: <Globe className="h-8 w-8 text-bank-gold" />
    },
    {
      title: "Sustainable Business Account",
      apy: "2.50%",
      description: "For eco-conscious businesses with green certifications",
      features: [
        "Carbon offset reporting",
        "Sustainable vendor network",
        "Green business loans"
      ],
      icon: <Sprout className="h-8 w-8 text-bank-gold" />
    }
  ];

  return (
    <Layout>
      <Navbar />
      
      <section className="py-16 bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-bank-gold">Sustainable</span> Banking Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Align your finances with your values through our purpose-driven accounts
            </p>
          </div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full md:w-1/2 mx-auto grid-cols-2 bg-secondary/10">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="mt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {accountTypes.slice(0, 2).map((account, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all hover:translate-y-[-4px]">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="bg-bank-gold/10 p-3 rounded-full">
                          {account.icon}
                        </div>
                        <span className="text-xl font-bold text-bank-gold">{account.apy} APY*</span>
                      </div>
                      <CardTitle className="mt-6 text-2xl">{account.title}</CardTitle>
                      <CardDescription>{account.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {account.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-bank-gold mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text">
                        <Link to={`/green-investments/${account.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          Open Account <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="border-2 border-bank-gold/30 bg-bank-gold/5">
                  <CardHeader>
                    <div className="bg-bank-gold/20 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                      <BadgePercent className="h-6 w-6 text-bank-gold" />
                    </div>
                    <CardTitle className="mt-6 text-2xl">Bundle & Save</CardTitle>
                    <CardDescription>Combine accounts for extra benefits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6">
                      Get 0.25% additional APY when you open both sustainable accounts
                    </p>
                    <Button variant="outline" asChild className="w-full border-bank-gold text-bank-gold hover:bg-bank-gold/10">
                      <Link to="/green-investments">
                        Learn About Bundles <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="business" className="mt-12">
              {/* Business account content */}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-bank-gold/10 to-transparent rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">How Your Money Makes a Difference</h2>
                <p className="text-lg mb-6">
                  For every sustainable account opened, we commit to:
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-bank-gold mr-2 mt-1 flex-shrink-0" />
                    <span>Planting 5 trees in deforested areas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-bank-gold mr-2 mt-1 flex-shrink-0" />
                    <span>Funding 1 hour of financial education in rural schools</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-bank-gold mr-2 mt-1 flex-shrink-0" />
                    <span>Donating ₦500 to clean water projects</span>
                  </li>
                </ul>
                <Button asChild variant="outline" className="border-bank-gold text-bank-gold hover:bg-bank-gold/10">
                  <Link to="/sustainability-report">
                    See Full Impact Report <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <div className="bg-bank-gold/5 rounded-xl p-8 border border-bank-gold/20">
                  <h3 className="text-xl font-semibold mb-4">Sustainable Banking Benefits</h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Shield className="h-6 w-6 text-bank-gold mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">Same Security</h4>
                        <p className="text-muted-foreground text-sm">
                          All the protection of regular accounts with added impact
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Banknote className="h-6 w-6 text-bank-gold mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">Competitive Rates</h4>
                        <p className="text-muted-foreground text-sm">
                          Often higher yields than conventional accounts
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Recycle className="h-6 w-6 text-bank-gold mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">Transparent Impact</h4>
                        <p className="text-muted-foreground text-sm">
                          Quarterly reports show exactly where funds are allocated
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}