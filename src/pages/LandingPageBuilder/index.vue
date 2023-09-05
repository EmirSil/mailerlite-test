<script setup lang="ts">
import DraggableImage from './components/DraggableImage.vue';
import DraggableText from './components/DraggableText.vue';
</script>

<template>
    <div class="container">
        <DraggableImage />
        <DraggableText />
    </div>
</template>
<style scoped>
.container {
    height: calc(100vh - 16px);
    position: relative;
    margin: 8px;
}
</style>