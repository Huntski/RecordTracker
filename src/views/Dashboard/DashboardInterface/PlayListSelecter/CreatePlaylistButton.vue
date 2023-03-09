<template>
    <button class="relative flex items-center gap-5 text-sm bg-close-button-bg px-5 py-3 opacity-70 hover:opacity-100">
        <PlusIcon class="w-4" />

        <span>New Playlist</span>

        <div class="w-4" />
    </button>
</template>

<script>
import {PlusIcon} from "@/components/@icons"

export default {
    components: {PlusIcon}
}
</script>

<style scoped>
button:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 3px 20px #00000025 inset;
}
</style>
