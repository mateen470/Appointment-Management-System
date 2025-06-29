"use client"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { DatePickerProps } from "@/types/utility.types"

export function DatePicker({ value, onChange }: DatePickerProps) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(value)

    useEffect(() => {
        if (!value) {
            setDate(new Date())
        }
    }, [value])

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-auto md:min-w-50 justify-start rounded-sm h-9 cursor-pointer"
                    >
                        <CalendarIcon className="h-4 w-4" />
                        {date ? format(date, 'd MMMM yyyy', { locale: de }) : "Select date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            onChange?.(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
