import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";

export function useRemoveAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentId: string) => {
      const { data, error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", appointmentId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.error("Error deleting appointment:", error);
    },
  });
}
