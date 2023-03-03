<template>
    <div
        class="absolute top-0 left-0 bottom-0 right-0 m-auto w-full h-full flex justify-center items-center"
        :class="{'hidden' : !open}"
        ref="albumDetailPage"
    >
        <BackgroundOverlay />

        <div class="relative album-overview max-w-9xl mx-20 w-full h-full bg-green-500 rounded-xl grid grid-cols-2 p-20 text-white overflow-hidden">
            <CloseButton class="absolute top-0 left-0 m-3 z-20" />

            <div class="background-album-cover absolute top-0 bottom-0 my-auto bg-gray-900 overflow-hidden rounded-full"></div>

            <div class="relative">
                <div class="flex gap-10">
                    <div class="w-52 h-52 bg-gray-800 rounded-lg"></div>

                    <div class="py-2">
                        <h1 class="font-bold font-major text-4xl">Space Art</h1>

                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="relative"></div>
        </div>
    </div>
</template>
<script>
import BackgroundOverlay from "@/components/BackgroundOverlay"
import {CloseButton} from "@/components/@buttons"

export default {
    data() {
        return {
            open: false,
        }
    },

    methods: {
        toggleWindow() {
            this.open = !this.open
        },

        openWindow() {
            console.log('open window overview')

            this.open = true
        },

        closeWindow() {
            this.open = false
        },
    },

    mounted() {
        //
    },

    components: {BackgroundOverlay, CloseButton}
}
</script>

<style>
.album-overview {
    background: linear-gradient(to bottom right, #161616, #1D1D1D);
    max-height: 700px;
}

.background-album-cover {
    left: -20%;
    aspect-ratio: 1 / 1;
    height: 120%;
}
</style>
