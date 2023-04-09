<template>
    <div ref="app" class="font-regular">
        <Suspense>
            <router-view class="bg-gradient-to-br from-gray-900 to-black bg-section-end h-screen" />
        </Suspense>
    </div>
</template>

<script lang="ts">
import router from "@/router"
import {nextTick} from "vue"

export default {
    mounted(): void {
        document.addEventListener('keydown', function (e: KeyboardEvent) {
            setTimeout(() => {
                if (document.activeElement && document.activeElement.tagName !== 'INPUT') {
                    if (e.key === 's') {
                        nextTick(() => {
                            router.push({name: 'AppSearchWindow'})
                        })
                    }
                }
            }, 100)
        })
    }
}
</script>
