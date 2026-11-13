# Registro de errores del punto 11

Los errores se provocaron temporalmente en el proyecto y luego se restauró la aplicación.

## 1. Usar `class` en JSX

**Ejemplo:**

```jsx
<div class="movie-title">Título</div>
```

**Mensaje de React:**

```text
Invalid DOM property `class`. Did you mean `className`?
```

**Corrección:** usar `className` en JSX.

## 2. Devolver dos nodos raíz

**Ejemplo:**

```jsx
return (
  <main>Contenido</main>
  <footer>Pie de página</footer>
)
```

**Mensaje del compilador:**

```text
[PARSE_ERROR] Adjacent JSX elements must be wrapped in an enclosing tag.
Help: Did you want a JSX fragment <>...</>? 
```

**Corrección:** envolver los elementos en un único contenedor o fragmento.

## 3. Omitir la clave en un `map`

**Ejemplo:**

```jsx
movies.map((movie) => <MovieCard movie={movie} />)
```

**Mensaje de React:**

```text
Each child in a list should have a unique "key" prop.
```

**Corrección:** pasar una clave estable, por ejemplo `key={movie.id}`.
