<template>
    <button
        class="filter-button flex items-center justify-center px-4 py-2 gap-3 text-xs rounded active:bg-gray-800"
        :class="activeStyling"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            required: false
        }
    },

    computed: {
        activeStyling() {
            if (this.active) {
                return 'bg-filter-button-active text-black';
            }

            return 'bg-filter-button-passive text-gray-200'
        }
    }
}
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
