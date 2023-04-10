<template>
    <div class="min-w-[200px] flex">
        <span class="w-1/3 text-gray-400">{{ props.column }}</span>
        <div class="w-full">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue"

const props = defineProps<{ column: string }>()
</script>
