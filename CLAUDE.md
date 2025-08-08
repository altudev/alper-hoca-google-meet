# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AlperMeet - A Google Meet clone built with Next.js 15, TypeScript, and modern web technologies. The application provides video conferencing capabilities with a clean, modern UI.

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with CSS variables and OKLCH color space
- **UI Components**: Shadcn UI (New York theme) + Radix UI primitives
- **Animations**: Framer Motion + tw-animate-css
- **Forms**: React Hook Form with Zod validation
- **Payments**: Stripe integration for subscription plans
- **Icons**: Lucide React

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server  
npm start

# Linting with ESLint
npm run lint
```

## Application Architecture

### Route Structure
- `/` - Homepage with meeting controls and feature showcase
- `/contact` - Contact form with validation
- `/payment` - Stripe payment plans and checkout
- `/payment/success` - Post-payment success page
- `/payment/cancel` - Payment cancellation page
- `/api/create-checkout-session` - Stripe checkout API endpoint

### Component Architecture
- **Server Components**: Default for pages (`app/page.tsx`)
- **Client Components**: Interactive components in `/components` directory
  - `Header.tsx` - Navigation with links to all pages
  - `MeetingControls.tsx` - Meeting creation/join functionality
  - `FeaturesSection.tsx` - Animated feature cards
- **UI Components** (`/components/ui/`): Reusable Shadcn components
  - Form components (input, textarea, label)
  - Button with variants
  - Card components

### State Management Pattern
- Client-side state with React hooks for UI interactions
- Form state managed by React Hook Form
- No global state management (consider adding if app grows)

### Styling Patterns
- Utility-first with Tailwind CSS v4
- CSS variables for theming (`--tw-color-*` for animations)
- `cn()` utility for conditional classes (`lib/utils.ts`)
- Responsive design with Tailwind breakpoints

### Form Handling
- React Hook Form for form state
- Zod schemas for validation (`lib/validations/`)
- Server-side form processing where applicable

## Important Implementation Details

### Client vs Server Components
- Use `"use client"` directive for components with:
  - Framer Motion animations
  - React hooks (useState, useEffect)
  - Event handlers (onClick, onChange)
  - Browser-only APIs

### Stripe Integration
- Environment variable needed: `STRIPE_SECRET_KEY`
- Test mode keys for development
- Webhook handling for production (not yet implemented)

### Accessibility
- All interactive elements have aria-labels
- Keyboard navigation support
- Focus states defined
- Semantic HTML structure

### Performance Considerations
- Turbopack for faster development builds
- Component code splitting automatic with App Router
- Images optimized with Next.js Image component
- Fonts loaded with next/font

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