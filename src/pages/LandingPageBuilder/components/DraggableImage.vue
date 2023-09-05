<script setup>
import { onMounted, ref } from "vue";
import VueResizable from "vue-resizable";
const isEditMode = ref(false);
const textValue = ref("Draggable text component");
const width = ref(500);
const height = ref(200);
const left = ref(0);
const top = ref(0);
function onEditClick() {
    isEditMode.value = !isEditMode.value;
}
function onDeleteClick() {
    console.log("Deleted!");
}
function eHandler(data) {
    width.value = data.width;
    height.value = data.height;
    left.value = data.left;
    top.value = data.top;
}
</script>

<template>
    <vue-resizable class="draggable-wrapper" :width="250" :height="250" dragSelector=".draggable-text-wrapper"
        :fit-parent="true" @mount="eHandler" @resize:move="eHandler" @resize:start="eHandler" @resize:end="eHandler"
        @drag:move="eHandler" @drag:start="eHandler" @drag:end="eHandler">
        <div class="draggable-text-wrapper"
            style="background: url('https://dummyimage.com/250x250/000/fff'); background-size: cover; background-position: center;">
        </div>
    </vue-resizable>
</template>
<style scoped>
.draggable-wrapper {
    position: absolute !important;
}

.draggable-text-wrapper {
    height: 100%;
}

.text-styling {
    font-size: 14px;
    font-family: "Arial";
    font-weight: 400;
    padding: 0;
    width: 100%;
    white-space: pre;
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