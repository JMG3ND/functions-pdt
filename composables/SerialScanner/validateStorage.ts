/**Valida que el formato del storage sea correcto */
export default function validateSerial(storage: string) {
  return /^#[0-9][0-9]$/g.test(storage);
}
