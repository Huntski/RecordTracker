<template>
    <div class="rounded-lg p-5 border-gray-700 border">
        <h2 class="font-regular text-2xl mb-2">YOUR LP</h2>

        <div class="flex flex-col gap-3">
            <MetaDataRow column="Origin">{{album.origin}}</MetaDataRow>
            <MetaDataRow column="Released">{{album.year ?? 'Unknown'}}</MetaDataRow>
            <MetaDataRow column="Genre">
                <ul class="flex gap-2 cursor-pointer">
                    <li class="underline" v-for="genre in album.genres" :key="genre.name">{{genre.name}}</li>
                </ul>
            </MetaDataRow>
        </div>
    </div>
</template>

<script setup lang="ts">
import {Album} from "@/store/modules/album.types"
import {defineProps} from "vue"
import MetaDataRow from './MetaDataRow.vue'

defineProps<{ album: Album }>()
</script>
