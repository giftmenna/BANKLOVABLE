import { Footer } from "@/components/Footer";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">About Nivalus Bank</h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">Building financial success together since 1985.</p>
          </div>
          
          <div className="mt-10">
            <div className="prose prose-indigo mx-auto dark:prose-invert lg:max-w-none">
              <h2>Our Story</h2>
              <p>
                Nivalus Bank was founded in 1985 with a clear mission: to provide accessible, secure, and innovative banking services that help our customers achieve their financial goals. 
                What began as a small community bank has grown into a trusted financial institution serving customers across the country and around the world.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                Our mission is to empower individuals and businesses to take control of their financial future through personalized financial solutions, cutting-edge technology, 
                and unparalleled customer service. We believe that everyone deserves access to high-quality financial services, and we work tirelessly to make that vision a reality.
              </p>
              
              <h2>Our Values</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-6">
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Integrity</h3>
                  <p className="text-gray-600 dark:text-gray-400">We act with honesty and transparency in all of our dealings. Our customers trust us with their financial well-being, and we take that responsibility seriously.</p>
                </div>
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Innovation</h3>
                  <p className="text-gray-600 dark:text-gray-400">We embrace new technologies and ideas that make banking simpler, more convenient, and more effective for our customers.</p>
                </div>
                <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Community</h3>
                  <p className="text-gray-600 dark:text-gray-400">We are committed to the communities we serve. We invest in local initiatives and strive to make a positive impact wherever we operate.</p>
                </div>
              </div>
              
              <h2 className="mt-12">Leadership Team</h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-500 dark:text-gray-400">JD</div>
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">John Doe</h3>
                  <p className="text-indigo-600 dark:text-indigo-400">Chief Executive Officer</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-500 dark:text-gray-400">JS</div>
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Jane Smith</h3>
                  <p className="text-indigo-600 dark:text-indigo-400">Chief Financial Officer</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-gray-500 dark:text-gray-400">RJ</div>
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Robert Johnson</h3>
                  <p className="text-indigo-600 dark:text-indigo-400">Chief Technology Officer</p>
                </div>
              </div>
              
              <h2 className="mt-12">Our Achievements</h2>
              <ul>
                <li>Named "Most Innovative Bank" by Banking Technology Magazine, 2023</li>
                <li>Reached 5 million customers worldwide in 2022</li>
                <li>Achieved carbon neutrality across all operations in 2021</li>
                <li>Recognized as one of the "Best Places to Work" for 5 consecutive years</li>
                <li>Launched industry-first mobile banking solutions in 2018</li>
              </ul>
              
              <div className="mt-12 text-center">
                <a
                  href="/careers"
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
                >
                  Join Our Team
                </a>
                <a
                  href="/contact"
                  className="inline-block ml-4 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 px-6 py-3 rounded-md font-medium hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}