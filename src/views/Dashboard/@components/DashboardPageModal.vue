<template>
    <div class="absolute top-0 left-0 bottom-0 right-0 m-auto w-full h-full flex justify-center items-center">
        <BackgroundOverlay @click="closeWindow" />

        <div class="animate--reveal relative album-overview bg-gradient-to-br to-gray-900 from-gray-800 box-border rounded-xl text-white overflow-hidden">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from "@/router"
import BackgroundOverlay from "@/components/BackgroundOverlay"

function closeWindow(): void {
    router.push({name: 'Dashboard'})
}

function handleKeyPressEvent(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
        closeWindow()

        document.onkeydown = null
    }
}

document.addEventListener('keydown', handleKeyPressEvent)
</script>
