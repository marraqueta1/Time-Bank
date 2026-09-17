# Plataforma Educativa Adaptativa para la Selección de Micro-Recursos según Preferencias de Aprendizaje
EP 1.1: 

Roles: Usuario (Intercambiar tiempo entre ellos), Profesores(Pueden generar salas para enseñar) y Administrador (Moderador del Sistema).

## Requerimientos Funcionales:
- RF-01: El sistema permitirá al usuario gestionar sus ofertas de habilidades, incluyendo la creación, modificación y eliminación de los servicios que imparte.

- RF-02: El sistema permitirá al usuario gestionar sus solicitudes de tiempo, publicando y editando las necesidades o tareas en las que requiere ayuda.

- RF-03: El sistema permitirá al usuario gestionar las propuestas de trueque recibidas, teniendo la capacidad de aceptar, rechazar o cancelar un acuerdo de intercambio.

- RF-04: El sistema permitirá al usuario gestionar su billetera de tiempo, visualizando el saldo actual y el historial detallado de horas ganadas y gastadas.

- RF-05: El usuario crea una oferta de habilidad que puede enseñar (título, categoría, descripción, duración, modalidad)

- RF-06: El sistema permitirá al usuario gestionar las calificaciones de sus intercambios, emitiendo una puntuación y una reseña escrita a la contraparte una vez finalizado el servicio.

- RF-07: El sistema permitirá al administrador gestionar las disputas entre usuarios, revisando los casos reportados para reasignar o devolver los fondos de tiempo retenidos.

- RF-08: El sistema permitirá al administrador gestionar el estado de las cuentas de la plataforma, pudiendo suspender o bloquear definitivamente a los perfiles fraudulentos.

- RF-09: El sistema permitirá al administrador gestionar el catálogo global de categorías de habilidades, agregando o eliminando rubros para mantener organizado el buscador.

## Requerimientos No Funcionales: 

- RNF-01 (Rendimiento): El sistema responderá a las consultas de transacciones de la billetera de tiempo en un tiempo máximo de 2 segundos.

- RNF-02 (Seguridad): El sistema protegerá la manipulación de saldos y endpoints privados utilizando el estándar de autenticación por tokens JWT (JSON Web Tokens).

- RNF-03 (Usabilidad): Interfaz mobile-first con tabs inferiores en móvil y menú lateral en web utilizando los componentes del framework Ionic con React.

- RNF-04 (Arquitectura/Compatibilidad): El backend del sistema operará mediante una arquitectura de APIs RESTful conectada de forma directa a una base de datos relacional.

- RNF-05 (Disponibilidad): El servidor garantizará un tiempo de actividad (uptime) mínimo del 99% mensual para asegurar el acceso ininterrumpido al tablón de misiones.


## Justificación del Problema

La relevancia de TimeBank radica en su capacidad de democratizar el acceso al conocimiento mediante un modelo de economía colaborativa. No se trata solo de ahorrar dinero, sino de crear una comunidad de apoyo mutuo que fortalezca la experiencia universitaria y reduzca las brechas de desigualdad.

Sin una solución como la que proponemos, las consecuencias son claras:

Aumento de la deserción: La presión financiera seguirá empujando a estudiantes a abandonar sus carreras.

Profundización de las desigualdades: Quienes pueden pagar tutorías tendrán una ventaja académica injusta sobre quienes no.

Desaprovechamiento del talento interno: Existe un vasto capital humano dentro de la propia comunidad universitaria (estudiantes avanzados, egresados) que podría compartir su conocimiento, pero carece de un canal formal y seguro para hacerlo.

Falta de incentivos para enseñar: Muchos estudiantes y profesores desean compartir su conocimiento, pero no existe un sistema que valore y recompense ese tiempo de manera tangible.



### Caracterización General de Usuarios Objetivo

#### Definición y Características
- Adultos y estudiantes que buscan optimizar sus recursos intercambiando habilidades en lugar de dinero.

### Contexto de Uso y Dispositivos
- Entornos móviles y dinámicos (transporte público, campus universitario, hogar). Acceso mediante smartphones o computadores con conexión a internet.

### Nivel de Experiencia Tecnológica
- Medio-alto. Están habituados al uso de aplicaciones de entrega rápida y transporte compartido, por lo que esperan interfaces intuitivas y de respuesta inmediata.

### Necesidades de Privacidad y Seguridad
- Exigen protección de datos de contacto y geolocalización difuminada hasta que ambas partes acepten formalmente el intercambio.

### Roles Considerados
- Usuario, Profesor y Administrador.

### Supuestos Utilizados
- La construcción de estos perfiles asume que los usuarios poseen al menos una habilidad transferible, tienen disposición temporal para concretar acuerdos presenciales o remotos, y confían en la validación mediante sistemas de reseñas.

