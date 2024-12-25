<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface EntryPoint {
  symbol: string
  position: 'long' | 'short'
  leverage: number
  price: number
  totalAmount: number
  quantity: number
}

const entryPoint = ref<EntryPoint>({
  symbol: '',
  position: 'long',
  leverage: 1,
  price: 0,
  totalAmount: 0,
  quantity: 0
})

// 수량 자동 계산
const calculateQuantity = computed(() => {
  if (!entryPoint.value.price || !entryPoint.value.totalAmount) return 0
  return entryPoint.value.totalAmount / entryPoint.value.price
})

// quantity를 watch로 자동 업데이트
watch([() => entryPoint.value.price, () => entryPoint.value.totalAmount], () => {
  entryPoint.value.quantity = calculateQuantity.value
})

// 레버리지 적용된 실제 투자금액
const leveragedInvestment = computed(() => {
  return entryPoint.value.totalAmount * entryPoint.value.leverage
})

// 손실 제한 금액 (투자금액의 5%)
const maxLoss = computed(() => {
  return entryPoint.value.totalAmount * 0.05
})

// 스탑로스 가격 계산
const stopLossPrice = computed(() => {
  if (!entryPoint.value.price || !entryPoint.value.quantity) return 0
  
  const lossPercentage = 0.05 / entryPoint.value.leverage
  
  if (entryPoint.value.position === 'long') {
    return entryPoint.value.price * (1 - lossPercentage)
  } else {
    return entryPoint.value.price * (1 + lossPercentage)
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-6">타점 계산</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 입력 폼 -->
      <div class="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            종목
          </label>
          <input
            v-model="entryPoint.symbol"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="BTC/USDT"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            포지션
          </label>
          <select
            v-model="entryPoint.position"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            배율
          </label>
          <input
            v-model.number="entryPoint.leverage"
            type="number"
            min="1"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            진입 가격
          </label>
          <input
            v-model.number="entryPoint.price"
            type="number"
            step="0.0001"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            총 투자금액
          </label>
          <input
            v-model.number="entryPoint.totalAmount"
            type="number"
            step="0.01"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            수량 (자동 계산)
          </label>
          <input
            v-model.number="entryPoint.quantity"
            type="number"
            step="0.0001"
            disabled
            class="block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
          />
        </div>
      </div>

      <!-- 계산 결과 -->
      <div class="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">계산 결과</h3>
          
          <dl class="space-y-3">
            <div class="flex justify-between">
              <dt class="text-sm font-medium text-gray-500">총 투자금액</dt>
              <dd class="text-sm text-gray-900">{{ entryPoint.totalAmount.toLocaleString() }} USDT</dd>
            </div>

            <div class="flex justify-between">
              <dt class="text-sm font-medium text-gray-500">레버리지 적용 금액</dt>
              <dd class="text-sm text-gray-900">{{ leveragedInvestment.toLocaleString() }} USDT</dd>
            </div>

            <div class="flex justify-between">
              <dt class="text-sm font-medium text-gray-500">손실 제한 금액 (5%)</dt>
              <dd class="text-sm text-red-600 font-medium">{{ maxLoss.toLocaleString() }} USDT</dd>
            </div>

            <div class="flex justify-between">
              <dt class="text-sm font-medium text-gray-500">스탑로스 가격</dt>
              <dd class="text-sm text-red-600 font-medium">{{ stopLossPrice.toLocaleString() }} USDT</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template> 