// app/docs/page.tsx
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Temporary mock data - replace with actual docs data later
const docs = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Learn how to get started with the React Hooks Library",
  },
  {
    slug: "installation",
    title: "Installation",
    description: "How to install and set up the React Hooks Library",
  },
  {
    slug: "cli-usage",
    title: "CLI Usage",
    description: "Learn how to use the CLI to add hooks to your project",
  },
];

export default function DocsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Documentation</h1>
      <p className="text-muted-foreground mb-8 max-w-[85ch]">
        Learn how to use the React Hooks Library in your projects.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((doc) => (
          <Card key={doc.slug}>
            <CardHeader>
              <CardTitle>{doc.title}</CardTitle>
              <CardDescription>{doc.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/docs/${doc.slug}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
