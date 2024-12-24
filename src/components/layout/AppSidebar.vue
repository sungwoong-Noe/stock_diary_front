<template>
  <div>
    <!-- 오버레이 배경 -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-30 bg-gray-600 bg-opacity-75 transition-opacity lg:hidden"
      @click="sidebarStore.toggle()"
    ></div>

    <!-- 사이드바 -->
    <aside 
      :class="[
        'fixed top-16 left-0 z-40 w-64 bg-gray-800 transition-transform lg:translate-x-0',
        'h-[calc(100vh-4rem)]',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="flex h-full flex-col">
        <!-- 사이드바 내용 -->
        <div class="flex-1 overflow-y-auto px-4 py-4">
          <nav class="space-y-1">
            <div v-for="(section, index) in navigation" :key="index">
              <Disclosure v-slot="{ open }" :defaultOpen="section.defaultOpen">
                <DisclosureButton class="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-white hover:bg-gray-700">
                  <span>{{ section.name }}</span>
                  <ChevronRightIcon
                    :class="[open ? 'rotate-90 transform' : '', 'h-5 w-5']"
                  />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-1">
                  <RouterLink
                    v-for="item in section.items"
                    :key="item.name"
                    :to="item.href"
                    v-slot="{ isActive }"
                    @click="closeSidebarOnMobile"
                  >
                    <a
                      :class="[
                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-sm'
                      ]"
                    >
                      {{ item.name }}
                    </a>
                  </RouterLink>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { RouterLink } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'

const sidebarStore = useSidebarStore()
const { isOpen } = storeToRefs(sidebarStore)

function closeSidebarOnMobile() {
  if (window.innerWidth < 1024) {
    sidebarStore.toggle()
  }
}

const navigation = [
  {
    name: '대시보드',
    defaultOpen: true,
    items: [
      { name: '개요', href: '/' },
      { name: '통계', href: '/statistics' },
    ]
  },
  {
    name: '매매 관리',
    defaultOpen: false,
    items: [
      { name: '포지션 입력', href: '/position/new' },
      { name: '포지션 조회', href: '/position/list' },
    ]
  },
  {
    name: '분석',
    defaultOpen: false,
    items: [
      { name: '수��률 분석', href: '/analysis/profit' },
      { name: '위험도 분석', href: '/analysis/risk' },
    ]
  }
]
</script> 