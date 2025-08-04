import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function Security() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary-50/50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <Shield className="h-12 w-12 text-primary-600 dark:text-primary-400 mb-4" />
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                Security at Nivalus Bank
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                We implement industry-leading security measures to protect your financial data, accounts and personal information.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  How We Protect Your Data
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Lock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        End-to-End Encryption
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        All your data is encrypted both in transit and at rest using 256-bit encryption, the same level used by military organizations worldwide.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Multi-Factor Authentication
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        We require multiple forms of verification when accessing your account from new devices or performing sensitive operations.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Eye className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        24/7 Fraud Monitoring
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Our AI-powered systems continuously monitor for suspicious activities and will alert you immediately if unusual activity is detected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Your Security Responsibilities
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    While we implement advanced security measures, you also play a key role in keeping your account secure:
                  </p>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>Never share your password, PIN, or one-time passcodes with anyone, including Nivalus staff.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>Use a unique, strong password for your Nivalus account.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>Always log out when using public computers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>Keep your contact information updated so we can reach you if we detect suspicious activity.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>Be vigilant about phishing attempts—we will never ask for your password via email.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-primary-50 dark:bg-gray-800">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Report Security Concerns
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                If you suspect any unauthorized access or have security concerns, please contact us immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full px-8">
                  <a href="/contact">Contact Our Security Team</a>
                </Button>
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