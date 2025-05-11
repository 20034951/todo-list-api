# ToDo List API
---

````markdown
# Task & Goal API

API RESTful construida con Node.js y Express para gestionar tareas (`tasks`) y metas (`goals`). Soporta operaciones CRUD básicas y requiere autenticación mediante un token enviado en el encabezado `Authorization`.

---

## Requisitos

- Node.js >= 14
- npm
- Archivo `.env` con las siguientes variables:

```env
AUTH_TOKEN=tu_token_secreto
PORT=3000
````

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

3. Crea un archivo `.env` en la raíz del proyecto con este contenido:

```env
API_KEY=secreto123
PORT=3000
```

4. Ejecuta la aplicación:

```bash
node app.js
```

> También se puede usar `npx nodemon app.js` si se instala Nodemon para recarga automática.

---

## 🛠 Estructura del Proyecto

```
.
├── app.js                      # Punto de entrada principal
├── routes/
│   └── todo.js                # Define las rutas de la API
├── middleware/
│   └── auth.js                # Middleware de autenticación
├── models/
│   ├── task.js                # Modelo de Task
│   └── goal.js                # Modelo de Goal
├── data/
│   └── store.js               # Almacenamiento temporal en memoria
├── .env                       # Variables de entorno
└── README.md                  # Este archivo
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

## Licencia

MIT — libre para uso personal y comercial.

```
---

```
