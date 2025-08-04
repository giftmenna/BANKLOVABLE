import { Logo } from "./Logo";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { currentUser } = useAuth();
  
  // Function to handle protected links
  const ProtectedLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    return currentUser ? (
      <Link to={to} className="text-muted-foreground hover:text-bank-gold transition-colors">
        {children}
      </Link>
    ) : (
      <Link 
        to="/login" 
        className="text-muted-foreground hover:text-bank-gold transition-colors"
        state={{ from: to }}  // Optional: preserve intended destination
      >
        {children}
      </Link>
    );
  };

  return (
    <footer className="bg-background border-t border-border pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo className="mb-4" />
            <p className="text-muted-foreground max-w-xs">
              Secure, modern banking for all your financial needs.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-bank-gold transition-colors">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-bank-gold transition-colors">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-bank-gold transition-colors">
                <i className="ri-instagram-fill text-xl"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-bank-gold transition-colors">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2">
              <li>
                <ProtectedLink to="/dashboard">
                  Online Banking
                </ProtectedLink>
              </li>
              <li>
                <ProtectedLink to="/transfer">
                  Money Transfers
                </ProtectedLink>
              </li>
              <li>
                <ProtectedLink to="/dashboard">
                  Savings Accounts
                </ProtectedLink>
              </li>
              <li>
                <ProtectedLink to="/dashboard">
                  Investments
                </ProtectedLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-bank-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-bank-gold transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-bank-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-muted-foreground hover:text-bank-gold transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-bank-gold transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-muted-foreground hover:text-bank-gold transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Locate Us</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>214 Lexington Ave, Apt 5B NEW YORK, NY 10016 USA</p>
              <p>Financial District</p>
              <p>Email: contactnivalus@gmail.com</p>
              <p>Phone: +1 (555) 783-1872</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center text-muted-foreground">
          <p>© {currentYear} Nivalus Bank. All rights reserved.</p>
          <p className="mt-2">
            Nivalus Bank is a registered trademark. This site is protected by reCAPTCHA and the Google{' '}
            <Link 
              to="/privacy-policy" 
              className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link 
              to="/terms-of-service" 
              className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Terms of Service
            </Link>{' '}
            apply.
          </p>
          <p>
            <Link 
              to="/cookie-policy" 
              className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Cookies Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}