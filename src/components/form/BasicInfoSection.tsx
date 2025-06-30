import { FileText, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { BasicInfoSectionProps } from "@/types/utility.types"


export function BasicInfoSection({
    title,
    location,
    notes,
    onTitleChange,
    onLocationChange,
    onNotesChange
}: BasicInfoSectionProps) {
    return (
        <Card className="rounded-sm bg-muted">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <FileText className="h-5 w-5" />
                    Grundinformationen
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex items-center justify-between gap-2">
                        <Label htmlFor="title">Titel *</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-4 w-4 p-0 hover:bg-transparent cursor-pointer">
                                    <Info className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto text-xs" side="left">
                                <p>z.B. Arzttermin, Physiotherapie, Kontrolluntersuchung</p>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        className="mt-1 rounded-sm bg-white"
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between gap-2">
                        <Label htmlFor="location">Ort</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-4 w-4 p-0 hover:bg-transparent cursor-pointer">
                                    <Info className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto text-xs" side="left">
                                <p>z.B. Praxis Dr. Schmidt, Krankenhaus München, Physiotherapiepraxis</p>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="relative mt-1">
                        <Input
                            id="location"
                            value={location}
                            onChange={(e) => onLocationChange(e.target.value)}
                            className="pl-10 rounded-sm bg-white"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between gap-2">
                        <Label htmlFor="notes">Notizen</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-4 w-4 p-0 hover:bg-transparent cursor-pointer">
                                    <Info className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto text-xs" side="left">
                                <p>Zusätzliche Informationen zum Termin, Besonderheiten, Vorbereitung oder wichtige Hinweise</p>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => onNotesChange(e.target.value)}
                        className="mt-1 rounded-sm bg-white"
                        rows={3}
                    />
                </div>
            </CardContent>
        </Card>
    );
}