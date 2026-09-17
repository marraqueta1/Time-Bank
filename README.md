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

### EP1.4
## (a) Arquitectura de Navegación
### 1. Rutas principales y secundarias

#### Rutas públicas

| Ruta | Vista | Descripción |
|---|---|---|
| `/login` | Inicio de sesión | Permite al usuario ingresar al sistema mediante sus credenciales. |
| `/registro` | Registro | Permite crear una nueva cuenta, seleccionando el rol de Estudiante o Profesor. |

#### Rutas protegidas del Usuario (Estudiante y Profesor)

| Ruta | Vista | Descripción |
|---|---|---|
| `/app/feed` | Inicio (Feed) | Presenta el muro principal con las publicaciones de ofertas y salas disponibles. |
| `/app/create` | Crear publicación | Permite al usuario registrar una nueva oferta 1-a-1, sala grupal o necesidad. |
| `/app/offers/:id` | Detalle de Oferta | Permite visualizar la información completa y reseñas de una publicación específica. |
| `/app/proposals` | Propuestas | Permite gestionar, aceptar o rechazar las propuestas de trueque enviadas y recibidas. |
| `/app/chat` | Chats | Presenta el listado general de conversaciones activas con otros miembros. |
| `/app/chat/:id` | Conversación | Permite el intercambio de mensajes directos en tiempo real para negociar un trueque. |
| `/app/wallet` | Mi Wallet | Presenta el saldo actual de puntos y permite canjear beneficios. |
| `/app/profile` | Perfil | Presenta las estadísticas, reputación (rating) y el historial de publicaciones del usuario. |

#### Rutas protegidas del Administrador

| Ruta | Vista | Descripción |
|---|---|---|
| `/admin/dashboard` | Dashboard | Presenta un resumen estadístico general y los reportes urgentes de la plataforma. |
| `/admin/usuarios` | Gestión de usuarios | Permite consultar, administrar y aplicar bloqueos a los usuarios registrados. |
| `/admin/categorias` | Gestión de categorías | Permite mantener organizado el buscador agregando o eliminando rubros de habilidades. |
| `/admin/reportes` | Gestión de reportes | Permite revisar disputas y denuncias pendientes para tomar acciones disciplinarias. |

### (b) Relaciones jerárquicas entre vistas
La aplicación se organiza mediante una estructura jerárquica en la que las funcionalidades disponibles dependen del rol del usuario autenticado.

```text
Aplicación
│
├── Rutas públicas
│   ├── Inicio de sesión (Login)
│   └── Registro
│
└── Rutas protegidas
    │
    ├── Usuario (Estudiante y Profesor)
    │   ├── Inicio (Feed principal)
    │   │   └── Detalle de oferta
    │   ├── Crear publicación
    │   ├── Propuestas
    │   ├── Chats
    │   │   └── Conversación en tiempo real
    │   ├── Perfil
    │   └── Mi Wallet
    │
    └── Administrador
        ├── Dashboard (Resumen general)
        ├── Gestión de usuarios
        ├── Gestión de categorías
        ├── Gestión de reportes
        ├── Estadísticas
        └── Configuración
```

## (c) Flujo de navegación entre funcionalidades
El ecosistema conecta el descubrimiento de habilidades con la negociación de forma circular. Un usuario explora ofertas en el Feed principal y selecciona una publicación para acceder a su detalle. Desde allí, utiliza la opción de enviar una propuesta, lo cual alimenta directamente la vista de Propuestas enviadas. Si la contraparte responde o acepta, el flujo permite saltar inmediatamente al Chat para afinar detalles en tiempo real antes de concretar el intercambio y liberar el saldo.

## (d) Diferenciación de acceso según roles
La aplicación deberá controlar el acceso a las diferentes funcionalidades de acuerdo con el rol del usuario autenticado. 

Se consideran los siguientes roles principales:
- **Usuario (Estudiante / Profesor)**
- **Administrador**

### Matriz de acceso por rol

| Funcionalidad | Usuario | Administrador |
|---|:---:|:---:|
| Explorar ofertas y salas en el Feed | ✓ | — |
| Visualizar detalle y reseñas de una oferta | ✓ | — |
| Crear, modificar y eliminar publicaciones | ✓ | — |
| Enviar, aceptar o rechazar propuestas | ✓ | — |
| Utilizar el chat en tiempo real | ✓ | — |
| Consultar y canjear saldo en Mi Wallet | ✓ | — |
| Calificar a la contraparte finalizado el servicio | ✓ | — |
| Gestionar usuarios (suspender o bloquear) | — | ✓ |
| Resolver disputas y revisar reportes | — | ✓ |
| Administrar el catálogo de categorías | — | ✓ |

### Acceso del Usuario
Tendrá acceso a todas las funcionalidades relacionadas con el mercado de intercambio. Podrá explorar el Feed, publicar sus conocimientos, proponer trueques, comunicarse vía chat y gestionar sus puntos. No podrá acceder a funciones de moderación del sistema.

