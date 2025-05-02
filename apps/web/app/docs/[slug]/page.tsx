// app/docs/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Temporary mock data - replace with actual docs data later
const docs = [
  {
    slug: "getting-started",
    title: "Getting Started",
    content: `
# Getting Started with React Hooks Library

This guide will help you get started with the React Hooks Library. We'll cover both installation methods and show you how to use your first hook.

## Overview

React Hooks Library provides a collection of reusable React hooks to help you build modern web applications more efficiently. These hooks handle common patterns and functionality so you can focus on building your application.

## Next Steps

After reading this guide, check out:

- [Installation](/docs/installation) - How to install the library
- [CLI Usage](/docs/cli-usage) - How to use the CLI tool
- [Hooks Catalog](/hooks) - Browse all available hooks
    `,
  },
  {
    slug: "installation",
    title: "Installation",
    content: `
# Installation

You can use our hooks in two ways:

## CLI Installation

The CLI allows you to copy hooks directly into your project. This is useful if you want to customize the hooks or if you prefer to have the code directly in your project.

\`\`\`bash
# Install the CLI globally
npm install -g react-hooks-cli

# Add a hook to your project
hooks add useLocalStorage
\`\`\`

This will create a \`hooks\` directory in your project with the selected hook.

## Package Installation

Alternatively, you can install our hooks as an npm package:

\`\`\`bash
npm install @workspace/hooks
\`\`\`

Then import the hooks you need:

\`\`\`jsx
import { useLocalStorage } from '@workspace/hooks';
\`\`\`
    `,
  },
  {
    slug: "cli-usage",
    title: "CLI Usage",
    content: `
# CLI Usage

The React Hooks CLI tool allows you to easily add hooks to your project.

## Commands

### \`hooks add <hook-name>\`

Adds a hook to your project.

\`\`\`bash
hooks add useLocalStorage
\`\`\`

This will create a \`hooks\` directory in your project (if it doesn't exist) and add the specified hook file.

### \`hooks list\`

Lists all available hooks.

\`\`\`bash
hooks list
\`\`\`

### \`hooks init\`

Initializes a configuration file in your project.

\`\`\`bash
hooks init
\`\`\`

This creates a \`hooks.config.js\` file that you can use to customize the behavior of the CLI.
    `,
  },
];

export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = docs.find((d) => d.slug === params.slug);

  if (!doc) {
    notFound();
  }

  return (
    <div>
      <div className="mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/docs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to docs
          </Link>
        </Button>
      </div>

      <h1 className="text-3xl font-bold mb-6">{doc.title}</h1>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        {/* This is a simplified approach - in a real app, you'd use a markdown parser */}
        <div
          dangerouslySetInnerHTML={{
            __html: doc.content.replace(/\n/g, "<br>"),
          }}
        />
      </div>
    </div>
  );
}
