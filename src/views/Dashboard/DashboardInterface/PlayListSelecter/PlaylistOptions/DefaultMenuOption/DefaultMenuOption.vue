<template>
    <button class="flex items-center gap-5 px-5 text-sm py-3 rounded-t text-dominant" :class="{'text-gray-200 hover:text-white': !props.active}">
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
import {defineProps} from "vue"

interface Props {
    active?: boolean
}

const props = defineProps<Props>()
</script>
