<template>
    <button class="text-xs flex items-center justify-between gap-3 px-3 pt-2 py-1.5 rounded opacity-70 hover:opacity-100">
        <PlusIcon class="w-2.5" />

        <span>New Playlist</span>

        <div class="w-2.5" />
    </button>
</template>

<script>
import {PlusIcon} from "@/components/@icons"

export default {
    components: {PlusIcon}
}
</script>
