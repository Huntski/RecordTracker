<template>
    <div class="absolute top-0 left-0 flex justify-between items-end p-5 w-full h-full pointer-events-none pointer-events-parent-none">
        <PlayListSelecter />

        <SearchButton  />
    </div>
</template>

<script lang="ts">
import PlayListSelecter from "@/views/Dashboard/DashboardInterface/PlayListSelecter"
import SearchButton from "@/views/Dashboard/DashboardInterface/SearchButton"
import {defineComponent} from "vue"

export default defineComponent({
    components: {SearchButton, PlayListSelecter}
})
</script>

<style>
#bottom-actions:before {
    pointer-events: none;
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 300px;
    background: linear-gradient(to bottom, #00000000, #00000090);
    width: 100%;
}
</style>
