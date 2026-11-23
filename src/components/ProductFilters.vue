<script setup>
defineProps({
  categories: { type: Array, required: true },
})

const search = defineModel('search', { type: String })
const category = defineModel('category', { type: String })
</script>

<template>
  <div class="filters">
    <label class="field">
      Buscar por nombre
      <input v-model="search" type="search" placeholder="Buscar producto…" />
    </label>

    <label class="field">
      Filtrar por categoría
      <select v-model="category">
        <option value="">Todas las categorías</option>
        <option v-for="option in categories" :key="option">{{ option }}</option>
      </select>
    </label>
  </div>
</template>
