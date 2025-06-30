"use client"
import { CalendarContainer } from "@/components/calendar/CalendarContainer"
import { Loading } from "@/components/ui/Loading"
import { useAppointments } from "@/lib/hooks/useAppointments"

// Homepage component that serves as the main calendar dashboard
export default function Home() {
  // Fetch appointments data with loading and error states
  const { data, isLoading, error } = useAppointments()

  // Show loading component while appointments are being fetched
  if (isLoading) return <Loading />

  // Display error message if appointment loading fails
  if (error) return <div>Error loading appointments</div>
  return (
    <div className="max-w-7xl h-screen mx-auto p-5">
      <CalendarContainer appointments={data || []} />
    </div>
  )
}