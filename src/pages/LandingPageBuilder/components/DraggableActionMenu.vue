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
    interacted: Boolean,
    type: String,
    textInEditMode: Boolean
});
</script>

<template>
    <div>

        <transition name="fade">
            <div v-if="interacted && !textInEditMode" class="action-menu-wrapper"
                :class="{ 'text-action-menu-wrapper': props.type === 'text' }">
                <div v-for="item in actionItems" :key="item.name" @mouseenter="onIconHover(item.name)"
                    @mouseleave="onIconHover('')" @click="item.action" class="action-item-wrapper"
                    :class="{ 'text-action-item-wrapper': props.type === 'text' }">
                    <font-awesome-icon :icon="item.icon" class="action-item-icon"
                        :class="{ 'text-action-item-icon': props.type === 'text' }" />
                </div>
            </div>
        </transition>

        <transition name="fade">

            <div v-if="textInEditMode" class="action-menu-wrapper"
                :class="{ 'text-action-menu-wrapper': props.type === 'text' }">
                <div @click="onEditClick" class="action-item-wrapper"
                    :class="{ 'text-action-item-wrapper': props.type === 'text' }">
                    <font-awesome-icon icon="fa fa-save" class="action-item-icon"
                        :class="{ 'text-action-item-icon': props.type === 'text' }" />
                    <span style="margin-left: 4px;">Save!</span>
                </div>
            </div>
        </transition>
    </div>
</template>
<style scoped>
.action-menu-wrapper {
    position: absolute;
    right: 8px;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
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

.action-item-icon {
    color: white;
}

.text-action-menu-wrapper {
    position: absolute;
    right: 8px;
    bottom: 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    bottom: -22px;
}

.text-action-item-wrapper {
    display: flex;
    cursor: pointer;
    margin-bottom: 0;
    margin-left: 8px;
}

.text-action-item-icon {
    color: black;
}
</style>