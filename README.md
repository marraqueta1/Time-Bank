# TimeBank

**TimeBank** es una plataforma educativa adaptativa diseñada para el intercambio de habilidades y micro-recursos mediante una economía colaborativa basada en horas.

### Integrantes y Responsabilidades
**Nombre del equipo:** [Completar]  
**Integrantes:** Daniel Serey, Carlos Sagardia, Felipe Morales y Byron Vásquez   
**Repositorio público:** [https://github.com/marraqueta1/Time-Bank]  
**Rama frontend:** [https://github.com/marraqueta1/Time-Bank/tree/frontend]  
**Rama backend:** [https://github.com/marraqueta1/Time-Bank/tree/backend]  
**Figma:** [URL del prototipo público]

| Integrante | Responsabilidad | Evidencia de colaboración |
|---|---|---|
| Daniel Serey | [Módulo] | [Commits o PR] |
| Carlos Sagardia | [Módulo] | [Commits o PR] |
| Felipe Morales | [Módulo] | [Commits o PR] |
| Byron Vásquez | [Módulo] | [Commits o PR] |

1. Descarga el repositorio en tu máquina local y abre con tu entorno de desarrollo (Visual Studio).

2. Levantar el proyecto

### El código del frontend esta en otra Branch (frontend)

## Índice
1. [Justificación del problema](#justificación-del-problema)
2. [Usuarios objetivo](#usuarios-objetivo-quién-usará-la-aplicación)
    - [Roles del Sistema](#roles-del-sistema)
    - [Proto-personas](#proto-personas)
3. [Requerimientos](#requerimientos)
4. [Arquitectura de Navegación](#arquitectura-de-navegación)
    - [Diferenciación de acceso según roles](#diferenciación-de-acceso-según-roles)
    - [Flujos de Tareas](#flujos-de-tareas)
    - [Puntos críticos de interacción](#puntos-críticos-de-interacción)
    - [Justificación Técnica](#justificación-técnica)
5. [Bocetos UX/UI](#bocetos-uiux)

---

## Justificación del problema
La relevancia de TimeBank radica en su capacidad de democratizar el acceso al conocimiento mediante un modelo de economía colaborativa. No se trata solo de ahorrar dinero, sino de crear una comunidad de apoyo mutuo que fortalezca la experiencia universitaria y reduzca las brechas de desigualdad.

En el contexto actual de la educación superior, diversos estudios indican que la carga económica es uno de los principales factores de estrés para los alumnos. Se estima que cerca del 30% de los estudiantes universitarios evalúan abandonar sus estudios durante los primeros dos años debido a presiones financieras. A esto se suma el alto costo de las tutorías privadas, las cuales pueden alcanzar valores que superan los $15.000 CLP por hora, haciéndolas inaccesibles para el estudiante promedio.

Si bien existen soluciones en el mercado como plataformas de tutorías de pago (ej. Superprof, TusClasesParticulares) o foros gratuitos sin moderación ni garantía de calidad, ninguna aborda el problema desde el intercambio directo de habilidades sin dinero de por medio. 

Sin una solución estructurada de intercambio como la que proponemos, las consecuencias son claras:
- **Aumento de la deserción:** La presión financiera seguirá empujando a estudiantes a abandonar sus carreras.
- **Profundización de las desigualdades:** Quienes pueden pagar tutorías tendrán una ventaja académica injusta sobre quienes no.
- **Desaprovechamiento del talento interno:** Existe un vasto capital humano dentro de la propia comunidad universitaria (estudiantes avanzados, egresados) que podría compartir su conocimiento, pero carece de un canal formal y seguro para hacerlo.
- **Falta de incentivos para enseñar:** Muchos estudiantes y profesores desean compartir su conocimiento, pero no existe un sistema que valore y recompense ese tiempo de manera tangible.

---

## Usuarios objetivo (Quién usará la aplicación)

- **Definición y Características:** Adultos y estudiantes que buscan optimizar sus recursos intercambiando habilidades en lugar de dinero.
- **Contexto de Uso y Dispositivos:** Entornos móviles y dinámicos (transporte público, campus universitario, hogar). Acceso mediante smartphones o computadores con conexión a internet.
- **Nivel de Experiencia Tecnológica:** Medio-alto. Están habituados al uso de aplicaciones de entrega rápida y transporte compartido, por lo que esperan interfaces intuitivas y de respuesta inmediata.
- **Necesidades de Privacidad y Seguridad:** Exigen protección de datos de contacto y geolocalización difuminada hasta que ambas partes acepten formalmente el intercambio.
- **Supuestos Utilizados:** La construcción de estos perfiles asume que los usuarios poseen al menos una habilidad transferible, tienen disposición temporal para concretar acuerdos presenciales o remotos, y confían en la validación mediante sistemas de reseñas. *(Nota: Las siguientes proto-personas corresponden a una caracterización preliminar basada en fuentes secundarias y supuestos razonados, no a resultados obtenidos de usuarios reales).*

### Roles del Sistema
- **Usuario:** Intercambiar tiempo entre ellos.
- **Profesores:** Pueden generar salas para enseñar.
- **Administrador:** Moderador del Sistema.

---

## Proto-personas

### Proto-Persona 1
- **Rol:** Usuario.
- **Características Generales:** Estudiante de ingeniería en informática, 22 años, se moviliza frecuentemente entre la universidad y su ciudad de origen.
- **Necesidades y Objetivos:** Requiere ayuda con el diseño gráfico de un proyecto. Ofrece a cambio horas de programación o reparación de computadores.
- **Puntos de Frustración:** Carencia de presupuesto para contratar freelancers y miedo a que la contraparte abandone el acuerdo a la mitad.
- **Funcionalidades a Utilizar:** Sistema de "Escrow" (garantía de horas) y matchmaking por etiquetas.
- **Dispositivo y Contexto:** Smartphone Android. Lo utiliza principalmente durante sus trayectos en transporte público o ventanas libres en el campus.

### Proto-Persona 2
- **Rol:** Usuario.
- **Características Generales:** Joven de 25 años en búsqueda activa de empleo (bodega o retail), con fuertes habilidades en mantenimiento del hogar y paisajismo.
- **Necesidades y Objetivos:** Necesita instalar un aire acondicionado portátil y reparar un electrodoméstico. Ofrece a cambio servicios de jardinería u orden de inventarios.
- **Puntos de Frustración:** Dificultad para encontrar asistencia técnica de confianza en su radio cercano sin gastar sus ahorros.
- **Funcionalidades a Utilizar:** Geolocalización de ofertas cercanas y sistema de reseñas.
- **Dispositivo y Contexto:** Uso mixto. Revisa notificaciones en su teléfono móvil durante el día, y gestiona o busca ofertas formales desde un computador de escritorio en casa.

### Proto-Persona 3
- **Rol:** Profesor/Ayudante.
- **Características:** 25 años, egresado de Ingeniería Civil. Experto en Python.
- **Necesidades:** Enseñar de forma flexible y obtener beneficios tangibles (tiempo/puntos canjeables).
- **Objetivos:** Impartir tutorías individuales y "salas de ayudantía" grupales.
- **Puntos de Frustración:** Pérdida de tiempo buscando alumnos y gestionando acuerdos o inasistencias.
- **Funcionalidades a utilizar:**
  - Creación y gestión de sus ofertas de habilidades (tutorías y salas de ayudantía), definiendo título, categoría, duración y modalidad.
  - Gestión de las propuestas de trueque recibidas para aceptar, rechazar o cancelar la participación de los alumnos.
  - Gestión de la billetera de tiempo para visualizar su saldo actual y el historial de horas ganadas impartiendo clases.
  - Gestión de calificaciones para evaluar a los alumnos y construir su propia reputación mediante reseñas.
- **Dispositivo y Contexto:** Laptop para uso web (aprovechando el menú lateral según el RNF-03) al planificar clases, y smartphone (interfaz mobile-first con tabs) para gestionar solicitudes sobre la marcha.

### Proto-Persona 4
- **Rol:** Administrador.
- **Características Generales:** Profesional de soporte IT o gestión comunitaria, 30 años, encargado de mantener el orden y la salud de la plataforma.
- **Necesidades y Objetivos:** Mantener la plataforma libre de fraudes, mediar en conflictos entre usuarios y asegurar que el catálogo de habilidades sea relevante.
- **Puntos de Frustración:** Exceso de reportes manuales o falta de información clara al momento de resolver una disputa sobre horas de intercambio.
- **Funcionalidades a Utilizar:** 
  - Panel de Dashboard estadístico.
  - Resolución de disputas y manejo de fondos retenidos (Escrow).

---

## Requerimientos

### Requerimientos Funcionales por Rol

| ID | Requerimiento funcional | Rol |
|---|---|---|
| **RF-01** | El sistema permitirá al usuario gestionar sus ofertas de habilidades, pudiendo crearlas (definiendo título, categoría, duración en puntos/horas y modalidad), modificarlas y eliminarlas. | Usuario |
| **RF-02** | El sistema permitirá al usuario publicar y editar solicitudes de necesidades o tareas en las que requiere ayuda de terceros. | Usuario |
| **RF-03** | El sistema permitirá explorar un "Feed" principal con publicaciones y acceder al detalle individual de una oferta para ver su información y reseñas. | Usuario |
| **RF-04** | El sistema permitirá a los usuarios gestionar las propuestas de trueque, teniendo la capacidad de enviar, aceptar, rechazar o cancelar un acuerdo. | Usuario |
| **RF-05** | El sistema habilitará una sala de chat privado en tiempo real entre los usuarios involucrados una vez que una propuesta de trueque sea aceptada. | Usuario |
| **RF-06** | El sistema permitirá al usuario visualizar su propio perfil público, incluyendo sus estadísticas, reputación general e historial de publicaciones. | Usuario |
| **RF-07** | El sistema permitirá al usuario gestionar su billetera de tiempo, visualizando su saldo actual en puntos (horas) y el historial detallado de transacciones. | Usuario |
| **RF-08** | El sistema retendrá temporalmente los puntos del servicio (Escrow) una vez acordado el trueque, liberándolos solo cuando ambas partes emitan su calificación final (puntuación y reseña). | Usuario |
| **RF-09** | El sistema incluirá filtros de geolocalización y matchmaking por etiquetas para conectar ofertas y necesidades con usuarios cercanos o afines. | Usuario |
| **RF-10** | El sistema permitirá al administrador gestionar las disputas entre usuarios, revisando los casos para reasignar o devolver los puntos retenidos. | Administrador |
| **RF-11** | El sistema permitirá al administrador suspender o bloquear definitivamente las cuentas de usuarios que incumplan las normativas de la plataforma. | Administrador |
| **RF-12** | El sistema permitirá al administrador gestionar el catálogo global de categorías de habilidades, agregando o eliminando rubros del buscador. | Administrador |

### Requerimientos No Funcionales
- **RNF-01 (Rendimiento):** El sistema responderá a las consultas de transacciones de la billetera de tiempo en un tiempo máximo de 2 segundos.
- **RNF-02 (Seguridad):** El sistema protegerá la manipulación de saldos y endpoints privados utilizando el estándar de autenticación por tokens JWT (JSON Web Tokens).
- **RNF-03 (Usabilidad):** El sistema dispondrá de una interfaz gráfica adaptable y multidispositivo (mobile-first), implementando navegación mediante barra de pestañas inferiores en móviles y un menú lateral fijo en resoluciones de escritorio.
- **RNF-04 (Arquitectura/Compatibilidad):** El backend del sistema operará mediante una arquitectura de APIs RESTful conectada de forma directa a una base de datos relacional.
- **RNF-05 (Disponibilidad):** El servidor garantizará un tiempo de actividad (uptime) mínimo del 99% mensual para asegurar el acceso ininterrumpido al tablón de misiones.

---

## Arquitectura de Navegación

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
| `/admin/estadisticas` | Estadísticas | Permite visualizar métricas de uso de la plataforma, volumen de trueques y crecimiento. |
| `/admin/configuracion` | Configuración | Permite ajustar parámetros globales del sistema, reglas de intercambio y roles. |

### 2. Relaciones jerárquicas entre vistas
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

---

## Diferenciación de acceso según roles

La aplicación deberá controlar el acceso a las diferentes funcionalidades de acuerdo con el rol del usuario autenticado. Se consideran los siguientes roles principales:

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
El sistema utiliza React Router v6 junto con un servicio de autenticación (`auth.ts`) para proteger el acceso a las vistas. La diferenciación por roles se aplica de la siguiente manera:

* **Redirección de Raíz (`/`):** Al ingresar a la ruta base, el sistema verifica la sesión. Si no hay sesión, redirige a `/login`. Si el usuario está autenticado, verifica su rol y lo redirige automáticamente a `/admin` (si es administrador) o a `/app/feed` (si es usuario normal).
* **Protección de Rutas (Acceso Denegado):** Las rutas de `/app/*` están protegidas por el componente `<ProtectedRoute>`. Si un usuario sin sesión intenta entrar a la fuerza ingresando la URL, es interceptado y enviado a `/login`.
* **Control de Roles:** Si un usuario normal intenta acceder tipeando una ruta de administrador (ej: `/admin`), el sistema detecta que su rol no coincide con el array `allowedRoles` y lo expulsa redirigiéndolo de vuelta a su `/app/feed`.
* **Ruta Inexistente (Error 404):** Se implementó una ruta comodín (`*`) que atrapa cualquier URL mal escrita o no registrada en el sistema, mostrando una vista de error 404.

**Asignación de Rutas por Rol:**
| Ruta | Rol Permitido |
| :--- | :--- |
| `/login`, `/registro` | Público (Sin sesión) |
| `/app/feed`, `/app/create`, `/app/offers/:id`, `/app/proposals`, `/app/chat`, `/app/chat/:id`, `/app/wallet`, `/app/profile` | Usuario (Estudiante / Profesor) |
| `/admin/dashboard`, `/admin/usuarios`, `/admin/categorias`, `/admin/reportes`, `/admin/estadisticas`, `/admin/configuracion` | Administrador |
| `*` (Rutas no definidas) | Público (Redirige a 404) |

---

## Flujos de Tareas
Los flujos de tareas (*task flows*) representan la secuencia de acciones que realiza un usuario para completar una actividad específica.

### Flujo de navegación entre funcionalidades
El ecosistema conecta el descubrimiento de habilidades con la negociación de forma circular. Un usuario explora ofertas en el Feed principal y selecciona una publicación para acceder a su detalle. Desde allí, utiliza la opción de enviar una propuesta, lo cual alimenta directamente la vista de Propuestas enviadas. Si la contraparte responde o acepta, el flujo permite saltar inmediatamente al Chat para afinar detalles en tiempo real antes de concretar el intercambio y liberar el saldo.

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
¿Datos válidos y completos?
  ↓             ↓
  No            Sí
  ↓             ↓
Mostrar     Registrar
errores     publicación
                ↓
        Mostrar en el Feed
```

### Task Flow 2: Proponer e iniciar un trueque
**Rol:** Usuario (Estudiante / Profesor)

**Objetivo:** Encontrar una oferta de interés, proponer un intercambio y acordar los detalles.

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

### Task Flow 3: Moderación y suspensión de usuarios
**Rol:** Administrador

**Objetivo:** Revisar un reporte y suspender la cuenta de un usuario que incumplió las reglas.

```text
Inicio de sesión (Rol Admin)
      ↓
Redirección automática al Dashboard (/admin)
      ↓
Seleccionar sección de "Reportes" o "Usuarios"
      ↓
Visualizar detalles del usuario reportado
      ↓
¿Suspender usuario?
  ↓             ↓
  No            Sí
  ↓             ↓
Volver al   Cambiar estado a "Suspendido"
Dashboard         ↓
            Mostrar alerta de éxito
```
---

## Puntos críticos de interacción
Los puntos críticos corresponden a acciones donde una interfaz poco clara puede afectar la experiencia o los fondos del usuario:

1. **Aceptación de Propuestas:** Los botones de "Aceptar" o "Contraofertar" definen el estado de la transacción. Un error aquí compromete el tiempo/puntos del usuario, por lo que la interfaz debe exigir una confirmación clara.
2. **Sistema de Escrow (Retención):** Cuando se acuerda un servicio, los puntos se retienen. El sistema debe mostrar claramente en la "Wallet" qué saldo está disponible y qué saldo está congelado en trueques pendientes.
3. **Calificación Final:** Es el paso que libera los puntos retenidos hacia el proveedor. Debe ser de llenado rápido y obligatorio antes de permitir un nuevo trueque con esa persona.
4. **Moderación Administrativa:** El botón de "Suspender usuario" en el panel de administrador revoca el acceso de forma inmediata. Debe contar con una validación secundaria para evitar bloqueos accidentales.

### Coherencia de experiencia entre dispositivos
El diseño mantiene paridad de funciones entre versiones, pero adapta sus contenedores nativos para optimizar la usabilidad:
- **Versión Web:** Utiliza un menú lateral fijo (*Sidebar*) a la izquierda, aprovechando el espacio panorámico para mantener los enlaces y el saldo siempre visibles.
- **Versión Móvil:** Traslada la navegación a una barra inferior (*Bottom Tab Bar*) con iconos diseñados para la interacción ergonómica con el pulgar. Vistas como Mi Wallet se adaptan a formato tarjeta para evitar sobrecarga de información.

---

## Justificación Técnica

### Usabilidad
Se propone una navegación consistente e intuitiva, manteniendo patrones familiares (como el layout típico de redes sociales en el Feed). Se prioriza una presentación limpia con *cards* (tarjetas) para las ofertas, reduciendo la carga cognitiva al mostrar solo el título, reputación y costo a simple vista, dejando los detalles técnicos para un segundo nivel de navegación.

### Eficiencia de interacción
El flujo de usuario es circular y de bajo esfuerzo. La navegación plana mediante pestañas inferiores permite saltar de descubrir ofertas a chatear con un solo toque, evitando que el usuario deba retroceder múltiples veces para cambiar de contexto.

### Claridad estructural
Las vistas se organizan separando estrictamente el mercado (`/app`) de la gestión administrativa (`/admin`). Dentro de la aplicación de usuarios, el espacio se divide lógicamente en descubrimiento (Feed), gestión (Propuestas/Wallet) y comunicación (Chats), asegurando que el modelo mental del usuario coincida con la interfaz.

### Escalabilidad
El uso de una arquitectura basada en componentes modulares con Ionic y React Router facilitará el crecimiento del proyecto. Agregar una nueva funcionalidad a futuro (como un foro o soporte técnico) solo requerirá añadir un nuevo componente al enrutador sin alterar el flujo principal de trueques.

---

## Bocetos UI/UX
[Figma - Prototipo de UI/UX](https://www.figma.com/design/wL91AmcXIUWYASwxa2QKNe/Diseño-UI-UX--Community-?node-id=0-1&p=f&t=wQqFvR5lZ5YBtsvj-0)

## Descripción
Este proyecto implementa registro de usuarios, autenticación mediante JWT. **Node.js, Express y MySQL**; el frontend esta desarrollado con  **Ionic + React**

## Tecnologías

| Capa | Tecnología identificada en el ZIP |
|---|---|
| Frontend | Ionic 9 + React 19 + React Router 6 + TypeScript |
| Backend | Node.js + Express 5 |
| Base de datos |  |
| Autenticación |  |
| Comunicación |  |
| Configuración CORS |  |

## Arquitectura
```text
Time-Bank/
├── Readme.md
├── backend/   
│   ├── node_modules/
│   ├── prisma/
|   |   ├── migrations/
|   |   |   ├── 20262008195738_unit/
|   |   |   |   └── migration.sql
|   |   |   └── migration_lock.toml
|   |   └── shema.prisma
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
└── frontend/
    ├── .vscode/
    |   └── extensions.json
    ├── cypress/
    ├── public/
    ├── .browserslistrc
    ├── .gitignore
    ├── capacitor.config.ts
    ├── cypress.config.ts
    ├── eslint.config.js
    ├── index.html
    ├── ionic.config.json
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.json
    ├── tsconfig.nose.json
    ├── vite.config.ts
    └── src/
        ├── companents/
        ├── pages/
        |   ├── Chats.tsx
        |   ├── CreateOffer.tsx
        |   ├── DetalleOferta.tsx
        |   ├── Feed.tsx
        |   ├── Home.css
        |   ├── Home.tsx
        |   ├── Login.tsx
        |   ├── Perfil.tsx
        |   ├── Propuestas.tsx
        |   ├── Register.tsx
        |   └── Wallet.tsx
        ├── routes
        ├── services
        ├── theme
        ├── App.test.tsx
        ├── App.tsx
        ├── main.tsx
        ├── setupTests.ts
        └── vite-env.d.ts
```

## Preparación y ejecución local del proyecto

### Requisitos

- Node.js y npm: Versión 20 o superior recomendada.
- Base de datos: PostgreSQL o MySQL en ejecución local o remota.
- Ionic CLI: Instalado globalmente mediante `npm install -g @ionic/cli`.
- Repositorio: Copia local del proyecto clonada desde GitHub

### Configuración de la base de datos

El proyecto utiliza Prisma ORM para la gestión de la base de datos, lo que permite un manejo más seguro mediante variables de entorno, evitando credenciales embebidas en el codigo,

1. En la carpeta backend, crea un archivo .env basándote en el archivo de ejemplo (crea un .env.example en tu repositorio sin secretos).
2. Configura tu cadena de conexión en el .env
3. Aplica las migraciones y genera el cliente de Prisma:

   ```bash
    cd backend
    npx prisma generate
    npx prisma migrate dev
    ```
   
   > Aunque Prisma gestiona la estructura, se incluye un archivo .sql exportado en la carpeta prisma/migrations/20261008195738_unit

### Iniciar el Backend

Desde la raíz del proyecto, abre una terminal:

   ```bash
    npm config set ignore-scripts true
    Explicación: Bloqueamos la ejecución automática de scripts por motivos de seguridad.
    
    cd backend
    npm install
    npm run dev
    Explicación: Instala las dependencias y levanta el servidor en http://localhost:3000.
```

### Iniciar el Frontend (Ionic + React)

En una nueva terminal, desde la raíz del proyecto: 
 
 ```bash
    cd frontend
    npm install
    ionic serve
    Explicación: Instala las dependencias y abre la aplicación en http://localhost:8100.
    Recuerda ignorar la sugerencia de actualizaciones para las versiones de las dependencias.
 ```

### Problemas frecuentes
| Síntoma | Qué revisar |
|---|---|
| Prisma Client no encuentra la tabla | Ejecutar npx prisma generate y verificar que la migración se aplicó en la base de datos correcta.|
| Error de conexión a DB (ECONNREFUSED)| Verificar que el servicio PostgreSQL/MySQL esté activo, puerto correcto y credenciales válidas en el `.env`. |
| ECONNREFUSED en frontend (Axios/Fetch) | Asegurarse de que el backend esté ejecutándose en el puerto 3000 y la URL base de la API sea la correcta en el frontend. |
| 401 Token no proporcionado | Validar que el frontend envíe la cabecera `Authorization: Bearer <token>` tras el inicio de sesión|
| 403 Token inválido o expirado |El token caducó o la firma es incorrecta. Forzar un nuevo inicio de sesión en la app.|
| Errores CORS | Verificar que el paquete cors esté habilitado en el app.js/index.js del backend y permita solicitudes desde http://localhost:8100.|
## Seguridad

## Pruebas funcionales y evidencia 
Para validar los endpoints RESTful, se genero una colección de pruebas para evidenciar los excenarios exitosos y de 

| ID | Petición / escenario | HTTP esperado* | Evidencia |
|---|---|---|---|
| P01 | Registrar usuario válido | 201 | <img width="1078" height="715" alt="post1" src="https://github.com/user-attachments/assets/69a6eeda-9ef7-4160-8b47-ce217015fc93" />
| P02 | Registrar correo repetido | 409 | <img width="1089" height="724" alt="post2" src="https://github.com/user-attachments/assets/e06bc7bc-3081-48f3-8155-b231f5c79aae" />
| P03 | Iniciar sesión válida | 200 | <img width="1098" height="741" alt="post3" src="https://github.com/user-attachments/assets/28e7beed-2b0c-4f44-a4d0-26681e22590d" />
| P04 | Login sin credenciales | 400 | <img width="1091" height="728" alt="post4" src="https://github.com/user-attachments/assets/27983ec7-464f-4d2d-9a0d-3a9323052231" />
| P05 | Login con contraseña incorrecta | 401 | <img width="1082" height="774" alt="post5" src="https://github.com/user-attachments/assets/8b675e62-5d53-4d2f-8917-dd0e409407b1" />
| P06 | Perfil sin token | 401 | <img width="1096" height="770" alt="post6" src="https://github.com/user-attachments/assets/1dfacb5b-958e-475a-bd89-04a482b23d07" />
| P07 | Perfil con token inválido | 403 | <img width="1090" height="691" alt="post7" src="https://github.com/user-attachments/assets/cf5f5630-a5bb-4b91-bbde-745f386325aa" />
| P08 | Perfil con token válido | 500 | <img width="1097" height="784" alt="post8" src="https://github.com/user-attachments/assets/da012d97-59c1-4cb8-9de6-738c0ad1796d" />
| P09 | Crear Oferta | 201 | <img width="1086" height="861" alt="post9" src="https://github.com/user-attachments/assets/c51d5ad4-5a81-46b0-9c83-3a1c6e9389ea" />
| P10 | Leer Ofertas | 200 | <img width="1089" height="941" alt="post10" src="https://github.com/user-attachments/assets/fff86c36-4991-47ba-82c2-4ec41c262f50" />
| P11 | Editar Oferta | 200 | <img width="1095" height="869" alt="post11" src="https://github.com/user-attachments/assets/779b1196-03a9-4593-b530-39152decd3cb" />
| P12 | Eliminar Oferta | 200 | <img width="1095" height="734" alt="post12" src="https://github.com/user-attachments/assets/8fc3780d-8efe-4cf9-88f0-816c99d7db92" />
| P13 | Acceso de rol no autorizado | 403 | <img width="1092" height="794" alt="post13" src="https://github.com/user-attachments/assets/13a67d06-c460-4a9e-996d-d4fef90c116d" />
## Modelo relacional



