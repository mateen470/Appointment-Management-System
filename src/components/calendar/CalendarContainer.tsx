import { useState } from "react";
import ListView from "./list-view/ListView";
import { CalendarContainerProps, FilterState } from "@/types/utility.types";
import { CalendarHeader } from "./calendar-header/CalendarHeader";
import WeekView from "./WeekView";
import { MonthView } from "./MonthViews";

export function CalendarContainer({ appointments }: CalendarContainerProps) {

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
        <div className="h-full flex flex-col overflow-hidden">
            <CalendarHeader
                selectedDate={selectedDate}
                currentView={view}
                activeFilters={activeFilters}
                onDateChange={handleDateChange}
                onViewChange={handleViewChange}
                onFilterChange={handleFilterChange}
                onNewAppointment={handleNewAppointment}
            />
            <div className="flex-1 bg-muted h-full w-full p-10 overflow-y-auto">
                <div className="max-w-3xl p-2 mx-auto">
                    {view === 'list' ? <ListView selectedDate={selectedDate} appointments={appointments || []} /> : view === 'week' ? <WeekView /> : view === 'month' ? <MonthView /> : "404 NOT FOUND!!"}
                </div>
            </div>
        </div>
    )
}