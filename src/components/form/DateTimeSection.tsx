import { format } from "date-fns"
import { de } from "date-fns/locale"
import { CalendarIcon, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { DateTimeSectionProps } from "@/types/utility.types"

//Date&Time section of AppointmentForm
export function DateTimeSection({
  startDate,
  endDate,
  startTime,
  endTime,
  onStartDateChange,
  onEndDateChange,
  onStartTimeChange,
  onEndTimeChange
}: DateTimeSectionProps) {
  return (
    <Card className="rounded-sm bg-muted">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <CalendarIcon className="h-5 w-5" />
          Datum & Uhrzeit
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Startdatum *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1 rounded-sm bg-white",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd.MM.yyyy", { locale: de }) : ""}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-sm" align="start">
                <Calendar
                  mode="single"
                  selected={startDate || undefined}
                  onSelect={(date) => {
                    onStartDateChange(date || null);
                    // Auto-set end date to same as start date if not set
                    if (date && !endDate) {
                      onEndDateChange(date);
                    }
                  }}
                  locale={de}
                  className="rounded-xs"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Enddatum</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal mt-1 rounded-sm bg-white",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "dd.MM.yyyy", { locale: de }) : ""}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-sm" align="start">
                <Calendar
                  mode="single"
                  selected={endDate || undefined}
                  onSelect={(date) => onEndDateChange(date || null)}
                  locale={de}
                  disabled={(date) => startDate ? date < startDate : false}
                  className="rounded-xs"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Startzeit *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal mt-1 rounded-sm bg-white"
                >
                  <Clock className="mr-2 h-4 w-4 text-gray-400" />
                  {startTime ? startTime : ""}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-sm" align="start">
                <div className="p-3">
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => onStartTimeChange(e.target.value)}
                    className="rounded-sm"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Endzeit</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal mt-1 rounded-sm bg-white"
                >
                  <Clock className="mr-2 h-4 w-4 text-gray-400" />
                  {endTime ? endTime : ""}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-sm" align="start">
                <div className="p-3">
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => onEndTimeChange(e.target.value)}
                    className="rounded-sm"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}