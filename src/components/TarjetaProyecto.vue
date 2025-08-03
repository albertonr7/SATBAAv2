<template>
  <q-card flat bordered class="full-height flex column">
    <q-card-section class="column items-center q-gutter-sm q-py-md">
      <q-avatar size="80px">
        <template v-if="proyecto.resumen.logo">
          <img :src="proyecto.resumen.logo" :alt="proyecto.resumen.titulo" />
        </template>
        <template v-else>
          <q-icon :name="proyecto.resumen.icono || 'mdi-application'" :color="proyecto.resumen.color" size="48px" />
        </template>
      </q-avatar>

      <div class="text-h6 text-bold text-center">{{ proyecto.resumen.titulo }}</div>
      <div class="text-body2 text-justify">{{ proyecto.resumen.descripcion }}</div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="center" class="bg-grey-1 q-mt-auto">
      <q-btn @click="navigateToProject" color="primary" no-caps flat>
        Ver más
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  proyecto: {
    type: Object,
    required: true
  }
});

const navigateToProject = async () => {
  try {
    // Navegación con promise para manejar errores
    await router.push(`/Proyecto/${props.proyecto.slug}`)
  } catch (error) {
    console.error('Navigation failed:', error)
    // Fallback con window.location si router falla
    window.location.href = `/Proyecto/${props.proyecto.slug}`
  }
}
</script>
