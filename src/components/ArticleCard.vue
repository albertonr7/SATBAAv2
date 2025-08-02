<template>
  <q-card class="article-card">
    <q-img 
      :src="imageSrc" 
      class="article-image"
      :data-test="`article-image-${index}`"
    />
    
    <q-card-section>
      <div class="article-title">{{ article.title }}</div>
      <div class="article-authors">{{ article.authors }}</div>
    </q-card-section>
    
    <q-card-actions class="article-actions">
      <q-btn 
        flat 
        :label="viewPublicationText" 
        class="publication-btn" 
        no-caps 
        :to="article.route"
        :data-test="`view-publication-${index}`"
      />
      <q-space />
      <q-btn 
        round 
        flat 
        dense 
        @click="toggleExpanded"
        :label="expandedButtonText" 
        class="summary-toggle-btn"
        no-caps
        :data-test="`toggle-summary-${index}`"
      >
        <q-icon 
          :name="expandedIcon" 
          class="expand-icon"
        />
      </q-btn>
    </q-card-actions>
    
    <q-slide-transition>
      <div v-show="isExpanded" class="summary-container">
        <q-separator />
        <q-card-section class="article-summary">
          {{ article.summary }}
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as matIcons from '@quasar/extras/material-icons'

// Props
const props = defineProps({
  article: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  viewPublicationText: {
    type: String,
    default: 'Ver publicación'
  }
})

// Estado reactivo
const isExpanded = ref(false)

// Computed properties
const imageSrc = computed(() => {
  return new URL(props.article.image, import.meta.url).href
})

const expandedButtonText = computed(() => {
  return isExpanded.value ? 'Ocultar resumen' : 'Leer resumen'
})

const expandedIcon = computed(() => {
  return isExpanded.value ? matIcons.matExpandLess : matIcons.matExpandMore
})

// Methods
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style lang="scss" scoped>
.article-card {
  background-color: var(--q-primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.article-image {
  height: 350px;
}

.article-title {
  font-size: 1.25rem;
  color: white;
  margin-top: 8px;
  margin-bottom: 4px;
}

.article-authors {
  font-size: 0.75rem;
  color: white;
}

.article-actions {
  justify-content: space-between;
}

.publication-btn {
  background-color: var(--q-secondary);
  color: #092231;
}

.summary-toggle-btn {
  color: white;
}

.expand-icon {
  font-size: 36px;
}

.summary-container {
  width: 100%;
}

.article-summary {
  font-size: 0.875rem;
  color: white;
}
</style>