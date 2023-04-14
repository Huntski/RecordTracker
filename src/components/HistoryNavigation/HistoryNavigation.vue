<template>
    <div class="flex gap-3">
        <ReturnButton @click="previousPage" :clickable="previousHistory">&#60;</ReturnButton>
<!--        <ReturnButton @click="nextPage" :clickable="forwardHistory">&#62;</ReturnButton>-->
    </div>
</template>

<script setup lang="ts">
import router from "@/router"
import ReturnButton from './ReturnButton.vue'
import {computed} from "vue"

const previousHistory = computed(() => {
    console.log(window.history.state)

    return window.history.state.back.includes('artist') || window.history.state.back.includes('album')
})

const forwardHistory = computed(() => {
    return false

    // return window.history.state.forward.includes('artist') || window.history.state.forward.includes('album')
})

function previousPage() {
    router.go(-1)
}

function nextPage() {
    router.go(1)
}
</script>
