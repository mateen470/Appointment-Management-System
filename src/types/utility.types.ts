import { Appointment, Category, Patient } from "./appointment.types";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export interface ToggleViewProps {
  value?: "list" | "week" | "month";
  onChange?: (value: "list" | "week" | "month") => void;
}

export interface FilterState {
  category: string | null;
  period: string | null;
  patient: string | null;
  status: string | null;
}

export interface AppointmentFilterProps {
  value?: FilterState;
  onChange?: (filters: FilterState) => void;
}

export interface CalendarHeaderProps {
  selectedDate: Date;
  currentView: "list" | "week" | "month";
  activeFilters: FilterState;
  onDateChange: (date: Date | undefined) => void;
  onViewChange: (view: "list" | "week" | "month") => void;
  onFilterChange: (filters: FilterState) => void;
}

export interface ViewProps {
  view: "list" | "week" | "month";
  selectedDate: Date;
  appointments: Appointment[];
  onDateChange?: (date: Date) => void;
}

export interface CalendarContainerProps {
  appointments: Appointment[];
}

export interface AppointmentCardProps {
  view: "list" | "week" | "month";
  appointment: Appointment;
}

export interface AppointmentDetailsPopoverProps {
  children: React.ReactNode;
  appointment: Appointment;
}

export interface BasicInfoSectionProps {
  title: string;
  location: string;
  notes: string;
  onTitleChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onNotesChange: (value: string) => void;
}

export interface PatientCategorySectionProps {
    patients: Patient[];
    categories: Category[];
    selectedPatientId: string | null;
    selectedCategoryId: string | null;
    onPatientChange: (patientId: string) => void;
    onCategoryChange: (categoryId: string) => void;
}

export interface DateTimeSectionProps {
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}