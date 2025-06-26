import type { inputType } from "@/types/types";
import validateSerial from "./validateSerial";
import validateStorage from "./validateStorage";

/**Función que valida el tipo de input que se está ingresando
 * @param input Dato a validar
 * @returns Retorna "serial" o "storage" en función del resultado de la validación, Si no coincide con ninguna retorna void
 */
export default function validateInput(input: string): inputType | void {
  if (validateSerial(input)) return "serial";
  if (validateStorage(input)) return "storage";
}
