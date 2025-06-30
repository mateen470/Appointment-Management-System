import { useState } from "react";
import ListView from "./ListView";
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