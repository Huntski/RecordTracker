<template>
    <header class="absolute top-0 left-0 right-0 z-10 p-3 w-full flex items-center justify-between box-border">
        <CloseButton @click="closeWindow" />

        <EditButton />
    </header>
</template>

<script setup lang="ts">
import {EditButton, CloseButton} from "@/components/@buttons"
import router from "@/router"

function closeWindow() {
    router.push({name: 'Dashboard'})
}
</script>
