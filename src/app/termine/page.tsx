"use client"
import { CalendarContainer } from "@/components/calendar/CalendarContainer"
import { useAppointments } from "@/lib/hooks/useAppointments"

export default function Termine() {
    const { data, isLoading, error } = useAppointments()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading appointments</div>
    return (
        <div className="max-w-7xl h-screen mx-auto p-5">
            <CalendarContainer appointments={data || []} />
        </div>
    )
}