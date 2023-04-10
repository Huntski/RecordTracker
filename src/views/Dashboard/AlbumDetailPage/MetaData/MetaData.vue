<template>
    <div class="rounded-lg p-5 border-gray-700 border">
        <h2 class="font-regular text-2xl mb-2">YOUR LP</h2>

        <div class="flex flex-col gap-3">
            <MetaDataRow column="Origin">{{props.album.origin}}</MetaDataRow>
            <MetaDataRow column="Released">{{props.album.year ?? 'Unknown'}}</MetaDataRow>
            <MetaDataRow column="Genre">
                <ul class="flex gap-2 cursor-pointer">
                    <li class="underline" v-for="genre in genres" :key="genre.name">{{genre.name}}</li>
                </ul>
            </MetaDataRow>
        </div>
    </div>
</template>

<script setup lang="ts">
import {Album} from "@/store/modules/album.types"
import {computed, defineProps} from "vue"
import MetaDataRow from './MetaDataRow.vue'
import {Genre} from "@/store/modules/genre.types"

const props = defineProps<{ album: Album }>()

const genres = computed(() => {
    return removeDuplicates(props.album.genres)
})

function removeDuplicates(genres: Genre[]) {
    const filteredGenres = []
    const existingGenres: string[] = []

    for (let i = 0; i < genres.length; i++) {
        const name = genres[i].name
        if (!existingGenres.includes(name)) {
            existingGenres.push(name)
            filteredGenres.push(genres[i])
        }
    }

    return filteredGenres
}
</script>
