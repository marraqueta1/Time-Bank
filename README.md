# Plataforma Educativa Adaptativa para la Selección de Micro-Recursos según Preferencias de Aprendizaje
EP 1.1: 

Roles: Usuario (Intercambiador de Tiempo) y Administrador (Moderador del Sistema).

Requerimientos Funcionales:
RF-01: El sistema permitirá al usuario gestionar sus ofertas de habilidades, incluyendo la creación, modificación y eliminación de los servicios que imparte.

RF-02: El sistema permitirá al usuario gestionar sus solicitudes de tiempo, publicando y editando las necesidades o tareas en las que requiere ayuda.

RF-03: El sistema permitirá al usuario gestionar las propuestas de trueque recibidas, teniendo la capacidad de aceptar, rechazar o cancelar un acuerdo de intercambio.

RF-04: El sistema permitirá al usuario gestionar su billetera de tiempo, visualizando el saldo actual y el historial detallado de horas ganadas y gastadas.

RF-05: El usuario crea una oferta de habilidad que puede enseñar (título, categoría, descripción, duración, modalidad)

RF-06: El sistema permitirá al usuario gestionar las calificaciones de sus intercambios, emitiendo una puntuación y una reseña escrita a la contraparte una vez finalizado el servicio.

RF-07: El sistema permitirá al administrador gestionar las disputas entre usuarios, revisando los casos reportados para reasignar o devolver los fondos de tiempo retenidos.

RF-08: El sistema permitirá al administrador gestionar el estado de las cuentas de la plataforma, pudiendo suspender o bloquear definitivamente a los perfiles fraudulentos.

RF-09: El sistema permitirá al administrador gestionar el catálogo global de categorías de habilidades, agregando o eliminando rubros para mantener organizado el buscador.

Requerimientos No Funcionales: 

RNF-01 (Rendimiento): El sistema responderá a las consultas de transacciones de la billetera de tiempo en un tiempo máximo de 2 segundos.

RNF-02 (Seguridad): Los datos de sesión y las interacciones deben almacenarse de forma segura  y no accesible por terceros. La comunicación se hará mediante HTTPS. 

RNF-03 (Usabilidad): Interfaz mobile-first con tabs inferiores en móvil y menú lateral en web utilizando los componentes del framework Ionic con React.

RNF-04 (Arquitectura/Compatibilidad): El backend del sistema operará mediante una arquitectura de APIs RESTful conectada de forma directa a una base de datos relacional.

RNF-05 (Disponibilidad): El servidor garantizará un tiempo de actividad (uptime) mínimo del 99% mensual para asegurar el acceso ininterrumpido al tablón de misiones.
