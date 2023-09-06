<script setup>
import { ref, watch, onMounted } from "vue";
import VueResizable from "vue-resizable";
import { Modal } from 'usemodal-vue3';
import DraggableActionMenu from './DraggableActionMenu.vue';

const isEditMode = ref(false);
const emit = defineEmits(['onClone', 'onDelete', 'onEdit', 'mousedown']);
const okButtonConfig = ref({ text: 'Select', onclick: onSaveSelectedImage });

function onCloneClick() {
    emit('onClone', { type: "image", value: tempImage.value, width: tempWidth.value, height: tempHeight.value, top: tempTop.value + 20, left: tempLeft.value + 20 });
}
function onEditClick() {
    selectedItem.value = tempImage.value;
    isEditMode.value = !isEditMode.value;
}
function onDeleteClick() {
    emit('onDelete', props.id);
}

const props = defineProps({
    height: Number,
    width: Number,
    top: Number,
    left: Number,
    image: String,
    id: Number,
    images: Array[String],
    interacted: Boolean
})
watch(() => [props.height, props.width, props.top, props.left, props.image], () => {
    tempHeight.value = props.height
    tempWidth.value = props.width
    tempTop.value = props.top
    tempLeft.value = props.left
    tempImage.value = props.image
});
onMounted(() => {
    tempHeight.value = props.height
    tempWidth.value = props.width
    tempTop.value = props.top
    tempLeft.value = props.left
    tempImage.value = props.image
});
const tempHeight = ref(0);
const tempWidth = ref(0);
const tempTop = ref(0);
const tempLeft = ref(0);
const tempImage = ref("");
const selectedItem = ref("");

function onSaveSelectedImage() {
    tempImage.value = selectedItem.value;
    emit('onEdit', { id: props.id, type: "image", value: tempImage.value });
    isEditMode.value = false;
}
function onSelectImage(image) {
    selectedItem.value = image;
}
function resizeHandler(data) {
    tempWidth.value = data.width;
    tempHeight.value = data.height;
    emit('onEdit', { id: props.id, type: "image", width: tempWidth.value, height: tempHeight.value });
}
function dragHandler(data) {
    tempLeft.value = data.left;
    tempTop.value = data.top;
    emit('onEdit', { id: props.id, type: "image", top: tempTop.value, left: tempLeft.value });
}
</script>

<template>
    <vue-resizable @mousedown="emit('mousedown')" class="draggable-wrapper" :width="tempWidth" :height="tempHeight"
        :top="tempTop" :left="tempLeft" dragSelector=".draggable-text-wrapper" :fit-parent="true"
        @resize:start="resizeHandler" @resize:end="resizeHandler" @drag:start="dragHandler" @drag:end="dragHandler">
        <div class="draggable-text-wrapper" :style="`background: url(${tempImage}); background-size: cover; background-position: center; background-repeat: no-repeat;
`">
            <DraggableActionMenu :interacted="interacted" @onEdit="onEditClick" @onDelete="onDeleteClick"
                @onClone="onCloneClick" />
        </div>
        <Modal v-model:visible="isEditMode" :okButton="okButtonConfig">
            <div class="container">
                <div class="item" @click="onSelectImage(i)" :class="{ 'selected-item': selectedItem === i }"
                    v-for="i in images" :key="i" :style="`background-image: url(${i});`">
                </div>
            </div>
        </Modal>
    </vue-resizable>
</template>
<style scoped>
.item {
    width: 45%;
    height: 250px;
    background-size: cover;
    background-position: center;
    margin-bottom: 10px;
    border: 4px solid transparent;

}

.selected-item {
    border: 4px solid blue;
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}


.draggable-wrapper {
    position: absolute !important;
    border: 10px solid transparent;
}

.draggable-text-wrapper {
    height: -webkit-fill-available;
    display: flex;
    border: 10px solid transparent;

}
</style>