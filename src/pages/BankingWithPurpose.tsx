import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Leaf, Users, BookOpen, Handshake, Globe, Shield, 
  Award, HeartHandshake, Lightbulb, CheckCircle, Banknote, Scale, Trees, 
  ArrowDown
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BankingWithPurpose() {
  const impactStats = [
    { value: "₦2.8B", label: "in green loans funded", icon: <Trees className="h-6 w-6" /> },
    { value: "1.2M", label: "trees planted", icon: <Leaf className="h-6 w-6" /> },
    { value: "95%", label: "paperless adoption", icon: <BookOpen className="h-6 w-6" /> },
    { value: "48K", label: "financial literacy trainees", icon: <Lightbulb className="h-6 w-6" /> },
  ];

  const initiatives = [
    {
      title: "Green Bonds",
      description: "Invest in environmentally friendly projects with competitive returns",
      icon: <Leaf className="h-8 w-8 text-bank-gold" />,
      progress: 78,
      cta: "Invest Now"
    },
    {
      title: "Women Entrepreneurs Fund",
      description: "Low-interest loans for female-owned businesses",
      icon: <Users className="h-8 w-8 text-bank-gold" />,
      progress: 65,
      cta: "Apply Today"
    },
    {
      title: "Rural Banking Initiative",
      description: "Bringing banking services to underserved communities",
      icon: <Globe className="h-8 w-8 text-bank-gold" />,
      progress: 92,
      cta: "Find Locations"
    }
  ];

  return (
    <Layout>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-bank-gold/10 text-bank-gold mb-6">
              <HeartHandshake className="h-5 w-5 mr-2" />
              <span>Banking with Purpose</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Profit Meets <span className="text-bank-gold">Purpose</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              At Nivalus Bank, we believe finance should be a force for good. Discover how your money creates positive change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text px-8 py-6 text-lg">
                <Link to="/sustainable-accounts">
                  Open Sustainable Account
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-bank-gold text-bank-gold hover:bg-bank-gold/10 px-8 py-6 text-lg">
                <Link to="#our-impact">
                  See Our Impact <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="our-impact" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div 
                key={index}
                className="bg-secondary/10 p-8 rounded-xl text-center hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bank-gold/10 mb-4 mx-auto">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-bank-gold/20 to-transparent rounded-2xl p-1">
                <div className="bg-background rounded-xl p-8">
                  <h2 className="text-3xl font-bold mb-6">Our Sustainable Mission</h2>
                  <p className="text-lg mb-6">
                    We're committed to aligning our business strategy with the United Nations Sustainable Development Goals, focusing on:
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-bank-gold mr-2 mt-1 flex-shrink-0" />
                      <span>Responsible consumption and production</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-bank-gold mr-2 mt-1 flex-shrink-0" />
                      <span>Climate action through green financing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-bank-gold mr-2 mt-1 flex-shrink-0" />
                      <span>Reduced inequalities through financial inclusion</span>
                    </li>
                  </ul>
                  <Button variant="outline" asChild className="border-bank-gold text-bank-gold hover:bg-bank-gold/10">
                    <Link to="/sustainability-report">
                      Read Full Sustainability Report
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-bank-gold/5 to-bank-gold/20 rounded-2xl p-8 h-full">
                <div className="aspect-video bg-background/80 rounded-xl flex items-center justify-center p-8">
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-bank-gold">
                      <Scale className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold">Ethical Banking Pledge</h3>
                    <p className="text-muted-foreground">
                      We never invest in fossil fuels, arms, or exploitative industries
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button variant="secondary" asChild>
                        <Link to="/login">
                          Our Investment Policy
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Tabs */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Key Initiatives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore how we're making a difference through focused programs
            </p>
          </div>

          <Tabs defaultValue="environment" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary/10 h-auto p-2">
              <TabsTrigger 
                value="environment" 
                className="py-4 data-[state=active]:bg-bank-gold/10 data-[state=active]:text-bank-gold"
              >
                <Leaf className="h-5 w-5 mr-2" />
                Environment
              </TabsTrigger>
              <TabsTrigger 
                value="community" 
                className="py-4 data-[state=active]:bg-bank-gold/10 data-[state=active]:text-bank-gold"
              >
                <Users className="h-5 w-5 mr-2" />
                Community
              </TabsTrigger>
              <TabsTrigger 
                value="education" 
                className="py-4 data-[state=active]:bg-bank-gold/10 data-[state=active]:text-bank-gold"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Education
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="environment" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="bg-bank-gold/10 p-3 rounded-full mr-4">
                        <Trees className="h-6 w-6 text-bank-gold" />
                      </div>
                      <CardTitle>Carbon Neutral by 2030</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Our roadmap to eliminate operational carbon emissions through renewable energy, sustainable buildings, and reforestation.
                    </p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress to goal</span>
                        <span>42%</span>
                      </div>
                      <Progress value={42} className="h-2 bg-secondary" />
                    </div>
                    <Button variant="outline" asChild className="border-bank-gold text-bank-gold hover:bg-bank-gold/10">
                      <Link to="/login">View Full Plan</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-center">
                      <div className="bg-bank-gold/10 p-3 rounded-full mr-4">
                        <Banknote className="h-6 w-6 text-bank-gold" />
                      </div>
                      <CardTitle>Green Investment Portfolio</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      ESG-focused investment options that support renewable energy, clean water, and sustainable agriculture.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <Button asChild className="bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text">
                        <Link to="/green-investments">Explore Options</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to="/green-investments">See Performance</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-8">
              {/* Similar structure for community content */}
            </TabsContent>

            <TabsContent value="education" className="mt-8">
              {/* Similar structure for education content */}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Active Initiatives */}
      <section className="py-20 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Join Our Active Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Participate in initiatives that create real change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <div 
                key={index}
                className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:translate-y-[-4px]"
              >
                <div className="bg-bank-gold/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {initiative.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                <p className="text-muted-foreground mb-4">{initiative.description}</p>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Funding progress</span>
                    <span>{initiative.progress}%</span>
                  </div>
                  <Progress value={initiative.progress} className="h-2" />
                </div>
                <Button asChild className="w-full bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text">
                  <Link to={`/green-investments/${initiative.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    {initiative.cta}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bank-gold/20 to-bank-gold/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-background rounded-2xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Bank With Purpose Today</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your money has power. Choose financial services that align with your values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text px-8 py-6 text-lg">
                <Link to="/sustainable-accounts">
                  Open Sustainable Account
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-bank-gold text-bank-gold hover:bg-bank-gold/10 px-8 py-6 text-lg">
                <Link to="/contact">
                  Speak With Our Impact Team
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </Layout>
  );
}