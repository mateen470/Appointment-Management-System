import { supabase } from '@/lib/supabase/client';

export default async function Home() {
  // Test each table
  const { data: categories, error: categoriesError } = await supabase.from("categories").select("*");
  const { data: patients, error: patientsError } = await supabase.from("patients").select("*");
  const { data: appointments, error: appointmentsError } = await supabase.from("appointments").select("*");
  const { data: relatives, error: relativesError } = await supabase.from("relatives").select("*");
  const { data: activities, error: activitiesError } = await supabase.from("activities").select("*");
  const { data: assignees, error: assigneesError } = await supabase.from("appointment_assignee").select("*");
  const { data: appointmentsWithJoins, error: joinError } = await supabase
    .from("appointments")
    .select(`
    *,
    patient:patients(*),
    category:categories(*)
  `);
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Database Connection Test</h1>

      <h2>Categories:</h2>
      <pre>Data: {JSON.stringify(categories, null, 2)}</pre>
      <pre>Error: {JSON.stringify(categoriesError, null, 2)}</pre>

      <h2>Patients:</h2>
      <pre>Data: {JSON.stringify(patients, null, 2)}</pre>
      <pre>Error: {JSON.stringify(patientsError, null, 2)}</pre>

      <h2>Appointments:</h2>
      <pre>Data: {JSON.stringify(appointments, null, 2)}</pre>
      <pre>Error: {JSON.stringify(appointmentsError, null, 2)}</pre>

      <h2>Relatives:</h2>
      <pre>Data: {JSON.stringify(relatives, null, 2)}</pre>
      <pre>Error: {JSON.stringify(relativesError, null, 2)}</pre>

      <h2>Activities:</h2>
      <pre>Data: {JSON.stringify(activities, null, 2)}</pre>
      <pre>Error: {JSON.stringify(activitiesError, null, 2)}</pre>

      <h2>Appointment Assignees:</h2>
      <pre>Data: {JSON.stringify(assignees, null, 2)}</pre>
      <pre>Error: {JSON.stringify(assigneesError, null, 2)}</pre>

      <h2>Appointments with Relationships:</h2>
      <pre>Data: {JSON.stringify(appointmentsWithJoins, null, 2)}</pre>
      <pre>Error: {JSON.stringify(joinError, null, 2)}</pre>
    </div>
  );
}