# Contributing to React Hooks Library

Thank you for your interest in contributing to our React hooks library! This guide will help you understand how to add new hooks and maintain the existing ones.

## Project Structure

Our project is organized as a Turborepo monorepo with the following key packages:

- `packages/hooks`: The core hooks package that exports all hooks
- `packages/cli`: The CLI tool for injecting hooks into user projects
- `apps/web`: The documentation website

## Adding a New Hook

### Step 1: Create the Hook Implementation

1. Create a new directory in `packages/hooks/src/hooks` with your hook name (use camelCase):

```bash
mkdir -p packages/hooks/src/hooks/useMyHook