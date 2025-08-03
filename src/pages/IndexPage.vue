<template>
  <q-page class="index-page">
    <!-- ENCABEZADO -->
    <section class="header-section" data-test="header-section">
      <div class="q-pa-xl">
        <div class="row items-center">
          <div class="col-6 col-md-8">
            <q-img :src="headerImageSrc" class="header-image" fit="contain" data-test="header-image" />
          </div>
          <div class="col-6 col-md-4 text-center">
            <h1 class="header-title">{{ content.header.title }}</h1>
            <h2 class="header-subtitle">{{ content.header.subtitle }}</h2>
          </div>
        </div>
      </div>
    </section>

    <!-- INTRODUCCIÓN -->
    <section id="introduccion" class="introduction-section" data-test="introduction-section">
      <div class="q-pa-xl">
        <div class="row q-gutter-xl items-center">
          <div class="col-12 col-md-6">
            <q-img :src="introImageSrc" class="intro-image" data-test="intro-image" />
          </div>
          <div class="col-12 col-md-6 intro-content">
            <p v-for="(paragraph, index) in content.introduction.paragraphs" :key="index" v-html="paragraph"
              :data-test="`intro-paragraph-${index}`">
            </p>
            <q-btn class="intro-button" no-caps data-test="intro-button">
              {{ content.introduction.buttonText }}
            </q-btn>
          </div>
        </div>
      </div>
    </section>

    <!-- OBJETIVO GENERAL -->
    <section class="objective-section" data-test="objective-section">
      <div class="q-pa-xl">
        <div class="column items-center text-center">
          <p class="objective-title">{{ content.objective.title }}</p>
          <p class="objective-content">{{ content.objective.content }}</p>
        </div>
      </div>
    </section>

    <!-- BENEFICIOS -->
    <section class="benefits-section" data-test="benefits-section">
      <div class="q-pa-xl">
        <div class="benefits-title">{{ content.benefits.title }}</div>
        <div class="row q-gutter-md justify-center">
          <div v-for="(benefit, index) in content.benefits.items" :key="index" class="col-12 col-md-4"
            :data-test="`benefit-${index}`">
            <BenefitCard :benefit="benefit" :index="index" />
          </div>
        </div>
        <div class="row justify-center benefits-button-container">
          <div class="col-auto">
            <q-btn :to="content.benefits.buttonRoute" class="benefits-button" no-caps data-test="benefits-more-button">
              {{ content.benefits.buttonText }}
            </q-btn>
          </div>
        </div>
      </div>
    </section>

    <!-- APLICACIONES DESARROLLADAS (ESTÁTICAS) -->
    <section class="applications-static-section" data-test="applications-static-section">
      <div class="q-pa-xl">
        <div class="applications-title">{{ content.applications.title }}</div>
        <div class="row q-gutter-md justify-center">
          <div v-for="(app, index) in content.applications.staticApps" :key="index" class="col-12 col-sm-6 col-md-4"
            :data-test="`static-app-${index}`">
            <ApplicationCard :application="app" :index="index" />
          </div>
        </div>
      </div>
    </section>

    <!-- ARTÍCULOS Y PUBLICACIONES -->
    <section class="articles-section" data-test="articles-section">
      <div class="q-pa-xl">
        <div class="articles-title">{{ content.articles.title }}</div>
        <div class="row q-gutter-md justify-center">
          <div v-for="(article, index) in content.articles.items" :key="index" class="col-12 col-sm-6 col-md-4"
            :data-test="`article-${index}`">
            <ArticleCard :article="article" :index="index" :view-publication-text="'Ver publicación'" />
          </div>
          <div class="col-12 col-md-4 articles-more-container">
            <q-btn class="articles-more-button" no-caps :to="content.articles.moreArticlesRoute"
              data-test="articles-more-button">
              {{ content.articles.moreArticlesText }}
            </q-btn>
          </div>
        </div>
      </div>
    </section>

    <!-- APLICACIONES DESARROLLADAS (DINÁMICAS) -->
    <section class="applications-dynamic-section" data-test="applications-dynamic-section">
      <div class="q-pa-xl">
        <div class="applications-dynamic-title">Aplicaciones Desarrolladas</div>
        <div class="row q-gutter-md justify-center items-stretch">
          <div v-for="proyecto in proyectos" :key="proyecto.slug" class="col-12 col-sm-6 col-md-4 col-lg-3 full-height"
            :data-test="`dynamic-project-${proyecto.slug}`">
            <TarjetaProyecto :proyecto="proyecto" class="full-height full-width" />
          </div>
        </div>
      </div>
    </section>

    <!-- MATERIAL DE DIVULGACIÓN -->
    <section class="divulgation-section" data-test="divulgation-section">
      <div class="q-pa-xl">
        <div class="divulgation-title">Material de Divulgación</div>
        <div class="q-gutter-md row wrap justify-center">
          <CardClickeable v-for="(material, index) in materiales" :key="index" v-bind="material"
            :data-test="`material-${index}`" />
        </div>
      </div>
    </section>

    <!-- DISCIPLINAS Y TECNOLOGÍAS -->
    <section class="disciplines-section" data-test="disciplines-section">
      <div class="q-pa-xl">
        <div class="disciplines-title">{{ content.disciplines.title }}</div>
        <div class="row q-gutter-md items-center">
          <div class="col-12 col-md-6 disciplines-image-container">
            <q-img :src="disciplinesImageSrc" class="disciplines-image" data-test="disciplines-image" />
          </div>
          <div class="col-12 col-md-6">
            <p v-for="(paragraph, index) in content.disciplines.paragraphs" :key="index"
              :data-test="`disciplines-paragraph-${index}`">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- EQUIPO DE COLABORADORES -->
    <section class="team-section" data-test="team-section">
      <div class="q-pa-xl">
        <div class="team-title">{{ content.team.title }}</div>
        <div class="q-gutter-md row wrap justify-center">
          <ColaboradorCard v-for="(colaborador, index) in colaboradores" :key="index" v-bind="colaborador"
            :data-test="`collaborator-${index}`" />
        </div>
        <BotonCoqueto :label="content.team.buttonText" :to="content.team.buttonRoute" data-test="team-more-button" />
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import indexContent from 'src/config/index-content.yaml'

