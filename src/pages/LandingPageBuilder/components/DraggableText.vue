<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import VueResizable from "vue-resizable";
import DraggableActionMenu from './DraggableActionMenu.vue';

const emit = defineEmits(['onClone', 'onDelete', 'onEdit', 'mousedown']);

const props = defineProps({
    height: Number,
    width: Number,
    top: Number,
    left: Number,
    text: String,
    id: Number,
    interacted: Boolean
})

onMounted(() => {
    tempHeight.value = props.height
    tempWidth.value = props.width
    tempTop.value = props.top
    tempLeft.value = props.left
    tempText.value = props.text
});

watch(() => [props.height, props.width, props.top, props.left, props.text], () => {
    tempHeight.value = props.height
    tempWidth.value = props.width
    tempTop.value = props.top
    tempLeft.value = props.left
    tempText.value = props.text
});

const isEditMode = ref(false);
const tempWidth = ref(500);
const tempHeight = ref(200);
const tempLeft = ref(0);
const tempTop = ref(0);
const tempText = ref("");
const dragSelector = ref(".draggable-text-wrapper");
const textarea = ref(null);
function onCloneClick() {
    emit('onClone', { type: "text", value: tempText.value, width: tempWidth.value, height: tempHeight.value, top: tempTop.value + 50, left: tempLeft.value + 50 });
}
function onEditClick() {
    isEditMode.value = !isEditMode.value;
    dragSelector.value = isEditMode.value ? null : ".draggable-text-wrapper";
    nextTick(() => {
        textarea.value.focus();
    });
    emit('onEdit', { id: props.id, type: "text", value: tempText.value });

}
function onDeleteClick() {
    emit('onDelete', props.id);
}

function resizeHandler(data) {
    tempWidth.value = data.width;
    tempHeight.value = data.height;
    emit('onEdit', { id: props.id, type: "text", width: tempWidth.value, height: tempHeight.value });
}
function dragHandler(data) {
    tempLeft.value = data.left;
    tempTop.value = data.top;
    emit('onEdit', { id: props.id, type: "text", top: tempTop.value, left: tempLeft.value });
}
</script>

<template>
    <vue-resizable class="draggable-wrapper" @mousedown="emit('mousedown')" :width="tempWidth" :height="tempHeight"
        :top="tempTop" :left="tempLeft" :dragSelector="dragSelector" :fit-parent="true" @resize:start="resizeHandler"
        @resize:end="resizeHandler" @drag:start="dragHandler" @drag:end="dragHandler">
        <div class="draggable-text-wrapper">
            <div v-show="!isEditMode" class="text-styling">{{ tempText }}</div>
            <textarea ref="textarea" v-show="isEditMode" class="text-styling" v-model="tempText"></textarea>
            <DraggableActionMenu :textInEditMode="isEditMode" type="text" :interacted="interacted" @onEdit="onEditClick"
                @onDelete="onDeleteClick" @onClone="onCloneClick" />
        </div>
    </vue-resizable>
</template>
<style scoped>
.draggable-wrapper {
    position: absolute !important;
}

.draggable-text-wrapper {
    height: 100%;
    display: flex;
}

.text-styling {
    font-size: 20px;
    font-family: "Arial";
    font-weight: 400;
    padding: 0;
    width: 100%;
    white-space: pre-wrap;
    overflow: auto;
    height: 100%;
    background: transparent;
}
</style>