<script setup>
import DraggableImage from './components/DraggableImage.vue';
import DraggableText from './components/DraggableText.vue';
import { ref, onMounted } from "vue";
import FirstImage from "../../assets/dog.jpg";
import SecondImage from "../../assets/hacker.jpg";
import ThirdImage from "../../assets/happy.jpg";
import FourthImage from "../../assets/landscape.jpeg";

const draggableData = ref(null);
const images = ref([FirstImage, SecondImage, ThirdImage, FourthImage]);
const interactedDraggable = ref({});

function onDraggableInteraction(draggable) {
    interactedDraggable.value = draggable;
    draggableData.value = draggableData.value.filter(item => item.id !== draggable.id);
    draggableData.value.push(draggable);
}
function onSave() {
    const dataJson = JSON.stringify(draggableData.value);
    console.log(dataJson);
}
function onEdit(data) {
    const index = draggableData.value.findIndex(x => x.id === data.id);
    if (index > -1) {
        draggableData.value[index].top = data.top || data.top === 0 ? data.top : draggableData.value[index].top;
        draggableData.value[index].left = data.left || data.left === 0 ? data.left : draggableData.value[index].left;
        draggableData.value[index].width = data.width || data.width === 0 ? data.width : draggableData.value[index].width;
        draggableData.value[index].height = data.height || data.height === 0 ? data.height : draggableData.value[index].height;
        draggableData.value[index].value = data.value ? data.value : draggableData.value[index].value;

    }
}
function onClone(data) {
    const maxId = Math.max(...draggableData.value.map(o => o.id))
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
        left: 260,
        width: 500,
        height: 120,
        value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut accumsan nisi. Fusce ullamcorper posuere risus, at molestie quam scelerisque et.`
    },
    {
        id: 1,
        type: "image",
        top: 0,
        left: 0,
        width: 250,
        height: 250,
        value: FirstImage
    }]
})
</script>

<template>
    <div class="container">
        <component v-for="block in draggableData" :key="block.id" :interacted="interactedDraggable.id === block.id"
            class="draggable-block" :class="{ 'interacted': interactedDraggable.id === block.id }"
            @mousedown="onDraggableInteraction(block)" @onClone="onClone" @onDelete="onDelete" @onEdit="onEdit"
            :is="block.type === 'text' ? DraggableText : DraggableImage" :height="block.height" :width="block.width"
            :top="block.top" :left="block.left" :text="block.value" :id="block.id" :image="block.value" :images="images">
        </component>
        <div class="fab-save-button" @click="onSave">
            <font-awesome-icon icon="fa fa-save" class="save-icon" />
        </div>
    </div>
</template>
<style scoped>
.container {
    height: calc(100vh - 16px);
    position: relative;
    margin: 8px;
    overflow: hidden;
}


.draggable-block {
    border: 1px solid transparent;
}

.interacted {
    border: 1px solid blue;
}

.fab-save-button {
    background-color: green;
    width: 40px;
    height: 40px;
    border-radius: 10000px;
    position: absolute;
    bottom: 8px;
    right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.fab-save-button:hover {
    scale: 1.1;
}

.save-icon {
    color: white;
}
</style>