<template>
  <div class="benefit-card">
    <q-icon 
      :name="iconName" 
      class="benefit-icon"
      :data-test="`benefit-icon-${index}`"
    />
    <p class="benefit-description">
      {{ benefit.description }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import * as matIcons from '@quasar/extras/material-icons'

// Props
const props = defineProps({
  benefit: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

// Computed properties
const iconName = computed(() => {
  // Mapeo de iconos a Material Icons
  const iconMap = {
    'feed': matIcons.matFeed,
    'diversity_2': matIcons.matDiversity2,
    'group_add': matIcons.matGroupAdd
  }
  return iconMap[props.benefit.icon] || matIcons.matHelpOutline
})
</script>

<style lang="scss" scoped>
.benefit-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.benefit-icon {
  font-size: 50px;
  margin-bottom: 16px;
}

.benefit-description {
  margin: 0;
}
</style>