<template>
    <div>
        <AppSearchWindow ref="appSearchWindow" />

        <div id="bottom-actions" class="absolute bottom-0 w-full flex justify-between items-end p-5">
            <PlayListSelecter />

            <SearchButton @click="openSearchWindow" />
        </div>
    </div>
</template>

<script>
import PlayListSelecter from "@/views/Dashboard/DashboardInterface/PlayListSelecter"
import SearchButton from "@/views/Dashboard/DashboardInterface/SearchButton/SearchButton"
import AppSearchWindow from "@/views/Dashboard/DashboardInterface/AppSearchWindow"

export default {
    methods: {
        openSearchWindow() {
            this.$refs.appSearchWindow.openWindow()
        }
    },

    components: {SearchButton, PlayListSelecter, AppSearchWindow}
}
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
#bottom-actions {
    pointer-events: none;
}

#bottom-actions * {
    pointer-events: auto;
}
</style>
