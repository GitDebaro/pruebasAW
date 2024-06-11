/**
 * Módulo para loggear por consola todas las peticiones HTTP recibidas.
 *
 */

// Define una función llamada 'logRequests' que recibe los objetos 'req' (solicitud), 'res' (respuesta) y 'next' (siguiente middleware).
const logRequests = (req, res, next) => {
  // Obtiene la fecha y hora actual.
  const current_time = new Date();

  // Imprime en la consola la fecha y hora actual, el método HTTP de la solicitud y la URL solicitada.
  console.log(`[${current_time.toISOString()}] ${req.method} ${req.baseUrl + req.url}`);
  // Imprime en la consola los encabezados de la solicitud.
  console.log(req.headers);

  // Si el método de la solicitud es POST o PUT,
  if (req.method === "POST" || req.method === "PUT") {
      // y el tipo de contenido es 'application/json',
      if (req.headers["content-type"] === "application/json") {
          // imprime en la consola el cuerpo de la solicitud en formato JSON.
          console.log(JSON.stringify(req.body));
      }
  }
  // Llama a la siguiente función en la cadena de middleware.
  next();
};

// Exporta la función 'logRequests' para que pueda ser utilizada en otros módulos.
module.exports = logRequests;
