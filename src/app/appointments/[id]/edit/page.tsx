// Client component for editing existing appointments
"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { useAppointments } from "@/lib/hooks/useAppointments"
import { AppointmentForm } from "@/components/form/AppointmentForm"
import { Loading } from "@/components/ui/Loading"

// Props interface for the edit appointment page component
interface EditAppointmentPageProps {
    params: Promise<{
        id: string;
    }>;
}

// Edit appointment page component that handles appointment modification
export default function EditAppointmentPage({ params }: EditAppointmentPageProps) {
    // Initialize router for navigation
    const router = useRouter();

    // Extract appointment ID from URL parameters
    const { id } = use(params);

    // Fetch all appointments data to find the specific appointment
    const { data: appointmentsData, isLoading, error } = useAppointments();

    // Find the specific appointment by ID from the fetched data
    const appointment = appointmentsData?.find(apt => apt.id === id);

    // Show loading state while fetching appointment data
    if (isLoading) {
        return (
            <Loading />
        );
    }

    // Handle error state when appointment data fails to load
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

    // Handle case when appointment with given ID doesn't exist
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