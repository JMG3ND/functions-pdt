export type Product = Record<string, any>;
export type Produts = Product[];

export type inputType = "serial" | "storage";

export type Serial = string;
export type Storage = string;

interface ScannerProcess {
  serial: Serial;
  storage: Storage;
}

export type ListScannerProcess = Set<ScannerProcess>;
export type ColectScannerProcess = ScannerProcess[];
