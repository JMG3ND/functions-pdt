const api_url = "http://192.168.1.136:5000";
const url = `${api_url}/stock/moveStock`;

/**Obtenemos los datos de un producto proporcionando un serial 
 * @param serial Es el número de serial escaneado
 * @storage Es el storage con nombre
*/
export default async function fetchSerial(serial: string, storage: string) {
  return fetch(`${url}/${serial}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ storageName: storage }),
  });
}
