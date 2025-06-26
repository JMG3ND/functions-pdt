import type { ListSerials } from "@/types/types";
import { useState } from "react";

export default function useAddSerial() {
  const [listSerials, setListSerials] = useState<ListSerials>(() => new Set());

  const addSerial = (serials: string[]) => {
    setListSerials(prev => {
      const updated = new Set(prev);
      serials.forEach(serial => updated.add(serial));
      return updated;
    });
  };

  return { addSerial, listSerials };
}
