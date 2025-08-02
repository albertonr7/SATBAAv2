<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header :elevated="true" class="main-header" :height-hint="98" data-test="main-header">
      <NavigationBar />
    </q-header>

    <!-- Contenedor principal -->
    <q-page-container class="main-container" :key="$route.fullPath" data-test="page-container">
      <router-view v-slot="{ Component }">
        <transition :name="'fade'" :mode="'out-in'">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>

    <!-- Footer -->
    <q-footer :elevated="true" class="main-footer" data-test="main-footer">
      <FooterComponent />
    </q-footer>

  </q-layout>
</template>

<script setup>
import NavigationBar from 'components/NavigationBar.vue'
import FooterComponent from 'components/FooterComponent.vue'
</script>

<style lang="scss" scoped>
// Transiciones de página
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Header
.main-header {
  background-color: $primary;
  color: white;
}

// Contenedor principal
.main-container {
  background: #f5f5f5;
}

// Footer
.main-footer {
  background-color: $primary;
  color: white;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
