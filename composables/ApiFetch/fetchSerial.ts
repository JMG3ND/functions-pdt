import type { Product } from "@/types/types";

const getURL = (param: string) => `http://192.168.1.136:5000/stock/${param}`;

/**Obtenemos los datos de un producto proporcionando un serial */
export default async function fetchSerial(serial: string) {
  try {
    const response = await fetch(getURL(serial), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();

    return data as Product;
  } catch (error) {
    console.log(error);
    return false;
  }
}
