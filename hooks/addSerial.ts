import type {
  ColectScannerProcess,
  ListScannerProcess,
  RefreshListSerial,
} from "@/types/types";
import { useCallback, useState } from "react";

export default function useAddSerial() {
  const [listSerials, setListSerials] = useState<ListScannerProcess>({});

  const addSerial = useCallback((serials: ColectScannerProcess) => {
    setListSerials((prev) => {
      const updated = { ...prev };
      const serialsNoProcessing = Object.entries(updated).filter(
        ([, value]) => !value.process
      );
      const serialNoProcessingObj = Object.fromEntries(serialsNoProcessing);

      serials.forEach(
        ({ serial, storage }) =>
          (serialNoProcessingObj[serial] = { storage: storage, process: false })
      );
      return serialNoProcessingObj;
    });
  }, []);

  const refreshListSerial: RefreshListSerial = useCallback(
    (serial, process) => {
      setListSerials((prev) => {
        console.log(serial);
        const copy = { ...prev };
        if (copy[serial]) copy[serial].process = process;
        return copy;
      });
    },
    []
  );

  return { addSerial, listSerials, refreshListSerial };
}
