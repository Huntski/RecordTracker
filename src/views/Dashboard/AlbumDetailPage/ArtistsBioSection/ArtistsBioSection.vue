<template>
    <div class="bg-gradient-to-b from-[#1E1E1E] to-[#232323] p-20 max-h-full lg:overflow-hidden lg:overflow-y-scroll base-scrollbar">
        <div v-for="artist in artists" :key="artist.id">
            <div class="flex items-center gap-5 mb-10">
                <div class="w-32 h-32 aspect-square rounded-lg overflow-hidden">
                    <img :src="artist.image_url" :alt="artist.name" class="w-full h-full object-cover">
                </div>

                <div>
                    <h2 class="text-2xl font-bold">{{artist.name}}</h2>
                    <h3 class="text-dominant">{{artist.real_name}}</h3>
                </div>
            </div>

            <p class="whitespace-pre-line text-gray-200 text-xs leading-loose">{{artist.bio}}</p>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue"
import {Artist} from "@/store/modules/artist.types"

export default defineComponent({
    props: {
        artists: {
            type: Object as PropType<Artist[]>,
            required: true
        }
    },
})
</script>
