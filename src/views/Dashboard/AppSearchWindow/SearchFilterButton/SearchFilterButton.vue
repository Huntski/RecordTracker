<template>
    <button
        class="filter-button flex items-center justify-center px-4 py-2 gap-3 text-xs rounded active:bg-gray-800"
        :class="activeStyling"
        @click="handleClickEvent"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
    props: {
        selectedFilter: {
            type: String,
            required: false
        },

        filter: {
            type: String,
            required: false
        }
    },

    computed: {
        activeStyling() {
            if (this.selectedFilter === this.filter) {
                return 'bg-filter-button-active text-black';
            }

            return 'bg-filter-button-passive text-gray-200'
        }
    },

    methods: {
        handleClickEvent() {
            if (this.selectedFilter === this.filter) {
                return this.$emit('update:selectedFilter', '')
            }

            this.$emit('update:selectedFilter', this.filter)
        }
    }
})
</script>

<style>
.filter-button {
    transition: background 100ms;
}

.filter-button img,
.filter-button svg {
    @apply h-3.5;
}
</style>
