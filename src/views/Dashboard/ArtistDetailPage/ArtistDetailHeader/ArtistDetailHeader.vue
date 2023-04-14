<template>
    <header class="sticky top-0 left-0 w-full z-10 p-5 w-full flex items-center justify-between box-border pointer-events-parent-none">
        <HistoryNavigation />

        <CloseButton class="ml-auto" @click="closeWindow" />
    </header>
</template>

<script setup lang="ts">
import {CloseButton} from "@/components/@buttons"
import router from "@/router"
import HistoryNavigation from "@/components/HistoryNavigation"

function closeWindow() {
    router.push({name: 'Dashboard'})
}
</script>
