"use client"

import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { ToggleViewProps } from "@/types/utility.types"

// Toggle view component for switching calendar display modes
export function ToggleView({ value, onChange }: ToggleViewProps) {

    // Local state for current view selection with default to week view
    const [view, setView] = useState<"list" | "week" | "month">(value || 'week')

    // Sync local view state when external value prop changes
    useEffect(() => {
        if (value) {
            setView(value)
        }
    }, [value])

    return (
        <Tabs
            value={view}
            onValueChange={(newValue) => {
                setView(newValue as 'list' | 'week' | 'month')
                onChange?.(newValue as 'list' | 'week' | 'month')
            }}
        >
            <TabsList className="h-9 rounded-sm p-1"
            >
                <TabsTrigger value="list" className=" rounded-sm cursor-pointer px-4">Liste</TabsTrigger>
                <TabsTrigger value="week" className="rounded-sm cursor-pointer px-4">Woche</TabsTrigger>
                <TabsTrigger value="month" className="rounded-sm cursor-pointer px-4">Monat</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