### Acceso del Administrador
Será responsable de la moderación y estabilidad del sistema. Podrá consultar usuarios registrados, bloquear cuentas fraudulentas, revisar las disputas generadas en intercambios no concretados y administrar el catálogo global de habilidades. No participará en el mercado de trueques.

### Control de acceso a rutas
La diferenciación por roles deberá aplicarse en la protección de rutas:
```
/login
/registro

/app/feed
/app/create
/app/proposals
/app/wallet

/admin/dashboard
/admin/usuarios
```
## (e) Flujos de Tareas
Los flujos de tareas (*task flows*) representan la secuencia de acciones que realiza un usuario para completar una actividad específica.

### Task Flow 1: Creación de una publicación

**Rol:** Usuario (Estudiante / Profesor)
**Objetivo:** Registrar y publicar una oferta de habilidad o una necesidad en el Feed.

```text
Inicio de sesión
      ↓
Inicio (Feed principal)
      ↓
Seleccionar opción "Crear"
      ↓
Elegir tipo (Oferta / Sala / Busco)
      ↓
Ingresar detalles (Título, Descripción, Modalidad)
      ↓
Definir duración y Puntos a cobrar
      ↓
Seleccionar "Publicar"
      ↓
¿Datos válidos e incompletos?
   ↓          ↓
  No         Sí
   ↓          ↓
Mostrar    Registrar
errores    publicación
              ↓
        Mostrar en el Feed
```
### Task Flow 2: Proponer e iniciar un trueque
**Rol:** Usuario (Estudiante / Profesor)
**Objetivo:** Encontrar una oferta de interés, proponer un intercambio y acordar los detalles 

```text 
Explorar Feed principal
      ↓
Seleccionar una oferta de interés
      ↓
Visualizar detalles y reseñas previas
      ↓
Seleccionar "Enviar propuesta"
      ↓
Confirmar envío (El saldo queda en espera)
      ↓
Visualizar propuesta en "Enviadas"
      ↓
Contraparte acepta la solicitud
      ↓
Se habilita sala de Chat
      ↓
Acordar fecha/hora en tiempo real
```
## (f) Puntos críticos de interacción
Los puntos críticos corresponden a acciones donde una interfaz poco clara puede afectar la experiencia o los fondos del usuario:

1. **Aceptación de Propuestas:** Los botones de "Aceptar" o "Contraofertar" definen el estado de la transacción. Un error aquí compromete el tiempo/puntos del usuario, por lo que la interfaz debe exigir una confirmación clara.
2. **Sistema de Escrow (Retención):** Cuando se acuerda un servicio, los puntos se retienen. El sistema debe mostrar claramente en la "Wallet" qué saldo está disponible y qué saldo está congelado en trueques pendientes.
3. **Calificación Final:** Es el paso que libera los puntos retenidos hacia el proveedor. Debe ser de llenado rápido y obligatorio antes de permitir un nuevo trueque con esa persona.
4. **Moderación Administrativa:** El botón de "Suspender usuario" en el panel de administrador revoca el acceso de forma inmediata. Debe contar con una validación secundaria para evitar bloqueos accidentales.

## (g) Coherencia de experiencia entre dispositivos
El diseño mantiene paridad de funciones entre versiones, pero adapta sus contenedores nativos para optimizar la usabilidad:
- **Versión Web:** Utiliza un menú lateral fijo (*Sidebar*) a la izquierda, aprovechando el espacio panorámico para mantener los enlaces y el saldo siempre visibles.
- **Versión Móvil:** Traslada la navegación a una barra inferior (*Bottom Tab Bar*) con iconos diseñados para la interacción ergonómica con el pulgar. Vistas como Mi Wallet se adaptan a formato tarjeta para evitar sobrecarga de información.

## (h) Justificación Técnica

### Usabilidad
Se propone una navegación consistente e intuitiva, manteniendo patrones familiares (como el layout típico de redes sociales en el Feed). Se prioriza una presentación limpia con *cards* (tarjetas) para las ofertas, reduciendo la carga cognitiva al mostrar solo el título, reputación y costo a simple vista, dejando los detalles técnicos para un segundo nivel de navegación.

### Eficiencia de interacción
El flujo de usuario es circular y de bajo esfuerzo. La navegación plana mediante pestañas inferiores permite saltar de descubrir ofertas a chatear con un solo toque, evitando que el usuario deba retroceder múltiples veces para cambiar de contexto.

### Claridad estructural
Las vistas se organizan separando estrictamente el mercado (`/app`) de la gestión administrativa (`/admin`). Dentro de la aplicación de usuarios, el espacio se divide lógicamente en descubrimiento (Feed), gestión (Propuestas/Wallet) y comunicación (Chats), asegurando que el modelo mental del usuario coincida con la interfaz.

### Escalabilidad
El uso de una arquitectura basada en componentes modulares con Ionic y React Router facilitará el crecimiento del proyecto. Agregar una nueva funcionalidad a futuro (como un foro o soporte técnico) solo requerirá añadir un nuevo componente al enrutador sin alterar el flujo principal de trueques.
