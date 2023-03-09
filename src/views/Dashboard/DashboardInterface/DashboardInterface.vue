<template>
    <div class="absolute top-0 left-0 flex items-end w-full h-full pointer-events-none pointer-events-parent-none">
        <AppSearchWindow ref="appSearchWindow" />

        <div id="bottom-actions" class="p-5 flex justify-between items-end w-full">
            <PlayListSelecter />

            <SearchButton @click="openSearchWindow" />
        </div>
    </div>
</template>

<script lang="ts">
import PlayListSelecter from "@/views/Dashboard/DashboardInterface/PlayListSelecter"
import SearchButton from "@/views/Dashboard/DashboardInterface/SearchButton"
import AppSearchWindow from "@/views/Dashboard/DashboardInterface/AppSearchWindow"
import {defineComponent} from "vue"

export default defineComponent({
    methods: {
        openSearchWindow() {
            const appSearchWindow = this.$refs.appSearchWindow as Record<any, any>

            appSearchWindow.openWindow()
        }
    },

    components: {SearchButton, PlayListSelecter, AppSearchWindow}
})
</script>

<style>
#bottom-actions:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 300px;
    background: linear-gradient(to bottom, #00000000, #00000090);
    width: 100%;
}
</style>
