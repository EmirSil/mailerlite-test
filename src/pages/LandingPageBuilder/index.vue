<script setup lang="ts">
import DraggableImage from './components/DraggableImage.vue';
import DraggableText from './components/DraggableText.vue';
import { ref, onMounted } from "vue";

const draggableData = ref(null);
onMounted(() => {
    draggableData.value = [{
        type: "text",
        top: 0,
        left: 0,
        width: 200,
        height: 200,
        value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut accumsan nisi. Fusce ullamcorper posuere risus, at molestie quam scelerisque et. Aenean ac vestibulum leo. Duis sollicitudin leo in leo viverra, nec laoreet mauris pretium. Duis pulvinar justo lacus, nec hendrerit massa posuere non. In a dignissim erat, quis dictum libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
Aenean non egestas mi, a luctus mauris. Aenean placerat mi ac lacinia iaculis. Sed venenatis metus vitae lectus interdum, at auctor neque mollis. Vivamus vel velit dapibus, auctor mi tristique, sollicitudin neque. Nulla venenatis dui ut dolor rutrum pharetra. Phasellus auctor ante finibus lorem volutpat fringilla. Praesent ac nunc egestas, pulvinar lacus eget, condimentum purus. Suspendisse et leo quis lacus finibus facilisis quis sit amet urna. Etiam ut lacus sit amet dui congue euismod eget non ligula.
Etiam sed risus at`},
    {
        type: "image",
        top: 0,
        left: 0,
        width: 250,
        height: 250,
        value: `https://dummyimage.com/250x250/000/fff`
    }]
})
</script>

<template>
    <div class="container">
        <component :is="block.type === 'text' ? DraggableText : DraggableImage" v-for="block in draggableData"
            :key="block.value" :height="block.height" :width="block.width" :top="block.top" :left="block.left"
            :text="block.value" :image="block.value"></component>
    </div>
</template>
<style scoped>
.container {
    height: calc(100vh - 16px);
    position: relative;
    margin: 8px;
}
</style>