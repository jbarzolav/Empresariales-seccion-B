# Laboratorio - Semana 4: Relaciones de Modelos en Django

## 1. Información General
- **Curso:** Aplicaciones Empresariales - Sección B
- **Semana:** 4
- **Tema:** Configuración y gestión de relaciones entre modelos en Django (`OneToOneField`, `ForeignKey`, `ManyToManyField` y modelo intermedio `through`).

---

## 2. Estructura del Proyecto
```
semana 4/
├── requirements.txt         # Dependencias del proyecto (Django, Pillow, etc.)
├── setup_data.py            # Script para poblar datos de prueba y demostrar consultas
├── README.md                # Documentación del proyecto
└── src/
    ├── manage.py            # Utilidad de línea de comandos de Django
    ├── config/              # Configuración principal del proyecto
    │   ├── __init__.py
    │   ├── settings.py      # Configuración de apps, base de datos y archivos multimedia
    │   ├── urls.py          # Enrutador principal y configuración de MEDIA_URL
    │   ├── wsgi.py
    │   └── asgi.py
    └── library/             # Aplicación principal del laboratorio
        ├── __init__.py
        ├── apps.py
        ├── models.py        # Definición de modelos relacionales
        ├── admin.py         # Configuración del panel de administración (Inlines)
        ├── views.py         # Vistas basadas en funciones (Catálogo y Detalle)
        ├── urls.py          # URLs de la aplicación
        ├── tests.py         # Pruebas unitarias automatizadas (Modelos y Vistas)
        ├── migrations/      # Migraciones de base de datos
        └── templates/       # Plantillas HTML con Bootstrap 5
            └── library/
                ├── base.html
                ├── book_list.html
                └── book_detail.html
```

---

## 3. Modelos y Relaciones Implementadas

1. **`Author` y `AuthorProfile` (`OneToOneField`):**
   - Separa la información personal del autor de sus datos biográficos detallados y foto de perfil (`on_delete=models.CASCADE`).
2. **`Book` y `Author` (`ForeignKey`):**
   - Relación uno a muchos. Un autor escribe múltiples libros; cada libro pertenece a un autor (`related_name='books'`).
3. **`Book` y `Category` (`ManyToManyField`):**
   - Relación muchos a muchos directa. Un libro puede tener varias categorías y una categoría agrupa muchos libros.
4. **`Book` y `Publisher` con modelo intermedio `Publication` (`through`):**
   - Permite relacionar libros con editoriales almacenando atributos adicionales propios de la relación (fecha exacta de publicación y número de edición).

---

## 4. Guía de Ejecución y Pruebas

### Paso 1: Activar entorno y ubicar la carpeta `src`
```bash
cd src
```

### Paso 2: Aplicar migraciones
```bash
python manage.py migrate
```

### Paso 3: Cargar datos de prueba
```bash
python ../setup_data.py
```

### Paso 4: Ejecutar pruebas unitarias
```bash
python manage.py test
```

### Paso 5: Iniciar el servidor de desarrollo
```bash
python manage.py runserver
```

- **Catálogo Web:** [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
- **Panel de Administración:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
