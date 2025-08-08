# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application using TypeScript with the following key technologies:
- **Styling**: Tailwind CSS v4 with CSS variables and custom theme configuration
- **Components**: Shadcn UI components with New York style theme
- **Animations**: Framer Motion and tw-animate-css
- **Utilities**: class-variance-authority (CVA) for component variants, clsx + tailwind-merge via `cn()` utility
- **Validation**: Zod for schema validation
- **Icons**: Lucide React

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server  
npm start

# Linting
npm run lint
```

## Architecture Patterns

### Project Structure
- **App Router**: Uses Next.js 15 App Router in `/app` directory
- **Path Aliases**: `@/*` maps to project root for clean imports
- **Styling**: Global styles in `app/globals.css` using Tailwind CSS v4's new @theme directive
- **Utilities**: Common utilities like `cn()` in `lib/utils.ts`

### Component Guidelines
- Shadcn UI components should be placed in `components/ui/` directory
- Use the `cn()` utility from `@/lib/utils` for merging className props with component styles
- Follow Shadcn's New York style theme as configured in `components.json`

### TypeScript Configuration
- Strict mode enabled
- Module resolution set to "bundler" for Next.js compatibility
- JSON imports enabled via `resolveJsonModule`

### CSS Architecture
- Uses Tailwind CSS v4 with PostCSS
- Custom CSS properties for theming with light/dark mode support
- OKLCH color space for improved color consistency
- Design tokens defined as CSS variables (--radius, --background, etc.)

## Key Development Notes

1. **Font System**: Uses Geist and Geist Mono fonts with CSS variables `--font-geist-sans` and `--font-geist-mono`

2. **Dark Mode**: Implemented via `.dark` class with corresponding CSS variable overrides

3. **Component Library Setup**: Shadcn UI is configured but no components are installed yet. Use the Shadcn CLI to add components as needed.

4. **Type Safety**: Strict TypeScript enabled - ensure all new code includes proper type annotations

5. **Build Output**: Next.js build outputs to `.next/` directory (gitignored)

## Git Workflow

**IMPORTANT**: After completing any task, you MUST automatically commit and push changes to the repository using the following workflow:

1. Always check `git status` first to see what has changed
2. Stage all relevant changes with `git add`
3. Create descriptive commit messages that explain what was done
4. Push changes to the remote repository
5. If working on a feature branch, create a pull request using `gh pr create`

### GitHub CLI Commands

```bash
# Check current branch and status
git status
git branch

# Commit and push changes
git add .
git commit -m "feat: descriptive message about changes"
git push origin main

# For feature branches and pull requests
git checkout -b feature/branch-name
git push -u origin feature/branch-name
gh pr create --title "PR Title" --body "Description of changes"

# View and manage pull requests
gh pr list
gh pr view
gh pr merge
```

**Note**: The `gh` CLI tool should be used for all GitHub operations including creating and managing pull requests.