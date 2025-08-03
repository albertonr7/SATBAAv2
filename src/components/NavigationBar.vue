<template>
  <div>
    <!-- Barra superior -->
    <q-toolbar class="navigation-toolbar" data-test="main-toolbar">
      <!-- Menú hamburguesa solo en móvil -->
      <q-btn v-if="isMobile" flat dense round icon="menu" @click="toggleDrawer" class="mobile-menu-btn"
        :aria-label="config.accessibility.menuButtonLabel" data-test="mobile-menu-btn" />


      <!-- Logo clickeable -->
      <q-btn flat @click="navigateToHome" class="logo-btn" :aria-label="config.accessibility.logoButtonLabel"
        data-test="logo-btn">
        <img :src="logoSrc" :alt="config.logo.alt" class="logo-img" data-test="logo-img" />
      </q-btn>

      <q-space />

      <!-- Tabs para desktop -->
      <q-tabs v-if="!isMobile" v-model="activeTab" shrink indicator-color="secondary" class="desktop-tabs"
        data-test="desktop-tabs">
        <template v-for="tab in navigationTabs" :key="tab.name">
          <q-tab v-if="tab.type === 'simple'" :name="tab.name" :label="tab.label" @click="navigateTo(tab)"
            class="desktop-tab" :data-test="`tab-${tab.name}`" no-caps />
          <q-btn-dropdown v-else-if="tab.type === 'dropdown'" flat dense no-caps :label="tab.label"
            dropdown-icon="arrow_drop_down" class="desktop-dropdown" :data-test="`dropdown-${tab.name}`">
            <q-list>
              <q-item v-for="subItem in tab.submenu" :key="subItem.name" clickable v-close-popup
                @click="navigateTo(subItem)" :data-test="`dropdown-item-${subItem.name}`">
                <q-item-section>{{ subItem.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </template>
      </q-tabs>
    </q-toolbar>

    <!-- Drawer lateral para móvil -->
    <q-drawer v-if="isMobile" v-model="isDrawerOpen" side="left" overlay bordered :width="280" class="mobile-drawer"
      behavior="mobile" data-test="mobile-drawer">
      <q-list separator>
        <template v-for="tab in navigationTabs" :key="tab.name">
          <q-item v-if="tab.type === 'simple'" clickable v-close-popup @click="handleMobileNavigation(tab)"
            :data-test="`mobile-item-${tab.name}`">
            <q-item-section>{{ tab.label }}</q-item-section>
          </q-item>

          <q-expansion-item v-else-if="tab.type === 'dropdown'" expand-separator :label="tab.label"
            class="mobile-expansion" expand-icon="arrow_drop_down" dense :data-test="`mobile-expansion-${tab.name}`">
            <q-list>
              <q-item v-for="subItem in tab.submenu" :key="subItem.name" clickable v-close-popup
                @click="handleMobileNavigation(subItem)" :data-test="`mobile-sub-item-${subItem.name}`">
                <q-item-section>{{ subItem.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
        </template>
      </q-list>
    </q-drawer>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import navigationConfig from 'src/config/navigation-config.yaml'

// Composables
const $q = useQuasar()
const router = useRouter()
const route = useRoute()

// Configuración desde YAML
const config = navigationConfig

// Estado reactivo
const isDrawerOpen = ref(false)

// Computed properties
const isMobile = computed(() => !$q.screen.gt["md"])

//const logoSrc = ref('/assets/images/navigation/' + config.logo.src)
const logoSrc = computed(() => {
  return new URL(`../assets/images/navigation/${config.logo.src}`, import.meta.url).href
})

const navigationTabs = computed(() => {
  return config.tabs
})

const activeTab = computed(() => {
  const currentPath = route.path
  const mainTab = navigationTabs.value.find(tab => tab.route === currentPath)
  return mainTab?.name || ''
})

// Métodos de navegación
const navigateTo = (item) => {
  if (item?.route) {
    router.push(item.route)
  }
}

const navigateToHome = () => {
  router.push(config.logo.homeRoute)
}

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

const handleMobileNavigation = (item) => {
  navigateTo(item)
  isDrawerOpen.value = false
}
</script>

<style lang="scss" scoped>
.navigation-toolbar {
  background-color: $primary;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 0 24px;
  min-height: 72px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu-btn {
  margin-right: 24px;
}

.logo-btn {
  padding: 0;
  min-width: 0;
  margin-right: 24px;
}

.logo-img {
  height: 40px;
  width: 220px;
  display: block;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
}

.desktop-tab {
  font-weight: 500;
  transition: background-color 0.3s ease;
  border-radius: 4px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}

.desktop-dropdown {
  font-weight: 500;
}

.mobile-drawer {
  background-color: $primary;

  .q-item {
    color: black;
    min-height: 48px;
    padding: 12px 16px;
  }
}

.mobile-expansion {
  transition: background-color 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  // Estilos para el header del expansion item
  :deep(.q-expansion-item__container .q-item) {
    color: black;
  }
}
</style>
