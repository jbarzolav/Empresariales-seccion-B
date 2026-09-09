# Quiz Application - Field Justifications

## Exam Model

| Field | Type | Justification |
|-------|------|---------------|
| title | CharField(max_length=200) | El título de un examen es un texto corto que no necesita más de 200 caracteres. CharField es más eficiente que TextField para campos con límite de longitud conocido. |
| description | TextField | La descripción puede ser un texto largo y detallado que explica el contenido del examen. TextField no tiene límite de longitud, lo que permite descripciones completas. |
| created_date | DateTimeField(auto_now_add=True) | Se registra automáticamente la fecha de creación sin intervención del usuario. auto_now_add=True establece el valor solo al crear el registro, no al editar. |

## Question Model

| Field | Type | Justification |
|-------|------|---------------|
| content | TextField | El enunciado de una pregunta puede ser largo y contener formato. TextField permite texto ilimitado para preguntas detalladas. |
| score | IntegerField(default=1) | El puntaje es un número entero que representa los puntos de la pregunta. IntegerField es eficiente para valores numéricos enteros con default=1 como valor estándar. |
| exam | ForeignKey(Exam) | RelaciónMany-to-One: cada pregunta pertenece a un examen. ForeignKey establece la relación con cascade delete para mantener integridad referencial. |

## Choice Model

| Field | Type | Justification |
|-------|------|---------------|
| content | TextField | El texto de una opción puede ser largo o corto. TextField permite flexibilidad para diferentes longitudes de respuesta. |
| is_correct | BooleanField(default=False) | Indica si la opción es correcta (True) o incorrecta (False). BooleanField es el tipo más eficiente para valores verdadero/falso con default=False como valor seguro. |
| question | ForeignKey(Question) | Relación Many-to-One: cada opción pertenece a una pregunta. ForeignKey con related_name='choices' permite acceso inverso desde la pregunta. |
