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
            <TabsList>
                <TabsTrigger value="list">Liste</TabsTrigger>
                <TabsTrigger value="week">Woche</TabsTrigger>
                <TabsTrigger value="month">Monat</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}
