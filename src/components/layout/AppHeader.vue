<template>
  <header class="fixed top-0 z-50 w-full bg-white shadow">
    <div class="flex h-16 items-center justify-between w-full px-4 sm:px-6 lg:px-8">
      <!-- 왼쪽: 모바일 메뉴 버튼 & 로고 -->
      <div class="flex items-center">
        <button
          type="button"
          class="lg:hidden p-2 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          @click="toggleSidebar"
        >
          <Bars3Icon class="h-6 w-6" />
        </button>
        
        <div class="ml-4 flex lg:ml-0">
          <span class="text-xl font-bold text-gray-900">Stock Diary</span>
        </div>
      </div>

      <!-- 오른쪽: 사용자 메뉴 -->
      <div class="flex items-center">
        <Menu as="div" class="relative ml-3">
          <MenuButton class="flex items-center">
            <span class="hidden md:block text-sm font-medium text-gray-700">사용자명</span>
            <img class="ml-2 h-8 w-8 rounded-full" src="https://via.placeholder.com/32" alt="" />
          </MenuButton>
          
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                  프로필
                </a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                  로그아웃
                </a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </header>

  <!-- 헤더 높이만큼 여백 추가 -->
  <div class="h-16"></div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { useSidebarStore } from '@/stores/sidebar'

const sidebarStore = useSidebarStore()
const toggleSidebar = () => sidebarStore.toggle()
</script> 