// Componentes importados (los que ya existen)
import ColaboradorCard from 'components/tarjetaColaborador.vue'
import BotonCoqueto from 'components/BotonCoqueto.vue'
import CardClickeable from 'components/CardClickeable.vue'
import TarjetaProyecto from 'components/TarjetaProyecto.vue'

// Componentes nuevos creados
import ArticleCard from 'components/ArticleCard.vue'
import BenefitCard from 'components/BenefitCard.vue'
import ApplicationCard from 'components/ApplicationCard.vue'

// Datos externos
import colaboradores from 'src/data/colaboradores.yaml'
import materiales from 'src/data/divulgacion.yaml'
import APIEN from 'src/data/proyecto/APIEN.yaml'
import SRC from 'src/data/proyecto/SRC.yaml'
import SRP from 'src/data/proyecto/SRP.yaml'

// Configuración desde YAML
const content = indexContent.index
const proyectos = [APIEN, SRC, SRP]

// Computed properties para imágenes
const headerImageSrc = computed(() => {
  return new URL(`../assets/images/sections/${content.header.image}`, import.meta.url).href
})

const introImageSrc = computed(() => {
  return new URL(content.introduction.image, import.meta.url).href
})

const disciplinesImageSrc = computed(() => {
  return new URL(content.disciplines.image, import.meta.url).href
})
</script>

<style lang="scss" scoped>
.index-page {
  margin: 0;
  padding: 0;
}

// Sección header
.header-section {
  background: $primary;
  padding: 48px 24px;
  margin-bottom: 48px;
  position: relative;
}

.header-image {
  width: 100%;
  max-height: 600px;
}

.header-title {
  font-size: 2.125rem;
  color: $secondary;
  font-weight: bold;
  margin-bottom: 8px;
}

.header-subtitle {
  font-size: 1.25rem;
  color: white;
}

// Sección introducción
.introduction-section {
  padding: 48px 24px;
}

.intro-image {
  height: 540px;
  width: 100%;
}

.intro-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.intro-button {
  background-color: $secondary;
  margin-top: 16px;
}

// Sección objetivo
.objective-section {
  padding: 48px 24px;
}

.objective-title {
  font-weight: bold;
  font-size: 2.125rem;
  margin-top: 24px;
  color: $secondary;
}

.objective-content {
  margin-top: 16px;
}

// Sección beneficios
.benefits-section {
  padding: 48px 24px;
}

.benefits-title {
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 48px;
  color: #61c2d7;
}

.benefits-button-container {
  margin-top: 24px;
}

.benefits-button {
  background-color: $secondary;
  font-weight: bold;
}

// Sección aplicaciones estáticas
.applications-static-section {
  padding: 48px 24px;
}

.applications-title {
  font-size: 2.125rem;
  text-align: center;
  margin-bottom: 48px;
  font-weight: bold;
  color: $secondary;
}

// Sección artículos
.articles-section {
  padding: 48px 24px;
}

.articles-title {
  font-size: 2.125rem;
  text-align: center;
  margin-bottom: 48px;
  margin-top: 24px;
  font-weight: bold;
  color: $secondary;
}

.articles-more-container {
  display: flex;
  align-items: center;
}

.articles-more-button {
  background-color: $secondary;
  width: 100%;
  max-width: 320px;
  min-height: 72px;
}

// Sección aplicaciones dinámicas
.applications-dynamic-section {
  padding: 48px 24px;
}

.applications-dynamic-title {
  font-size: 2.125rem;
  text-align: center;
  margin-bottom: 48px;
  font-weight: bold;
  color: $secondary;
}

// Sección divulgación
.divulgation-section {
  padding: 48px 24px;
}

.divulgation-title {
  font-size: 2.125rem;
  text-align: center;
  margin-bottom: 48px;
  font-weight: bold;
  color: $secondary;
}

// Sección disciplinas
.disciplines-section {
  padding: 48px 24px;
}

.disciplines-title {
  font-size: 2.125rem;
  text-align: center;
  margin-bottom: 48px;
  font-weight: bold;
  color: $secondary;
}

.disciplines-image-container {
  display: flex;
  justify-content: center;
}

.disciplines-image {
  height: 350px;
  width: 470px;
}

// Sección equipo
.team-section {
  padding: 48px 24px;
}

.team-title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 48px;
  font-weight: bold;
  color: $secondary;
}

// Clase helper para componentes con altura completa
.full-height {
  height: 100%;
}

.full-width {
  width: 100%;
}

// Separadores entre secciones
section {
  border-bottom: 1px solid rgba(97, 194, 215, 0.1);

  &:last-child {
    border-bottom: none;
  }
}

// Efectos hover para tarjetas
.q-card {
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .header-title {
    font-size: 1.75rem;
  }

  .header-subtitle {
    font-size: 1rem;
  }

  .intro-image {
    height: 300px;
  }

  .disciplines-image {
    height: 250px;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .q-pa-xl {
    padding: 24px 16px;
  }

  .header-section {
    padding: 24px 16px;
  }

  .applications-title,
  .articles-title,
  .applications-dynamic-title,
  .divulgation-title,
  .disciplines-title {
    font-size: 1.75rem;
  }

  .objective-title {
    font-size: 1.75rem;
  }
}
</style>
