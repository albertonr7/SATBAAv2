<template>
  <q-card flat bordered class="content-card">
    <q-card-section>
      <div class="content-header">
        <q-icon :name="icon" size="24px" color="primary" />
        <h3 class="content-title">{{ title }}</h3>
      </div>

      <div class="content-body" v-html="content"></div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
// Variables
$border-radius: 4px;
$transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

.content-card {
  background: white;
  border-radius: $border-radius;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: $transition;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }
}

.content-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.content-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--q-primary);
}

.content-body {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.87);

  :deep(p) {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(ul),
  :deep(ol) {
    margin: 16px 0;
    padding-left: 24px;

    li {
      margin-bottom: 8px;
    }
  }

  :deep(strong) {
    font-weight: 600;
    color: var(--q-primary);
  }
}
</style>
