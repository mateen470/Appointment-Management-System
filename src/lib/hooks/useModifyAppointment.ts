import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import {  UpdateAppointmentData } from "@/types/appointment.types";

//Custom hook to update existing appointment in supabse using tanstack query
export function useModifyAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentData: UpdateAppointmentData) => {
      const { id, ...updateFields } = appointmentData;

      const { data, error } = await supabase
        .from("appointments")
        .update({
          ...updateFields,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select("*,patient: patients(*),category:categories(*)")
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.error("Error updating appointment:", error);
    },
  });
}
