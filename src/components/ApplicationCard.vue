<template>
  <q-card class="application-card">
    <q-img 
      :src="imageSrc" 
      class="app-image"
      :data-test="`app-image-${index}`"
    />
    <div class="app-title">{{ application.label }}</div>
    <p class="app-description">{{ application.description }}</p>
    <q-btn 
      class="app-button" 
      no-caps 
      :to="application.route"
      :data-test="`app-button-${index}`"
    > 
      Ver más 
    </q-btn>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  application: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

// Computed properties
const imageSrc = computed(() => {
  return new URL(props.application.image, import.meta.url).href
})
</script>

<style lang="scss" scoped>
.application-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  border: 2px solid var(--q-secondary);
  border-radius: 4px;
}

.app-image {
  height: 40px;
  width: 100px;
  margin: 16px 0;
}

.app-title {
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.app-description {
  margin: 8px;
  flex-grow: 1;
}

.app-button {
  background-color: var(--q-secondary);
  margin: 8px 0;
}
</style>