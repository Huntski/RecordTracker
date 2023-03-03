<template>
    <div
        class="base-field relative flex items-center text-white bg-primary-button-bg p-1.5 rounded-2xl border-primary-button-border border-8 active:border-green-400"
        :class="{'rounded-full' : rounded}"
    >
        <div class="content rounded relative w-full" :class="{'rounded-full' : rounded}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        rounded: {
            type: Boolean,
            required: false
        }
    }
}
</script>

<style scoped>
.base-field:hover .content {
    background-image: radial-gradient(farthest-corner at 100% 40px, #333333, #181818);
}

.content {
    background-image: radial-gradient(farthest-corner at 100% 40px, #333333, #252525);
    transition: all 1s ease-out;
}
</style>
