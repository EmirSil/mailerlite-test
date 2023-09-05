<script setup>
import { ref, watch, onMounted } from "vue";
import VueResizable from "vue-resizable";
const emit = defineEmits(['onClone', 'onDelete', 'onEdit']);

const props = defineProps({
    height: Number,
    width: Number,
    top: Number,
    left: Number,
    text: String,
    id: Number
})

onMounted(() => {
    tempHeight.value = props.height
    tempWidth.value = props.width
    tempTop.value = props.top
    tempLeft.value = props.left
    tempText.value = props.text
});

watch(() => props.height, () => {
    tempHeight.value = props.height
});
watch(() => props.width, () => {
    tempWidth.value = props.width
})
watch(() => props.top, () => {
    tempTop.value = props.top
});
watch(() => props.left, () => {
    tempLeft.value = props.left
})
watch(() => props.text, () => {
    tempText.value = props.text
})

const isEditMode = ref(false);
const tempWidth = ref(500);
const tempHeight = ref(200);
const tempLeft = ref(0);
const tempTop = ref(0);
const tempText = ref("");
const dragSelector = ref(".draggable-text-wrapper");
function onCloneClick() {
    emit('onClone', { type: "text", value: "lmao", width: tempWidth.value, height: tempHeight.value, top: tempTop.value + 20, left: tempLeft.value + 20 });
}
function onEditClick() {
    isEditMode.value = !isEditMode.value;
    dragSelector.value = isEditMode.value ? null : ".draggable-text-wrapper";
}
function onDeleteClick() {
    emit('onDelete', props.id);
}
function eHandler(data) {
    tempWidth.value = data.width;
    tempHeight.value = data.height;
    tempLeft.value = data.left;
    tempTop.value = data.top;
    emit('onEdit', { id: props.id, type: "text", value: tempText.value, width: tempWidth.value, height: tempHeight.value, top: tempTop.value, left: tempLeft.value });
}

</script>

<template>
    <vue-resizable class="draggable-wrapper" :width="tempWidth" :height="tempHeight" :top="tempTop" :left="tempLeft"
        :dragSelector="dragSelector" :fit-parent="true" @mount="eHandler" @resize:move="eHandler" @resize:start="eHandler"
        @resize:end="eHandler" @drag:move="eHandler" @drag:start="eHandler" @drag:end="eHandler">
        <div class="draggable-text-wrapper">
            <div v-show="!isEditMode" class="text-styling" v-html="tempText"></div>
            <textarea v-show="isEditMode" class="text-styling" v-model="tempText"></textarea>
            <div
                style="position: absolute; right: -50px; display: flex; flex-direction: column; justify-content: center; height: 100%;">
                <font-awesome-icon @click="onCloneClick" icon="fa-solid fa-clone" style="margin-bottom: 8px;" />
                <font-awesome-icon @click="onEditClick" icon="fa-solid fa-pencil" style="margin-bottom: 8px;" />
                <font-awesome-icon @click="onDeleteClick" icon="fa-solid fa-trash" style="margin-bottom: 8px;" />
            </div>
        </div>
    </vue-resizable>
</template>
<style scoped>
.draggable-wrapper {
    position: absolute !important;
    border: 4px dashed #dedede;
}

.draggable-text-wrapper {
    height: 100%;
    display: flex;
}

.text-styling {
    font-size: 14px;
    font-family: "Arial";
    font-weight: 400;
    padding: 0;
    width: 100%;
    white-space: pre-wrap;
    overflow: auto;
    height: 100%;
}

.cursor-pointer {
    cursor: pointer;
}

.position-absolute {
    position: absolute;
    top: 8px;
    right: 0;
}

.clone {
    right: 70px
}

.edit {
    right: 40px
}

.trash {
    right: 8px;
    color: red;
}
</style>