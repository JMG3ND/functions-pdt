const api_url = process.env.EXPO_PUBLIC_API_URL;

/**Obtenemos los datos de un producto proporcionando un serial */
export default async function fetchSerial(serial: string, storage: string) {
  console.log(`${api_url}/stock/${serial}`);
  try {
    const response = await fetch(`${api_url}/stock/${serial}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
