<template>
    <q-card class="q-ma-md q-pa-md shadow-2 rounded-borders" style="max-width: 450px; min-width: 300px; width: 100%">
        <q-card-section class="q-pb-none">
            <div class="text-h6">{{ nombre }}</div>
            <div class="text-primary text-subtitle2 q-mb-sm">{{ rol }}</div>
            <q-separator />
        </q-card-section>

        <q-card-section>
            <div class="text-body2 text-justify">
                {{ descripcion }}
            </div>
        </q-card-section>

        <q-card-actions align="right">
            <q-btn flat dense color="primary" label="Leer más" @click="onLeerMas" />
        </q-card-actions>
    </q-card>
</template>

<script setup>
defineProps({
    nombre: String,
    rol: String,
    descripcion: String
})

const onLeerMas = () => {
    // Aquí puedes lanzar un diálogo, redirigir o mostrar más info
    console.log("Leer más clickeado");
};
</script>

<style scoped>
.rounded-borders {
    border-radius: 4px;
}
</style>