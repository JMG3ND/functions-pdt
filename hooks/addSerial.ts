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

  const sincronizeSerials = useCallback(() => {
    Object.entries(listSerials).forEach(([serial, { process, storage }]) => {
      if (process === undefined) {
        fetchSerial(serial, storage)
          .then(async (response) => {
            if (response.status !== 200)
              throw new Error("Error al ubicar producto: ");
            refreshListSerial(serial, true);
          })
          .catch((err) => {
            console.error(err);
            refreshListSerial(serial, false);
          });
      }
    });
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
