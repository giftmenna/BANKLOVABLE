import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  FileText, Leaf, Globe, Sun, Trees, Recycle, 
  Factory, ArrowRight, Download, CheckCircle, BarChart2 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function SustainabilityReport() {
  const goals = [
    { name: "Carbon Neutral Operations", progress: 42, target: "2030" },
    { name: "Paperless Transactions", progress: 95, target: "Achieved" },
    { name: "Renewable Energy Usage", progress: 68, target: "2027" },
    { name: "Women-Led Business Loans", progress: 35, target: "2025" }
  ];

  const reportSections = [
    {
      title: "Environmental Impact",
      icon: <Leaf className="h-5 w-5 text-bank-gold" />,
      metrics: [
        { name: "CO2 Reduced", value: "12,450 tons" },
        { name: "Trees Planted", value: "1.2 million" },
        { name: "Paper Saved", value: "48 tons" }
      ]
    },
    {
      title: "Social Impact",
      icon: <Globe className="h-5 w-5 text-bank-gold" />,
      metrics: [
        { name: "Financial Literacy Trained", value: "48,000 people" },
        { name: "Community Projects Funded", value: "217" },
        { name: "Women Entrepreneurs Supported", value: "5,600" }
      ]
    },
    {
      title: "Governance",
      icon: <FileText className="h-5 w-5 text-bank-gold" />,
      metrics: [
        { name: "ESG Training Hours", value: "12,000" },
        { name: "Ethical Audits Completed", value: "84" },
        { name: "Diversity in Leadership", value: "42%" }
      ]
    }
  ];

  return (
    <Layout>
      <Navbar />
      
      <section className="py-16 bg-gradient-to-b from-secondary/10 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-2/3">
              <div className="flex items-center mb-6">
                <div className="bg-bank-gold/10 p-2 rounded-full mr-4">
                  <FileText className="h-6 w-6 text-bank-gold" />
                </div>
                <span className="text-sm font-medium text-bank-gold">ANNUAL REPORT</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">2025 Sustainability Report</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Measuring our progress toward building a more sustainable financial future
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text">
                  <Link to="#full-report">
                    <BarChart2 className="h-5 w-5 mr-2" />
                    View Key Metrics
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/login" download>
                    <Download className="h-5 w-5 mr-2" />
                    Download Full Report (PDF)
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 bg-bank-gold/5 rounded-xl p-8 border border-bank-gold/20">
              <h3 className="text-lg font-semibold mb-4">Report Highlights</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-bank-gold mr-2 mt-0.5" />
                  <span>95% paperless adoption across all services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-bank-gold mr-2 mt-0.5" />
                  <span>₦2.8 billion in green loans disbursed</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-bank-gold mr-2 mt-0.5" />
                  <span>42% reduction in operational carbon footprint</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="full-report" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {reportSections.map((section, index) => (
              <div key={index} className="bg-secondary/5 rounded-xl p-6 hover:shadow-md transition-all">
                <div className="flex items-center mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold ml-2">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.metrics.map((metric, i) => (
                    <div key={i} className="border-b border-secondary/10 pb-4 last:border-0">
                      <p className="text-muted-foreground text-sm">{metric.name}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Progress Toward Our Goals</h2>
            <div className="space-y-8">
              {goals.map((goal, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{goal.name}</h3>
                    <span className="text-bank-gold">{goal.progress}% ({goal.target})</span>
                  </div>
                  <Progress value={goal.progress} className="h-3" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-bank-gold/5 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Sun className="h-5 w-5 text-bank-gold mr-2" />
                Renewable Energy Projects
              </h3>
              <p className="mb-6">
                We've funded 14 solar farms and 3 wind energy projects, generating enough clean energy to power 12,000 homes annually.
              </p>
              <Button variant="outline" asChild className="border-bank-gold text-bank-gold hover:bg-bank-gold/10">
                <Link to="/green-investments">
                  View Energy Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-bank-gold/5 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Trees className="h-5 w-5 text-bank-gold mr-2" />
                Reforestation Program
              </h3>
              <p className="mb-6">
                Partnering with local communities to restore 5,000 acres of degraded land through our sustainable banking program.
              </p>
              <Button variant="outline" asChild className="border-bank-gold text-bank-gold hover:bg-bank-gold/10">
                <Link to="/forex/demo">
                  Learn About Our Forests <ArrowRight className="ml-2 h-4 w-4" />
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