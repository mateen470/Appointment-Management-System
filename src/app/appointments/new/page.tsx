import { AppointmentForm } from "@/components/form/AppointmentForm"

export default function NewAppointmentPage() {
  return (
    // Render appointment form in create mode for new appointments
    <AppointmentForm mode="create" />
  )
}