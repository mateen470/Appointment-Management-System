import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/client";

//Custom hook to fetch all appointments from supabse using tanstack query
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
