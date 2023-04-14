<template>
    <button
        class="w-10 pointer-events-none bg-gray-600 hover:bg-gray-700 text-gray-300 rounded aspect-square cursor-pointer text-white"
        :class="{'text-white pointer-events-all hidden' : !clickable}"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import {defineProps} from "vue"

defineProps<{clickable: boolean}>()
</script>
