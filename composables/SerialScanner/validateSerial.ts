/**Valida que el formato del serial sea correcto */
export default function validateSerial(serial: string) {
  return /^[1-9][0-9]{6}$/g.test(serial);
}
