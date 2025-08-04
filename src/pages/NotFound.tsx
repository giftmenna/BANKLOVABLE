
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <Navbar />
      
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-9xl font-bold text-bank-gold">404</h1>
            <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              The page you are looking for doesn't exist or has been moved.
            </p>
            
            <Button asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </Layout>
  );
}