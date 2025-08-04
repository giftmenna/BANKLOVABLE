import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Cookie, Shield, Settings } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary-50/50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <Cookie className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                Cookie Policy
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  This Cookie Policy explains how Nivalus Bank ("we", "us", or "our") uses cookies and similar technologies 
                  when you visit our website or use our online banking services.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Cookie className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                  What Are Cookies?
                </h2>
                <p>
                  Cookies are small text files that are placed on your device when you visit a website. They are widely used 
                  to make websites work more efficiently and provide useful information to website owners.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                  How We Use Cookies
                </h2>
                <p>We use cookies for several purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Essential cookies for website functionality and security</li>
                  <li>Authentication and session management</li>
                  <li>Performance monitoring and analytics</li>
                  <li>Remembering your preferences</li>
                  <li>Fraud prevention and security measures</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Settings className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                  Managing Cookies
                </h2>
                <p>
                  Most web browsers allow you to control cookies through their settings preferences. However, limiting or 
                  blocking cookies may impact your experience using our online banking services.
                </p>

                <p>You can manage your cookie preferences in the following ways:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Browser settings to accept, block, or delete cookies</li>
                  <li>Our cookie consent tool when you first visit our website</li>
                  <li>Individual cookie opt-out mechanisms where available</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Types of Cookies We Use</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Authentication Cookies:</strong> Help us identify you when you log in</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Updates to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new 
                  Cookie Policy on this page and updating the "Last updated" date.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
                <p>
                  If you have any questions about our Cookie Policy, please contact us at:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> privacy@nivalus.com<br />
                  <strong>Phone:</strong> (555) 123-4567
                </p>
              </div>

              <div className="mt-12 text-center">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  <a href="/">Return to Home</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}