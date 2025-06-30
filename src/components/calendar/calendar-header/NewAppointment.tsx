import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// New appointment button component that navigates to creation form
export function NewAppointment() {
    // Initialize router for navigation to new appointment page
    const router = useRouter()

    // Handle button click to navigate to new appointment form
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