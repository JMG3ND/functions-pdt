import { useState } from "react";

function useTimeOutScanner(addSerial: (arr: string[]) => void) {
  const [timeOutID, setTimeOutID] = useState<NodeJS.Timeout | null>(null);
  const [, setLocalSerials] = useState<string[]>([]);

  const handleAddSerial = (serial: string) => {
    setLocalSerials((oldLocalSerial) => [...oldLocalSerial, serial]);
    if (!!timeOutID) {
      clearTimeout(timeOutID);
    }
    setTimeOutID(
      setTimeout(() => {
        setLocalSerials((currentSerials) => {
          addSerial([...currentSerials]);
          return [];
        });
      }, 2000)
    );
  };

  return { handleAddSerial };
}

export { useTimeOutScanner };

