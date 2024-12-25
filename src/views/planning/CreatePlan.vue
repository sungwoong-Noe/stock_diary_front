<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

// 임시로 빈 컴포넌트를 만들어서 테스트
const BasicInfo = shallowRef({
  template: '<div>기본 정보 컴포넌트</div>'
})

const EntryPlan = shallowRef({
  template: '<div>진입 계획 컴포넌트</div>'
})

const ExitPlan = shallowRef({
  template: '<div>손절/익절 계획 컴포넌트</div>'
})

const RiskManagement = shallowRef({
  template: '<div>리스크 관리 컴포넌트</div>'
})

const steps = [
  { title: '기본 정보', component: BasicInfo },
  { title: '진입 계획', component: EntryPlan },
  { title: '손절/익절 계획', component: ExitPlan },
  { title: '리스크 관리', component: RiskManagement }
]

const selectedIndex = ref(0)

// TabGroup에 대한 modelValue 핸들러
const updateSelectedIndex = (index: number) => {
  selectedIndex.value = index
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <TabGroup
      as="div"
      :modelValue="selectedIndex"
      @update:modelValue="updateSelectedIndex"
    >
      <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab
          v-for="(step, index) in steps"
          :key="index"
          v-slot="{ selected }"
          as="div"
          class="w-full"
        >
          <button
            :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white shadow text-blue-700'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
            ]"
          >
            {{ step.title }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-8">
        <TabPanel
          v-for="(step, index) in steps"
          :key="index"
          class="rounded-xl bg-white p-3"
        >
          <component :is="step.component" />
        </TabPanel>
      </TabPanels>

      <div class="mt-6 flex justify-between">
        <button
          :disabled="selectedIndex === 0"
          @click="selectedIndex--"
          class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          이전
        </button>
        <button
          @click="selectedIndex = Math.min(selectedIndex + 1, steps.length - 1)"
          class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          {{ selectedIndex === steps.length - 1 ? '완료' : '다음' }}
        </button>
      </div>
    </TabGroup>
  </div>
</template> 