<template>
    <PopupModal class="z-40 ">
        <div class="relative bg-black shadow-lg max-w-7xl rounded-lg mx-auto mt-20 p-20">
            <h1 class="text-5xl font-major font-bold text-dominant-secondary pb-2">{{artist.name}}</h1>
            <h2 class="text-lg font-major">{{artist.real_name}}</h2>

            <p class="text-gray-300 leading-loose h-56 base-scrollbar pr-5 selectable">{{artist.bio}}</p>
        </div>
    </PopupModal>
</template>

<script lang="ts" setup>
import {defineProps} from "vue"
import {Artist} from "@/store/modules/artist.types"
import PopupModal from "@/components/PopupModal"

defineProps<{ artist: Artist }>()
</script>
