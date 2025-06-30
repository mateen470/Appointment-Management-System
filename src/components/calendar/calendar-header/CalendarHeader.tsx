import { DatePicker } from "./DatePicker";
import { ToggleView } from "./ToggleView";
import { NewAppointment } from "./NewAppointment";
import { AppointmentFilter } from "./AppointmentFilter";
import { CalendarHeaderProps } from "@/types/utility.types";

// Main header component for calendar with date picker, view toggle, filters, and new appointment button
export function CalendarHeader({
    selectedDate,
    currentView,
    activeFilters,
    onDateChange,
    onViewChange,
    onFilterChange,
}: CalendarHeaderProps) {
    return (
        <div className="p-4 space-y-4 lg:space-y-0 lg:flex lg:justify-between lg:items-start">
            <div className="w-full lg:w-1/2 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4">
                <div className="flex justify-between items-center w-full lg:w-auto">
                    <DatePicker value={selectedDate} onChange={onDateChange} />
                    <div className="ml-2 lg:hidden">
                        <NewAppointment />
                    </div>
                </div>

                <div className="w-full flex justify-center lg:justify-start">
                    <ToggleView value={currentView} onChange={onViewChange} />
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col-reverse items-end gap-4 lg:flex-row lg:items-center lg:justify-end">
                <AppointmentFilter value={activeFilters} onChange={onFilterChange} />
                <div className="hidden lg:block">
                    <NewAppointment />
                </div>
            </div>
        </div>
    );
}
