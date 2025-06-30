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
import { Loading } from "../ui/Loading"

// Main appointment form component handling both create and edit modes
export function AppointmentForm({ mode, appointmentId, initialData }: AppointmentFormProps) {
    // Router for navigation after form operations
    const router = useRouter();

    // Fetch appointments data to extract patients and categories
    const { data: appointmentsData, isLoading } = useAppointments();

    // Mutation hook for creating new appointments
    const createAppointment = useCreateAppointment();

    // Mutation hook for updating existing appointments
    const modifyAppointment = useModifyAppointment();

    // Mutation hook for deleting appointments
    const removeAppointment = useRemoveAppointment();

    // Main form state containing all appointment data
    const [formData, setFormData] = useState<AppointmentFormData>({
        title: "",
        start: null,
        end: null,
        location: "",
        patient: null,
        category: null,
        notes: "",
    });

    // Separate state for start time string (HH:MM format)
    const [startTime, setStartTime] = useState<string>("");

    // Separate state for end time string (HH:MM format)
    const [endTime, setEndTime] = useState<string>("");

    // Initialize form with existing data when in edit mode
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

    // Extract unique patients from appointments data for selection dropdown
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

    // Extract unique categories from appointments data for selection dropdown
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

    // Utility function to combine date and time into ISO string format
    const getCombinedDateTimeISO = (date: Date | null, time: string): string | null => {
        if (!date || !time) return null;
        const [hours, minutes] = time.split(':').map(Number);
        const combined = new Date(date);
        combined.setHours(hours, minutes, 0, 0);
        return combined.toISOString();
    };

    // Handle form submission for both create and edit operations
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

    // Handle appointment deletion with error handling and navigation
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

    // Navigate back to calendar without saving changes
    const handleCancel = () => {
        router.push('/');
    };

    // Validate required form fields before submission
    const isFormValid = () => {
        return formData.title.trim() &&
            formData.start &&
            startTime &&
            formData.patient &&
            formData.category;
    };

    // Check if any mutation is currently pending
    const isSubmitting = mode === "create" ? createAppointment.isPending : modifyAppointment.isPending;

    // Update appointment title in form state
    const handleTitleChange = (value: string) => {
        setFormData(prev => ({ ...prev, title: value }));
    };

    // Update appointment location in form state
    const handleLocationChange = (value: string) => {
        setFormData(prev => ({ ...prev, location: value }));
    };

    // Update appointment notes in form state
    const handleNotesChange = (value: string) => {
        setFormData(prev => ({ ...prev, notes: value }));
    };

    // Update selected patient in form state
    const handlePatientChange = (patientId: string) => {
        setFormData(prev => ({ ...prev, patient: patientId }));
    };

    // Update selected category in form state
    const handleCategoryChange = (categoryId: string) => {
        setFormData(prev => ({ ...prev, category: categoryId }));
    };

    // Update appointment start date in form state
    const handleStartDateChange = (date: Date | null) => {
        setFormData(prev => ({ ...prev, start: date }));
    };

    // Update appointment end date in form state
    const handleEndDateChange = (date: Date | null) => {
        setFormData(prev => ({ ...prev, end: date }));
    };

    // Update appointment start time string
    const handleStartTimeChange = (time: string) => {
        setStartTime(time);
    };

    // Update appointment end time string
    const handleEndTimeChange = (time: string) => {
        setEndTime(time);
    };

    // Show loading state while fetching initial data
    if (isLoading) {
        return (
            <Loading />
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