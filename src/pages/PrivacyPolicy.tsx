import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Users, Clock } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary-50/50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <FileText className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                Privacy Policy
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
                  At Nivalus Bank, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our banking services, website, or mobile applications.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                  Information We Collect
                </h2>
                <p>
                  We collect information that you provide directly to us, information we collect automatically when you use our services, and information from third parties. This may include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal identification information (name, address, email, phone number)</li>
                  <li>Financial information (account numbers, transaction history, credit information)</li>
                  <li>Authentication information (passwords, security questions)</li>
                  <li>Device and usage information (IP address, browser type, operating system)</li>
                  <li>Location information when you use our mobile applications</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Users className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                  How We Use Your Information
                </h2>
                <p>We use your information for various purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing, maintaining, and improving our banking services</li>
                  <li>Processing transactions and sending notices about your transactions</li>
                  <li>Verifying your identity and preventing fraud</li>
                  <li>Responding to your inquiries and providing customer support</li>
                  <li>Sending administrative messages and service updates</li>
                  <li>Personalizing your experience and providing tailored offers</li>
                  <li>Complying with legal obligations and regulatory requirements</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                  Information Sharing and Disclosure
                </h2>
                <p>
                  We may share your information with third parties in limited circumstances, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service providers who perform services on our behalf</li>
                  <li>Financial institutions with whom we partner</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a merger, sale, or acquisition</li>
                </ul>
                <p>
                  We do not sell your personal information to third parties for marketing purposes.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Clock className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                  Data Retention
                </h2>
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, regulatory, accounting, or reporting requirements.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights and Choices</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, including the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your personal information</li>
                  <li>Object to or restrict certain processing</li>
                  <li>Data portability</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided below.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> privacy@nivalus.com<br />
                  <strong>Address:</strong> 123 Financial Street, New York, NY 10001<br />
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