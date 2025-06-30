import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { ViewProps } from "@/types/utility.types";
import { AppointmentCard } from './calendar-utility/AppointmentCard';
import { AppointmentDetailsPopover } from './calendar-utility/AppointmentDetailsPopover';

export default function WeekView({ selectedDate, appointments, view }: ViewProps) {

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

    return (
        <div className='pb-10 w-[1240px]'>
            <FullCalendar
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                headerToolbar={false}
                initialDate={selectedDate}
                key={selectedDate.toISOString()}
                slotMinTime="06:00:00"
                slotMaxTime="20:00:00"
                firstDay={1}
                locale="de"
                height="auto"
                events={events}
                allDaySlot={false}
                slotDuration="01:00:00"
                dayHeaderFormat={{ weekday: 'long', day: 'numeric', month: 'long' }}
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }}
                slotLabelContent={(args) => args.text + ' Uhr'}

                eventContent={(eventInfo) => {
                    const appointment = eventInfo.event.extendedProps.appointment
                    return (
                        <AppointmentDetailsPopover
                            appointment={appointment}
                        >
                            <div className="h-full w-full p-0 m-0 flex cursor-pointer">
                                <AppointmentCard
                                    view={view}
                                    appointment={appointment}
                                />
                            </div>
                        </AppointmentDetailsPopover>
                    )
                }}
            />
        </div>
    )
}