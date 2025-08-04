import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import React from "react";

const Download: React.FC = () => {
  return (
    <Layout>
      <Navbar />
      <br></br><br></br>
      <div className="bg-background text-foreground min-h-screen">
        <header className="bg-card border-b border-border py-12 text-center">
          <div className="max-w-1000px mx-auto px-24px">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">How to Install</span> Nivalus Bank App
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to add our banking app to your iPhone home screen
            </p>
          </div>
        </header>

        <div className="max-w-1000px mx-auto px-24px py-12">
          {/* Step 1 */}
          <div className="bg-card border border-border rounded-lg mb-6 p-6 flex flex-col md:flex-row md:gap-6">
            <div className="flex-1">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h2 className="text-xl font-bold mb-2 text-foreground">Open Safari and Visit Our Website</h2>
              <p className="text-muted-foreground mb-4">
                Launch the Safari browser on your iPhone and navigate to the Nivalus Bank website.
                Make sure you're using the latest version of iOS for best compatibility.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg flex items-center justify-center min-w-250px">
              <div className="w-250px h-400px rounded-3xl overflow-hidden">
                <img src="/IM1.JPG" alt="Step 1 - Open Safari" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-card border border-border rounded-lg mb-6 p-6 flex flex-col md:flex-row md:gap-6">
            <div className="flex-1">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h2 className="text-xl font-bold mb-2 text-foreground">Tap the Share Icon</h2>
              <p className="text-muted-foreground mb-4">
                Find the Share icon at the bottom of the Safari screen (a square with an upward arrow) and tap it.
                This will open the iOS share menu with various options.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg flex items-center justify-center min-w-250px">
              <div className="w-250px h-400px rounded-3xl overflow-hidden">
                <img src="/IM2.JPG" alt="Step 2 - Share Icon" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-card border border-border rounded-lg mb-6 p-6 flex flex-col md:flex-row md:gap-6">
            <div className="flex-1">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h2 className="text-xl font-bold mb-2 text-foreground">Select 'Add to Home Screen'</h2>
              <p className="text-muted-foreground mb-4">
                Scroll through the share menu and tap on 'Add to Home Screen'. 
                You may need to scroll down to find this option in the second row of actions.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg flex items-center justify-center min-w-250px">
              <div className="w-250px h-400px rounded-3xl overflow-hidden">
                <img src="/IM3.JPG" alt="Step 3 - Add to Home Screen" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-card border border-border rounded-lg mb-6 p-6 flex flex-col md:flex-row md:gap-6">
            <div className="flex-1">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold mb-4">
                4
              </div>
              <h2 className="text-xl font-bold mb-2 text-foreground">Name the Shortcut and Add</h2>
              <p className="text-muted-foreground mb-4">
                Edit the name to "Nivalus Bank" if desired, then tap 'Add' in the top-right corner of the screen.
                The name you choose will appear under your home screen icon.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg flex items-center justify-center min-w-250px">
              <div className="w-250px h-400px rounded-3xl overflow-hidden">
                <img src="/IM4.JPG" alt="Step 4 - Name and Add" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-card border border-border rounded-lg mb-6 p-6 flex flex-col md:flex-row md:gap-6">
            <div className="flex-1">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold mb-4">
                5
              </div>
              <h2 className="text-xl font-bold mb-2 text-foreground">Find the Icon on Your Home Screen</h2>
              <p className="text-muted-foreground mb-4">
                The Nivalus Bank icon will now appear on your iPhone's home screen. 
                Tap it anytime to quickly access your banking with full app-like experience.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg flex items-center justify-center min-w-250px">
              <div className="w-250px h-400px bg-background rounded-3xl flex flex-col items-center justify-center p-4">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Home className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Nivalus Bank</p>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Your home screen icon will look similar to this
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-accent border border-border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-primary">Important Notes:</h3>
            <div className="flex mb-3">
              <div className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                •
              </div>
              <span className="text-foreground">
                Our progressive web app uses a custom Nivalus Bank icon for easy recognition on your home screen.
              </span>
            </div>
            <div className="flex mb-3">
              <div className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                •
              </div>
              <span className="text-foreground">
                The app works offline for basic functions and automatically syncs when you're back online.
              </span>
            </div>
            <div className="flex mb-3">
              <div className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                •
              </div>
              <span className="text-foreground">
                You can rearrange or delete the icon just like regular apps by long-pressing it.
              </span>
            </div>
            <div className="flex">
              <div className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                •
              </div>
              <span className="text-foreground">
                For best performance, ensure you have iOS 16.4 or later installed.
              </span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center py-8">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Return to Homepage
              </Link>
            </Button>
            <p className="text-muted-foreground text-sm mt-4">
              Enjoy seamless banking with our progressive web app experience
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Download;