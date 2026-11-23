<script setup>
import { formatCurrency } from '../currency.js'

defineProps({
  products: { type: Array, required: true },
  emptyMessage: { type: String, required: true },
})

const emit = defineEmits(['edit', 'delete'])
</script>

<template>
  <div class="table-scroll" role="region" aria-label="Tabla de productos" tabindex="0">
    <table>
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Categoría</th>
          <th scope="col" class="number">Precio</th>
          <th scope="col" class="number">Cantidad</th>
          <th scope="col" class="number">Subtotal</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <th scope="row">{{ product.name }}</th>
          <td><span class="category-tag">{{ product.category }}</span></td>
          <td class="number">{{ formatCurrency(product.price) }}</td>
          <td class="number">{{ product.quantity }}</td>
          <td class="number subtotal">{{ formatCurrency(product.subtotal) }}</td>
          <td>
            <div class="table-actions">
              <button class="button action" type="button" :aria-label="`Editar ${product.name}`" @click="emit('edit', product.id)">
                Editar
              </button>
              <button class="button action danger" type="button" :aria-label="`Eliminar ${product.name}`" @click="emit('delete', product.id)">
                Eliminar
              </button>
            </div>
          </td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="6" class="empty-state">{{ emptyMessage }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
