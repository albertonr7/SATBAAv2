<template>
  <q-page class="proyecto-page">
    <!-- HERO SECTION -->
    <section id="hero" class="hero-section">
      <div class="hero-overlay">
        <div class="container">
          <q-breadcrumbs class="hero-breadcrumbs" separator=">" active-color="white">
            <q-breadcrumbs-el label="Inicio" to="/" class="text-white" />
            <q-breadcrumbs-el :label="proyecto?.resumen?.titulo || 'Proyecto'" class="text-white" />
          </q-breadcrumbs>

          <div class="row items-center q-mt-md">
            <div class="col-12 col-md-8">
              <div class="hero-content">
                <div class="project-category">{{ proyecto?.categoria || 'Proyecto de Investigación' }}</div>
                <h1 class="hero-title">{{ proyecto?.titulo || proyecto?.resumen?.titulo }}</h1>
                <p class="hero-description">{{ proyecto?.resumen?.descripcion }}</p>

                <div class="hero-meta">
                  <q-chip v-if="proyecto?.estado" :color="getStatusColor(proyecto.estado)" text-color="white"
                    icon="flag">
                    {{ proyecto.estado }}
                  </q-chip>
                  <q-chip v-if="proyecto?.fecha_inicio" color="blue-grey-7" text-color="white" icon="event">
                    {{ formatDate(proyecto.fecha_inicio) }}
                  </q-chip>
                  <q-chip v-if="proyecto?.duracion" color="blue-grey-7" text-color="white" icon="schedule">
                    {{ proyecto.duracion }}
                  </q-chip>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-4 text-center">
              <div class="hero-logo-container">
                <q-avatar size="150px" class="hero-avatar">
                  <img :src="projectImageSrc" :alt="`Logo ${proyecto?.resumen?.titulo}`" class="hero-logo">
                </q-avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN CONTENT -->
    <div class="main-content">
      <div class="container">
        <div class="row">
          <!-- CONTENT COLUMN -->
          <div class="col-12 col-lg-8 content-column">

            <!-- INFORMACIÓN DEL PROYECTO (SOLO MÓVIL - ARRIBA) -->
            <div class="project-info-mobile">
              <info-sidebar :proyecto="proyecto" />
            </div>

            <!-- RESUMEN -->
            <section id="resumen" class="content-section first-section">
              <h2 class="section-title">Resumen del Proyecto</h2>

              <content-card title="Introducción" icon="description" :content="proyecto?.contenido?.introduccion" />

              <content-card title="Descripción Principal" icon="info"
                :content="proyecto?.contenido?.descripcion_principal" class="q-mt-md" />

              <content-card title="Funcionalidades" icon="settings" :content="proyecto?.contenido?.funcionalidades"
                class="q-mt-md" />
            </section>

            <!-- OBJETIVOS -->
            <section id="objetivos" class="content-section">
              <h2 class="section-title">Objetivos y Beneficios</h2>

              <content-card title="Objetivo General" icon="flag" :content="proyecto?.contenido?.objetivo_general" />

              <div v-if="proyecto?.contenido?.beneficios" class="q-mt-md">
                <q-card flat bordered class="benefits-card">
                  <q-card-section>
                    <div class="card-header">
                      <h3>Beneficios del Proyecto</h3>
                    </div>

                    <div class="benefits-grid">
                      <div v-for="(beneficio, index) in proyecto.contenido.beneficios" :key="index"
                        class="benefit-item">
                        <q-icon :name="beneficio.icono" size="32px" color="primary" class="benefit-icon" />
                        <div class="benefit-content">
                          <h4 class="benefit-title">{{ beneficio.titulo }}</h4>
                          <p class="benefit-description">{{ beneficio.descripcion }}</p>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </section>

            <!-- METODOLOGÍA -->
            <section id="metodologia" class="content-section">
              <h2 class="section-title">Metodología</h2>

              <content-card title="Metodología de Investigación" icon="science"
                :content="proyecto?.contenido?.metodologia" />

              <div v-if="proyecto?.contenido?.tecnologias" class="q-mt-md">
                <q-card flat bordered class="tech-card">
                  <q-card-section>
                    <div class="card-header">
                      <h3>Tecnologías Utilizadas</h3>
                    </div>

                    <div class="tech-chips-container">
                      <q-chip v-for="(tech, index) in proyecto.contenido.tecnologias" :key="index" color="primary"
                        text-color="white" :label="tech" class="tech-chip" outline square />
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </section>

            <!-- RECURSOS -->
            <section id="resultados" class="content-section">
              <h2 class="section-title">Recursos del Proyecto</h2>

              <div v-if="proyecto?.contenido?.recursos">
                <q-card flat bordered class="resources-card">
                  <q-card-section>
                    <div class="resources-grid">
                      <div class="resource-item" v-if="proyecto.contenido.recursos.codigo">
                        <q-icon name="code" size="40px" color="primary" />
                        <h4>{{ proyecto.contenido.recursos.codigo.titulo }}</h4>
                        <p>{{ proyecto.contenido.recursos.codigo.descripcion }}</p>
                        <q-btn color="primary" :href="proyecto.contenido.recursos.codigo.enlace" icon="email"
                          label="Solicitar Código" no-caps />
                      </div>

                      <div class="resource-item" v-if="proyecto.contenido.recursos.demo">
                        <q-icon name="play_circle" size="40px" color="secondary" />
                        <h4>{{ proyecto.contenido.recursos.demo.titulo }}</h4>
                        <p>{{ proyecto.contenido.recursos.demo.descripcion }}</p>
                        <q-btn color="secondary" :href="proyecto.contenido.recursos.demo.enlace" target="_blank"
                          icon="videocam" label="Ver Demo" no-caps />
                      </div>

                      <div class="resource-item" v-if="proyecto.contenido.recursos.aplicacion">
                        <q-icon name="touch_app" size="40px" color="positive" />
                        <h4>{{ proyecto.contenido.recursos.aplicacion.titulo }}</h4>
                        <p>{{ proyecto.contenido.recursos.aplicacion.descripcion }}</p>
                        <q-btn color="positive" :href="proyecto.contenido.recursos.aplicacion.enlace" target="_blank"
                          icon="launch" label="Probar APP" no-caps />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </section>

            <!-- INFOGRAFÍAS -->
            <section id="publicaciones" class="content-section">
              <h2 class="section-title">Infografías del Proyecto</h2>

              <div v-if="proyecto?.contenido?.infografias">
                <div class="infografias-grid">
                  <div v-for="(infografia, index) in proyecto.contenido.infografias" :key="index"
                    class="infografia-card" @click="openLightbox(infografia)">
                    <q-img :src="`/images/projects/${route.params.slug}/infografias/${infografia.archivo}`"
                      :alt="infografia.titulo" class="infografia-image" ratio="3/4" />
                    <div class="infografia-overlay">
                      <h5 class="infografia-title">{{ infografia.titulo }}</h5>
                      <q-chip size="sm" :label="infografia.categoria" color="white" text-color="dark" />
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="no-content">
                <q-icon name="image" size="48px" color="grey-5" />
                <p>Infografías próximamente disponibles</p>
              </div>
            </section>

          </div>

          <!-- SIDEBAR COLUMN (DESKTOP) -->
          <div class="col-12 col-lg-4 sidebar-column">
            <div class="project-info-desktop">
              <info-sidebar :proyecto="proyecto" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- LOADING STATE -->
    <div v-if="!proyecto" class="loading-container">
      <q-spinner-orbit color="primary" size="60px" />
      <div class="loading-text">Cargando información del proyecto...</div>
    </div>

    <!-- LIGHTBOX DIALOG -->
    <q-dialog v-model="showLightbox" full-width full-height>
      <q-card class="lightbox-card">
        <q-btn flat dense round icon="close" class="lightbox-close" @click="showLightbox = false" />
        <q-img :src="lightboxImage" fit="scale-down" class="lightbox-image" />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import ContentCard from 'components/ContentCard.vue'
