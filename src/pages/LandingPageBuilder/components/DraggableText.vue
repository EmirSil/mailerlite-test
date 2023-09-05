<script setup lang="ts">
import { ref } from "vue";
import VueResizable from "vue-resizable";
const isEditMode = ref(false);
const textValue = ref("Draggable text component");
function onEditClick() {
    isEditMode.value = !isEditMode.value;
}
function onDeleteClick() {
    console.log("Deleted!");
}
</script>

<template>
    <vue-resizable>
        <div class="draggable-text-wrapper">
            <div v-if="!isEditMode" class="text-styling" v-html="textValue"></div>
            <textarea v-else class="text-styling" v-model="textValue"></textarea>
            <font-awesome-icon @click="onEditClick" class="cursor-pointer position-absolute edit"
                icon="fa-solid fa-pencil" />
            <font-awesome-icon @click="onDeleteClick" class="cursor-pointer position-absolute trash"
                icon="fa-solid fa-trash" />
        </div>
    </vue-resizable>
</template>
<style lang="scss" scoped>
.draggable-text-wrapper {
    height: 100%;
    background-color: aqua;

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

    .edit {
        right: 40px
    }

    .trash {
        right: 8px;
        color: red;
    }
}
</style>