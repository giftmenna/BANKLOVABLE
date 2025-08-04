import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

interface RelatedArticle {
  title: string;
  path: string;
}

interface BlogPostProps {
  title: string;
  date: string;
  content: React.ReactNode;
  relatedArticles: RelatedArticle[];
}

const ALL_BLOG_POSTS = [
  { title: "How to Save for Retirement in Korea", path: "/blog/retirement" },
  { title: "Understanding Forex Trading", path: "/blog/forex" },
  { title: "Budgeting Tips for Students", path: "/blog/budgeting" },
  // Comment out or remove these if not ready:
  // { title: "Understanding Korea's Pension System", path: "/blog/korean-pensions" },
  // { title: "Investing in Korean Markets", path: "/blog/korean-investing" },
] as const;

export default function BlogPost({
  title,
  date,
  content,
  relatedArticles,
}: BlogPostProps) {
  const location = useLocation();

  return (
    <Layout>
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground">Published on {date}</p>
            
            <div className="mt-4 flex justify-center">
              <Link 
                to="/blog" 
                className="text-muted-foreground hover:text-bank-gold transition-colors"
              >
                Blog Home
              </Link>
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-bank-gold">{title}</span>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 bg-background rounded-xl p-8 shadow-md">
              <article className="prose prose-gray dark:prose-invert max-w-none">
                {content}
              </article>

              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4 text-bank-gold">
                  Explore More Articles
                </h3>
                <ul className="space-y-2">
                  {ALL_BLOG_POSTS
                    .filter(post => post.path !== location.pathname)
                    .map(post => (
                      <li key={post.path}>
                        <Link
                          to={post.path}
                          className="text-muted-foreground hover:text-bank-gold transition-colors"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-background rounded-xl p-6 shadow-md sticky top-24">
                <h3 className="text-xl font-semibold mb-4 text-bank-gold">
                  Related Articles
                </h3>
                <ul className="space-y-3">
                  {relatedArticles.map((article) => (
                    <li key={article.path}>
                      <Link
                        to={article.path}
                        className="text-muted-foreground hover:text-bank-gold transition-colors"
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-background rounded-xl p-6 shadow-md sticky top-[400px]">
                <h3 className="text-xl font-semibold mb-4 text-bank-gold">
                  All Blog Posts
                </h3>
                <ul className="space-y-3">
                  {ALL_BLOG_POSTS.map((post) => (
                    <li key={post.path}>
                      <Link
                        to={post.path}
                        className={`transition-colors ${
                          location.pathname === post.path
                            ? "text-bank-gold font-medium"
                            : "text-muted-foreground hover:text-bank-gold"
                        }`}
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                asChild
                className="w-full bg-bank-gold hover:bg-bank-gold/90 text-bank-dark-text"
              >
                <Link to="/signup">
                  Open an Account <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}