import InfoSidebar from 'components/InfoSidebar.vue'

const $q = useQuasar()
const route = useRoute()
const proyecto = ref(null)
const showLightbox = ref(false)
const lightboxImage = ref('')

// Computed para imagen del proyecto
const projectImageSrc = computed(() => {
  if (!proyecto.value?.resumen?.logo) return '/images/projects/default-project.png'
  return `/images/projects/${route.params.slug}/${proyecto.value.resumen.logo}`
})

// Métodos utilitarios
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
    month: 'long'
  })
}

const openLightbox = (infografia) => {
  lightboxImage.value = `/images/projects/${route.params.slug}/infografias/${infografia.archivo}`
  showLightbox.value = true
}

onMounted(async () => {
  try {
    console.log('Loading project with slug:', route.params.slug)
    const data = await import(`../data/proyecto/${route.params.slug}.yaml`)
    proyecto.value = data.default
    console.log('Project loaded:', proyecto.value)
  } catch (err) {
    console.error("Error cargando YAML:", err)
    $q.notify({
      type: 'negative',
      message: 'No se pudo cargar el proyecto',
      position: 'top'
    })
  }
})
</script>

<style lang="scss" scoped>
// Variables
$border-radius: 4px;
$transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
$shadow-base: 0 1px 3px rgba(0, 0, 0, 0.05);
$shadow-hover: 0 4px 20px rgba(0, 0, 0, 0.08);

// Base
.proyecto-page {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  overflow-x: hidden;
}

// Hero Section
.hero-section {
  background: linear-gradient(135deg, var(--q-primary) 0%, #1e3a5f 100%);
  padding: 40px 0 32px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/images/hero-pattern.svg') repeat;
    opacity: 0.1;
  }
}

.hero-overlay {
  position: relative;
  z-index: 2;
}

