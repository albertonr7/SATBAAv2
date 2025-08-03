<template>
  <q-card flat bordered class="publication-card">
    <q-img :src="publicationImageSrc" class="publication-image" ratio="3/4" />

    <q-card-section>
      <div class="publication-type">{{ publication.tipo || 'Artículo' }}</div>
      <h4 class="publication-title">{{ publication.titulo }}</h4>
      <div class="publication-authors">{{ publication.autores }}</div>
      <div class="publication-journal" v-if="publication.revista">
        <strong>{{ publication.revista }}</strong>
        <span v-if="publication.volumen"> - Vol. {{ publication.volumen }}</span>
        <span v-if="publication.numero"> ({{ publication.numero }})</span>
      </div>
      <div class="publication-year" v-if="publication.año">{{ publication.año }}</div>
    </q-card-section>

    <q-card-actions align="between">
      <q-btn flat color="primary" icon="visibility" label="Ver" no-caps :href="publication.url" target="_blank"
        v-if="publication.url" />

      <q-btn flat color="primary" icon="download" label="PDF" no-caps :href="publication.pdf" target="_blank"
        v-if="publication.pdf" />

      <q-space />

      <q-btn flat round color="primary" icon="share" @click="sharePublication">
        <q-tooltip>Compartir</q-tooltip>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const props = defineProps({
  publication: {
    type: Object,
    required: true
  }
})

const publicationImageSrc = computed(() => {
  if (props.publication.imagen) {
    return `/images/publications/${props.publication.imagen}`
  }
  return '/images/default-publication.jpg'
})

const sharePublication = () => {
  const shareData = {
    title: props.publication.titulo,
    text: `Publicación: ${props.publication.titulo} por ${props.publication.autores}`,
    url: props.publication.url || window.location.href
  }

  if (navigator.share) {
    navigator.share(shareData)
  } else {
    navigator.clipboard.writeText(shareData.url)
    $q.notify({
      type: 'positive',
      message: 'Enlace copiado al portapapeles',
      position: 'top'
    })
  }
}
</script>

<style lang="scss" scoped>
.publication-card {
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}

.publication-image {
  width: 100%;
  background: linear-gradient(45deg, #f0f2f5, #e1e8ed);
}

.publication-type {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--q-secondary);
  font-weight: 600;
  margin-bottom: 8px;
}

.publication-title {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--q-primary);
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.publication-authors {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 8px;
  font-style: italic;
}

.publication-journal {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 4px;
}

.publication-year {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
}

@media (max-width: 480px) {
  .publication-title {
    font-size: 1rem;
  }
}
</style>
