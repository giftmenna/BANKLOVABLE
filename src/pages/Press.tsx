import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badget";
import { Filter, Download, Calendar, ArrowUpRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Press() {
  const pressReleases = [
    {
      title: "Nivalus Bank Announces Record Q1 2023 Financial Results",
      date: "March 15, 2023",
      category: "Financial Results",
      summary: "Nivalus Bank reported record first-quarter revenues, driven by strong performance in digital banking services and wealth management.",
      link: "#"
    },
    {
      title: "Nivalus Bank Launches Revolutionary Mobile Banking App",
      date: "January 20, 2023",
      category: "Product Launch",
      summary: "Our new mobile banking application offers unprecedented security features and an intuitive user experience designed for today's digital-first customers.",
      link: "#"
    },
    {
      title: "Nivalus Bank Expands International Presence with New Singapore Office",
      date: "December 5, 2022",
      category: "Corporate News",
      summary: "This expansion strengthens our commitment to serving clients across Asia and marks our fifth international location.",
      link: "#"
    },
    {
      title: "Nivalus Bank Named Among 'Top 10 Most Innovative FinTech Companies'",
      date: "October 12, 2022",
      category: "Award",
      summary: "The prestigious industry recognition highlights our commitment to developing cutting-edge financial technologies.",
      link: "#"
    },
    {
      title: "Nivalus Bank Partners with Tech Giant to Enhance Cybersecurity Measures",
      date: "September 3, 2022",
      category: "Partnership",
      summary: "This strategic partnership will implement advanced security protocols to protect customer data and financial transactions.",
      link: "#"
    },
    {
      title: "Nivalus Bank Announces Carbon Neutrality Achievement",
      date: "July 22, 2022",
      category: "Sustainability",
      summary: "We have successfully offset our carbon footprint across all operations, marking a significant milestone in our sustainability journey.",
      link: "#"
    }
  ];

  const mediaContacts = [
    {
      name: "Sarah Johnson",
      title: "Head of Media Relations",
      email: "sarah.johnson@nivalusbank.com",
      phone: "+1 (212) 555-6789"
    },
    {
      name: "Michael Chen",
      title: "VP, Corporate Communications",
      email: "michael.chen@nivalusbank.com",
      phone: "+1 (212) 555-7890"
    }
  ];

  const mediaAssets = [
    {
      title: "Corporate Logos",
      description: "Download our brand logos in various formats (PNG, SVG, EPS)",
      link: "#"
    },
    {
      title: "Executive Headshots",
      description: "High-resolution photos of our executive team",
      link: "#"
    },
    {
      title: "Product Images",
      description: "Screenshots and mockups of our digital banking products",
      link: "#"
    },
    {
      title: "Company Fact Sheet",
      description: "Key facts and statistics about Nivalus Bank (PDF)",
      link: "#"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="bg-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="md:w-2/3">
              <h1 className="text-4xl font-extrabold sm:text-5xl mb-4">Press & Media</h1>
              <p className="text-xl text-indigo-100">
                Find the latest news, press releases, and media resources about Nivalus Bank.
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Press Releases</h2>
            <div className="flex items-center">
              <Button variant="outline" size="sm" className="mr-2">
                <Filter className="h-4 w-4 mr-1" /> Filter
              </Button>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="financial">Financial Results</SelectItem>
                  <SelectItem value="product">Product Launch</SelectItem>
                  <SelectItem value="corporate">Corporate News</SelectItem>
                  <SelectItem value="award">Awards</SelectItem>
                  <SelectItem value="partnership">Partnerships</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">{release.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {release.date}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{release.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {release.summary}
                  </CardDescription>
                </CardContent>
                <CardFooter className="mt-auto pt-4">
                  <Button variant="ghost" className="text-indigo-600 dark:text-indigo-400 p-0 hover:bg-transparent hover:text-indigo-800 dark:hover:text-indigo-300 h-auto">
                    <a href={release.link} className="flex items-center">
                      Read full release <ArrowUpRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline">View All Press Releases</Button>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Media Contacts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mediaContacts.map((contact, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{contact.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400">{contact.title}</p>
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      Email: <a href={`mailto:${contact.email}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">{contact.email}</a>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Phone: <a href={`tel:${contact.phone}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">{contact.phone}</a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 bg-white dark:bg-gray-700 rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Press Inquiries</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                For press inquiries, please email <a href="mailto:press@nivalusbank.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">press@nivalusbank.com</a> or call our press hotline at <a href="tel:+12125551234" className="text-indigo-600 dark:text-indigo-400 hover:underline">+1 (212) 555-1234</a>.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Please include your name, media outlet, deadline, and a brief description of your inquiry. We aim to respond to all media inquiries within 24 hours.
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Media Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaAssets.map((asset, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{asset.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{asset.description}</p>
                <Button variant="outline" size="sm">
                  <a href={asset.link} className="flex items-center">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </a>
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-12 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Brand Guidelines</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our comprehensive brand guidelines include logo usage, color palettes, typography, and more. These guidelines ensure consistent representation of the Nivalus Bank brand across all media.
            </p>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Download Brand Guidelines
            </Button>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Nivalus Bank in the News</h2>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Forbes</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">March 30, 2023</p>
                  </div>
                  <Badge>Featured</Badge>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  "Nivalus Bank's innovative approach to digital banking is setting new standards in the fintech industry."
                </p>
                <Button variant="link" className="mt-2 p-0 h-auto">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-indigo-600 dark:text-indigo-400">
                    Read the article <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Bloomberg</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">February 12, 2023</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  "The CEO of Nivalus Bank discusses the future of banking and the role of AI in financial services."
                </p>
                <Button variant="link" className="mt-2 p-0 h-auto">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-indigo-600 dark:text-indigo-400">
                    Read the article <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
              
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">The Wall Street Journal</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">January 8, 2023</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  "Nivalus Bank's expansion into international markets signals growing confidence in the global economy."
                </p>
                <Button variant="link" className="mt-2 p-0 h-auto">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center text-indigo-600 dark:text-indigo-400">
                    Read the article <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}