<script setup lang="ts">
import { ref } from 'vue'

interface EntryPoint {
  price: number
  quantity: number
  weight: number
}

const entryPoints = ref<EntryPoint[]>([
  { price: 0, quantity: 0, weight: 0 }
])

const totalInvestment = ref(0)

function addEntryPoint() {
  entryPoints.value.push({ price: 0, quantity: 0, weight: 0 })
}

function removeEntryPoint(index: number) {
  if (entryPoints.value.length > 1) {
    entryPoints.value.splice(index, 1)
  }
}

function calculateAveragePrice() {
  const total = entryPoints.value.reduce((acc, point) => {
    return acc + (point.price * point.quantity)
  }, 0)
  
  const totalQuantity = entryPoints.value.reduce((acc, point) => {
    return acc + point.quantity
  }, 0)
  
  return totalQuantity ? (total / totalQuantity).toFixed(2) : '0'
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-6">타점 계산</h2>
    
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        총 투자금액
      </label>
      <input
        v-model.number="totalInvestment"
        type="number"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div class="space-y-4">
      <div
        v-for="(point, index) in entryPoints"
        :key="index"
        class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
      >
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            매수가
          </label>
          <input
            v-model.number="point.price"
            type="number"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            수량
          </label>
          <input
            v-model.number="point.quantity"
            type="number"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            비중 (%)
          </label>
          <input
            v-model.number="point.weight"
            type="number"
            min="0"
            max="100"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          @click="removeEntryPoint(index)"
          class="mt-6 p-2 text-red-600 hover:text-red-800"
          :disabled="entryPoints.length === 1"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <button
        @click="addEntryPoint"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        타점 추가
      </button>

      <div class="text-lg font-semibold">
        평균단가: {{ calculateAveragePrice() }}
      </div>
    </div>
  </div>
</template> 