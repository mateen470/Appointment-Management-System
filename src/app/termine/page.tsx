"use client"
import { CalendarContainer } from "@/components/calendar/CalendarContainer"
import { useAppointments } from "@/lib/hooks/useAppointments"

export default function Termine() {
    const { data, isLoading, error } = useAppointments()
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading appointments</div>
    return (
        <div>
            <CalendarContainer appointments={data || []} />
        </div>
    )
}