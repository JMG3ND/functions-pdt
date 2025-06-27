import fetchSerial from "@/composables/ApiFetch/fetchSerial";
import type {
  ColectScannerProcess,
  ListScannerProcess,
  OnScanning,
  RefreshListSerial,
} from "@/types/types";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useAddSerial() {
  const [listSerials, setListSerials] = useState<ListScannerProcess>({});
  const [isScanning, setIsScanning] = useState<boolean>(false);

  // Ref para el AbortController para cancelar las peticiones fetch
  const abortControllerRef = useRef<AbortController | null>(null);
  // Ref para controlar la interrupción lógica del bucle
  const isSyncingInterrupted = useRef(false);

  const onScanning: OnScanning = useCallback(
    (status) => {
      if (isScanning !== status) setIsScanning(status);
    },
    [isScanning]
  );

  const refreshListSerial: RefreshListSerial = useCallback(
    (serial, process) => {
      setListSerials((prev) => {
        const copy = { ...prev };
        if (copy[serial]) copy[serial].process = process;
        return copy;
      });
    },
    []
  );

  const addSerial = useCallback((serials: ColectScannerProcess) => {
    setListSerials((prev) => {
      const updated = { ...prev };
      // Filtrar solo los que aún no han sido procesados de la lista existente
      const serialsNoProcessing = Object.fromEntries(
        Object.entries(updated).filter(([, value]) => !value.process)
      );

      serials.forEach(
        ({ serial, storage }) =>
          // Añadir nuevos seriales, asegurando que aún no están procesados
          (serialsNoProcessing[serial] = {
            storage: storage,
            process: false,
          })
      );

      return serialsNoProcessing;
    });
  }, []);

  // Usa useEffect para activar la sincronización basándose en listSerials Y isScanning
  useEffect(() => {
    // Si el escaneo está activo, no inicies ni continúes la sincronización
    if (isScanning) {
      isSyncingInterrupted.current = true; // Señala que la sincronización actual debe detenerse
      if (abortControllerRef.current) {
        abortControllerRef.current.abort(); // Cancela cualquier petición fetch en curso
        console.log("Escáner activo: Abortando llamadas a la API actuales.");
      }
      return; // Sal del efecto, no procedas con la sincronización
    }

    // Si no está escaneando, reinicia el flag de interrupción y crea un nuevo AbortController
    isSyncingInterrupted.current = false;
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    const performSynchronization = async () => {
      console.log("Iniciando sincronización de seriales...");

      // Obtén la lista actual de seriales para iterar (para evitar cierres obsoletos)
      const currentSerialsToProcess = Object.entries(listSerials).filter(
        ([, { process }]) => !process
      );

      for (const [serial, { process, storage }] of currentSerialsToProcess) {
        // Verifica si hay interrupción *antes* de iniciar la siguiente petición
        if (isSyncingInterrupted.current || signal.aborted) {
          console.log(`Sincronización interrumpida en el serial: ${serial}`);
          break; // Detén el bucle
        }

        if (!process) {
          // Doble verificación por si aún no está procesado
          try {
            await fetchSerial(serial, storage, signal); // Pasa la señal a fetchSerial
            refreshListSerial(serial, true);
          } catch (error: any) {
            if (error.name === "AbortError") {
              console.log(`Petición para ${serial} abortada.`);
            } else {
              console.error(`Error procesando serial ${serial}:`, error);
              // Decide si un error también debería interrumpir todo el proceso
              isSyncingInterrupted.current = true; // Por ejemplo, detenerse en el primer error
              break;
            }
          }
        }
      }
      if (!isSyncingInterrupted.current && !signal.aborted) {
        console.log("Sincronización completada.");
      }
    };

    performSynchronization();

    // Función de limpieza: Se ejecuta cuando el componente se desmonta
    // O cuando `isScanning` o `listSerials` cambian (activando una nueva ejecución de este useEffect)
    return () => {
      isSyncingInterrupted.current = true; // Asegura que el bucle se detenga
      if (abortControllerRef.current) {
        abortControllerRef.current.abort(); // Cancela cualquier petición en curso
        console.log("Limpieza: Abortando llamadas a la API en curso.");
      }
    };
  }, [listSerials, isScanning, refreshListSerial]); // Dependencias: Se vuelve a ejecutar cuando estas cambian

  return {
    addSerial,
    listSerials,
    refreshListSerial,
    // sincronizeSerials ahora es interno de useEffect, o puedes exponerlo
    // si necesitas activarlo manualmente desde fuera, pero ten en cuenta `isScanning`.
    onScanning,
  };
}
