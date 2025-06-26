export type Product = Record<string, any>;
export type Produts = Product[];

export type inputType = "serial" | "storage";

export type Serial = string;
export type Storage = string;
export type Process = boolean

interface ScannerProcess {
  serial: Serial;
  storage: Storage;
}

export interface Processing {
  storage: string;
  process: Process;
}

export type ListScannerProcess = Record<string, Processing>;
export type ColectScannerProcess = ScannerProcess[];

export type RefreshListSerial = (serial: Serial, process: Process) => void