<template>
    <div>
        <h2 class="px-5 text-xl pb-5">TrackList</h2>

        <div class="table-list rounded-lg text-xs overflow-y-scroll base-scrollbar shadow-lg border border-black 2xl:max-h-80">
            <div v-for="(track, index) in tracks"
                 :key="track.id"
                 class="track flex items-center ml-5 py-3 border-b border-solid border-gray-700"
                 :class="{'border-b' : index !== tracks.length-1}"
            >
                <span class="w-10 text-gray-300">{{track.position}}</span>
                <span class="ml-5">{{track.title}}</span>
                <span class="ml-auto pr-5 text-gray-300">{{track.duration}}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {Track} from "@/store/modules/track.types"

export default defineComponent({
    props: {
        tracks: {
            type: Object as PropType<Array<Track>>,
            required: true,
        }
    },
})
</script>

<style>
.table-list {
    background-image: linear-gradient(to bottom, #303030, #1f1f1f);
}

.table-list .track:last-child {
    border: none;
}
</style>
