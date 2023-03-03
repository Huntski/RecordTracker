<template>
    <div>
        <div v-if="artists.length === 1" class="flex items-center cursor-pointer gap-3 p-1 hover:bg-dominant hover:text-black rounded-full">
            <div class="w-6 h-6 rounded-full overflow-hidden">
                <img :src="firstArtist.image_url" :alt="firstArtist.title" class="w-full h-full object-cover">
            </div>

            <h3 class="font-light text-md text-sm pr-3">{{firstArtist.name}}</h3>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {Artist} from "@/store/modules/artist.types";

export default defineComponent({
    props: {
        artists: {
            type: Object as PropType<Array<Artist>>,
            required: true,
        }
    },

    computed: {
        firstArtist(): Artist {
            return this.artists[0]
        }
    }
})
</script>
