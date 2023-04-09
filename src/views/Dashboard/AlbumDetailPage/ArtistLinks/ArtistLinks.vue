<template>
    <div>
        <router-link :to="{name: 'ArtistDetailPage', params: {id: firstArtist.id}}" v-if="artists.length === 1" class="flex items-center cursor-pointer gap-3 p-1 hover:bg-tag hover:text-dominant rounded-full">
            <div class="w-6 h-6 rounded-full overflow-hidden bg-green-50">
                <img v-if="firstArtist.image_url" :src="firstArtist.image_url" :alt="firstArtist.name" class="w-full h-full object-cover">
            </div>

            <h3 class="font-light text-md text-sm pr-3">{{firstArtist.name}}</h3>
        </router-link>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {Artist} from "@/store/modules/artist.types"

export default defineComponent({
    props: {
        artists: {
            type: Object as PropType<Artist[]>,
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
