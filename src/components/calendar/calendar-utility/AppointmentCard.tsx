import { useMemo } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { format } from 'date-fns'
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, MapPin, MessageSquareQuote } from "lucide-react"
import { AppointmentCardProps } from "@/types/utility.types"
import { useUpdateAppointment } from "@/lib/hooks/useUpdateAppointment"

export function AppointmentCard({ view, appointment }: AppointmentCardProps) {

    const isComplete = useMemo(() => {
        if (!appointment.updated_at) return false

        // If updated today, consider it "completed"
        const updatedDate = format(new Date(appointment.updated_at), 'yyyy-MM-dd')
        const today = format(new Date(), 'yyyy-MM-dd')

        return updatedDate === today
    }, [appointment.updated_at])

    const updateMutation = useUpdateAppointment()

    const handleCheckedChange = (checked: boolean) => {
        if (checked) {
            updateMutation.mutate({ id: appointment.id, updated_at: new Date().toISOString() }, {
                onError: (error) => {
                    console.error('Failed to update appointment:', error)
                }
            })
        } else {
            updateMutation.mutate({ id: appointment.id, updated_at: null }, {
                onError: (error) => {
                    console.error('Failed to update appointment:', error)
                }
            })
        }
    }

    const getLighterColor = (color: string) => {
        return color + '30';
    }

    if (view === 'month') {
        return (
            <Card
                className="mt-0 rounded-xs w-full border-l-4 p-0 m-0 bg-white h-[40px]"
                style={{
                    borderLeftColor: appointment.category?.color || '#e5e7eb'
                }}
            >
                <CardHeader className="p-2 h-full">
                    <CardTitle className="w-full">
                        <h1 className="font-semibold text-wrap text-[11px] line-clamp-2">
                            {appointment.title || 'Untitled Appointment'}
                        </h1>
                    </CardTitle>
                </CardHeader>
            </Card>
        )
    }

    return (
        <Card
            className={`${view === 'list' ? "mt-2" : "min-h-[120px] mt-0 border-l-4 rounded-xs w-full"}`}
            style={view === 'week' ? {
                backgroundColor: getLighterColor(appointment.category?.color || '#e5e7eb'),
                borderLeftColor: appointment.category?.color || '#e5e7eb'
            } : {}}
        >
            <CardHeader className={`${view === 'list' ? 'h-auto md:h-[10px]' : 'h-[10px] py-0 px-2 -mt-3'}`}>
                <CardTitle className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1 min-w-0 flex-1">
                        {view === 'list' && (
                            <div className="h-3 w-3 rounded-xs inline-block flex-shrink-0"
                                style={{ backgroundColor: appointment.category?.color || '#e5e7eb' }} />
                        )}
                        <h1 className={`font-semibold  ${view === 'list' ? 'text-base' : 'line-clamp-2 text-[12px]'} ${isComplete ? 'line-through' : ''}`}>
                            {appointment.title || 'Untitled Appointment'}
                        </h1>
                    </div>
                    <Checkbox
                        className="cursor-pointer bg-white rounded-xs flex-shrink-0 h-4 w-4"
                        checked={isComplete}
                        onCheckedChange={handleCheckedChange}
                    />
                </CardTitle>
            </CardHeader>

            <CardContent className={view === 'list' ? '' : 'py-0 px-2 space-y-1'}>
                <div className={`flex items-start gap-1 ${view === 'list' ? 'mb-2' : ''}`}>
                    <Clock className={`${view === 'list' ? 'h-4 w-4' : 'h-3 w-3 min-h-[12px] min-w-[12px]'} text-muted-foreground flex-shrink-0`} />
                    <p className={`text-gray-500 font-medium whitespace-nowrap truncate ${view === 'list' ? 'text-sm' : 'text-[10px] max-w-[100px]'}`}>
                        {appointment.start ? format(new Date(appointment.start), 'HH:mm') : 'No start time'} bis{" "}
                        {appointment.end ? format(new Date(appointment.end), 'HH:mm') : 'No end time'} Uhr
                    </p>
                </div>

                <div className={`flex items-start gap-1 ${view === 'list' ? 'mb-2' : ''}`}>
                    <MapPin className={`${view === 'list' ? 'h-4 w-4' : 'h-3 w-3 min-h-[12px] min-w-[12px]'} text-muted-foreground flex-shrink-0`} />
                    <p className={`text-gray-500 font-medium whitespace-nowrap truncate ${view === 'list' ? 'text-sm' : 'text-[10px] max-w-[100px]'}`}>
                        {appointment.location || 'No location'}
                    </p>
                </div>

                <div className="flex items-start gap-1">
                    <MessageSquareQuote className={`${view === 'list' ? 'h-4 w-4' : 'h-3 w-3 min-h-[12px] min-w-[12px]'} text-muted-foreground flex-shrink-0`} />
                    <p className={`text-gray-500 font-medium whitespace-nowrap truncate ${view === 'list' ? 'text-sm' : 'text-[10px] max-w-[100px]'}`}>
                        {appointment.notes || 'No notes'}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}