.hero-breadcrumbs {
  margin-bottom: 16px;

  :deep(.q-breadcrumbs__el) {
    color: rgba(255, 255, 255, 0.8);

    &:hover {
      color: white;
    }
  }
}

.hero-content {
  color: white;
}

.project-category {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--q-secondary);
  margin-bottom: 12px;
  font-weight: 600;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 20px;
  opacity: 0.95;
}

.hero-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-avatar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.hero-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

// Layout
.main-content {
  padding: 12px 0;
  max-width: 100%;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  width: 100%;
  box-sizing: border-box;
}

.content-column {
  padding-right: 20px;
  padding-top: 0;
}

.sidebar-column {
  padding-left: 16px;
  padding-top: 0;
}

.content-section {
  margin-bottom: 20px;
  scroll-margin-top: 100px;

  &.first-section {
    margin-top: 0;
  }
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--q-primary);
  margin-bottom: 16px;
}

// Project Info Sidebar
.project-info-desktop {
  position: sticky;
  top: 95px;
  max-height: calc(100vh - 115px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;

    &-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 3px;
    }

    &-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 3px;

      &:hover {
        background: rgba(0, 0, 0, 0.3);
      }
    }
  }
}

.project-info-mobile {
  display: none;
  margin-bottom: 16px;
}

// Cards
.benefits-card,
.tech-card,
.resources-card {
  background: white;
  border-radius: $border-radius;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: $transition;
  margin-bottom: 16px;
  box-shadow: $shadow-base;

  &:hover {
    box-shadow: $shadow-hover;
    transform: translateY(-1px);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  h3 {
    margin: 0;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--q-primary);
  }
}

// Benefits
.benefits-grid {
  display: grid;
  gap: 8px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%);
  border-radius: $border-radius;
  border-left: 4px solid var(--q-primary);
}

.benefit-content {
  flex: 1;
}

.benefit-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--q-primary);
  margin: 0 0 6px 0;
  line-height: 1.4;
}

.benefit-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.75);
  margin: 0;
}

// Tech
.tech-chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-start;
  margin-top: 12px;
}

.tech-chip {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: $border-radius;
  transition: $transition;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(var(--q-primary-rgb), 0.2);
  }
}

// Resources
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 12px;
}

.resource-item {
  text-align: center;
  padding: 20px 16px;
  background: linear-gradient(135deg, #f9faff 0%, #f0f4ff 100%);
  border-radius: $border-radius;
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: $transition;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  }

  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--q-primary);
    margin: 12px 0 6px 0;
    line-height: 1.4;
  }

  p {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.65);
    margin-bottom: 16px;
    line-height: 1.5;
  }
}

// Infografias
.infografias-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.infografia-card {
  position: relative;
  cursor: pointer;
  border-radius: $border-radius;
  overflow: hidden;
  transition: $transition;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);

    .infografia-overlay {
      opacity: 1;
    }
  }
}

.infografia-image {
  width: 100%;
  border-radius: $border-radius;
}

.infografia-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 20px 16px 16px 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.infografia-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

// Loading & No Content
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 24px;
}

.loading-text {
  font-size: 1.125rem;
  color: rgba(0, 0, 0, 0.6);
}

.no-content {
  text-align: center;
  padding: 40px 20px;
  color: rgba(0, 0, 0, 0.5);

  p {
    margin-top: 12px;
    font-size: 1rem;
  }
}

// Lightbox
.lightbox-card {
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  color: white;
}

.lightbox-image {
  max-width: 90vw;
  max-height: 90vh;
}

// Deep styles for child components
:deep(.info-sidebar) {
  .q-card {
    border-radius: $border-radius;
  }
}

// Responsive
@media (max-width: 1023px) {
  .project-info-desktop {
    display: none;
  }

  .project-info-mobile {
    display: block;
    margin-bottom: 12px;
  }

  .content-column {
    padding-right: 0;
  }

  .sidebar-column {
    display: none;
  }

  .container {
    padding: 0 10px;
  }

  .content-section {
    margin-bottom: 16px;
  }

  .section-title {
    font-size: 1.35rem;
    margin-bottom: 12px;
  }
}

@media (min-width: 1024px) {
  .project-info-mobile {
    display: none;
  }

  .project-info-desktop {
    display: block;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
    line-height: 1.25;
  }

  .hero-description {
    font-size: 1rem;
    line-height: 1.6;
  }

  .container {
    padding: 0 12px;
  }

  .benefit-item {
    flex-direction: column;
    text-align: center;
    padding: 16px;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .tech-chips-container {
    justify-content: center;
  }

  .infografias-grid,
  .resources-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 24px 0 16px 0;
  }

  .main-content {
    padding: 8px 0;
  }

  .content-section {
    margin-bottom: 14px;
  }

  .container {
    padding: 0 8px;
  }

  .benefit-item {
    padding: 12px;
  }

  .resource-item {
    padding: 16px 12px;
  }
}
</style>
