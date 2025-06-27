import fetchSerial from "@/composables/ApiFetch/fetchSerial";
import type {
  ColectScannerProcess,
  ListScannerProcess,
  RefreshListSerial,
} from "@/types/types";
import { useCallback, useEffect, useState } from "react";

export default function useAddSerial() {
  const [listSerials, setListSerials] = useState<ListScannerProcess>({});

  const refreshListSerial: RefreshListSerial = useCallback(
    (serial, process) => {
      setListSerials((prev) => {
        const copy = { ...prev };
        if (copy[serial]) {
          copy[serial].process = process;
        }
        return copy;
      });
    },
    []
  );

  const sincronizeSerials = useCallback(async () => {
    for (const [serial, { process, storage }] of Object.entries(listSerials)) {
      if (process === undefined) {
        try {
          await fetchSerial(serial, storage);
          refreshListSerial(serial, true);
        } catch (error) {
          console.log(error);
          refreshListSerial(serial, false);
        }
      }
    }
  }, [listSerials, refreshListSerial]);

  const addSerial = useCallback((serials: ColectScannerProcess) => {
    setListSerials((prev) => {
      const updated = { ...prev };
      const serialsNoProcessing = Object.entries(updated).filter(
        ([, value]) => value.process === undefined
      );
      const serialNoProcessingObj = Object.fromEntries(serialsNoProcessing);

      serials.forEach(
        ({ serial, storage }) =>
          (serialNoProcessingObj[serial] = {
            storage: storage,
          })
      );

      return serialNoProcessingObj;
    });
  }, []);

  useEffect(() => {
    sincronizeSerials();
  }, [listSerials, sincronizeSerials]);

  return { addSerial, listSerials, refreshListSerial, sincronizeSerials };
}
