import { useState } from "react";
import ListView from "./ListView";
import { CalendarContainerProps, FilterState } from "@/types/utility.types";
import { CalendarHeader } from "./calendar-header/CalendarHeader";
import WeekView from "./WeekView";
import { MonthView } from "./MonthViews";

// Container component that orchestrates calendar views and manages shared state
export function CalendarContainer({ appointments }: CalendarContainerProps) {

    // State for currently selected date, defaults to today
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    // State for current calendar view mode (list, week, or month)
    const [view, setView] = useState<"list" | "week" | "month">("week")

    // State for active appointment filters with default empty values
    const [activeFilters, setActiveFilters] = useState<FilterState>({
        category: null,
        period: null,
        patient: null,
        status: null
    })

    // Handle date selection changes, fallback to current date if undefined
    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date || new Date())
    }

    // Handle calendar view mode changes
    const handleViewChange = (view: "list" | "week" | "month") => {
        setView(view)
    }

    // Handle filter state changes from filter component
    const handleFilterChange = (filters: FilterState) => {
        setActiveFilters(filters)
    }

    return (
        <div className="h-full flex flex-col">
            <CalendarHeader
                selectedDate={selectedDate}
                currentView={view}
                activeFilters={activeFilters}
                onDateChange={handleDateChange}
                onViewChange={handleViewChange}
                onFilterChange={handleFilterChange}
            />
            <div className={`flex-1 ${view === "list" ? "bg-muted p-10 overflow-y-auto" : "bg-none p-0 overflow-x-auto"}  h-full w-full `}>
                <div className={`${view === "list" ? "max-w-3xl p-2" : "w-full p-0"} mx-auto`}>
                    {view === 'list' ? <ListView selectedDate={selectedDate} appointments={appointments || []} view={view} /> : view === 'week' ? <WeekView selectedDate={selectedDate} appointments={appointments || []} view={view} /> : view === 'month' ? <MonthView selectedDate={selectedDate} appointments={appointments || []} view={view} onDateChange={setSelectedDate} /> : "404 NOT FOUND!!"}
                </div>
            </div>
        </div>
    )
}