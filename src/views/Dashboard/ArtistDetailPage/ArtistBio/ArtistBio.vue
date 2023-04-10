<template>
    <div class="relative flex gap-10 pt-20">
        <div class="relative z-20">
            <div class="aspect-square bg-gray-800 rounded-lg rounded overflow-hidden w-80">
                <img :src="props.artist.image_url" :alt="props.artist.name" class="w-full h-full object-cover">
            </div>

            <div class="artist-image-underline"></div>
        </div>

        <div class="relative z-0 w-full">
            <div class="relative pb-5 mb-5">
                <h1 class="text-5xl font-major font-bold text-dominant-secondary pb-2">{{props.artist.name}}</h1>
                <h2 class="text-lg font-major">{{props.artist.real_name}}</h2>

                <div class="name-underline"></div>
                <div class="name-underline-end"></div>
            </div>

            <p class="whitespace-pre-line text-gray-300 leading-loose max-h-72 overflow-y-scroll base-scrollbar pr-5 selectable">{{props.artist.bio}}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {Artist} from "@/store/modules/artist.types"
import {defineProps} from "vue"

const props = defineProps<{artist: Artist}>()
</script>

<style>
.name-underline {
    position: absolute;
    bottom: 0;
    width: 125%;
    height: 1px;
    border-radius: 20px;
    background: #4f4f4f;
    transform: translateX(-45%);
}

.name-underline-end {
    position: absolute;
    bottom: 0;
    width: 150%;
    height: 1px;
    border-radius: 20px;
    background: #D0FF94;
    transform: translateX(0%) scaleX(.05);
    animation: slideInFromLeft 500ms cubic-bezier(0.165, 0.84, 0.44, 1);
}

.artist-image-underline {
    position: absolute;
    left: 0;
    top: 0%;
    width: 1px;
    height: 150px;
    border-radius: 20px;
    background: #D0FF94;
}


@keyframes slideInFromLeft {
    from {
        transform: translateX(-200%);
    }
}
</style>
