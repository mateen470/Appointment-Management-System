"use client"

import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { ToggleViewProps } from "@/types/utility.types"

export function ToggleView({ value, onChange }: ToggleViewProps) {

    const [view, setView] = useState<"list" | "week" | "month">(value || 'week')

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
