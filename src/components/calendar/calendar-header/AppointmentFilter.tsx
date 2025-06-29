import { useEffect, useState } from "react"
import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppointmentFilterProps, FilterState } from "@/types/utility.types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AppointmentFilter({ value, onChange }: AppointmentFilterProps) {

    const [filters, setFilters] = useState<FilterState>(value || {
        category: null,
        period: null,
        patient: null,
        status: null
    })

    const handleFilterChange = (filterType: keyof FilterState, value: string | null) => {
        const newFilters = { ...filters, [filterType]: value }
        setFilters(newFilters)
        onChange?.(newFilters)
    }

    useEffect(() => {
        if (value) {
            setFilters(value)
        }
    }, [value])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-sm h-9 cursor-pointer" ><SlidersHorizontal className="mr-2 h-4 w-4" />Termine filtern</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">

                <DropdownMenuLabel>Kategorie</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleFilterChange('category', null)}>
                    Alle Kategorien
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('category', 'hausbesuch')}>
                    Hausbesuch
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('category', 'pflegetermin')}>
                    Pflegetermin
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Zeitraum</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleFilterChange('period', null)}>
                    Alle Termine
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('period', 'heute')}>
                    Heute
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('period', 'diese-woche')}>
                    Diese Woche
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('period', 'dieser-monat')}>
                    Dieser Monat
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('period', 'kommende-woche')}>
                    Kommende Woche
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Patient</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleFilterChange('patient', null)}>
                    Alle Patienten
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('patient', 'maria-schmidt')}>
                    Maria Schmidt
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('patient', 'hans-mueller')}>
                    Hans Mueller
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleFilterChange('status', null)}>
                    Alle Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('status', 'vergangen')}>
                    Vergangen
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('status', 'heute')}>
                    Heute
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterChange('status', 'zukuenftig')}>
                    Zukünftig
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
