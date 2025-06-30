import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { ViewProps } from "@/types/utility.types";
import { AppointmentCard } from './calendar-utility/AppointmentCard'
import { AppointmentDetailsPopover } from './calendar-utility/AppointmentDetailsPopover';
import { Button } from '@/components/ui/button';

export function MonthView({
    selectedDate,
    appointments,
    view,
    onDateChange
}: ViewProps) {

    const events = appointments
        .filter(appointment => appointment.start && appointment.end)
        .map(appointment => ({
            id: appointment.id,
            title: appointment.title || 'Untitled',
            start: appointment.start!,
            end: appointment.end!,
            extendedProps: {
                appointment: appointment
            },
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            textColor: 'transparent'
        }))

    const goToPreviousMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() - 1);
        onDateChange?.(newDate);
    };

    const goToNextMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + 1);
        onDateChange?.(newDate);
    };

    return (
        <div className='pb-10'>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={false}
                initialDate={selectedDate}
                key={selectedDate.toISOString()}
                firstDay={1}
                locale="de"
                height="auto"
                events={events}
                dayHeaderFormat={{ weekday: 'long' }}
                dayMaxEvents={1}
                moreLinkClick="popover"
                eventDisplay="block"

                dayCellContent={(args) => {
                    const day = args.date.getDate();
                    return day.toString().padStart(2, '0');
                }}
                eventContent={(eventInfo) => {
                    const appointment = eventInfo.event.extendedProps.appointment;

                    return (
                        <AppointmentDetailsPopover
                            appointment={appointment}
                        >
                            <div className="h-full w-full p-0 m-0 cursor-pointer">
                                <AppointmentCard
                                    view={view}
                                    appointment={appointment}
                                />
                            </div>
                        </AppointmentDetailsPopover>
                    )
                }}
            />

            {onDateChange && (
                <div className="flex justify-center gap-3 mt-3">
                    <Button
                        onClick={goToPreviousMonth}
                        className="bg-muted hover:bg-gray-200 text-black text-xs border-0 cursor-pointer rounded-sm"
                    >
                        Vorherigen Monat Laden
                    </Button>
                    <Button
                        onClick={goToNextMonth}
                        className="bg-muted hover:bg-gray-200 text-black text-xs border-0 cursor-pointer rounded-sm"
                    >
                        Nächsten Monat Laden
                    </Button>
                </div>
            )}
        </div>
    )
}