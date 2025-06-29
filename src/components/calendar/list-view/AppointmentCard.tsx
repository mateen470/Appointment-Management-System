import { useMemo } from "react"
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { format } from 'date-fns'
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, MapPin, MessageSquareQuote } from "lucide-react"
import { AppointmentCardProps } from "@/types/utility.types"
import { useUpdateAppointment } from "@/lib/hooks/useUpdateAppointment"

export function AppointmentCard({ appointment }: AppointmentCardProps) {

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

    return (
        <Card className="mt-2">
            <CardHeader className="h-auto md:h-[10px]">
                <CardTitle className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-xs inline-block" style={{ backgroundColor: appointment.category?.color || '#e5e7eb' }} />
                    <h1 className={`font-semibold text-base ${isComplete ? 'line-through' : ''}`}>{appointment.title || 'Untitled Appointment'}</h1>
                </CardTitle>
                <CardAction><Checkbox className="cursor-pointer h-4 w-4 rounded-xs" checked={isComplete} onCheckedChange={handleCheckedChange} /></CardAction>
            </CardHeader>

            <CardContent >
                <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="text-gray-500 font-medium text-sm">{appointment.start ? format(new Date(appointment.start), 'HH:mm') : 'No start time'} bis{" "}
                        {appointment.end ? format(new Date(appointment.end), 'HH:mm') : 'No end time'} Uhr</p>
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-gray-500 font-medium text-sm">{appointment.location || 'No location'}</p>
                </div>
                <div className="flex items-center gap-2">
                    <MessageSquareQuote className="h-4 w-4 text-muted-foreground" />
                    <p className="text-gray-500 font-medium text-sm">{appointment.notes || 'No notes'}</p>
                </div>
            </CardContent>
        </Card>
    )
}