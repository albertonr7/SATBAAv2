<template>
  <q-card flat bordered class="info-sidebar">
    <q-card-section>
      <h4 class="sidebar-title">Información del Proyecto</h4>

      <div class="info-list">
        <div class="info-item" v-if="proyecto?.estado">
          <div class="info-label">Estado</div>
          <q-chip :color="getStatusColor(proyecto.estado)" text-color="white" icon="flag" :label="proyecto.estado"
            class="status-chip" />
        </div>

        <div class="info-item" v-if="proyecto?.fecha_inicio">
          <div class="info-label">Fecha de Inicio</div>
          <div class="info-value">{{ formatDate(proyecto.fecha_inicio) }}</div>
        </div>

        <div class="info-item" v-if="proyecto?.duracion">
          <div class="info-label">Duración</div>
          <div class="info-value">{{ proyecto.duracion }}</div>
        </div>

        <div class="info-item" v-if="proyecto?.presupuesto">
          <div class="info-label">Presupuesto</div>
          <div class="info-value">{{ proyecto.presupuesto }}</div>
        </div>

        <div class="info-item" v-if="proyecto?.financiamiento">
          <div class="info-label">Financiamiento</div>
          <div class="info-value">{{ proyecto.financiamiento }}</div>
        </div>

        <div class="info-item" v-if="proyecto?.categoria">
          <div class="info-label">Categoría</div>
          <div class="info-value">{{ proyecto.categoria }}</div>
        </div>

        <div class="info-item" v-if="proyecto?.responsable">
          <div class="info-label">Responsable</div>
          <div class="info-value">{{ proyecto.responsable }}</div>
        </div>
      </div>

      <q-separator class="q-my-lg" />

      <div class="quick-actions">
        <div class="actions-buttons">
          <q-btn flat color="primary" icon="download" label="PDF" class="action-btn" @click="downloadPDF" />

          <q-btn flat color="primary" icon="share" label="Compartir" class="action-btn" @click="shareProject" />

          <q-btn flat color="primary" icon="bookmark" label="Guardar" class="action-btn" @click="bookmarkProject" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()

defineProps({
  proyecto: {
    type: Object,
    required: true
  }
})

const getStatusColor = (status) => {
  const colors = {
    'En desarrollo': 'orange',
    'Completado': 'positive',
    'En pausa': 'warning',
    'Planificación': 'info'
  }
  return colors[status] || 'grey'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const downloadPDF = () => {
  $q.notify({
    type: 'info',
    message: 'Funcionalidad de descarga en desarrollo',
    position: 'top'
  })
}

const shareProject = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Proyecto de Investigación',
      url: window.location.href
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    $q.notify({
      type: 'positive',
      message: 'Enlace copiado al portapapeles',
      position: 'top'
    })
  }
}

const bookmarkProject = () => {
  $q.notify({
    type: 'positive',
    message: 'Proyecto guardado en favoritos',
    position: 'top'
  })
}
</script>

<style lang="scss" scoped>
// Variables
$border-radius: 4px;
$transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

.info-sidebar {
  background: white;
  border-radius: $border-radius;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.sidebar-title {
  margin: 0 0 20px 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--q-primary);
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
}

.status-chip {
  align-self: flex-start;
  font-weight: 600;
  padding: 8px 12px;

  :deep(.q-chip__content) {
    font-size: 0.875rem;
  }
}

.quick-actions {
  margin-top: 16px;
}

.actions-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 0;
  border-radius: 8px;
  font-size: 0.75rem;
  padding: 8px 4px;
  transition: $transition;

  &:hover {
    background: rgba(var(--q-primary-rgb), 0.05);
    transform: translateY(-1px);
  }

  :deep(.q-btn__content) {
    flex-direction: column;
    gap: 4px;

    .q-icon {
      font-size: 18px;
      margin: 0;
      flex-shrink: 0;
    }
  }
}

// Responsive
@media (max-width: 480px) {
  .actions-buttons {
    flex-direction: column;
  }

  .action-btn {
    flex: none;

    :deep(.q-btn__content) {
      flex-direction: row;
      justify-content: flex-start;
      gap: 8px;
    }
  }
}
</style>
