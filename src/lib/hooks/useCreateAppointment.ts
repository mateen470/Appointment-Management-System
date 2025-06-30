import { supabase } from "../supabase/client";
import { CreateAppointmentData } from "@/types/appointment.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentData: CreateAppointmentData) => {
      const { data, error } = await supabase
        .from("appointments")
        .insert([appointmentData])
        .select("*,patient: patients(*),category:categories(*)")
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.error("Error creating appointment:", error);
    },
  });
}
