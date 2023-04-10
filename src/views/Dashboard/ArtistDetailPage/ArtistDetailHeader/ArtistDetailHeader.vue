<template>
    <header class="absolute top-0 left-0 w-full z-10 p-5 w-full flex items-center justify-end box-border">
        <CloseButton @click="closeWindow" />
    </header>
</template>

<script setup lang="ts">
import {CloseButton} from "@/components/@buttons"
import router from "@/router"

function closeWindow() {
    router.push({name: 'Dashboard'})
}
</script>
