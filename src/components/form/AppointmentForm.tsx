"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useAppointments } from "@/lib/hooks/useAppointments"
import { useCreateAppointment } from "@/lib/hooks/useCreateAppointment"
import { useModifyAppointment } from "@/lib/hooks/useModifyAppointment"
import { useRemoveAppointment } from "@/lib/hooks/useRemoveAppointment"
import { AppointmentFormData, Category, CreateAppointmentData, Patient, UpdateAppointmentData } from "@/types/appointment.types"
import { BasicInfoSection } from "@/components/form/BasicInfoSection"
import { PatientCategorySection } from "@/components/form/PatientCategorySection"
import { DateTimeSection } from "@/components/form/DateTimeSection"
import { AppointmentFormProps } from "@/types/utility.types"


export function AppointmentForm({ mode, appointmentId, initialData }: AppointmentFormProps) {
    const router = useRouter();

    const { data: appointmentsData, isLoading } = useAppointments();
    const createAppointment = useCreateAppointment();
    const modifyAppointment = useModifyAppointment();
    const removeAppointment = useRemoveAppointment();

    const [formData, setFormData] = useState<AppointmentFormData>({
        title: "",
        start: null,
        end: null,
        location: "",
        patient: null,
        category: null,
        notes: "",
    });

    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setFormData({
                title: initialData.title || "",
                start: initialData.start ? new Date(initialData.start) : null,
                end: initialData.end ? new Date(initialData.end) : null,
                location: initialData.location || "",
                patient: initialData.patient?.id || null,
                category: initialData.category?.id || null,
                notes: initialData.notes || "",
            });

            if (initialData.start) {
                const startDate = new Date(initialData.start);
                setStartTime(startDate.toTimeString().substring(0, 5));
            }
            if (initialData.end) {
                const endDate = new Date(initialData.end);
                setEndTime(endDate.toTimeString().substring(0, 5));
            }
        }
    }, [mode, initialData]);

    const patients: Patient[] = appointmentsData
        ? Array.from(
            new Map(
                appointmentsData
                    .filter(apt => apt.patient)
                    .map(apt => apt.patient!)
                    .map(patient => [patient.id, patient])
            ).values()
        )
        : [];

    const categories: Category[] = appointmentsData
        ? Array.from(
            new Map(
                appointmentsData
                    .filter(apt => apt.category)
                    .map(apt => apt.category!)
                    .map(category => [category.id, category])
            ).values()
        )
        : [];

    const getCombinedDateTimeISO = (date: Date | null, time: string): string | null => {
        if (!date || !time) return null;
        const [hours, minutes] = time.split(':').map(Number);
        const combined = new Date(date);
        combined.setHours(hours, minutes, 0, 0);
        return combined.toISOString();
    };

    const handleSubmit = async () => {
        if (mode === "create") {
            const appointmentData: CreateAppointmentData = {
                title: formData.title || null,
                start: getCombinedDateTimeISO(formData.start, startTime),
                end: getCombinedDateTimeISO(formData.end, endTime),
                location: formData.location || null,
                patient: formData.patient,
                category: formData.category,
                notes: formData.notes || null,
                attachements: null,
            };

            try {
                await createAppointment.mutateAsync(appointmentData);
                toast.success("Termin erfolgreich erstellt!");
                router.push('/');
            } catch (error) {
                console.error("Error creating appointment:", error);
                toast.error("Fehler beim Erstellen des Termins");
            }
        } else {
            if (!appointmentId) return;

            const appointmentData: UpdateAppointmentData = {
                id: appointmentId,
                title: formData.title || null,
                start: getCombinedDateTimeISO(formData.start, startTime),
                end: getCombinedDateTimeISO(formData.end, endTime),
                location: formData.location || null,
                patient: formData.patient,
                category: formData.category,
                notes: formData.notes || null,
                attachements: initialData?.attachements || null,
            };

            try {
                await modifyAppointment.mutateAsync(appointmentData);
                toast.success("Termin erfolgreich aktualisiert!");
                router.push('/');
            } catch (error) {
                console.error("Error updating appointment:", error);
                toast.error("Fehler beim Aktualisieren des Termins");
            }
        }
    };

    const handleDelete = async () => {
        if (!appointmentId) return;

        try {
            await removeAppointment.mutateAsync(appointmentId);
            toast.success("Termin erfolgreich gelöscht!");
            router.push('/');
        } catch (error) {
            console.error("Error deleting appointment:", error);
            toast.error("Fehler beim Löschen des Termins");
        }
    };

    const handleCancel = () => {
        router.push('/');
    };

    const isFormValid = () => {
        return formData.title.trim() &&
            formData.start &&
            startTime &&
            formData.patient &&
            formData.category;
    };

    const isSubmitting = mode === "create" ? createAppointment.isPending : modifyAppointment.isPending;

    const handleTitleChange = (value: string) => {
        setFormData(prev => ({ ...prev, title: value }));
    };

    const handleLocationChange = (value: string) => {
        setFormData(prev => ({ ...prev, location: value }));
    };

    const handleNotesChange = (value: string) => {
        setFormData(prev => ({ ...prev, notes: value }));
    };

    const handlePatientChange = (patientId: string) => {
        setFormData(prev => ({ ...prev, patient: patientId }));
    };

    const handleCategoryChange = (categoryId: string) => {
        setFormData(prev => ({ ...prev, category: categoryId }));
    };

    const handleStartDateChange = (date: Date | null) => {
        setFormData(prev => ({ ...prev, start: date }));
    };

    const handleEndDateChange = (date: Date | null) => {
        setFormData(prev => ({ ...prev, end: date }));
    };

    const handleStartTimeChange = (time: string) => {
        setStartTime(time);
    };

    const handleEndTimeChange = (time: string) => {
        setEndTime(time);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div>Lade Daten...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div>
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 cursor-pointer"
                            onClick={handleCancel}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex justify-between w-full items-center gap-3 flex-wrap">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {mode === "create" ? "Neuer Termin" : "Termin bearbeiten"}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    {mode === "create"
                                        ? "Erstellen Sie einen neuen Termin für einen Patienten"
                                        : "Bearbeiten Sie den bestehenden Termin"
                                    }
                                </p>
                            </div>
                            {mode === "edit" && (
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            disabled={removeAppointment.isPending}
                                            className="rounded-sm cursor-pointer"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            {removeAppointment.isPending ? "Löschen..." : "Löschen"}
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Termin löschen</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Sind Sie sicher, dass Sie diesen Termin löschen möchten?
                                                Diese Aktion kann nicht rückgängig gemacht werden.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="cursor-pointer">Abbrechen</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDelete}
                                                className="bg-red-600 hover:bg-red-700 cursor-pointer"
                                            >
                                                Löschen
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 pb-8">
                <div className="space-y-6">
                    <BasicInfoSection
                        title={formData.title}
                        location={formData.location}
                        notes={formData.notes}
                        onTitleChange={handleTitleChange}
                        onLocationChange={handleLocationChange}
                        onNotesChange={handleNotesChange}
                    />

                    <PatientCategorySection
                        patients={patients}
                        categories={categories}
                        selectedPatientId={formData.patient}
                        selectedCategoryId={formData.category}
                        onPatientChange={handlePatientChange}
                        onCategoryChange={handleCategoryChange}
                    />

                    <DateTimeSection
                        startDate={formData.start}
                        endDate={formData.end}
                        startTime={startTime}
                        endTime={endTime}
                        onStartDateChange={handleStartDateChange}
                        onEndDateChange={handleEndDateChange}
                        onStartTimeChange={handleStartTimeChange}
                        onEndTimeChange={handleEndTimeChange}
                    />

                    <Card className="bg-transparent border-none shadow-none">
                        <CardContent>
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!isFormValid() || isSubmitting}
                                    className="flex-1 rounded-sm cursor-pointer"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    {isSubmitting
                                        ? "Speichern..."
                                        : mode === "create"
                                            ? "Termin erstellen"
                                            : "Termin aktualisieren"
                                    }
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={handleCancel}
                                    className="flex-1 rounded-sm cursor-pointer"
                                >
                                    Abbrechen
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}