import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Blog() {
  return (
    <section id="blog" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Blog
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Professional Insights Analysis, commentary, and expertise on
              auditing and financial practices
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Card className="w-full max-w-2xl">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-4">Visit My Blog</h3>
                <p className="text-muted-foreground mb-6">
                  Read My Articles I share insights on internal auditing, risk
                  management, compliance frameworks, and financial analysis on
                  my professional blog. Explore my latest thoughts on industry
                  best practices.
                </p>
                <Button asChild>
                  <Link
                    href="/blogs-page"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Blog
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
