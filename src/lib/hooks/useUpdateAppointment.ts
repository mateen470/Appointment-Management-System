import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updated_at,
    }: {
      id: string;
      updated_at: string | null;
    }) => {
      const { data, error } = await supabase
        .from("appointments")
        .update({ updated_at })
        .eq("id", id)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
