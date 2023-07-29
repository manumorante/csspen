// Definir una variable de tipo URL que se exporta con dos posibles valores dependiendo del entorno
const isProd = process.env.VERCEL_ENV === "production"
export const HOST = isProd ? "https://csspen.es" : "http://localhost:4001"
