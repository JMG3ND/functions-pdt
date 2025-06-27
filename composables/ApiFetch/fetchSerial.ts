
/**Obtenemos los datos de un producto proporcionando un serial */
export default async function fetchSerial(
  serial: string,
  storage: string,
  signal: AbortSignal
) {
  await new Promise<boolean>((resolve) => {
    setTimeout(() => {
      if(signal.aborted) return
      const proc = Math.random() * 10 >= 2;
      resolve(proc);
    }, Math.random() * 5000);
  });
}
