import AuditoriaServicio from '../servicios/auditoriaServicio.js';

const auditoriaServicio = new AuditoriaServicio();

// Mapea el método HTTP a una acción semántica legible.
const accionSegunMetodo = (metodo) => {
  switch (metodo) {
    case 'POST':
      return 'CREAR';
    case 'PUT':
    case 'PATCH':
      return 'ACTUALIZAR';
    case 'DELETE':
      return 'ELIMINAR';
    default:
      return 'CONSULTAR';
  }
};

// Extrae el recurso y el primer id numérico de una ruta /api/v1/<entidad>/<...>.
const parsearRuta = (originalUrl) => {
  const ruta = originalUrl.split('?')[0];
  const segmentos = ruta.split('/').filter(Boolean); // ej: ['api','v1','especialidades','5']
  const idxV1 = segmentos.indexOf('v1');
  if (idxV1 < 0) return { entidad: null, id_entidad: null };
  const entidad = segmentos[idxV1 + 1] ?? null;
  const idEntidad = segmentos
    .slice(idxV1 + 2)
    .find((segmento) => /^\d+$/.test(segmento));
  return { entidad, id_entidad: idEntidad ? Number(idEntidad) : null };
};

// Middleware de auditoría: registra cada acción del usuario autenticado.
// Se engancha DESPUÉS de passport (req.user disponible) y persiste al finalizar
// la respuesta para capturar el código HTTP definitivo. La escritura es
// fire-and-forget: un fallo de auditoría nunca debe romper la respuesta.
export default function auditoria(req, res, next) {
  res.on('finish', () => {
    const { entidad, id_entidad } = parsearRuta(req.originalUrl);
    const datos = {
      id_usuario: req.user?.id_usuario ?? null,
      metodo: req.method,
      ruta: req.originalUrl.split('?')[0].slice(0, 255),
      accion: accionSegunMetodo(req.method),
      entidad,
      id_entidad,
      status_code: res.statusCode,
    };
    auditoriaServicio.registrar(datos).catch((error) => {
      console.log(`Error al registrar auditoría: ${error}`);
    });
  });
  next();
}
