<script setup>
import { ref } from "vue";

const emit = defineEmits(['onClone', 'onDelete', 'onEdit']);
const hoveredIcon = ref('');
const actionItems = ref([
    { name: 'clone', action: onCloneClick, icon: 'fa-solid fa-clone', text: 'Clone' },
    { name: 'edit', action: onEditClick, icon: 'fa-solid fa-pencil', text: 'Edit' },
    { name: 'delete', action: onDeleteClick, icon: 'fa-solid fa-trash', text: 'Delete' },
])
function onIconHover(icon) {
    hoveredIcon.value = icon;
}
function onCloneClick() {
    emit('onClone');
}
function onEditClick() {
    emit('onEdit');
}
function onDeleteClick() {
    emit('onDelete');
}

const props = defineProps({
    interacted: Boolean
});
</script>

<template>
    <transition name="fade">
        <div v-if="interacted" class="action-menu-wrapper">
            <div v-for="item in actionItems" :key="item.name" @mouseenter="onIconHover(item.name)"
                @mouseleave="onIconHover('')" class="action-item-wrapper">
                <font-awesome-icon @click="item.action" :icon="item.icon" />
                <transition name="fade">
                    <span v-show="hoveredIcon == item.name" class="action-item-text">{{ item.text }}</span>
                </transition>
            </div>
        </div>
    </transition>
</template>
<style scoped>
.action-menu-wrapper {
    width: 100px;
    position: absolute;
    right: -120px;
    top: 8px;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.action-item-wrapper {
    display: flex;
    cursor: pointer;
    margin-bottom: 8px;
    height: 16px;
}

.action-item-text {
    margin-left: 4px;
}
</style>