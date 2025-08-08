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

## Critical Development Rules

### ⚠️ TypeScript Type Safety - ABSOLUTELY NO "ANY" TYPES!
**KULAĞINI ÇEKERİM!** - Never use the `any` type in TypeScript code. This is strictly forbidden!
- Always provide proper type definitions
- Use `unknown` if type is truly unknown, then narrow it down
- Create interfaces or type aliases for complex types
- Use generics when appropriate
- If dealing with third-party libraries without types, create type definitions

Examples of what NOT to do:
```typescript
// ❌ NEVER DO THIS - KULAĞINI ÇEKERİM!
const data: any = fetchData();
function processItem(item: any) { }
const items: any[] = [];
```

Examples of correct typing:
```typescript
// ✅ CORRECT - Proper typing
interface UserData {
  id: string;
  name: string;
}
const data: UserData = fetchData();
function processItem(item: unknown) { 
  // Type narrowing
  if (typeof item === 'string') { }
}
const items: string[] = [];
```

## Git Workflow

### 🔄 Branch Strategy - EVERY FEATURE NEEDS A NEW BRANCH!

**MANDATORY**: Every new task or feature MUST start with creating a new branch:

1. **ALWAYS create a new branch for each feature/task**
   ```bash
   git checkout -b feature/feature-name
   # or
   git checkout -b fix/bug-description
   # or
   git checkout -b chore/task-description
   ```

2. **Branch naming conventions:**
   - `feature/` - New features or enhancements
   - `fix/` - Bug fixes
   - `chore/` - Maintenance tasks, documentation
   - `refactor/` - Code refactoring
   - Use kebab-case for branch names

3. **Complete workflow for EVERY task:**
   ```bash
   # 1. Start with creating a new branch
   git checkout main
   git pull origin main
   git checkout -b feature/new-feature-name
   
   # 2. Make changes and commit
   git add .
   git commit -m "feat: descriptive message"
   
   # 3. Push branch
   git push -u origin feature/new-feature-name
   
   # 4. Create PR
   gh pr create --title "feat: Feature title" --body "Description"
   ```

### GitHub CLI Commands

```bash
# ALWAYS start with a new branch
git checkout -b feature/branch-name

# Check current branch and status
git status
git branch

# Commit and push changes
git add .
git commit -m "feat: descriptive message about changes"
git push -u origin feature/branch-name

# Create pull request
gh pr create --title "PR Title" --body "Description of changes"

# View and manage pull requests
gh pr list
gh pr view
gh pr merge
```

**IMPORTANT RULES**:
1. NEVER commit directly to main branch
2. ALWAYS create a new branch for each feature
3. ALWAYS create a PR for code review
4. ALWAYS use descriptive branch names
5. ALWAYS commit and push after completing a task

**Note**: The `gh` CLI tool should be used for all GitHub operations including creating and managing pull requests.