import { Appointment } from "./appointment.types";

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

export interface NewAppointmentProps {
  onClick?: () => void;
  disabled?: boolean;
}

export interface CalendarHeaderProps {
  selectedDate: Date;
  currentView: "list" | "week" | "month";
  activeFilters: FilterState;
  onDateChange: (date: Date | undefined) => void;
  onViewChange: (view: "list" | "week" | "month") => void;
  onFilterChange: (filters: FilterState) => void;
  onNewAppointment: () => void;
}

export interface ListViewProps {
  selectedDate: Date;
  appointments: Appointment[];
}

export interface CalendarContainerProps {
  appointments: Appointment[];
}

export interface AppointmentCardProps {
  appointment: Appointment;
}
