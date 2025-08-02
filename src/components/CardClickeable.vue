<template>
  <q-card flat bordered class="card-clickeable" @click="ir">
    <q-img :src="img" ratio="16/9" class="card-img" />
    <q-card-section class="flex card-label card-label-container">
      <q-btn flat class="text-h6 primer-mayuscula card-button" :to="to">
        {{ label }}
      </q-btn>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  label: String,
  img: String,
  to: String
})

const router = useRouter()
const ir = () => {
  if (props.to) router.push(props.to)
}
</script>

<style scoped lang="scss">
.card-clickeable {
  width: 240px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: var(--radius);
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.card-clickeable:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  border-color: $secondary;
}

.card-img {
  border-top-left-radius: var(--radius);
  border-top-right-radius: var(--radius);
  height: 220px;
  object-fit: cover;
}

.card-label {
  text-align: center;
  font-weight: 500;
  font-size: 1.05rem;
  padding: 12px 8px;
}

// Estilos migrados desde inline
.card-label-container {
  min-height: 80px;
}

.card-button {
  width: 100%;
}
</style>
