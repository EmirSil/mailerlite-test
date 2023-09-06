<script setup>
import DraggableImage from './components/DraggableImage.vue';
import DraggableText from './components/DraggableText.vue';
import { ref, onMounted } from "vue";

const draggableData = ref(null);
const images = ref(["https://dummyimage.com/250x250/000/fff", "https://dummyimage.com/250x250/fff/000", "https://dummyimage.com/100x100/000/fff", "https://dummyimage.com/100x100/fff/000"]);

function onSave() {
    const dataJson = JSON.stringify(draggableData.value);
}
function onClone(data) {
    const maxId = draggableData.value.reduce((arr, oId) => {
        return (arr = arr > oId.id ? arr : oId.id);
    });
    data.id = maxId + 1;
    draggableData.value.push(data);
}
function onDelete(id) {
    const index = draggableData.value.findIndex(x => x.id === id);
    draggableData.value.splice(index, 1);
}

onMounted(() => {
    draggableData.value = [{
        id: 0,
        type: "text",
        top: 0,
        left: 0,
        width: 200,
        height: 200,
        value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut accumsan nisi. Fusce ullamcorper posuere risus, at molestie quam scelerisque et.`
    },
    {
        id: 1,
        type: "image",
        top: 100,
        left: 100,
        width: 250,
        height: 250,
        value: `https://dummyimage.com/250x250/000/fff`
    }]
})
</script>

<template>
    <div class="container">
        <component @onClone="onClone" @onDelete="onDelete" :is="block.type === 'text' ? DraggableText : DraggableImage"
            v-for="block in draggableData" :key="block.id" :height="block.height" :width="block.width" :top="block.top"
            :left="block.left" :text="block.value" :id="block.id" :image="block.value" :images="images"></component>
        <button @click="onSave">Save</button>
    </div>
</template>
<style scoped>
.container {
    height: calc(100vh - 16px);
    position: relative;
    margin: 8px;
}
</style>