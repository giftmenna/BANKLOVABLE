import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Shield, CreditCard, Users, BarChartBig, GraduationCap, Clock, Award, ShieldCheck, Leaf, BookOpen, Calculator } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      <Navbar />
      <br></br>
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-bank-gold/5 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-bank-gold/5 rounded-tr-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="animate-fadeIn">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                  <span className="text-bank-gold">Modern</span> Banking for a{' '}
                  <span className="relative">
                    Better
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-bank-gold/30"></span>
                  </span>{' '}
                  Future
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                  Experience secure, user-friendly, and innovative financial solutions designed for the digital age. Join thousands of satisfied customers at Nivalus Bank.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    asChild 
                    className="bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text px-8 py-6 rounded-full text-lg transform transition-all hover:scale-105"
                  >
                    <Link to="/signup" className="flex items-center justify-center">
                      Get Started 
                      <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    asChild 
                    className="border-bank-gold text-bank-gold hover:bg-bank-gold/10 px-8 py-6 rounded-full text-lg"
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                </div>
                
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div className="flex items-center justify-center lg:justify-start">
                    <Shield className="h-5 w-5 text-bank-gold mr-2" />
                    <span className="text-sm">Bank Grade Security</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start">
                    <Users className="h-5 w-5 text-bank-gold mr-2" />
                    <span className="text-sm">140k+ Business Owners Trust Nivalus Bank</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start col-span-2 sm:col-span-1">
                    <Award className="h-5 w-5 text-bank-gold mr-2" />
                    <span className="text-sm">Award Winning</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 animate-slideIn">
              <div className="relative">
                <div className="bg-gradient-to-br from-bank-gold/20 via-bank-gold/10 to-transparent rounded-2xl p-8 shadow-xl backdrop-blur-sm">
                  <div className="aspect-video bg-background/80 dark:bg-bank-gold/5 rounded-xl flex items-center justify-center p-8">
                    <div className="text-center space-y-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-bank-gold transition-transform hover:scale-110">
                        <span className="text-3xl font-bold text-bank-dark-text">NB</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">Nivalus Bank</h3>
                        <p className="text-muted-foreground">Your trusted financial partner</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-bank-gold/10 p-4 rounded-lg">
                          <CreditCard className="h-6 w-6 text-bank-gold mb-2 mx-auto" />
                          <p className="text-sm">Smart Banking</p>
                        </div>
                        <div className="bg-bank-gold/10 p-4 rounded-lg">
                          <BarChartBig className="h-6 w-6 text-bank-gold mb-2 mx-auto" />
                          <p className="text-sm">Investments</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-bank-gold/10 rounded-full z-[-1] blur-xl"></div>
                <div className="absolute -top-8 -left-8 w-40 h-40 bg-bank-gold/10 rounded-full z-[-1] blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Banking Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer a comprehensive range of financial services tailored to meet your personal and business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4">
                <CreditCard className="h-8 w-8 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personal Banking</h3>
              <p className="text-muted-foreground">
                Checking and savings accounts, credit cards, and personal loans tailored for your needs.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4">
                <BarChartBig className="h-8 w-8 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Investment Services</h3>
              <p className="text-muted-foreground">
                Grow your wealth with our expertly managed investment portfolios and advisory services.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Business Banking</h3>
              <p className="text-muted-foreground">
                Complete financial solutions for businesses of all sizes, from startups to corporations.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4">
                <GraduationCap className="h-8 w-8 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Education Financing</h3>
              <p className="text-muted-foreground">
                Affordable education loans and savings plans to help build a brighter future.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Financial Tools Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Free Financial Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Plan your financial future with our easy-to-use tools, available to everyone—no account required.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-secondary/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4">
                <Calculator className="h-8 w-8 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Budget Planner</h3>
              <p className="text-muted-foreground mb-4">
                Create a personalized budget to track your income and expenses effortlessly.
              </p>
              <Button variant="outline" asChild className="border-bank-gold text-bank-gold hover:bg-bank-gold/10">
                <Link to="/budget-planner">Try Now</Link>
              </Button>
            </div>
            
            <div className="bg-secondary/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4">
                <BarChartBig className="h-8 w-8 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Loan Calculator</h3>
              <p className="text-muted-foreground mb-4">
                Estimate monthly payments and interest for personal or business loans.
              </p>
              <Button variant="outline" asChild className="border-bank-gold text-bank-gold hover:bg-bank-gold/10">
                <Link to="/loan-calculator">Try Now</Link>
              </Button>
            </div>
            
            <div className="bg-secondary/10 rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Savings Goal</h3>
              <p className="text-muted-foreground mb-4">
                Set and track savings goals for vacations, homes, or retirement.
              </p>
              <Button variant="outline" asChild className="border-bank-gold text-bank-gold hover:bg-bank-gold/10">
                <Link to="/savings-goal-calculator">Try Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Nivalus Bank?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience banking that's designed with your needs in mind, offering the perfect balance of security, convenience, and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bank-gold/20 mb-4">
                <Shield className="h-6 w-6 text-bank-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Banking</h3>
              <p className="text-muted-foreground">
                State-of-the-art security measures to keep your money and personal information safe at all times.
              </p>
            </div>
            
            <div className="bg-background rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bank-gold/20 mb-4">
                <CreditCard className="h-6 w-6 text-bank-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Transfers</h3>
              <p className="text-muted-foreground">
                Send money to anyone, anywhere with our simple and intuitive transfer system.
              </p>
            </div>
            
            <div className="bg-background rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bank-gold/20 mb-4">
                <Users className="h-6 w-6 text-bank-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Focused</h3>
              <p className="text-muted-foreground">
                Dedicated support team ready to assist you with any questions or concerns you may have.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30 dark:bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Nivalus Bank in Numbers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our growth reflects our commitment to excellence and customer satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-bank-gold mb-2">140k+</div>
              <p className="text-sm md:text-base text-muted-foreground">Satisfied Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-bank-gold mb-2">25+</div>
              <p className="text-sm md:text-base text-muted-foreground">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-bank-gold mb-2">99.9%</div>
              <p className="text-sm md:text-base text-muted-foreground">Uptime Reliability</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-bank-gold mb-2">50+</div>
              <p className="text-sm md:text-base text-muted-foreground">Banking Locations</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mobile Banking Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Bank Anytime, Anywhere</h2>
              <p className="text-muted-foreground mb-6">
                Our mobile banking app gives you the freedom to manage your finances from anywhere in the world, at any time of day.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-bank-gold mr-2 mt-0.5" />
                  <span>Instant transfers and payments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-bank-gold mr-2 mt-0.5" />
                  <span>Real-time account notifications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-bank-gold mr-2 mt-0.5" />
                  <span>Secure biometric authentication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-bank-gold mr-2 mt-0.5" />
                  <span>24/7 account management</span>
                </li>
              </ul>
              <Button asChild className="mt-6 bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text px-6 py-2 rounded-full">
                <Link to="/download">
                  Download Our App
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-gradient-to-br from-bank-gold/20 to-bank-gold/5 rounded-2xl p-6 shadow-xl">
                  <div className="aspect-video bg-bank-dark-bg dark:bg-bank-gold/10 rounded-xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bank-gold mb-4">
                        <span className="text-2xl font-bold text-bank-dark-text">MB</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Mobile Banking</h3>
                      <p className="text-muted-foreground">Your bank in your pocket</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sustainability and Community Impact Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20 dark:bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Banking with Purpose</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At Nivalus Bank, we’re committed to sustainable banking and empowering our communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bank-gold/20 mb-4">
                <Leaf className="h-6 w-6 text-bank-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Green Banking</h3>
              <p className="text-muted-foreground">
                Support eco-friendly initiatives with our sustainable investment options and paperless banking.
              </p>
            </div>
            
            <div className="bg-background rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bank-gold/20 mb-4">
                <Users className="h-6 w-6 text-bank-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Empowerment</h3>
              <p className="text-muted-foreground">
                We fund financial literacy programs and support local businesses across the world.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild className="border-bank-gold text-bank-gold hover:bg-bank-gold/10">
              <Link to="/banking-with-purpose">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-bank-gold/20 to-bank-gold/5 rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to experience modern banking?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers who trust Nivalus Bank with their financial needs. Get started in minutes.
            </p>
            <Button asChild className="bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text px-6 py-5 md:px-8 md:py-6 rounded-full">
              <Link to="/signup">
                Open an Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-secondary/30 dark:bg-secondary/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what some of our customers have to say about their experience with Nivalus Bank.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background rounded-2xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mr-4">
                  <span className="text-lg font-semibold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-muted-foreground">Business Owner</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Nivalus Bank has transformed how I manage my business finances. The transfers are instant and the customer service is exceptional!"
              </p>
            </div>
            
            <div className="bg-background rounded-2xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mr-4">
                  <span className="text-lg font-semibold">JS</span>
                </div>
                <div>
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-sm text-muted-foreground">Software Developer</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The mobile app is intuitive and the security features give me peace of mind. I've recommended Nivalus to all my colleagues."
              </p>
            </div>
            
            <div className="bg-background rounded-2xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mr-4">
                  <span className="text-lg font-semibold">RJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-muted-foreground">Retired Teacher</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "After 30 years with my previous bank, switching to Nivalus was the best financial decision I've made. Everything is simpler and more transparent."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Awards Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Recognized Excellence</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our commitment to quality has earned us recognition across the financial industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4">
                <Award className="h-8 w-8 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Digital Bank 2025</h3>
              <p className="text-muted-foreground">
                Recognized for our innovative digital banking solutions and customer experience.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4">
                <Shield className="h-8 w-8 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Most Secure Banking Platform</h3>
              <p className="text-muted-foreground">
                Awarded for our exceptional security measures and fraud prevention systems.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Customer Satisfaction Award</h3>
              <p className="text-muted-foreground">
                Five consecutive years of highest customer satisfaction ratings in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Certifications Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Trusted and Certified</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your security is our priority, backed by industry-leading certifications and regulatory compliance.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <ShieldCheck className="h-10 w-10 text-bank-gold mr-3" />
              <span className="text-lg font-semibold">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-10 w-10 text-bank-gold mr-3" />
              <span className="text-lg font-semibold">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-10 w-10 text-bank-gold mr-3" />
              <span className="text-lg font-semibold">EFSR Regulated</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Forex Trading Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Live Forex Market</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trade major currency pairs with real-time pricing. Test our platform with a free demo account.
            </p>
          </div>

          <div className="bg-background rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-12 bg-secondary/30 font-semibold p-4 border-b">
              <div className="col-span-3">Currency Pair</div>
              <div className="col-span-2 text-right">Current Price</div>
              <div className="col-span-2 text-right">Buy At (+0.1%)</div>
              <div className="col-span-2 text-right">Sell At (+0.2%)</div>
              <div className="col-span-3 text-center">Action</div>
            </div>

            {[
              { pair: 'EUR/USD', basePrice: 1.0854 },
              { pair: 'GBP/USD', basePrice: 1.2701 },
              { pair: 'USD/JPY', basePrice: 151.82 },
              { pair: 'AUD/USD', basePrice: 0.6612 },
              { pair: 'USD/CAD', basePrice: 1.3580 },
            ].map((currency) => {
              const fluctuation = (Math.random() * 0.002 - 0.001).toFixed(4);
              const currentPrice = (currency.basePrice + parseFloat(fluctuation)).toFixed(4);
              const buyPrice = (parseFloat(currentPrice) * 1.001).toFixed(4);
              const sellPrice = (parseFloat(currentPrice) * 1.002).toFixed(4);

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
                      onClick={() => alert(`Buy order placed for ${currency.pair} at ${buyPrice}`)}
                    >
                      Buy
                    </Button>
                    <Button 
                      variant="outline" 
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-600 border-red-500/30 h-8"
                      onClick={() => alert(`Sell order placed for ${currency.pair} at ${sellPrice}`)}
                    >
                      Sell
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Prices update every 5 seconds. <span className="font-semibold">Forex trading involves significant risk of loss.</span>
            </p>
            <Button variant="outline" asChild className="border-bank-gold text-bank-gold hover:bg-bank-gold/10">
              <Link to="/forex/demo">Try Demo Account</Link>
            </Button>
          </div>
        </div>
      </section>

<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col lg:flex-row items-center gap-12">
      {/* Card Design */}
      <div className="lg:w-1/2">
        <div className="relative">
          {/* Realistic ValuePlatinum Card Front */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl h-[210px] w-[340px] border border-gray-700 flex flex-col justify-between transform transition-all duration-300 hover:scale-105">
            {/* Card Header */}
            <div className="flex justify-between items-start">
              <span className="text-xl font-bold text-white tracking-wide">ValuePlatinum</span>
              <span className="text-white/80 text-sm">• Ink •</span>
            </div>

            {/* Card Chip and Brand */}
            <div className="flex justify-between items-center">
              <div className="w-12 h-8 bg-gray-500/50 rounded-lg"></div> {/* Simulated Chip */}
              <img src="https://via.placeholder.com/50x30?text=Visa" alt="Visa Logo" className="h-8" /> {/* Replace with actual Visa logo */}
            </div>

            {/* Card Number */}
            <div className="text-white text-lg font-mono tracking-wider">
              1234 5678 9012 3456
            </div>

            {/* Card Holder and Expiration */}
            <div className="text-white/70 text-sm space-y-1">
              <p>Cardholder: JOHN DOE</p>
              <p>Expires: 06/28</p>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gray-700/20 rounded-full z-[-1] blur-xl"></div>
          <div className="absolute -top-6 -left-6 w-40 h-40 bg-gray-700/20 rounded-full z-[-1] blur-xl"></div>
        </div>
      </div>

      {/* Card Details */}
      <div className="lg:w-1/2">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Premium Credit Cards</h2>
        <p className="text-muted-foreground mb-6">
          Our metal cards offer exclusive benefits, higher limits, and premium rewards. 
          Experience luxury banking with no annual fee for the first year.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-start">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-bank-gold mr-3 mt-0.5">
              <svg className="w-3 h-3 text-bank-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>3% cash back on all purchases</span>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-bank-gold mr-3 mt-0.5">
              <svg className="w-3 h-3 text-bank-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>No foreign transaction fees</span>
          </div>
          
          <div className="flex items-start">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 mr-3 mt-0.5"></div>
            <span>Priority customer service</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/dashboard" className="bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text px-6 py-2 rounded-lg text-center transition-colors duration-200">
            Apply Now
          </a>
          <a href="/dashboard" className="border border-bank-gold text-bank-gold hover:bg-bank-gold/10 px-6 py-2 rounded-lg text-center transition-colors duration-200">
            Learn More
          </a>
        </div>
      </div>
    </div>
  </div>
</section>      
      {/* Blog Teaser Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Learn and Grow</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our financial education resources to make informed decisions about your money.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4 inline-flex">
                <BookOpen className="h-6 w-6 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">How to Save for Retirement</h3>
              <p className="text-muted-foreground mb-4">
                Learn practical strategies to build a secure financial future.
              </p>
              <Button variant="link" asChild className="text-bank-gold p-0">
                <Link to="/blog/retirement">Read More</Link>
              </Button>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4 inline-flex">
                <BookOpen className="h-6 w-6 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Understanding Forex Trading</h3>
              <p className="text-muted-foreground mb-4">
                A beginner’s guide to navigating the forex market with confidence.
              </p>
              <Button variant="link" asChild className="text-bank-gold p-0">
                <Link to="/blog/forex">Read More</Link>
              </Button>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="bg-bank-gold/10 p-3 rounded-full mb-4 inline-flex">
                <BookOpen className="h-6 w-6 text-bank-gold" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Budgeting Tips for Students</h3>
              <p className="text-muted-foreground mb-4">
                Manage your finances effectively while pursuing your education.
              </p>
              <Button variant="link" asChild className="text-bank-gold p-0">
                <Link to="/blog/budgeting">Read More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trusted by Industry Leaders Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20 dark:bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our partnerships with leading financial institutions and regulatory bodies ensure the highest standards of security and compliance.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* FDIC */}
            <div className="group">
              <svg className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="80" rx="8" fill="#1E40AF"/>
                <text x="100" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">FDIC</text>
                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="12">INSURED</text>
              </svg>
            </div>
            
            {/* NCUA */}
            <div className="group">
              <svg className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="80" rx="8" fill="#059669"/>
                <text x="100" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">NCUA</text>
                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="12">INSURED</text>
              </svg>
            </div>
            
            {/* SWIFT */}
            <div className="group">
              <svg className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="80" rx="8" fill="#DC2626"/>
                <text x="100" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">SWIFT</text>
                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="12">NETWORK</text>
              </svg>
            </div>
            
            {/* Visa */}
            <div className="group">
              <svg className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="80" rx="8" fill="#1E40AF"/>
                <text x="100" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">VISA</text>
                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="12">PAYMENT</text>
              </svg>
            </div>
            
            {/* Mastercard */}
            <div className="group">
              <svg className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="80" rx="8" fill="#DC2626"/>
                <text x="100" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">MASTER</text>
                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="12">CARD</text>
              </svg>
            </div>
            
            {/* PCI DSS */}
            <div className="group">
              <svg className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="80" rx="8" fill="#059669"/>
                <text x="100" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">PCI</text>
                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="12">DSS</text>
              </svg>
            </div>
            
            {/* BBB */}
            <div className="group">
              <svg className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="80" rx="8" fill="#1E40AF"/>
                <text x="100" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">BBB</text>
                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="12">A+ RATING</text>
              </svg>
            </div>
            
            {/* Moody's */}
            <div className="group">
              <svg className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="80" rx="8" fill="#CA8A04"/>
                <text x="100" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">MOODY'S</text>
                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="12">RATING</text>
              </svg>
            </div>
            
            {/* ISO */}
            <div className="group">
              <svg className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="80" rx="8" fill="#6B7280"/>
                <text x="100" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">ISO</text>
                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="12">CERTIFIED</text>
              </svg>
            </div>
            
            {/* Equifax */}
            <div className="group">
              <svg className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="80" rx="8" fill="#374151"/>
                <text x="100" y="30" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">EQUIFAX</text>
                <text x="100" y="50" textAnchor="middle" fill="white" fontSize="12">CREDIT</text>
              </svg>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </Layout>
  );
}