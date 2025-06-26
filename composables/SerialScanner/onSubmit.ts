import fetchSerial from "../ApiFetch/fetchSerial";
import validateSerial from "./validateSerial";

/**Acción a realizar al momento de hacer submit en el scanner de seriales
 * @param serial número en formato string que contiene 7 dígitos
 */
export default async function onSubmit(serial: string) {
  if (!validateSerial(serial)) return false;
  const product = await fetchSerial(serial);
  return product;
}
