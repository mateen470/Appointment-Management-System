"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { useAppointments } from "@/lib/hooks/useAppointments"
import { useCreateAppointment } from "@/lib/hooks/useCreateAppointment"
import { AppointmentFormData, Category, CreateAppointmentData, Patient } from "@/types/appointment.types"
import { BasicInfoSection } from "@/components/form/BasicInfoSection"
import { PatientCategorySection } from "@/components/form/PatientCategorySection"
import { DateTimeSection } from "@/components/form/DateTimeSection"

export default function NewAppointmentPage() {
  const router = useRouter();

  const { data: appointmentsData, isLoading } = useAppointments();
  const createAppointment = useCreateAppointment();

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
      {/* Header */}
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Neuer Termin</h1>
              <p className="text-sm text-gray-500">Erstellen Sie einen neuen Termin für einen Patienten</p>
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
                  disabled={!isFormValid() || createAppointment.isPending}
                  className="flex-1 rounded-sm cursor-pointer"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {createAppointment.isPending ? "Speichern..." : "Termin erstellen"}
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