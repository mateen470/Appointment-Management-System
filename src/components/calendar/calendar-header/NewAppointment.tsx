import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button";
import { NewAppointmentProps } from "@/types/utility.types";


export function NewAppointment({ onClick, disabled }: NewAppointmentProps) {
    return (
        <Button variant='default'
            onClick={onClick}
            disabled={disabled}>
            <Plus className="h-4 w-4" />
            Neuer Termin</Button>
    )
}