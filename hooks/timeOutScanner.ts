import type { ColectScannerProcess } from "@/types/types";
import { useEffect, useRef } from "react";

function useTimeOutScanner(addSerial: (arr: ColectScannerProcess) => void) {
  const serialsQueue = useRef<ColectScannerProcess>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAddSerial = (serial: string, storage: string) => {
    serialsQueue.current.push({
      serial,
      storage,
    });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const currentSerials = [...serialsQueue.current];
      addSerial(currentSerials);

      serialsQueue.current = [];
      timeoutRef.current = null;
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { handleAddSerial };
}

export { useTimeOutScanner };

