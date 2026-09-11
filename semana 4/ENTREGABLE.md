# Entregable - Semana 4: Relaciones en Django (ForeignKey, OneToOneField, ManyToManyField y Modelo Intermedio)

## 1. Datos Generales
- **Curso:** Aplicaciones Empresariales - Sección B
- **Semana:** 4
- **Tema:** Configuración de modelos relacionados en Django (relaciones uno a uno, uno a muchos, muchos a muchos con modelo intermedio `through`, y efectos de `on_delete`).

---

## 2. Diagrama de Modelos Relacionales y Justificación de Decisiones
El modelo relacional del sistema de biblioteca implementa las siguientes entidades y relaciones:

```
[Author] 1 --------- 1 [AuthorProfile] (OneToOneField)
   |
   | (1:N)
   v
[Book] * --------- * [Category] (ManyToManyField)
   |
   | (1:N a través de Publication)
   v
[Publication] (Through Model)
   ^
   | (N:1)
[Publisher]
```

### Decisiones de Diseño:
1. **`Author` y `AuthorProfile` (`OneToOneField`):**
   - Se separan los datos básicos de identificación del autor (`Author`) de su información biográfica detallada, sitio web y fotografía (`AuthorProfile`) usando un `OneToOneField` con `on_delete=models.CASCADE`. Esto mantiene la tabla principal ligera y permite organizar mejor los perfiles.
2. **`Book` y `Author` (`ForeignKey`):**
   - Cada libro es escrito por un único autor, pero un autor puede escribir múltiples libros. Se emplea `ForeignKey` con `related_name='books'`.
3. **`Book` y `Category` (`ManyToManyField`):**
   - Un libro puede pertenecer a múltiples categorías (ej. Ciencia y Tecnología) y una categoría agrupa muchos libros, por lo que se utiliza una relación muchos a muchos directa.
4. **`Book` y `Publisher` con modelo intermedio `Publication` (`through`):**
   - Dado que una publicación entre un libro y una editorial contiene atributos propios (fecha exacta de publicación y número de edición), no basta con un `ManyToManyField` simple. Se declara el modelo intermedio `Publication` que conecta `Book` y `Publisher` guardando dichos datos propios.

---

## 3. Registro de Consultas en la Consola de Django

### A. Consulta de ida (`libro.author`)
Permite acceder desde una instancia de libro hacia su autor correspondiente:
```python
>>> book = Book.objects.first()
>>> print(book.title, "-> Author:", book.author)
Python Architecture -> Author: Bob Johnson
```

### B. Consulta de vuelta (`autor.books.all()`)
Permite consultar todos los libros escritos por un autor determinado gracias al `related_name='books'`:
```python
>>> author = Author.objects.get(last_name="Johnson")
>>> [book.title for book in author.books.all()]
['Python Architecture', 'Advanced Django']
```

### C. Filtrado con doble guion bajo (`__`)
Django permite atravesar relaciones mediante el doble guion `__` para realizar consultas complejas:
- **Filtrar libros por apellido del autor:**
  ```python
  >>> Book.objects.filter(author__last_name="Smith").values_list('title', flat=True)
  <QuerySet ['Mystery in the Woods', 'Science of Tomorrow']>
  ```
- **Filtrar libros por nombre de categoría (Many-to-Many):**
  ```python
  >>> Book.objects.filter(categories__name="Fiction").values_list('title', flat=True)
  <QuerySet ['Mystery in the Woods', 'Science of Tomorrow']>
  ```

---

## 4. Análisis del Comportamiento de `on_delete`

1. **`on_delete=models.CASCADE` (Comportamiento por defecto):**
   - Al eliminar un registro de `Author` (ej. `author.delete()`), Django elimina automáticamente en cascada todos los registros de `Book` asociados a dicho autor (y consecuentemente sus perfiles y publicaciones relacionadas). Es útil cuando la entidad dependiente no tiene sentido sin su padre.
2. **`on_delete=models.PROTECT`:**
   - Si se cambia la relación a `models.PROTECT` en el campo `author` de `Book`, Django lanza una excepción `ProtectedError` al intentar borrar un autor que aún tiene libros asociados. Esto previene la pérdida accidental de datos críticos de inventario.

---

## 5. Estructura del Proyecto
```
semana 4/
├── requirements.txt
├── setup_data.py
└── src/
    ├── manage.py
    ├── config/
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   ├── wsgi.py
    │   └── asgi.py
    └── library/
        ├── __init__.py
        ├── apps.py
        ├── models.py
        ├── admin.py
        ├── views.py
        ├── urls.py
        ├── migrations/
        │   └── 0001_initial.py
        └── templates/
            └── library/
                ├── base.html
                ├── book_list.html
                └── book_detail.html
```
