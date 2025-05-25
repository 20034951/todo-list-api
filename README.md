# ToDo List API
---

````markdown
# Task & Goal API

API RESTful construida con **Node.js**, **Express** y **TypeScript** para gestionar tareas (`tasks`) y metas (`goals`). Soporta operaciones CRUD y requiere autenticación mediante un token en el header `Authorization`.

---

## Características

- Añadir, consultar, actualizar y eliminar Tareas y Metas.
- Soporte de persistencia en memoria o MongoDB (según variable de entorno).
- Integración con Docker y Mongo Express para administración visual de MongoDB.

## Requisitos

- Node.js >= 16
- npm
- Docker y Docker Compose (en caso de usar MongoDB)

---

## Instalación y ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/20034951/todo-list-api.git
cd todo-list-api
```

2. Instala las dependencias:

```bash
npm install
```

3. Se utilizan **dos archivos `.env`**:

#### `deploy/.env` → para Docker

Se debe crear dentro del directorio `deploy/`.

```env
# deploy/.env
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin123
```

#### `.env` → para la API (en raíz del proyecto)

```env
# .env
MONGO_URI=mongodb://admin:admin123@localhost:27017/todo
STORAGE=mongo
PORT=3000
```

> Podemos modificar `STORAGE` y usar `memory` o `mongo` según la preferencia de almacenamiento.
> Debemos de asegurarnos de utilizar los valores definidos en el archivo .env de directorio `deploy/` para la conexión a MongoDB en la variable `MANGO_URI`

---

4. Ejecuta la aplicación:

1. Ejecutar el siguiente comando para levantar los contenedores"

Desde el directorio `deploy/`:

```bash
docker compose up -d
```

Esto levantará:

- `mongodb` en el puerto 27017
- `mongo-express` en el puerto 8081

Podemos acceder a la interfaz web de administración en:
[http://localhost:8081](http://localhost:8081)

Usando las credenciales que hayamos definido en el archivo .env del directorio `deploy/`

Limpieza

Para detener y eliminar contenedores y volúmenes debemos ejecutar el siguiente comando desde el directorio `deploy/`:

```bash
docker compose down -v
```

2. Ejecutar el siguiente comando para levantar el API desde el directorio raíz

```bash
npx ts-node src/index.ts
```

> También se puede usar `npx nodemon src/index.ts` si se instala Nodemon para recarga automática.

---

## Estructura del Proyecto

```
.
├── src/
│   ├── index.ts                      # Punto de entrada de la app
│   ├── database/
│   │   ├── mongo.ts                  # Conexión a MongoDB
│   ├── services/
│   │   ├── todo.ts                   # Lógica CRUD con soporte para datos en: memoria/MongoDB
│   ├── routes/
│   │   ├── todo.ts                   # Rutas HTTP
│   ├── models/
│   │   ├── task.ts                   # Modelo de datos Task
│   │   └── goal.ts                   # Modelo de datos Goal
│   ├── models/mongo/                 # Modelos de Mongoose
│   │   ├── taskModel.ts              # Modelo de datos Task
│   │   └── goalModel.ts              # Modelo de datos Goal
│   ├── middleware/
│   │   └── auth.ts                   # Middleware de autenticación
│   └── data/
│       └── store.ts                  # Almacenamiento temporal (en memoria)
├── deploy/
│   ├── docker-compose.yaml           # Definición de contenedores para MongoDB y MongoExpress
│   └── .env                          # Variables de entorno de Docker
├── .env                              # Variables de entorno para API
├── tsconfig.json                     # Configuración de TypeScript
├── package.json                      # Dependencias y scripts
└── README.md                         # Este archivo
```

---

## Autenticación

Todas las rutas están protegidas por un middleware que valida el header `Authorization`.

Ejemplo de header:

```
Authorization: secreto123
```

Se debe de usar el mismo token definido en el archivo `.env`.

---

## Endpoints

| Método | Ruta             | Descripción                 |
|--------|------------------|-----------------------------|
| GET    | /getTasks        | Obtener todas las tareas    |
| GET    | /getTask/:id     | Obtener una tarea por ID    |
| POST   | /addTask         | Crear una nueva tarea       |
| PUT    | /updateTask      | Actualizar una tarea        |
| DELETE | /removeTask      | Eliminar una tarea          |
| GET    | /getGoals        | Obtener todas las metas     |
| GET    | /getGoal/:id     | Obtener una meta por ID     |
| POST   | /addGoal         | Crear una nueva meta        |
| PUT    | /updateGoal      | Actualizar una meta         |
| DELETE | /removeGoal      | Eliminar una meta           |

### Tareas (`Task`)

* **GET `/getTasks`**
  Devuelve todas las tareas.

* **GET `/getTask/:id`**
  Devuelve una tarea específica por su ID.
  Ejemplo: `GET /getTask/123`

* **POST `/addTask`**
  Crea una nueva tarea.
  **Body JSON:**

  ```json
  {
    "title": "Estudiar",
    "dueDate": "2025-05-15"
  }
  ```

* **PUT `/updateTask`**
  Actualiza una tarea existente.
  **Body JSON:**

  ```json
  {
    "id": "123",
    "title": "Leer",
    "dueDate": "2025-06-01",
    "completed": true
  }
  ```

* **DELETE `/removeTask`**
  Elimina una tarea por ID.
  **Body JSON:**

  ```json
  {
    "id": "123"
  }
  ```

---

### Metas (`Goal`)

* **GET `/getGoals`**
  Devuelve todas las metas.

* **GET `/getGoal/:id`**
  Devuelve una meta específica por su ID.
  Ejemplo: `GET /getGoal/abc`

* **POST `/addGoal`**
  Crea una nueva meta.
  **Body JSON:**

  ```json
  {
    "title": "Ahorrar",
    "dueDate": "2025-08-01"
  }
  ```

* **PUT `/updateGoal`**
  Actualiza una meta existente.
  **Body JSON:**

  ```json
  {
    "id": "abc",
    "title": "Viajar",
    "dueDate": "2025-09-01",
    "progress": 50
  }
  ```

* **DELETE `/removeGoal`**
  Elimina una meta por ID.
  **Body JSON:**

  ```json
  {
    "id": "abc"
  }
  ```

---

## Pruebas con Postman

1. Seleccionar el método correspondiente (GET, POST, PUT, DELETE).
2. Usar la URL base: `http://localhost:3000`
3. Agregar el header de autenticación:

```
Authorization: secreto123
```

4. Para POST, PUT y DELETE, seleccionar la pestaña **Body**, eligir `raw` y `JSON`, e incluir el cuerpo del request como se muestra en los ejemplos.

---

## Autor

Desarrollado por Pablo Alfonso Vargas Melgar / 20034951

## Licencia

MIT — libre para uso personal y comercial.

```
---

```
