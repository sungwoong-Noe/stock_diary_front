<template>
  <!-- 모바일 사이드바 오버레이 -->
  <div
    v-show="isSidebarOpen"
    class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
    @click="toggleSidebar"
  />

  <!-- 모바일 사이드바 토글 버튼 -->
  <button
    type="button"
    class="fixed left-4 top-4 z-50 rounded-md p-2 text-gray-400 lg:hidden"
    @click="toggleSidebar"
  >
    <svg
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
    >
      <path
        v-if="isSidebarOpen"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
      <path
        v-else
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </button>

  <!-- 사이드바 -->
  <div
    :class="[
      'fixed top-16 left-0 z-40 w-64 bg-gray-800 transition-transform lg:translate-x-0',
      'h-[calc(100vh-4rem)]',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <nav class="mt-5 space-y-1 px-2">
      <template v-for="item in navigation" :key="item.name">
        <!-- 자식 메뉴가 있는 경우 -->
        <div v-if="item.children" class="space-y-1">
          <div
            class="group flex items-center rounded-md px-2 py-2 text-base font-medium cursor-pointer"
            :class="[
              route.path.startsWith(item.path)
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            ]"
            @click="toggleMenu(item.path)"
          >
            <svg 
              class="mr-4 h-6 w-6 flex-shrink-0" 
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              :class="[route.path.startsWith(item.path) ? 'text-white' : 'text-gray-300']"
            >
              <path :d="item.icon" />
            </svg>
            {{ item.name }}
          </div>
          
          <!-- 서브 메뉴 -->
          <div
            class="ml-8 space-y-1 overflow-hidden transition-all duration-300 ease-in-out"
            :class="[
              expandedMenus.includes(item.path) ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            ]"
          >
            <router-link
              v-for="child in item.children"
              :key="child.name"
              :to="child.path"
              :class="[
                route.path === child.path
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
              ]"
            >
              {{ child.name }}
            </router-link>
          </div>
        </div>

        <!-- 자식 메뉴가 없는 경우 -->
        <router-link
          v-else
          :to="item.path"
          :class="[
            route.path === item.path
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'group flex items-center rounded-md px-2 py-2 text-base font-medium'
          ]"
        >
          <svg 
            class="mr-4 h-6 w-6 flex-shrink-0" 
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            :class="[route.path === item.path ? 'text-white' : 'text-gray-300']"
          >
            <path :d="item.icon" />
          </svg>
          {{ item.name }}
        </router-link>
      </template>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isSidebarOpen = ref(false)
const expandedMenus = ref<string[]>([])

const navigation = [
  {
    name: '홈',
    path: '/',
    icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
  },
  {
    name: '매매 계획',
    path: '/planning',
    icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z',
    children: [
      {
        name: '계획 작성',
        path: '/planning/create'
      },
      {
        name: '타점 계산',
        path: '/planning/entry-points'
      }
    ]
  },
  {
    name: '설정',
    path: '/settings',
    icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
  }
]

// 메뉴 펼침/접힘 토글 함수
function toggleMenu(path: string) {
  const index = expandedMenus.value.indexOf(path)
  if (index === -1) {
    expandedMenus.value.push(path)
  } else {
    expandedMenus.value.splice(index, 1)
  }
}

// 라우트 변경 감지하여 현재 경로에 해당하는 메뉴만 펼치기
watch(() => route.path, (newPath) => {
  expandedMenus.value = navigation
    .filter(item => item.children && newPath.startsWith(item.path))
    .map(item => item.path)
}, { immediate: true })

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  document.body.classList.toggle('sidebar-open', isSidebarOpen.value)
}
</script> 