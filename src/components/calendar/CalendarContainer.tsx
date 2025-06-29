import { useState } from "react";
import { FilterState } from "@/types/utility.types";
import { CalendarHeader } from "./calendar-header/CalendarHeader";

export function CalendarContainer({ appointments }) {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [view, setView] = useState<"list" | "week" | "month">("week")
    const [activeFilters, setActiveFilters] = useState<FilterState>({
        category: null,
        period: null,
        patient: null,
        status: null
    })

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date || new Date())
    }
    const handleViewChange = (view: "list" | "week" | "month") => {
        setView(view)
    }
    const handleFilterChange = (filters: FilterState) => {
        setActiveFilters(filters)
    }
    const handleNewAppointment = () => {
        console.log('New appointment clicked')
    }

    return (
        <div>
            <CalendarHeader
                selectedDate={selectedDate}
                currentView={view}
                activeFilters={activeFilters}
                onDateChange={handleDateChange}
                onViewChange={handleViewChange}
                onFilterChange={handleFilterChange}
                onNewAppointment={handleNewAppointment}
            />
        </div>
    )
}