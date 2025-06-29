import { AppointmentFilter } from "./AppointmentFilter";
import { DatePicker } from "./DatePicker";
import { NewAppointment } from "./NewAppointment";
import { ToggleView } from "./ToggleView";

export function CalendarHeader() {
    return (
        <div><DatePicker /> <ToggleView /><AppointmentFilter /><NewAppointment /></div>
    )
}