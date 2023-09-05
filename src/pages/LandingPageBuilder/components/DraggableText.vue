<script setup>
import { ref, watch, onMounted } from "vue";
import VueResizable from "vue-resizable";

const props = defineProps({
    height: Number,
    width: Number,
    top: Number,
    left: Number,
    text: String
})

watch(props.height, () => {
    tempHeight.value = props.height
});
watch(props.width, () => {
    tempWidth.value = props.width
})
watch(props.top, () => {
    tempTop.value = props.top
});
watch(props.left, () => {
    tempLeft.value = props.left
})
watch(props.text, () => {
    tempText.value = props.text
})
onMounted(() => {
    tempHeight.value = props.height
    tempWidth.value = props.width
    tempTop.value = props.top
    tempLeft.value = props.left
    tempText.value = props.text
});

const isEditMode = ref(false);
const textValue = ref(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut accumsan nisi. Fusce ullamcorper posuere risus, at molestie quam scelerisque et. Aenean ac vestibulum leo. Duis sollicitudin leo in leo viverra, nec laoreet mauris pretium. Duis pulvinar justo lacus, nec hendrerit massa posuere non. In a dignissim erat, quis dictum libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
Aenean non egestas mi, a luctus mauris. Aenean placerat mi ac lacinia iaculis. Sed venenatis metus vitae lectus interdum, at auctor neque mollis. Vivamus vel velit dapibus, auctor mi tristique, sollicitudin neque. Nulla venenatis dui ut dolor rutrum pharetra. Phasellus auctor ante finibus lorem volutpat fringilla. Praesent ac nunc egestas, pulvinar lacus eget, condimentum purus. Suspendisse et leo quis lacus finibus facilisis quis sit amet urna. Etiam ut lacus sit amet dui congue euismod eget non ligula.
Etiam sed risus at massa euismod vehicula vel malesuada ligula. Sed vestibulum ante vel ante viverra tempor. Vivamus suscipit eleifend ligula. Duis purus elit, dignissim sit amet auctor a, dictum non elit. Donec in vehicula nunc. Sed quis molestie quam, ut volutpat quam. Integer sapien ipsum, suscipit ac magna id, volutpat bibendum lacus. Suspendisse semper augue a ultricies sagittis. Aenean egestas diam interdum, tristique turpis ut, elementum tortor.`);
const tempWidth = ref(500);
const tempHeight = ref(200);
const tempLeft = ref(0);
const tempTop = ref(0);
const tempText = ref("");
function onEditClick() {
    isEditMode.value = !isEditMode.value;
}
function onDeleteClick() {
    console.log("Deleted!");
}
function eHandler(data) {
    tempWidth.value = data.width;
    tempHeight.value = data.height;
    tempLeft.value = data.left;
    tempTop.value = data.top;
}
</script>

<template>
    <vue-resizable class="draggable-wrapper" :width="tempWidth" :height="tempHeight" dragSelector=".draggable-text-wrapper"
        :fit-parent="true" @mount="eHandler" @resize:move="eHandler" @resize:start="eHandler" @resize:end="eHandler"
        @drag:move="eHandler" @drag:start="eHandler" @drag:end="eHandler">
        <div class="draggable-text-wrapper">
            <div v-if="!isEditMode" class="text-styling" v-html="tempText"></div>
            <textarea v-else class="text-styling" v-model="tempText"></textarea>
            <!--
            <font-awesome-icon @click="onEditClick" class="cursor-pointer position-absolute clone"
                icon="fa-solid fa-clone" />
            <font-awesome-icon @click="onEditClick" class="cursor-pointer position-absolute edit"
                icon="fa-solid fa-pencil" />
            <font-awesome-icon @click="onDeleteClick" class="cursor-pointer position-absolute trash"
                icon="fa-solid fa-trash" />
                -->
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