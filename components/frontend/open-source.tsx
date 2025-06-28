import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, GitPullRequest } from "lucide-react"
import Link from "next/link"

export default function OpenSource() {
  const contributions = [
    {
      title: "DynamoDB Dashboard",
      description:
        "A web-based dashboard for visualizing and managing DynamoDB tables, with features for querying, filtering, and data manipulation.",
      tags: ["Vue.js", "DynamoDB", "AWS", "Developer Tools"],
      link: "https://github.com/kritish-dhaubanjar/dynamodb-dashboard",
    },
    {
      title: "Dev Auth Chrome Extension",
      description:
        "A Chrome extension to update authentication tokens for testing applications with different user roles on local development environments.",
      tags: ["JavaScript", "Chrome Extension", "Authentication", "Developer Tools"],
      link: "https://github.com/kritish-dhaubanjar/dev-auth-chrome-extension",
    },
    {
      title: "Nginxconfig.io by DigitalOcean",
      description:
        "Contributed to DigitalOcean's open-source NGINX configuration generator, which helps users create optimized NGINX server configurations.",
      tags: ["NGINX", "JavaScript", "DevOps", "Configuration"],
      link: "https://github.com/digitalocean/nginxconfig.io/commits?author=maskeynihal",
    },
  ]

  return (
    <div id="open-source">
      <div className="space-y-12">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">Open Source Contributions</h3>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed">
            Projects I've contributed to in the open source community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {contributions.map((contribution, index) => (
            <div key={index}>
              <Card className="h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <GitPullRequest className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{contribution.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{contribution.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {contribution.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-primary/10 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={contribution.link} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> View on GitHub
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
