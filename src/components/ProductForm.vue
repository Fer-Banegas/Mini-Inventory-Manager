<script setup>
defineProps({
  categories: { type: Array, required: true },
  editing: Boolean,
  errors: { type: Object, required: true },
})

const name = defineModel('name', { type: String })
const category = defineModel('category', { type: String })
const price = defineModel('price', { type: [Number, String] })
const quantity = defineModel('quantity', { type: [Number, String] })
const emit = defineEmits(['submit', 'cancel'])
</script>

<template>
  <section class="panel form-panel" aria-labelledby="form-title">
    <h2 id="form-title">{{ editing ? 'Editar producto' : 'Registrar producto' }}</h2>

    <form class="product-form" novalidate @submit.prevent="emit('submit', { name, category, price, quantity })">
      <label class="field">
        Nombre del producto
        <input v-model="name" :aria-invalid="Boolean(errors.name)" :aria-describedby="errors.name ? 'product-name-error' : undefined" type="text" placeholder="Ej. Monitor de 24 pulgadas" required />
        <span v-if="errors.name" id="product-name-error" class="validation-message" role="alert">
          {{ errors.name }}
        </span>
      </label>

      <label class="field">
        Categoría
        <select v-model="category" :aria-invalid="Boolean(errors.category)" :aria-describedby="errors.category ? 'product-category-error' : undefined" required>
          <option disabled value="">Selecciona una categoría</option>
          <option v-for="option in categories" :key="option">{{ option }}</option>
        </select>
        <span v-if="errors.category" id="product-category-error" class="validation-message" role="alert">
          {{ errors.category }}
        </span>
      </label>

      <div class="field-row">
        <label class="field">
          Precio (L)
          <input v-model="price" :aria-invalid="Boolean(errors.price)" :aria-describedby="errors.price ? 'product-price-error' : undefined" type="number" inputmode="decimal" placeholder="0.00" step="0.01" required />
          <span v-if="errors.price" id="product-price-error" class="validation-message" role="alert">
            {{ errors.price }}
          </span>
        </label>

        <label class="field">
          Cantidad en stock
          <input v-model="quantity" :aria-invalid="Boolean(errors.quantity)" :aria-describedby="errors.quantity ? 'product-quantity-error' : undefined" type="number" inputmode="numeric" placeholder="0" step="1" required />
          <span v-if="errors.quantity" id="product-quantity-error" class="validation-message" role="alert">
            {{ errors.quantity }}
          </span>
        </label>
      </div>

      <div class="form-actions">
        <button class="button primary" type="submit">
          {{ editing ? 'Guardar cambios' : 'Registrar producto' }}
        </button>
        <button v-if="editing" class="button secondary" type="button" @click="emit('cancel')">
          Cancelar
        </button>
      </div>
    </form>
  </section>
</template>
