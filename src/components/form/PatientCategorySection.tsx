import { useState } from "react"
import { User, Tag, Check, ChevronsUpDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PatientCategorySectionProps } from "@/types/utility.types"


export function PatientCategorySection({
    patients,
    categories,
    selectedPatientId,
    selectedCategoryId,
    onPatientChange,
    onCategoryChange
}: PatientCategorySectionProps) {
    const [openPatient, setOpenPatient] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);

    const selectedPatient = patients.find(p => p.id === selectedPatientId);
    const selectedCategory = categories.find(c => c.id === selectedCategoryId);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="rounded-sm bg-muted">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <User className="h-5 w-5" />
                        Patient *
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Popover open={openPatient} onOpenChange={setOpenPatient}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openPatient}
                                className="w-full justify-between rounded-sm bg-white"
                            >
                                {selectedPatientId ? (
                                    <span className="truncate">
                                        {selectedPatient?.firstname} {selectedPatient?.lastname}
                                    </span>
                                ) : (
                                    "Patient auswählen"
                                )}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 rounded-sm bg-white">
                            <Command>
                                <CommandInput placeholder="Patient suchen..." className="border-none" />
                                <CommandList>
                                    <CommandEmpty>Kein Patient gefunden.</CommandEmpty>
                                    <CommandGroup>
                                        {patients.map((patient) => (
                                            <CommandItem
                                                key={patient.id}
                                                value={`${patient.firstname} ${patient.lastname} ${patient.email}`}
                                                onSelect={() => {
                                                    onPatientChange(patient.id);
                                                    setOpenPatient(false);
                                                }}
                                                className="cursor-pointer my-1 rounded-xs"
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedPatientId === patient.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                <div className="flex flex-col flex-1">
                                                    <div className="font-medium text-black">
                                                        {patient.firstname} {patient.lastname}
                                                    </div>
                                                    {patient.email && (
                                                        <div className="text-xs text-gray-500">{patient.email}</div>
                                                    )}
                                                </div>
                                                {patient.care_level && (
                                                    <Badge variant="outline" className="ml-2">
                                                        Pflegegrad {patient.care_level}
                                                    </Badge>
                                                )}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {selectedPatient && (
                        <div className="mt-3 p-3 rounded-sm bg-white">
                            <div className="text-sm font-semibold flex flex-wrap">
                                {selectedPatient.firstname} {selectedPatient.lastname}
                            </div>
                            {selectedPatient.email && (
                                <div className="text-xs text-gray-500 mt-1 break-words">{selectedPatient.email}</div>
                            )}
                            {selectedPatient.care_level && (
                                <Badge className="mt-2 rounded-xs bg-gray-200 text-black">
                                    Pflegegrad {selectedPatient.care_level}
                                </Badge>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="rounded-sm bg-muted">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Tag className="h-5 w-5" />
                        Kategorie *
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Popover open={openCategory} onOpenChange={setOpenCategory}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openCategory}
                                className="w-full justify-between rounded-sm"
                            >
                                {selectedCategoryId ? (
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: selectedCategory?.color || "#gray" }}
                                        />
                                        <span className="truncate">{selectedCategory?.label}</span>
                                    </div>
                                ) : (
                                    "Kategorie auswählen"
                                )}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 rounded-xs bg-white">
                            <Command>
                                <CommandInput placeholder="Kategorie suchen..." className="border-none" />
                                <CommandList>
                                    <CommandEmpty>Keine Kategorie gefunden.</CommandEmpty>
                                    <CommandGroup>
                                        {categories.map((category) => (
                                            <CommandItem
                                                key={category.id}
                                                value={`${category.label} ${category.description}`}
                                                onSelect={() => {
                                                    onCategoryChange(category.id);
                                                    setOpenCategory(false);
                                                }}
                                                className="cursor-pointer rounded-xs"
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedCategoryId === category.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                <div
                                                    className="w-3 h-3 rounded-full mr-2"
                                                    style={{ backgroundColor: category.color || "#gray" }}
                                                />
                                                <div className="flex flex-col flex-1">
                                                    <div className="font-medium text-black">{category.label}</div>
                                                    {category.description && (
                                                        <div className="text-xs text-gray-500">{category.description}</div>
                                                    )}
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>

                    {selectedCategory && (
                        <div className="mt-3 p-3 bg-white rounded-sm">
                            <div className="flex items-center gap-2 flex-wrap">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: selectedCategory.color || "#gray" }}
                                />
                                <div className="text-sm font-semibold break-words">{selectedCategory.label}</div>
                            </div>
                            {selectedCategory.description && (
                                <div className="text-xs text-gray-500 mt-1 break-words">{selectedCategory.description}</div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}