import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/client";

//Custom hook to update only updated_at of appointment in supabse
// using tanstack query to put "line-through" in appointment card title
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
