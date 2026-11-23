<script setup>
import { formatCurrency } from '../currency.js'

defineProps({
  summary: { type: Object, required: true },
})
</script>

<template>
  <section aria-labelledby="summary-title">
    <h2 id="summary-title" class="section-title">Resumen del inventario</h2>
    <dl class="summary-grid">
      <div class="metric">
        <dt>Productos registrados</dt>
        <dd>{{ summary.count }}</dd>
      </div>
      <div class="metric">
        <dt>Valor total del inventario</dt>
        <dd>{{ formatCurrency(summary.value) }}</dd>
      </div>
      <div class="metric">
        <dt>Producto con mayor precio unitario</dt>
        <dd v-if="summary.highestPricedProduct" class="metric-product">
          {{ summary.highestPricedProduct.name }}
          <span>{{ formatCurrency(summary.highestPricedProduct.price) }}</span>
        </dd>
        <dd v-else class="metric-product">Sin productos</dd>
      </div>
    </dl>
  </section>
</template>
