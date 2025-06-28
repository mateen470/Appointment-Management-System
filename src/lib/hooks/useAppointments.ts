import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/client";

export function useAppointments() {
  const query = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("*,patient: patients(*),category:categories(*)");
      if (error) throw error;
      return data;
    },
  });
  return query;
}
