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
  onFilterChange?: (filters: FilterState) => void;
}

export interface NewAppointmentProps {
  onClick?: () => void;
  disabled?: boolean;
}
