# Appointment Management System

A modern, full-stack appointment management system designed for healthcare services.

## 🚀 Live Demo

[View Live Demo on Vercel](https://appointment-management-system-eight.vercel.app/)

## 📋 Overview

This application provides a comprehensive appointment management solution for care services, focusing on reducing administrative overhead and maximizing time for patient care. The system features intuitive calendar views, real-time updates, and efficient filtering capabilities.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **State Management**: TanStack Query, Zustand
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel

## ✨ Features

### Core Functionality
- 📅 **Multiple Calendar Views**
  - Monthly grid view with appointment indicators
  - Weekly view with hourly time slots
  - List view for detailed appointment overview

- 📝 **Appointment Management**
  - Create, edit, and delete appointments
  - Hover cards for quick appointment details
  - Drag-and-drop rescheduling 

- 🔍 **Advanced Filtering**
  - Filter by category
  - Filter by time period
  - Filter by patient/client
  - Multi-criteria filtering support

- 🎨 **User Experience**
  - Fully responsive design
  - Loading states and error handling
  - Optimistic updates for instant feedback

### Technical Highlights
- Type-safe database queries with generated TypeScript types
- Modular component architecture
- Custom hooks for data fetching and state management
- Comprehensive error boundary implementation
- Accessibility-first approach (ARIA labels, keyboard navigation)

## 🏗️ Architecture

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (dashboard)/       # Dashboard routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── calendar/         # Calendar-specific components
│   ├── appointments/     # Appointment-related components
│   └── ui/              # shadcn/ui components
├── lib/                   # Utility functions
│   ├── supabase/        # Database client and queries
│   ├── hooks/           # Custom React hooks
│   └── utils/           # Helper functions
├── types/                # TypeScript type definitions
└── styles/              # Global styles
```

## 🚦 Getting Started
### Installation

1. Clone the repository
```bash
git clone https://github.com/mateen470/Appointment-Management-System
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses the provided Supabase schema with the following tables:
- `patients` - Patient information
- `appointments` - Core appointment data
- `categories` - Appointment categories with color coding
- `appointment_assignee` - Links appointments to assignees
- `activities` - Activity log for appointments
- `relatives` - Patient relatives information

## 🧪 Development

### Code Quality
- Strict TypeScript configuration
- ESLint and Prettier for code formatting
- Modular, reusable components
- Comprehensive error handling

### Performance Optimizations
- React Query for intelligent caching
- Optimistic updates for better UX
- Lazy loading for calendar views
- Memoization of expensive computations

### Best Practices
- Atomic commits with conventional commit messages
- Component-driven development
- Accessibility standards (WCAG 2.1)
- Mobile-first responsive design

## 📝 Design Decisions

1. **State Management**: TanStack Query for server state and Zustand for client state

2. **Calendar Implementation**: Built custom calendar components 

3. **Type Safety**: Generated TypeScript types from Supabase schema 

## 👤 Author

**Abdul Mateen**
- GitHub: [@yourgithub](https://github.com/mateen470)
- LinkedIn: [Abdul Mateen](https://www.linkedin.com/in/abdul-mateen48/)