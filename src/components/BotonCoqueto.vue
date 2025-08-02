<template>
    <q-btn :label="label" :to="to" no-caps flat class="boton-coqueto" />
</template>

<script setup>
defineProps({
    label: String,
    to: String
})
</script>

<style scoped lang="scss">
.boton-coqueto {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75em 1.5em;
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    background-color: $secondary;
    border-radius: var(--radius);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.boton-coqueto:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
}

.boton-coqueto:focus {
    outline: none;
}
</style>