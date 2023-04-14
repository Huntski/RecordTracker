<template>
    <div>
        <div class="mb-5 flex gap-3">
            <button v-for="(tracks, key) in albumSides"
                    v-show="displayedTracks"
                    :key="key"
                    class="aspect-square w-10  bg-gray-700 text-dominant rounded"
                    :class="{ 'bg-gray-400 text-white' : selected !== key }"
                    @click="selected = key"
            >{{ key }}</button>
        </div>

        <div ref="tracklist" class="animate--fade tracklist border border-gray-700 rounded-lg base-scrollbar shadow border overflow-hidden mb-12">
            <div ref="tracks" class="tracks">
                <div v-for="(track, index) in displayedTracks"
                     :key="track.id"
                     class="track flex items-center ml-5 py-3 border-b border-solid border-gray-700 last:border-none"
                     :class="{'border-b' : index !== tracks.length - 1}"
                >
                    <span class="w-10 text-gray-300">{{track.position}}</span>
                    <span class="ml-5">{{track.title}}</span>
                    <span class="ml-auto pr-5 text-gray-300">{{track.duration}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {Track} from "@/store/modules/track.types"

interface Sides {
    [key: string]: Track[]
}

export default defineComponent({
    props: {
        tracks: {
            type: Array as PropType<Track[]>,
            required: true,
        }
    },

    data() {
        return {
            selected: 'A',
        }
    },

    watch: {
        displayedTracks() {
            this.updateHeight()
        }
    },

    computed: {
        albumSides() {
            const sides: Sides = {
                A: [],
                B: [],
                C: [],
                D: []
            }

            for (const key in sides) {
                const tracks = this.getAllTracksIncludingQuery(key)

                if (!tracks.length) {
                    delete sides[key]
                } else {
                    sides[key] = tracks
                }
            }

            return sides
        },

        displayedTracks() {
            if (Object.keys(this.albumSides).length <= 1) {
                return this.tracks
            }

            return this.albumSides[this.selected]
        }
    },

    methods: {
        getAllTracksIncludingQuery(query: string) {
            return this.tracks.filter((obj: Track) => obj.position.charAt(0) === query)
        },

        updateHeight() {
            setTimeout(() => {
                const tracklist = this.$refs.tracklist as Record<any, any>
                const tracks = this.$refs.tracks as Record<any, any>

                const rect = tracks.getBoundingClientRect()

                if (rect.height > 500) {
                    tracklist.style.minHeight = `1000px`
                    tracklist.style.maxHeight = `1000px`
                }

                if (rect.height < 1000) {
                    tracklist.style.maxHeight = `${rect.height}px`
                    tracklist.style.minHeight = `${rect.height}px`
                }
            }, 200)
        },
    },

    created() {
        this.updateHeight()
    },
})
</script>

<style>
.tracklist {
    max-height: 1000px;
    transition: max-height 100ms ease-out, min-height 100ms ease-out;
}
</style>
