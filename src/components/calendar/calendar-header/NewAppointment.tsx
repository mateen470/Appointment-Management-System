import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export function NewAppointment() {

    const router = useRouter()

    const handleClick = () => {
        router.push('/appointments/new');
    };

    return (
        <Button variant='default'
            className="h-8.5 rounded-sm cursor-pointer"
            onClick={handleClick}
        >
            <Plus className="h-4 w-4" />
            Neuer Termin</Button>
    )
}