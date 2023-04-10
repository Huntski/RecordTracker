<template>
    <div class="relative flex gap-10 pt-20">
        <div class="relative z-20">
            <div class="aspect-square bg-gray-800 rounded-2xl rounded-bl-none overflow-hidden w-80">
                <img :src="props.artist.image_url" :alt="props.artist.name" class="w-full h-full object-cover">
            </div>

            <div class="artist-image-underline"></div>
            <div class="artist-image-underline-extension"></div>
            <div class="artist-image-underline-end"></div>
        </div>

        <div class="relative z-0 w-full">
            <div class="relative pb-5 mb-5 artist-name">
                <h1 class="text-5xl font-major font-bold text-dominant-secondary pb-2">{{props.artist.name}}</h1>
                <h2 class="text-lg font-major">{{props.artist.real_name}}</h2>
            </div>

            <p class="whitespace-pre-line text-gray-300 leading-loose h-72 overflow-y-scroll base-scrollbar pr-5 selectable">{{props.artist.bio}}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {Artist} from "@/store/modules/artist.types"
import {defineProps} from "vue"

const props = defineProps<{artist: Artist}>()
</script>

<style scoped>
.artist-name:before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 125%;
    height: 1px;
    border-radius: 20px;
    background: #4f4f4f;
    transform: translateX(-45%);
}

.artist-name:after {
    content: "";
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
    content: "";
    position: absolute;
    left: 0;
    bottom: -30%;
    width: 1px;
    height: 150px;
    border-radius: 20px;
    background: #4f4f4f;
    transform: translateY(-200%);
    animation: slideInFromTop 500ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards 400ms;
    z-index: 0;
}
.artist-image-underline-extension {
    content: "";
    position: absolute;
    left: 0;
    bottom: -60%;
    width: 1px;
    height: 100px;
    border-radius: 20px;
    background: #4f4f4f;
    transform: translateY(-200%);
    animation: slideInFromTop 500ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards 500ms;
    z-index: 0;
}
.artist-image-underline-end {
    content: "";
    position: absolute;
    left: 0;
    bottom: -73%;
    width: 1px;
    height: 30px;
    border-radius: 20px;
    background: #4f4f4f;
    transform: translateY(-200%);
    animation: slideInFromTop 500ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards 500ms;
    z-index: 0;
}

.artist-image-underline-end:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -100%;
    width: 15px;
    height: 15px;
    background: #4f4f4f;
    transform: translateY(-400%) translateX(-50%);
    opacity: 0;
    animation: sideCubeAnimation 800ms cubic-bezier(0.165, 0.84, 0.44, 1) forwards 1000ms;
    z-index: 0;
}
@keyframes sideCubeAnimation {
    0% {
        opacity: 0;
        transform: translateY(-200%) translateX(-50%);
    }

    50% {
        opacity: 1;
        transform: translateY(0%) translateX(-50%) rotate(0deg);
    }

    100% {
        opacity: 1;
        transform: translateY(0%) translateX(-50%) rotate(225deg);
    }
}

@keyframes slideInFromLeft {
    from {
        transform: translateX(-200%);
    }
}

@keyframes slideInFromTop {
    from {
        transform: translateY(-200%);
    }

    to {
        transform: translateY(0);
    }
}

</style>
