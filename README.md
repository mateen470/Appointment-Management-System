# Appointment Management System

A modern, full-stack appointment management system designed specifically for healthcare services, built with Next.js 15 and TypeScript.

## 🚀 Live Demo

[View Live Demo on Vercel](https://appointment-management-system-eight.vercel.app/)

## 📋 Overview

This comprehensive appointment management solution is designed for healthcare providers to streamline their scheduling workflow, reduce administrative overhead, and maximize time for patient care. The system features intuitive calendar views, real-time updates, and a responsive design that works seamlessly across all devices.

## ✨ Key Features

### 📅 Multiple Calendar Views

- **Monthly Grid View**: Visual overview with appointment indicators and color-coded categories
- **Weekly Time Grid**: Detailed hourly slots for precise scheduling
- **List View**: Comprehensive appointment details with easy navigation

### 📝 Complete Appointment Management

- Create, edit, and delete appointments with rich form validation
- Appointment completion tracking with checkbox system
- Hover cards for quick appointment details without navigation
- Real-time status updates

### 👥 Patient Management

- Comprehensive patient profiles with care levels
- Patient search and selection with autocomplete
- Age calculation
- Care level indicators (Pflegegrad system)
- Contact information management

### 🏷️ Category System

- Color-coded appointment categories
- Custom category creation with descriptions
- Visual category indicators across all views
- Filtering by appointment type

### 🎨 User Experience

- Fully responsive design optimized for mobile, tablet, and desktop
- German localization (de-DE) with proper date/time formatting
- Loading states and comprehensive error handling
- Optimistic updates for instant user feedback

### 🔧 Technical Excellence

- Type-safe database queries with auto-generated TypeScript types
- Real-time data synchronization with TanStack Query
- Modular component architecture for maintainability
- Comprehensive error boundary implementation
- Performance optimizations with intelligent caching

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with Radix UI primitives
- **Calendar**: FullCalendar with custom styling
- **Icons**: Lucide React

### Backend & Database

- **API**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (ready for implementation)

### State Management & Data Fetching

- **Server State**: TanStack Query v5 for intelligent caching
- **Client State**: React built-in state management

### Development & Deployment

- **Deployment**: Vercel with automatic deployments
- **Package Manager**: npm
- **Code Quality**: ESLint, TypeScript strict mode
- **Styling**: PostCSS with Tailwind CSS

## 🏗️ Project Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (ready for custom endpoints)
│   ├── appointments/      # Appointment management pages
│   │   ├── [id]/edit/     # Edit appointment page
│   │   └── new/           # Create new appointment page
│   ├── globals.css        # Global styles and theme variables
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Homepage with calendar
├── components/            # React components
│   ├── calendar/         # Calendar-specific components
│   │   ├── calendar-header/    # Header controls (date picker, filters, view toggle)
│   │   ├── calendar-utility/   # Shared calendar utilities
│   │   ├── CalendarContainer.tsx
│   │   ├── ListView.tsx
│   │   ├── MonthViews.tsx
│   │   └── WeekView.tsx
│   ├── form/             # Form components for appointment management
│   │   ├── AppointmentForm.tsx
│   │   ├── BasicInfoSection.tsx
│   │   ├── DateTimeSection.tsx
│   │   └── PatientCategorySection.tsx
│   ├── provider/         # Context providers
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility functions and configurations
│   ├── hooks/           # Custom React hooks for data operations
│   │   ├── useAppointments.ts
│   │   ├── useCreateAppointment.ts
│   │   ├── useModifyAppointment.ts
│   │   ├── useRemoveAppointment.ts
│   │   └── useUpdateAppointment.ts
│   ├── supabase/        # Database client configuration
│   └── utils.ts         # Utility functions
└── types/               # TypeScript type definitions
    ├── appointment.types.ts
    ├── tanstack.types.ts
    └── utility.types.ts
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account and project

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mateen470/Appointment-Management-System.git
   cd Appointment-Management-System
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

   Add your Supabase credentials to `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**

   The application expects the following Supabase tables. Create them in your Supabase dashboard:

   ```sql
   -- Patients table
   create table patients (
     id uuid default gen_random_uuid() primary key,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     firstname text,
     lastname text,
     birth_date date,
     care_level integer,
     pronoun text,
     email text,
     active boolean default true,
     active_since timestamp with time zone
   );

   -- Categories table
   create table categories (
     id uuid default gen_random_uuid() primary key,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     updated_at timestamp with time zone,
     label text,
     description text,
     color text,
     icon text
   );

   -- Appointments table
   create table appointments (
     id uuid default gen_random_uuid() primary key,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     updated_at timestamp with time zone,
     start timestamp with time zone,
     "end" timestamp with time zone,
     location text,
     patient uuid references patients(id),
     attachements text[],
     category uuid references categories(id),
     notes text,
     title text
   );
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The application uses a PostgreSQL database through Supabase with the following core tables:

- **`patients`** - Patient information including care levels and contact details
- **`appointments`** - Core appointment data with foreign key relationships
- **`categories`** - Appointment categories with color coding and descriptions

Additional tables ready for future features:

- **`appointment_assignee`** - Links appointments to healthcare providers
- **`activities`** - Activity log for appointment changes
- **`relatives`** - Patient emergency contacts and family information

## 🎯 Usage Examples

### Creating an Appointment

1. Click "Neuer Termin" (New Appointment)
2. Fill in the appointment title and details
3. Select a patient from the dropdown
4. Choose an appropriate category
5. Set the date and time
6. Add location and notes as needed
7. Save the appointment

### Viewing Appointments

- **List View**: See all appointments in chronological order with full details
- **Week View**: View appointments in hourly time slots for the selected week
- **Month View**: Get an overview of the entire month with appointment indicators

### Managing Appointments

- **Edit**: Click on any appointment card or use the edit button in the hover popover
- **Complete**: Check the checkbox on any appointment to mark it as completed
- **Delete**: Use the delete button when editing an appointment

## 🧪 Development

### Code Quality Standards

- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Configured for Next.js with custom rules
- **Component Architecture**: Atomic design principles with reusable components
- **Error Handling**: Comprehensive error boundaries and user feedback

### Performance Optimizations

- **TanStack Query**: Intelligent server state caching and background updates
- **Optimistic Updates**: Immediate UI feedback for better user experience
- **Lazy Loading**: Calendar views load data on demand
- **Memoization**: React.memo and useMemo for expensive computations

### Styling Approach

- **Tailwind CSS v4**: Utility-first CSS framework with custom design system
- **CSS Custom Properties**: Theme variables for consistent styling
- **Responsive Design**: Mobile-first approach with breakpoint-specific styles

## 🔄 API Integration

The application uses Supabase's real-time capabilities and provides hooks for all CRUD operations:

```typescript
// Fetch all appointments with related data
const { data, isLoading, error } = useAppointments();

// Create a new appointment
const createMutation = useCreateAppointment();
createMutation.mutate(appointmentData);

// Update an existing appointment
const updateMutation = useModifyAppointment();
updateMutation.mutate({ id, ...updateData });

// Delete an appointment
const deleteMutation = useRemoveAppointment();
deleteMutation.mutate(appointmentId);
```

## 🌍 Internationalization

Currently configured for German locale (de-DE) with:

- German date and time formatting
- German language interface
- European date formats (DD.MM.YYYY)
- 24-hour time format

## 👤 Author

**Abdul Mateen**

- GitHub: [@mateen470](https://github.com/mateen470)
- LinkedIn: [Abdul Mateen](https://www.linkedin.com/in/abdul-mateen48/)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the incredible React framework
- [Supabase](https://supabase.com/) for the backend-as-a-service platform
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [TanStack Query](https://tanstack.com/query) for the data fetching solution
- [FullCalendar](https://fullcalendar.io/) for the calendar functionality
