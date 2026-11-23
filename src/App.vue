<script setup>
import { computed, ref } from 'vue'
import InventorySummary from './components/InventorySummary.vue'
import ProductForm from './components/ProductForm.vue'
import ProductFilters from './components/ProductFilters.vue'
import ProductTable from './components/ProductTable.vue'
import './styles.css'

const categories = ['Tecnología', 'Hogar', 'Oficina', 'Otros']
const products = ref([
  { id: 1, name: 'Monitor de 24 pulgadas', category: 'Tecnología', price: 3950, quantity: 4 },
  { id: 2, name: 'Lámpara de escritorio', category: 'Hogar', price: 680, quantity: 7 },
  { id: 3, name: 'Cuaderno A5', category: 'Oficina', price: 85, quantity: 20 },
  { id: 4, name: 'Bolsa reutilizable', category: 'Otros', price: 60, quantity: 12 },
])
const initialProductIds = new Set(products.value.map(product => product.id))
let nextId = products.value.length + 1

const emptyDraft = { name: '', category: '', price: '', quantity: '' }
const draft = ref({ ...emptyDraft })
const errors = ref({})
const editingId = ref(null)
const search = ref('')
const category = ref('')

const hasDemoProducts = computed(() =>
  products.value.some(product => initialProductIds.has(product.id)),
)

const productsWithSubtotals = computed(() =>
  products.value.map(product => ({ ...product, subtotal: product.price * product.quantity })),
)

const filteredProducts = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('es')
  return productsWithSubtotals.value.filter(product =>
    product.name.toLocaleLowerCase('es').includes(query) &&
    (!category.value || product.category === category.value),
  )
})

const summary = computed(() => ({
  count: products.value.length,
  value: productsWithSubtotals.value.reduce((total, product) => total + product.subtotal, 0),
  highestPricedProduct: products.value.reduce((highest, product) =>
    !highest || product.price > highest.price ? product : highest, null),
}))

function resetForm() {
  draft.value = { ...emptyDraft }
  errors.value = {}
  editingId.value = null
}

function saveProduct(fields) {
  const name = fields.name.trim()
  const price = Number(fields.price)
  const quantity = Number(fields.quantity)
  const messages = {}

  if (!name) messages.name = 'Ingresa el nombre del producto.'
  if (!categories.includes(fields.category)) messages.category = 'Selecciona una categoría.'
  if (fields.price === '') {
    messages.price = 'Ingresa el precio.'
  } else if (!Number.isFinite(price) || price <= 0) {
    messages.price = 'El precio debe ser mayor que cero.'
  }
  if (fields.quantity === '') {
    messages.quantity = 'Ingresa la cantidad en stock.'
  } else if (!Number.isSafeInteger(quantity) || quantity <= 0) {
    messages.quantity = 'Ingresa una cantidad entera mayor que cero.'
  }

  errors.value = messages
  if (Object.keys(messages).length) return

  const details = { name, category: fields.category, price, quantity }
  if (editingId.value === null) {
    products.value.push({ id: nextId++, ...details })
  } else {
    const index = products.value.findIndex(product => product.id === editingId.value)
    products.value[index] = { id: editingId.value, ...details }
  }
  resetForm()
}

function editProduct(id) {
  const { name, category, price, quantity } = products.value.find(product => product.id === id)
  draft.value = { name, category, price, quantity }
  errors.value = {}
  editingId.value = id
}

function deleteProduct(id) {
  const product = products.value.find(product => product.id === id)
  if (!window.confirm(`¿Eliminar «${product.name}» del inventario?`)) return

  products.value = products.value.filter(item => item.id !== id)
  if (editingId.value === id) resetForm()
}
</script>

<template>
  <header class="app-header">
    <div class="shell header-content">
      <h1>Mini Inventory Manager</h1>
      <span v-if="hasDemoProducts" class="demo-label">Datos de demostración</span>
    </div>
  </header>

  <main class="shell dashboard">
    <InventorySummary :summary="summary" />

    <div class="workspace">
      <ProductForm
        v-model:name="draft.name"
        v-model:category="draft.category"
        v-model:price="draft.price"
        v-model:quantity="draft.quantity"
        :categories="categories"
        :editing="editingId !== null"
        :errors="errors"
        @submit="saveProduct"
        @cancel="resetForm"
      />

      <section class="panel inventory-panel" aria-labelledby="inventory-title">
        <div class="panel-heading">
          <h2 id="inventory-title">Listado de productos</h2>
        </div>
        <ProductFilters
          v-model:search="search"
          v-model:category="category"
          :categories="categories"
        />
        <ProductTable
          :products="filteredProducts"
          :empty-message="products.length ? 'No hay productos que coincidan con los filtros.' : 'No hay productos para mostrar.'"
          @edit="editProduct"
          @delete="deleteProduct"
        />
      </section>
    </div>
  </main>
</template>
