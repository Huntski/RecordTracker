<template>
    <div ref="app" class="font-regular">
        <Suspense>
            <router-view class="bg-gradient-to-br from-gray-900 to-black h-screen" />
        </Suspense>
    </div>
</template>

<script lang="ts" setup>
import router from "@/router"
import {nextTick} from "vue"

document.addEventListener('keydown', function (e: KeyboardEvent) {
    if (router.currentRoute.value.name === 'Dashboard') {
        setTimeout(() => {
            if (document.activeElement && document.activeElement.tagName !== 'INPUT') {
                if (e.key === 's') {
                    nextTick(() => {
                        router.push({name: 'AppSearchWindow'})
                    })
                }
            }
        }, 100)
    }
})
</script>
