<script setup lang="ts">
const props = defineProps<{ count: number }>();
</script>

<template>
    <BBadge class="fs-3" variant="danger">
        💣
        {{ props.count }}
    </BBadge>
</template>