## Proto-Personas

### Proto-Persona 1: 

- **Rol: Usuario.**

- Características Generales: Estudiante de ingeniería en informática, 22 años, se moviliza frecuentemente entre la universidad y su ciudad de origen.

- Necesidades y Objetivos: Requiere ayuda con el diseño gráfico de un proyecto. Ofrece a cambio horas de programación o reparación de computadores.

- Puntos de Frustración: Carencia de presupuesto para contratar freelancers y miedo a que la contraparte abandone el acuerdo a la mitad.

- Funcionalidades a Utilizar: Sistema de "Escrow" (garantía de horas) y matchmaking por etiquetas.

### Proto-Persona 2: 

- **Rol: Usuario.**

- Características Generales: Joven de 25 años en búsqueda activa de empleo (bodega o retail), con fuertes habilidades en mantenimiento del hogar y paisajismo.

- Necesidades y Objetivos: Necesita instalar un aire acondicionado portátil y reparar un electrodoméstico. Ofrece a cambio servicios de jardinería u orden de inventarios.

- Puntos de Frustración: Dificultad para encontrar asistencia técnica de confianza en su radio cercano sin gastar sus ahorros.

- Funcionalidades a Utilizar: Geolocalización de ofertas cercanas y sistema de reseñas.


### Proto-Persona 3:

- **Rol: Profesor/Ayudante**

- Características: 25 años, egresado de Ingeniería Civil. Experto en Python.

- Necesidades: Enseñar de forma flexible y obtener beneficios tangibles (tiempo/puntos canjeables).

- Objetivos: Impartir tutorías individuales y "salas de ayudantía" grupales.

- Puntos de Frustración: Pérdida de tiempo buscando alumnos y gestionando acuerdos o inasistencias.

- Funcionalidades a utilizar:

- RF-01 y RF-05: Creación y gestión de sus ofertas de habilidades (tutorías y salas de ayudantía), definiendo título, categoría, duración y modalidad.

- RF-03: Gestión de las propuestas de trueque recibidas para aceptar, rechazar o cancelar la participación de los alumnos.

- RF-04: Gestión de la billetera de tiempo para visualizar su saldo actual y el historial de horas ganadas impartiendo clases.

- RF-06: Gestión de calificaciones para evaluar a los alumnos y construir su propia reputación mediante reseñas.

- Dispositivo y Contexto: Laptop para uso web (aprovechando el menú lateral según el RNF-03) al planificar clases, y smartphone (interfaz mobile-first con tabs) para gestionar solicitudes sobre la marcha.

## (EP1.3) Bocetos UI/UX
[Figma - Prototipo de UI/UX](https://www.figma.com/design/wL91AmcXIUWYASwxa2QKNe/Diseño-UI-UX--Community-?node-id=0-1&p=f&t=wQqFvR5lZ5YBtsvj-0)

## Arquitectura de Navegación
### 1. Rutas principales y secundarias

#### Rutas públicas

| Ruta | Vista | Descripción |
|---|---|---|
| `/login` | Inicio de sesión | Permite al usuario ingresar al sistema mediante sus credenciales. |
| `/registro` | Registro | Permite crear una nueva cuenta de usuario. |

#### Rutas protegidas del Estudiante

| Ruta | Vista | Descripción |
|---|---|---|
| `/estudiante/inicio` | Inicio | Presenta un resumen general y accesos a las funcionalidades principales. |
| `/estudiante/caracterizacion` | Caracterización | Permite responder el instrumento de caracterización. |
| `/estudiante/perfil` | Perfil | Presenta las preferencias y necesidades de apoyo identificadas. |
| `/estudiante/recursos` | Micro-recursos | Presenta los recursos disponibles y priorizados. |
| `/estudiante/recursos/:id` | Detalle de recurso | Permite visualizar un micro-recurso seleccionado. |
| `/estudiante/progreso` | Progreso | Permite consultar actividades realizadas, pendientes y recursos previamente utilizados. |

#### Rutas protegidas del Docente

| Ruta | Vista | Descripción |
|---|---|---|
| `/docente/inicio` | Inicio docente | Presenta un resumen de las funcionalidades disponibles. |
| `/docente/recursos` | Gestión de recursos | Permite consultar los micro-recursos existentes. |
| `/docente/recursos/nuevo` | Crear recurso | Permite registrar un nuevo micro-recurso. |
| `/docente/recursos/:id/editar` | Editar recurso | Permite modificar un recurso existente. |

#### Rutas protegidas del Administrador

| Ruta | Vista | Descripción |
|---|---|---|
| `/admin/inicio` | Inicio administrador | Presenta las opciones generales de administración. |
| `/admin/usuarios` | Gestión de usuarios | Permite consultar y administrar los usuarios registrados. |
