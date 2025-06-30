import React from "react";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useRouter } from "next/navigation";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    Clock,
    MapPin,
    User,
    FileText,
    Calendar,
    Heart,
    Mail,
    Cake,
    Edit
} from "lucide-react";
import { AppointmentDetailsPopoverProps } from "@/types/utility.types";



export function AppointmentDetailsPopover({
    children,
    appointment
}: AppointmentDetailsPopoverProps) {
    const router = useRouter();

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/appointments/${appointment.id}/edit`);
    };

    const formatDateTime = (dateString: string) => {
        try {
            return format(new Date(dateString), "dd.MM.yyyy 'um' HH:mm", { locale: de });
        } catch {
            return dateString;
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "dd.MM.yyyy", { locale: de });
        } catch {
            return dateString;
        }
    };

    const formatTime = (dateString: string) => {
        try {
            return format(new Date(dateString), "HH:mm", { locale: de });
        } catch {
            return dateString;
        }
    };

    const calculateAge = (birthDate: string) => {
        try {
            const birth = new Date(birthDate);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            return age;
        } catch {
            return null;
        }
    };

    return (
        <HoverCard openDelay={200} closeDelay={100} >
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4" side="top" align="start">
                <div className="space-y-3">
                    <div className="space-y-2">
                        <div className="flex items-start justify-between">
                            <h4 className="font-semibold text-sm leading-tight">
                                {appointment.title || "Unbenannter Termin"}
                            </h4>
                            <div className="flex items-center gap-2">
                                {appointment.category && (
                                    <Badge
                                        variant="secondary"
                                        className="text-xs"
                                        style={{
                                            backgroundColor: appointment.category.color ? `${appointment.category.color}20` : undefined,
                                            color: appointment.category.color || undefined,
                                            borderColor: appointment.category.color || undefined
                                        }}
                                    >
                                        {appointment.category.label}
                                    </Badge>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleEditClick}
                                    className="h-6 w-6 p-0 hover:bg-gray-100 cursor-pointer"
                                >
                                    <Edit className="h-3 w-3 text-gray-500 hover:text-gray-700" />
                                </Button>
                            </div>
                        </div>

                        {appointment.category?.description && (
                            <p className="text-xs text-muted-foreground">
                                {appointment.category.description}
                            </p>
                        )}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Datum & Zeit</span>
                        </div>
                        <div className="pl-6 space-y-1">
                            {appointment.start && (
                                <div className="flex items-center gap-2 text-xs">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span>
                                        {formatDateTime(appointment.start)}
                                        {appointment.end && ` - ${formatTime(appointment.end)}`}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {appointment.location && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Ort</span>
                                </div>
                                <p className="pl-6 text-xs text-muted-foreground">
                                    {appointment.location}
                                </p>
                            </div>
                        </>
                    )}

                    {appointment.patient && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Patient</span>
                                </div>
                                <div className="pl-6 space-y-1">
                                    <div className="text-xs">
                                        <span className="font-medium">
                                            {appointment.patient.firstname && appointment.patient.lastname
                                                ? `${appointment.patient.firstname} ${appointment.patient.lastname}`
                                                : appointment.patient.firstname || appointment.patient.lastname || "Unbekannt"}
                                        </span>
                                        {appointment.patient.pronoun && (
                                            <span className="text-muted-foreground ml-1">
                                                ({appointment.patient.pronoun})
                                            </span>
                                        )}
                                    </div>

                                    {appointment.patient.birth_date && (
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Cake className="h-3 w-3" />
                                            <span>
                                                {formatDate(appointment.patient.birth_date)}
                                                {(() => {
                                                    const age = calculateAge(appointment.patient.birth_date);
                                                    return age ? ` (${age} Jahre)` : '';
                                                })()}
                                            </span>
                                        </div>
                                    )}

                                    {appointment.patient.care_level && (
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Heart className="h-3 w-3" />
                                            <span>Pflegegrad {appointment.patient.care_level}</span>
                                        </div>
                                    )}

                                    {appointment.patient.email && (
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Mail className="h-3 w-3" />
                                            <span>{appointment.patient.email}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {appointment.notes && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Notizen</span>
                                </div>
                                <p className="pl-6 text-xs text-muted-foreground leading-relaxed">
                                    {appointment.notes}
                                </p>
                            </div>
                        </>
                    )}

                    {appointment.attachements && appointment.attachements.length > 0 && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Anhänge</span>
                                </div>
                                <div className="pl-6">
                                    <Badge variant="outline" className="text-xs">
                                        {appointment.attachements.length} Datei(en)
                                    </Badge>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}