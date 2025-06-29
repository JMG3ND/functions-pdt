const api_url = "http://192.168.1.136:5000";
const url = `${api_url}/stock/moveStock`;

/**Obtenemos los datos de un producto proporcionando un serial */
export default async function fetchSerial(serial: string, storage: string) {
  try {
    const response = await fetch(`${url}/${serial}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ storageName: storage }),
    });

    if (response.status !== 200) throw await response.text();
  } catch (error) {
    throw error;
  }
}
