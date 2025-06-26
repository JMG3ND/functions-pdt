import type { ColectScannerProcess, ListScannerProcess } from "@/types/types";
import { useState } from "react";

export default function useAddSerial() {
  const [listSerials, setListSerials] = useState<ListScannerProcess>(
    () => new Set()
  );

  const addSerial = (serials: ColectScannerProcess) => {
    setListSerials((prev) => {
      const updated = new Set(prev);
      serials.forEach((serial) => updated.add(serial));
      return updated;
    });
  };

  return { addSerial, listSerials };
}
