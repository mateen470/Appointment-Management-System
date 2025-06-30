"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { useAppointments } from "@/lib/hooks/useAppointments"
import { AppointmentForm } from "@/components/form/AppointmentForm"

interface EditAppointmentPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function EditAppointmentPage({ params }: EditAppointmentPageProps) {
    const router = useRouter();
    const { id } = use(params);
    const { data: appointmentsData, isLoading, error } = useAppointments();

    const appointment = appointmentsData?.find(apt => apt.id === id);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div>Lade Termin...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-red-600 mb-2">Fehler beim Laden</h1>
                    <p className="text-gray-600 mb-4">Der Termin konnte nicht geladen werden.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Zurück zum Kalender
                    </button>
                </div>
            </div>
        );
    }

    if (!appointment) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-900 mb-2">Termin nicht gefunden</h1>
                    <p className="text-gray-600 mb-4">Der gesuchte Termin existiert nicht oder wurde bereits gelöscht.</p>
                    <button
                        onClick={() => router.push('/')}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Zurück zum Kalender
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AppointmentForm
            mode="edit"
            appointmentId={id}
            initialData={appointment}
        />
    );
}