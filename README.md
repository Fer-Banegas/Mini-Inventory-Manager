# Mini Inventory Manager

Aplicación web para gestionar un inventario básico de productos, desarrollada para la asignatura Desarrollo de Aplicaciones de Vanguardia. Utiliza Vue 3 con Composition API y `<script setup>`, Vite, JavaScript, HTML y CSS.

## Instalación y ejecución

Usa Node.js 24 LTS con npm. Desde la raíz del proyecto, ejecuta los siguientes comandos y abre la dirección que Vite muestra en la terminal.

```bash
npm ci
npm run dev
```

Para generar la compilación de producción en `dist/`, ejecuta `npm run build`. Puedes revisarla en local con `npm run preview`.

## Funcionalidades

- Registro, listado, edición y eliminación de productos. La edición se puede cancelar y la eliminación requiere confirmación.
- Validación de nombre, categoría, precio y cantidad obligatorios. El nombre debe contener texto, el precio debe ser mayor que cero y la cantidad debe ser un entero positivo.
- Búsqueda por nombre sin distinguir mayúsculas y minúsculas y filtro por categoría. Ambos filtros se pueden combinar.
- Tabla con nombre, categoría, precio unitario, cantidad, subtotal y acciones. El subtotal multiplica el precio unitario por la cantidad.
- Resumen con el número de productos registrados, el valor total del inventario y el producto de mayor precio unitario. Las tres métricas se calculan sobre el inventario completo.

El inventario se mantiene en memoria. Al recargar la página se descartan los cambios de la sesión y se restauran los cuatro productos de demostración.

## Componentes y reactividad

| Componente | Responsabilidad |
| --- | --- |
| `App.vue` | Mantiene el estado del inventario y los métodos de registro, edición y eliminación. |
| `ProductForm.vue` | Captura los datos del producto y muestra los errores de validación. |
| `ProductFilters.vue` | Captura la búsqueda por nombre y la categoría seleccionada. |
| `ProductTable.vue` | Presenta los resultados y las acciones de edición y eliminación. |
| `InventorySummary.vue` | Muestra las tres métricas del inventario. |

`App.vue` pasa datos a los componentes hijos mediante props. El formulario emite `submit` y `cancel`, y la tabla emite `edit` y `delete`. Los campos del formulario y los filtros se sincronizan mediante `v-model` y `defineModel`.

`v-for` recorre las opciones de categoría y las filas de la tabla, que usan el identificador del producto como clave. `v-if` muestra estados condicionales como errores, ausencia de resultados y opciones del modo de edición. `ref` mantiene el estado reactivo y `computed` deriva los subtotales, los resultados filtrados y las métricas del resumen.
