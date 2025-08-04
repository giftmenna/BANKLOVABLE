import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Briefcase, Scale, AlertCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary-50/50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <Scale className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                Welcome to Nivalus Bank! Please read our terms of service carefully.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  Please read these Terms of Service ("Terms") carefully before using the Nivalus Bank website, mobile applications, and banking services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Briefcase className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                  Acceptance of Terms
                </h2>
                <p>
                  By accessing or using our Services, you agree to these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use our Services.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                  Account Registration and Security
                </h2>
                <p>
                  To use certain features of our Services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                <p>
                  You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account or any other breach of security.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Banking Services</h2>
                <p>
                  Nivalus Bank offers various banking services subject to applicable laws and regulations. Specific terms and conditions for individual banking products and services may be provided separately.
                </p>
                <p>
                  We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time, including hours of operation or availability, without notice and without liability.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Fees and Charges</h2>
                <p>
                  Fees and charges associated with our Services are disclosed in our fee schedules, account agreements, or other documentation provided to you. We reserve the right to change our fees and charges at any time, subject to applicable law and regulations.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <AlertCircle className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" />
                  Prohibited Activities
                </h2>
                <p>
                  You agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violating any applicable law, regulation, or these Terms</li>
                  <li>Using our Services for any illegal purpose</li>
                  <li>Attempting to interfere with or disrupt our Services or servers</li>
                  <li>Circumventing any security measures implemented by Nivalus Bank</li>
                  <li>Impersonating another person or entity</li>
                  <li>Using our Services to transmit any malware or viruses</li>
                  <li>Engaging in any activity that could damage, disable, or impair our Services</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
                <p>
                  The Nivalus Bank name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Nivalus Bank or its affiliates. You may not use such marks without our prior written permission.
                </p>
                <p>
                  All content, features, and functionality of our Services, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are the exclusive property of Nivalus Bank and are protected by copyright, trademark, and other intellectual property laws.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Termination</h2>
                <p>
                  We may terminate or suspend your access to our Services at any time, with or without cause, and with or without notice, including if we believe you have violated these Terms. Upon termination, your right to use the Services will immediately cease, and we may deactivate or delete your account and all related information.
                </p>
                <p>
                  You may terminate your account at any time by contacting us or following the account closure procedures provided in our Services.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Nivalus Bank, its affiliates, officers, directors, employees, or agents will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the Services; (b) any conduct or content of any third party on the Services; or (c) unauthorized access, use, or alteration of your transmissions or content.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Governing Law</h2>
                <p>
                  These Terms and your use of the Services are governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in New York, NY, to resolve any legal matters arising from these Terms or your use of the Services.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Changes to These Terms</h2>
                <p>
                  We may revise and update these Terms from time to time at our sole discretion. All changes are effective immediately when we post them and apply to all access to and use of the Services thereafter. Your continued use of the Services following the posting of revised Terms means that you accept and agree to the changes.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Contact Information</h2>
                <p>
                  If you have any questions about these Terms or our Services, please contact us at:
                </p>
                <p className="mt-4">
                  <strong>Email:</strong> support@nivalusbank.com<br />
                  <strong>Address:</strong> Nivalus Bank, One Financial Plaza, New York, NY 10004, United States<br />
                  <strong>Phone:</strong> +1 (800) 123-4567 (line is down)
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