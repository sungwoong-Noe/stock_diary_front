<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 헤더 -->
    <AppHeader />
    
    <!-- 메인 레이아웃 -->
    <div class="pt-16">
      <div class="flex min-h-[calc(100vh-8rem)]">
        <!-- 사이드바 -->
        <AppSidebar />
        
        <!-- 메인 컨텐츠 -->
        <main class="flex-1 p-6 lg:pl-64">
          <div class="mx-auto max-w-7xl">
            <!-- <router-view /> -->
          </div>
        </main>
      </div>
    </div>
    
    <!-- 푸터 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<style>
/* 스크롤바가 레이아웃을 흔들지 않도록 설정 */
html {
  overflow-y: scroll;
}

/* 모바일에서 사이드바가 열렸을 때 스크롤 방지 */
body.sidebar-open {
  overflow: hidden;
}
</style>
