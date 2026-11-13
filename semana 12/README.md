# Laboratorio 12 Servicios web

Cliente React con Axios y API Django REST Framework para listar, crear y eliminar exámenes.

## Proyectos de base

- API: copia del laboratorio de semana 8, en `src/`.
- React: copia del último cliente disponible, `semana 10/cartelera-cine-react`. Semana 11 solo contenía `.gitkeep`.
- Se conservan los componentes de la cartelera y la aplicación anterior en `client/src/MovieApp.jsx`. El punto de entrada actual abre QuizLab.

## Iniciar Django

Desde la carpeta `semana 12`, en una terminal de PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe src\manage.py migrate
.\.venv\Scripts\python.exe src\manage.py runserver 127.0.0.1:8000
```

Si `.venv` ya existe, omitir la primera orden. La base local SQLite se encuentra en la raíz de semana 12.

## Iniciar React

En otra terminal:

```powershell
cd client
npm install
npm run dev
```

Abrir **http://127.0.0.1:5173/**. Se usa la IP exacta porque otra aplicación del equipo ocupa `localhost:5173`. Vite no cambia automáticamente de puerto (`strictPort: true`).

## Direcciones y CORS

- API base: `http://127.0.0.1:8000/api/`.
- Exámenes: `/api/exams/`.
- Preguntas: `/api/questions/`.
- Alternativas: `/api/choices/`.
- Único origen React autorizado: `http://127.0.0.1:5173`.
- `corsheaders` está instalado y declarado en `INSTALLED_APPS`.
- `CorsMiddleware` está inmediatamente después de `SecurityMiddleware`.
- La base de Axios se centraliza en `client/src/services/api.js`; se puede configurar mediante `VITE_API_URL`.

## Tabla de peticiones y estados

| Pantalla o acción | Petición | Carga | Datos o éxito | Error |
| --- | --- | --- | --- | --- |
| Entrar al listado | GET /api/exams/?page=1 | Esqueleto y mensaje de consulta | Tabla, total y paginación | Mensaje y botón Reintentar |
| Cambiar página | GET /api/exams/?page=N | Esqueleto | Registros de esa página | Mensaje y Reintentar |
| Actualizar o Reintentar | GET de la página actual | Esqueleto | Lista actualizada | Error visible sin pantalla en blanco |
| Guardar examen | POST /api/exams/ | Botón Guardando y campos deshabilitados | Regreso al listado y confirmación | HTTP y mensaje real de la API; conserva el formulario |
| Eliminar examen | DELETE /api/exams/{id}/ y GET posterior | Botón Eliminando y consulta de lista | Confirmación y tabla actualizada | Mensaje sin anunciar un borrado exitoso |

## Casos comprobados

1. API base y listado: HTTP 200.
2. Listado: se mostraron los exámenes originales.
3. Borrado: registro temporal id 4; DELETE 204 y actualización de tres a dos registros.
4. Alta desde React: examen Servicios Web - Semana 12, id 5; POST 201 y retorno al listado.
5. CORS: origen retirado temporalmente; servidor 200 sin cabecera de autorización y Axios ERR_NETWORK. Se restauró el origen y se recuperó la lista.
6. Validación: título vacío enviado desde el formulario; HTTP 400 y `title: This field may not be blank.` visible en pantalla.
7. Django detenido: Actualizar mostró el error de conexión y Reintentar recuperó los datos al reiniciar.
8. Carga: respuesta real demorada temporalmente para la captura, sin retrasos artificiales en el cliente final.

## Comprobaciones del cliente

```powershell
npm run build
npm run lint
```

El entregable de Word registra los pasos hasta el 12. El paso 13 (subir a GitHub y al campus) corresponde a una acción posterior.

## Referencias técnicas

- React useEffect: https://react.dev/reference/react/useEffect
- Axios: https://axios-http.com/docs/instance
- django-cors-headers: https://pypi.org/project/django-cors-headers/
