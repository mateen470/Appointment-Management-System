type UUID = string;

export interface Appointment {
  id: UUID;
  created_at: string;
  updated_at: string | null;
  start: string | null;
  end: string | null;
  location: string | null;
  patient: UUID | null; // Foreign key
  attachements: string[] | null;
  category: UUID | null; // Foreign key
  notes: string | null;
  title: string | null;
}
export interface Patient {
  id: UUID;
  created_at: string;
  firstname: string | null;
  lastname: string | null;
  birth_date: string | null;
  care_level: number | null;
  pronoun: string | null;
  email: string | null;
  active: boolean | null;
  active_since: string | null;
}
export interface Category {
  id: UUID;
  created_at: string;
  updated_at: string | null;
  label: string | null;
  description: string | null;
  color: string | null;
  icon: string | null;
}

export interface CreateAppointmentData {
  title: string | null;
  start: string | null;
  end: string | null;
  location: string | null;
  patient: UUID | null; // Foreign key
  category: UUID | null; // Foreign key
  notes: string | null;
  attachements: string[] | null;
}

export interface UpdateAppointmentData {
  id: UUID;
  title: string | null;
  start: string | null;
  end: string | null;
  location: string | null;
  patient: UUID | null; // Foreign key
  category: UUID | null; // Foreign key
  notes: string | null;
  attachements: string[] | null;
}

export interface AppointmentFormData {
  title: string;
  start: Date | null;
  end: Date | null;
  location: string;
  patient: UUID | null; // Foreign key
  category: UUID | null; // Foreign key
  notes: string;
}
