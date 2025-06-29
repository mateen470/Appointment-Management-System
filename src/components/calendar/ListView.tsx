import { useMemo } from 'react';
import { format } from 'date-fns'
import { ViewProps } from "@/types/utility.types";
import { AppointmentCard } from './calendar-cards/AppointmentCard';
import { Appointment } from '@/types/appointment.types';
import { de } from 'date-fns/locale';
import { Info } from 'lucide-react';


export default function ListView({ selectedDate, appointments, view }: ViewProps) {

    const groupedAppointments = useMemo(() => {
        // Group appointments by date
        const groups: { [key: string]: Appointment[] } = {}

        appointments.forEach(appointment => {
            if (appointment.start) {
                const dateKey = format(new Date(appointment.start), 'yyyy-MM-dd')
                if (!groups[dateKey]) {
                    groups[dateKey] = []
                }
                groups[dateKey].push(appointment)
            }
        })

        const selectedDateKey = format(selectedDate, 'yyyy-MM-dd')
        const sortedEntries = Object.entries(groups).sort(([dateA], [dateB]) => {
            // Selected date comes first
            if (dateA === selectedDateKey) return -1
            if (dateB === selectedDateKey) return 1

            // Sort chronologically
            return dateA.localeCompare(dateB)
        })
        return Object.fromEntries(sortedEntries)
    }, [appointments, selectedDate])

    return (
        <div className="mx-auto flex flex-col gap-5 w-full overflow-y-auto">
            <h1 className="text-center font-semibold text-base text-balance">
                Termine vor dem <p className='inline-block w-[90px]'>{selectedDate ? format(selectedDate, 'dd.MM.yyyy') : ''}</p> laden
            </h1>
            {Object.entries(groupedAppointments).map(([dateKey, dayAppointments]) => {
                const isToday = format(new Date(), 'yyyy-MM-dd') === dateKey

                return (
                    <div key={dateKey}>
                        <div className='flex justify-between items-center gap-2 px-3'>
                            <h2 className='font-semibold text-xl'>{format(new Date(dateKey), 'EEEE, dd. MMMM', { locale: de })}</h2>
                            {isToday && (<div className='bg-green-200 rounded-xs p-1 font-semibold text-xs text-green-400 flex items-center justify-center gap-1'><Info className='h-4 w-4' /><h3>Heute</h3></div>)}
                        </div>
                        {dayAppointments.map(appointment => (
                            <AppointmentCard key={appointment.id} appointment={appointment} view={view} />
                        ))}
                    </div>)
            })}
            <h1 className="text-center font-semibold text-base text-balance text-gray-500">
                Keine weiteren Termine gefunden
            </h1>
        </div>
    )
}