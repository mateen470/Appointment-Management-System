import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

export function MonthView() {
    return (<FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />)
}