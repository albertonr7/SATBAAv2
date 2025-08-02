<template>
  <div class="footer-content">
    <div class="footer-text">
      <span class="copyright-text">
        {{ config.footer.prefix }} {{ config.footer.symbol }} {{ currentYear }}
      </span>
      <span class="organization-name">{{ config.footer.organization }}</span>
      <span class="separator">|</span>
      <span class="project-name">{{ config.footer.project }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import footer from 'src/config/layout-config.yaml'

// Configuración del pie de página desde YAML
const config = footer

// Año dinámico para el copyright
const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.footer-text {
  font-size: 0.75rem;
  text-align: center;
}

.copyright-text {
  opacity: 0.8;
}

.organization-name,
.project-name {
  font-weight: 500;
  margin: 0 4px;
}

.separator {
  margin: 0 4px;
  opacity: 0.5;
}
</style>
