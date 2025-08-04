import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Users, Star, Laptop, Globe } from "lucide-react";

export default function Careers() {
  const jobOpenings = [
    {
      title: "Senior Software Engineer",
      department: "Technology",
      location: "New York, NY (Remote Available)",
      description: "Join our digital banking team to build next-generation financial products that serve millions of customers worldwide.",
      requirements: ["5+ years of software development experience", "Experience with React, Node.js", "Financial industry experience a plus"],
    },
    {
      title: "Financial Analyst",
      department: "Finance",
      location: "Chicago, IL",
      description: "Help us analyze financial data, prepare reports, and make recommendations to optimize our operations and investments.",
      requirements: ["Bachelor's degree in Finance or related field", "3+ years of financial analysis experience", "Strong analytical skills"],
    },
    {
      title: "Customer Success Manager",
      department: "Customer Support",
      location: "Remote",
      description: "Be the voice of our customers and ensure they have an outstanding experience with our banking products and services.",
      requirements: ["3+ years in customer success", "Experience with CRM software", "Excellent communication skills"],
    },
    {
      title: "Cybersecurity Specialist",
      department: "Security",
      location: "London, UK",
      description: "Protect our customers' data and financial assets by implementing and maintaining robust security measures.",
      requirements: ["5+ years in cybersecurity", "Relevant certifications (CISSP, CEH, etc.)", "Experience with financial security compliance"],
    },
  ];

  const benefits = [
    { icon: <Star className="h-6 w-6" />, title: "Competitive Salary", description: "We offer top-tier compensation packages that recognize your skills and experience." },
    { icon: <Laptop className="h-6 w-6" />, title: "Remote Work Options", description: "Flexibility to work from anywhere with our hybrid and remote-first positions." },
    { icon: <Users className="h-6 w-6" />, title: "Inclusive Culture", description: "Join a diverse team where everyone's perspective is valued and respected." },
    { icon: <Globe className="h-6 w-6" />, title: "Global Opportunities", description: "Work with teams and customers around the world and make a global impact." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">Join Our Team</h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Nivalus Bank is looking for talented individuals who are passionate about redefining the future of banking. Build your career with us.
            </p>
            <div className="mt-10">
              <a href="#openings" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md font-medium shadow hover:bg-gray-100 transition-colors">
                View Open Positions
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Join Nivalus Bank?</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              We're more than a bank — we're a technology company on a mission to transform how people interact with their finances.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                  {benefit.icon}
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div id="openings" className="bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Open Positions</h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                Discover your next career opportunity at Nivalus Bank.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {jobOpenings.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> {job.department}  •  <MapPin className="h-4 w-4" /> {job.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{job.description}</p>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-500 dark:text-gray-400">
                        {job.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">Don't see the right position? Send us your resume anyway!</p>
              <Button variant="outline">Send General Application</Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Life at Nivalus Bank</h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              Hear from our team members about their experiences working with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 text-lg font-bold">
                  ME
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Mary Edwards</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Software Engineer, 3 years</p>
                </div>
              </div>
              <p className="italic text-gray-600 dark:text-gray-300">
                "The development opportunities at Nivalus Bank have been incredible. I've grown more in my three years here than in my entire previous career."
              </p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 text-lg font-bold">
                  TJ
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Thomas Johnson</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Product Manager, 5 years</p>
                </div>
              </div>
              <p className="italic text-gray-600 dark:text-gray-300">
                "What I love about working here is the impact we have. Our products help millions of people manage their finances better every day."
              </p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 text-lg font-bold">
                  SL
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Sarah Lee</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Customer Success, 2 years</p>
                </div>
              </div>
              <p className="italic text-gray-600 dark:text-gray-300">
                "The culture at Nivalus Bank is unmatched. Everyone is supportive, collaborative, and genuinely cares about our customers and each other."
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}